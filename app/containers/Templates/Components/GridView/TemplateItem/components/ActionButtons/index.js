import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { FormattedMessage as M } from 'react-intl';
import { compose } from 'redux';
import resaga from 'resaga';
import Button from 'viewComponents/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Icon from 'ugcomponents/Icon';
import { CONFIG } from './config';
import m from './messages';
import styles from './styles';

export class ActionButtons extends PureComponent {
  state = {
    anchorEl: null,
  };

  handleClickMenu = ev => {
    this.setState({
      anchorEl: ev.currentTarget,
    });
  };

  handleCloseMenu = () => {
    this.setState({
      anchorEl: null,
    });
  };

  handleEvents = event => () => {
    this.setState({ anchorEl: null });
    event();
  };

  render = () => {
    const { classes, onDelete, onMove, onCopy, canMove } = this.props;
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
            className={classes.items}
            button
            onClick={this.handleEvents(onDelete)}
          >
            <Icon icon="trash2" className={classes.icon} />
            <M {...m.deleteLabel} />
          </MenuItem>
          {canMove && (
            <MenuItem
              className={classes.items}
              button
              onClick={this.handleEvents(onMove)}
            >
              <Icon icon="compare" className={classes.icon} />
              <M {...m.moveLabel} />
            </MenuItem>
          )}
          <MenuItem
            className={classes.items}
            button
            onClick={this.handleEvents(onCopy)}
          >
            <Icon icon="copy" className={classes.icon} />
            <M {...m.cloneLabel} />
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
