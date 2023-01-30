import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { FormattedMessage as M } from 'react-intl';
import Button from 'viewComponents/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Icon from 'ugcomponents/Icon';
import { compose } from 'redux';
import resaga from 'resaga';
import { CONFIG } from './config';
import m from './messages';
import styles from './styles';

export class ActionButtons extends PureComponent {
  state = {
    anchorEl: null,
  };

  handleClickMenu = ev => this.setState({ anchorEl: ev.currentTarget });

  handleCloseMenu = () => this.setState({ anchorEl: null });

  handleEvents = event => () => {
    this.setState({ anchorEl: null });
    event();
  };

  render = () => {
    const { classes, onEdit, onDelete, onMove, onCopy, canMove } = this.props;
    const { anchorEl } = this.state;

    return (
      <React.Fragment>
        <Button
          icon="ellipsis"
          iconButton
          variant="borderless"
          color="gray"
          size="small"
          onClick={this.handleClickMenu}
          className={classes.footerButtons}
        />
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleCloseMenu}
        >
          <MenuItem
            button
            onClick={this.handleEvents(onEdit)}
            className={classes.items}
          >
            <Icon icon="pencil3" className={classes.icon} />
            <M {...m.editLabel} />
          </MenuItem>
          <MenuItem
            button
            onClick={this.handleEvents(onDelete)}
            className={classes.items}
          >
            <Icon icon="trash2" className={classes.icon} />
            <M {...m.deleteLabel} />
          </MenuItem>
          {canMove && (
            <MenuItem
              button
              onClick={this.handleEvents(onMove)}
              className={classes.items}
            >
              <Icon icon="compare" className={classes.icon} />
              <M {...m.moveLabel} />
            </MenuItem>
          )}
          <MenuItem
            button
            onClick={this.handleEvents(onCopy)}
            className={classes.items}
          >
            <Icon icon="copy" className={classes.icon} />
            <M {...m.copyLabel} />
          </MenuItem>
        </Menu>
      </React.Fragment>
    );
  };
}

ActionButtons.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onMove: PropTypes.func.isRequired,
  onCopy: PropTypes.func.isRequired,
  canMove: PropTypes.bool,

  // resaga props
};

ActionButtons.defaultProps = {};

export default compose(
  withStyles(styles, { name: 'ActionButtons' }),
  resaga(CONFIG),
)(ActionButtons);
