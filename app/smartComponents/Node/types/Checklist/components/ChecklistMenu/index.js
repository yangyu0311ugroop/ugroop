import { withStyles } from '@material-ui/core/styles';
import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { NODE_API, UPDATE_NODE } from 'apis/constants';
import { MENU_TEXT, ICON } from 'appConstants';
import GridItem from 'components/GridItem/index';
import { Divider } from 'components/material-ui';
import MenuItem from 'components/Popper/components/MenuItem';
import Popper from 'components/Popper';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { CHECKLIST_HELPERS } from 'smartComponents/Node/components/Checklists/utils';
import Status from 'smartComponents/Node/parts/Status';
import { InlineButton } from 'ugcomponents/Buttons';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import Icon from 'ugcomponents/Icon';
import {
  CHECKLIST,
  CHECKLISTS,
  TOUR,
  DAY,
  TEMPLATE,
} from 'utils/modelConstants';
import { Can } from 'apis/components/Ability/components/Can';
import { CONFIG } from './config';
import styles from './styles';

export class ChecklistMenu extends PureComponent {
  state = {
    anchorEl: null,
    blockOpening: false,
    confirmDeleteDialogId: null,
  };

  componentWillUnmount = () => {
    clearTimeout(this.blockOpening);
  };

  openMoreMenu = (popperProps = {}) => event => {
    const { isDialog } = popperProps;
    const { blockOpening } = this.state;
    this.stopPropagation(event);
    if (isDialog) return popperProps.openMenu();
    if (!blockOpening) {
      return this.setState({ anchorEl: event.currentTarget });
    }
    return null;
  };

  closeMoreMenu = event => {
    this.stopPropagation(event);
    this.setState({ anchorEl: null });

    this.blockOpening = setTimeout(
      () => this.setState({ blockOpening: false }),
      100,
    );
    return this.setState({ blockOpening: true });
  };

  stopPropagation = event => event.stopPropagation();

  editNode = event => {
    const { id } = this.props;

    this.closeMoreMenu(event);

    this.props.resaga.setValue({ editChecklistId: id });
  };

  confirmDelete = e => {
    const confirmDeleteDialogId = PORTAL_HELPERS.confirmDelete(
      {
        title: 'Delete',
        message: 'Are you sure you want to delete this checklist?',
        onConfirm: this.deleteNode(e),
      },
      this.props,
    );

    this.setState({ confirmDeleteDialogId });
  };

  deleteSuccess = () => {
    const { confirmDeleteDialogId } = this.state;

    PORTAL_HELPERS.closePortal(confirmDeleteDialogId, this.props);
  };

  deleteNode = event => () => {
    const { id } = this.props;

    this.closeMoreMenu(event);

    return NODE_API_HELPERS.deleteNode(
      { nodeId: id, childKey: CHECKLISTS, onSuccess: this.deleteSuccess },
      this.props,
    );
  };

  toggleNode = event => {
    const { id, status, me } = this.props;

    this.closeMoreMenu(event);

    const node = CHECKLIST_HELPERS.toggleStatus(
      { id, status, type: CHECKLIST },
      { me },
    );

    this.props.resaga.dispatchTo(NODE_API, UPDATE_NODE, {
      payload: { nodeId: id, node },
    });
  };

  createChecklist = event => {
    const { parentNodeId } = this.props;

    this.closeMoreMenu(event);

    this.props.resaga.setValue({ addChecklistParentId: parentNodeId });
  };

  renderButton = popperProps => (
    <InlineButton
      padding="md"
      color="secondary"
      onClick={this.openMoreMenu(popperProps)}
    >
      <Icon size="xsmall" icon="lnr-ellipsis" />
    </InlineButton>
  );

  renderMenuItems = ({ closeMenu }) => {
    const { classes, id, parentType } = this.props;
    return (
      <div>
        <MenuItem
          disableRipple
          onClick={this.stopPropagation}
          className={classes.menuItemHeader}
          closeMenu={closeMenu}
        >
          <div className={classes.menuHeader}>Checklist</div>
        </MenuItem>
        <Divider />
        <Can do="update" on={CHECKLIST}>
          <MenuItem onClick={this.editNode} closeMenu={closeMenu}>
            <Icon size="small" icon="lnr-register" paddingRight />
            <span className={classes.menuItemText}>Edit</span>
          </MenuItem>
        </Can>
        <Can do="delete" on={CHECKLIST}>
          <MenuItem onClick={this.confirmDelete} closeMenu={closeMenu}>
            <Icon size="small" icon="lnr-trash2" paddingRight />
            <span className={classes.menuItemText}>Delete</span>
          </MenuItem>
        </Can>
        <Divider />
        <Can do="update" on={CHECKLIST}>
          <React.Fragment>
            {[TOUR, DAY, TEMPLATE].includes(parentType) && (
              <MenuItem onClick={this.toggleNode} closeMenu={closeMenu}>
                <Status id={id} variant={ICON} paddingRight />
                <span className={classes.menuItemText}>
                  <Status id={id} variant={MENU_TEXT} />
                </span>
              </MenuItem>
            )}
          </React.Fragment>
        </Can>
        <Divider />
        <Can do="create" on={CHECKLIST}>
          <MenuItem onClick={this.createChecklist} closeMenu={closeMenu}>
            <Icon size="small" icon="lnr-plus" paddingRight />
            <span className={classes.menuItemText}>
              New checklist on this {parentType}
            </span>
          </MenuItem>
        </Can>
      </div>
    );
  };

  render = () => {
    const { anchorEl } = this.state;

    return (
      <GridItem>
        <Popper
          noPadding
          anchorEl={anchorEl}
          placement="bottom"
          onClose={this.closeMoreMenu}
          renderButton={this.renderButton}
        >
          {this.renderMenuItems}
        </Popper>
      </GridItem>
    );
  };
}

ChecklistMenu.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  id: PropTypes.number.isRequired, // checklist id
  parentNodeId: PropTypes.number,

  // resaga props
  parentType: PropTypes.string,
  status: PropTypes.string,
  me: PropTypes.number,

  // customisable props
};

ChecklistMenu.defaultProps = {
  parentType: '',
  status: '',
  me: 0,
};

export default compose(
  withStyles(styles, { name: 'ChecklistMenu' }),
  resaga(CONFIG),
)(ChecklistMenu);
