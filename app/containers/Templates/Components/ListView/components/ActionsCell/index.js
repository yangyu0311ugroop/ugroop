import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { VARIANTS } from 'variantsConstants';
import Button from 'viewComponents/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Icon from 'ugcomponents/Icon';
import { FormattedMessage as M } from 'react-intl';
import { compose } from 'redux';
import m from './messages';
import styles from './styles';

export class ActionsCell extends PureComponent {
  state = {
    anchorEl: null,
  };

  onDeleteItem = () => {
    const { itemId, itemType, itemContent } = this.props;
    const form = {
      type: itemType,
      title: itemContent,
      id: itemId,
    };
    this.handleEvents(this.props.onDeleteItem(form));
  };

  handleMenuAction = ev => this.setState({ anchorEl: ev.currentTarget });

  handleMenuClose = () => this.setState({ anchorEl: null });

  handleEvents = event => () => {
    this.setState({ anchorEl: null });
    event();
  };

  render = () => {
    const { classes, itemType, itemId, itemContent, canMove } = this.props;

    const editMenu =
      itemType === 'folder' ? (
        <MenuItem button onClick={this.props.onEdit(itemId)}>
          <Icon icon="pencil3" className={classes.icon} />
          <M {...m.editLabel} />
        </MenuItem>
      ) : (
        ''
      );

    return (
      <React.Fragment>
        <div className={classes.menuBtn}>
          <Button
            icon="ellipsis"
            iconButton
            variant={VARIANTS.INLINE}
            color="gray"
            size="small"
            onClick={this.handleMenuAction}
            tooltipProps={{
              title: 'Actions',
            }}
          />
        </div>
        <Menu
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleMenuClose}
        >
          {editMenu}
          <MenuItem button onClick={this.onDeleteItem}>
            <Icon icon="trash2" className={classes.icon} />
            <M {...m.deleteLabel} />
          </MenuItem>
          {canMove && (
            <MenuItem
              button
              onClick={this.handleEvents(
                this.props.onMove(itemId, itemType, itemContent),
              )}
            >
              <Icon icon="compare" className={classes.icon} />
              <M {...m.moveLabel} />
            </MenuItem>
          )}
          <MenuItem
            button
            onClick={this.handleEvents(
              this.props.onCopy(itemId, itemType, itemContent),
            )}
          >
            <Icon icon="copy" className={classes.icon} />
            <M {...m.copyLabel} />
          </MenuItem>
        </Menu>
      </React.Fragment>
    );
  };
}

ActionsCell.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,

  // parent props
  itemId: PropTypes.number.isRequired,
  itemType: PropTypes.string,
  itemContent: PropTypes.string,
  onDeleteItem: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onCopy: PropTypes.func.isRequired,
  onMove: PropTypes.func.isRequired,
  canMove: PropTypes.bool,

  // resaga props
};

ActionsCell.defaultProps = {};

export default compose(withStyles(styles, { name: 'ActionsCell' }))(
  ActionsCell,
);
