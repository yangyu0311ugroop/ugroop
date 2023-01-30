import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { FormattedMessage as M } from 'react-intl';
import Button from 'viewComponents/Button';
import Popper from 'components/Popper';
import MenuItem from 'components/Popper/components/MenuItem';
import Icon from 'ugcomponents/Icon';
import { compose } from 'redux';
import resaga from 'resaga';
import withTemplateViewActions from 'smartComponents/Node/hoc/withTemplateViewActions';
import { ability } from 'apis/components/Ability/ability';
import { FOLDER } from 'utils/modelConstants';

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
    ability.can('delete', { type: FOLDER, createdBy: this.props.createdBy });

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
    this.setState({ anchorEl: null });
    event();
  };

  onDelete = () => {
    const { id, type, content, templateViewActions } = this.props;
    this.handleEvents(
      templateViewActions.onDelete({ id, type, title: content }),
    );
  };

  renderButton = () => {
    const { classes } = this.props;
    return (
      <Button
        variant="borderless"
        // color="gray"
        size="small"
        onClick={this.handleClickMenu}
        className={classes.footerButtons}
        tooltipProps={{
          title: 'Options',
        }}
      >
        <div className={this.props.classes.option}>OPTIONS</div>
      </Button>
    );
  };

  render = () => {
    const { classes, canMove, templateViewActions } = this.props;
    const { anchorEl } = this.state;

    return (
      <React.Fragment>
        <Popper
          placement="bottom-center"
          anchorEl={anchorEl}
          renderButton={this.renderButton}
          onClose={this.handleCloseMenu}
        >
          <>
            {this.canDelete() && (
              <MenuItem
                button
                onClick={this.handleEvents(
                  templateViewActions.onEnableEditMode,
                )}
                className={classes.items}
              >
                <Icon icon="pencil3" className={classes.icon} />
                <M {...m.editLabel} />
              </MenuItem>
            )}
            {this.canDelete() && (
              <MenuItem
                button
                onClick={this.handleEvents(this.onDelete)}
                className={classes.items}
              >
                <Icon icon="trash2" className={classes.icon} />
                <M {...m.deleteLabel} />
              </MenuItem>
            )}
            {canMove && this.canDelete() && (
              <MenuItem
                button
                onClick={this.handleEvents(templateViewActions.onMove)}
                className={classes.items}
              >
                <Icon icon="compare" className={classes.icon} />
                <M {...m.moveLabel} />
              </MenuItem>
            )}
            <MenuItem
              button
              onClick={this.handleEvents(templateViewActions.onCopy)}
              className={classes.items}
            >
              <Icon icon="copy" className={classes.icon} />
              <M {...m.copyLabel} />
            </MenuItem>
          </>
        </Popper>
      </React.Fragment>
    );
  };
}

ActionButtons.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,
  templateViewActions: PropTypes.object,

  // parent
  canMove: PropTypes.bool,
  id: PropTypes.number,
  type: PropTypes.string,
  content: PropTypes.string,

  // resaga
  createdBy: PropTypes.number,
};

export default compose(
  withStyles(styles, { name: 'ActionButtons' }),
  resaga(CONFIG),
  withTemplateViewActions,
)(ActionButtons);
