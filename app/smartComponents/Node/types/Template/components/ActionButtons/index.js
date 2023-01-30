import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { FormattedMessage as M } from 'react-intl';
import { compose } from 'redux';
import resaga from 'resaga';
import Button from 'viewComponents/Button';
import Icon from 'ugcomponents/Icon';
import Popper from 'components/Popper';
import MenuItem from 'components/Popper/components/MenuItem';
import withTemplateViewActions from 'smartComponents/Node/hoc/withTemplateViewActions';
import { ability } from 'apis/components/Ability/ability';
import { TEMPLATE } from 'utils/modelConstants';

import { CONFIG } from './config';
import m from './messages';
import styles from './styles';

export class ActionButtons extends PureComponent {
  state = {
    anchorEl: null,
  };

  componentWillUnmount = () => {
    clearTimeout(this.handleCloseMenu);
  };

  canDelete = () =>
    ability.can('delete', { type: TEMPLATE, createdBy: this.props.createdBy });

  handleClickMenu = ev => {
    if (this.state.anchorEl) {
      this.handleCloseMenu();
    } else {
      this.setState({
        anchorEl: ev.currentTarget,
      });
    }
  };

  handleCloseMenu = () =>
    setTimeout(() => this.setState({ anchorEl: null }), 100);

  handleEvents = event => () => {
    event();
    this.setState({ anchorEl: null });
  };

  onDelete = () => {
    const { type, id, content, templateViewActions } = this.props;
    this.handleEvents(
      templateViewActions.onDelete({ id, type, title: content }),
    );
  };

  renderMoveIcon = () => {
    const { classes, templateViewActions } = this.props;
    return (
      <MenuItem
        className={classes.items}
        button
        onClick={this.handleEvents(templateViewActions.onMove)}
      >
        <Icon icon="compare" className={classes.icon} />
        <M {...m.moveLabel} />
      </MenuItem>
    );
  };

  renderMenuButton = () => (
    <Button
      icon="ellipsis"
      iconButton
      variant="borderless"
      color="gray"
      size="small"
      onClick={this.handleClickMenu}
      className={this.props.classes.footerButtons}
    />
  );

  render = () => {
    const { classes, canMove, templateViewActions } = this.props;

    const { anchorEl } = this.state;

    return (
      <React.Fragment>
        <Popper
          placement="bottom-start"
          renderButton={this.renderMenuButton}
          anchorEl={anchorEl}
          onClose={this.handleCloseMenu}
        >
          <>
            {this.canDelete() && (
              <MenuItem
                className={classes.items}
                button
                onClick={this.handleEvents(this.onDelete)}
              >
                <Icon icon="trash2" className={classes.icon} />
                <M {...m.deleteLabel} />
              </MenuItem>
            )}
            {canMove && this.canDelete() && this.renderMoveIcon()}
            <MenuItem
              className={classes.items}
              button
              onClick={this.handleEvents(templateViewActions.onCopy)}
            >
              <Icon icon="copy" className={classes.icon} />
              <M {...m.cloneLabel} />
            </MenuItem>
          </>
        </Popper>
      </React.Fragment>
    );
  };
}

ActionButtons.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  templateViewActions: PropTypes.object.isRequired,

  // parent props
  canMove: PropTypes.bool,
  type: PropTypes.string,
  id: PropTypes.number,
  content: PropTypes.string,

  // resaga
  createdBy: PropTypes.number,
};

ActionButtons.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'ActionButtons' }),
  resaga(CONFIG),
  withTemplateViewActions,
)(ActionButtons);
