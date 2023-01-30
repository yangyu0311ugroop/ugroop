import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import InlineButton from 'ugcomponents/Buttons/InlineButton';
import Icon from 'ugcomponents/Icon';
import { FormattedMessage as M } from 'react-intl';
import { compose } from 'redux';
import { TableCell } from 'viewComponents/Table';
import m from './messages';
import styles from './styles';

export class ActionsCell extends PureComponent {
  state = {
    anchorEl: null,
  };

  onDeleteItem = () => {
    const { id } = this.props;
    const form = {
      id,
    };
    this.handleEvents(this.props.onDeleteItem(form));
  };

  handleMenuAction = ev => this.setState({ anchorEl: ev.currentTarget });

  handleMenuClose = () => this.setState({ anchorEl: null });

  handleEvents = event => () => {
    this.setState({ anchorEl: null });
    event();
  };

  deactivate = () => this.props.onDeactivate(false);

  activate = () => this.props.onDeactivate(true);

  render = () => {
    const { classes } = this.props;

    return (
      <TableCell padding="halfLeftRight" centeredText>
        <div className={classes.menuBtn}>
          <InlineButton
            color="primary"
            className={classes.iconHidden}
            onClick={this.handleMenuAction}
          >
            <Icon icon="ellipsis" size="small" />
          </InlineButton>
        </div>
        <Menu
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleMenuClose}
        >
          {this.props.active && (
            <MenuItem button onClick={this.handleEvents(this.deactivate)}>
              <M {...m.deactivateLabel} />
            </MenuItem>
          )}
          {!this.props.active && (
            <MenuItem button onClick={this.handleEvents(this.activate)}>
              <M {...m.activateLabel} />
            </MenuItem>
          )}
        </Menu>
      </TableCell>
    );
  };
}

ActionsCell.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
  onDeactivate: PropTypes.func.isRequired,
  onActivate: PropTypes.func.isRequired,
  active: PropTypes.bool,
  // resaga props
};

ActionsCell.defaultProps = {
  active: false,
};

export default compose(withStyles(styles, { name: 'ActionsCell' }))(
  ActionsCell,
);
