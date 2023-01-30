import { DEFAULT, DO_NOTHING, VIEW_MODE_COPY } from 'appConstants';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import Dialog from 'ugcomponents/Dialog';
import React, { PureComponent } from 'react';
import { OWNER } from 'utils/orgRoleConstants';
import { ORG_USER } from 'utils/modelConstants';
import { ability } from 'apis/components/Ability/ability';
import { compose } from 'redux';
import resaga from 'resaga';
import { FormattedMessage as M } from 'react-intl';
import {
  UPDATE_ORG_ROLE,
  ORGANISATION_API,
  UPDATE_ORG_MEMBER,
  DELETE_ORG_MEMBER,
} from 'apis/constants';
import {
  ORGANISATION_ROLES_VARIANT,
  ORGANISATION_ACTION_VARIANT,
  ORGANISATION_ACTIVE_VARIANT,
} from 'smartComponents/Organisation/components/Roles/constants';
import SnackbarHelpers from 'ugcomponents/SnackBar/helpers';
// parts
import { ORG_FIELD_VARIANTS } from 'smartComponents/Organisation/constants';
import KnownAs from 'smartComponents/Person/parts/KnownAs';
import CreatedDate from 'smartComponents/Organisation/parts/Members/parts/CreatedDate';
import LastSeenDate from 'smartComponents/Organisation/parts/Members/parts/LastSeenDate';
import Role from 'smartComponents/Organisation/parts/Members/parts/Role';
import Activated from 'smartComponents/Organisation/parts/Members/parts/Activated';
import { VARIANTS } from 'variantsConstants';

import { LOGIC_HELPERS } from 'utils/helpers/logic';

import { TableRow, TableCell } from 'viewComponents/Table';
import Email from 'smartComponents/Person/parts/Email';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import TableCellActions from './components/ActionsCell';

import { CONFIG } from './config';
import styles from './styles';
import m from './messages';
export class RoleItems extends PureComponent {
  state = {
    changingRole: false,
    changeRoleFailed: false,
    dialogProp: {
      template: '',
      open: false,
      value: null,
      type: '',
      headlineTitle: '',
      disabled: false,
      headlineText: '',
      requestType: '',
    },
  };

  onDialogClose = () => {
    this.setState({
      dialogProp: {
        open: false,
      },
    });
  };

  onActivateDeactivate = value => {
    const headLineTxtMsg = value
      ? ORGANISATION_ACTIVE_VARIANT.ACTIVATE
      : ORGANISATION_ACTIVE_VARIANT.DEACTIVATE;
    const type = value ? 'confirm' : 'delete';
    this.setState({
      dialogProp: {
        template: type,
        open: true,
        requestType: ORGANISATION_ACTION_VARIANT.ACTIVATE,
        confirmButton: `Go ahead and ${headLineTxtMsg}`,
        dialogTitle: `${headLineTxtMsg.toUpperCase()} MEMBER`,
        headlineText: `Are you sure you want to ${headLineTxtMsg} this member?`,
        headlineTitle: this.props.fullName,
        value,
      },
    });
  };

  onDelete = value => {
    const headLineTxtMsg = 'REMOVE';
    this.setState({
      dialogProp: {
        template: 'delete',
        open: true,
        requestType: ORGANISATION_ACTION_VARIANT.REMOVE,
        confirmButton: <M {...m.confirmButtonRemove} />,
        dialogTitle: `${headLineTxtMsg.toUpperCase()} MEMBER`,
        headlineText: <M {...m.headlineTextRemove} />,
        headlineTitle: this.props.fullName,
        value,
      },
    });
  };

  onRequestSuccess = () => {
    this.setState({
      dialogProp: {
        open: false,
      },
    });
  };

  onDeactivateSuccess = (res, payload) => {
    const allActivatedIds = Object.assign(this.props.allActivatedIds, []);
    const index = allActivatedIds.findIndex(o => o === payload.userId);
    allActivatedIds.splice(index, 1);
    this.props.resaga.setValue({
      activated: allActivatedIds,
    });
    this.onDialogClose();
  };

  onActiveSuccess = (res, payload) => {
    const allActivatedIds = this.props.allActivatedIds;
    const newArray = [...allActivatedIds, payload.userId];
    this.props.resaga.setValue({
      activated: newArray,
    });
    this.onDialogClose();
  };

  onConfirmDialog = () => {
    switch (this.state.dialogProp.requestType) {
      case ORGANISATION_ACTION_VARIANT.REMOVE: {
        this.deleteMember();
        break;
      }
      case ORGANISATION_ACTION_VARIANT.ACTIVATE: {
        this.activateDeactivate(this.state.dialogProp.value);
        break;
      }
      default:
        break;
    }
  };

  deleteMember = () => {
    const { orgId, id } = this.props;
    // this.state.changingRole = true;
    return this.props.resaga.dispatchTo(ORGANISATION_API, DELETE_ORG_MEMBER, {
      payload: {
        id: orgId,
        userId: id,
      },
      onSuccess: this.onRequestSuccess,
      onError: this.onRequestSuccess,
    });
  };

  changeRoleError = () => {
    this.state.changingRole = false;
    this.state.changeRoleFailed = true;
    SnackbarHelpers.openErrorSnackbar('Role change failed!', this.props.resaga);
  };

  changeRoleSuccess = () => {
    this.state.changingRole = false;
    this.state.changeRoleFailed = false;
    SnackbarHelpers.openSuccessSnackbar(
      'The role has been changed successfully.',
      this.props.resaga,
    );
  };

  changeRole = newRole => {
    const { orgId, id, role } = this.props;
    this.state.changingRole = true;
    if (newRole && newRole !== role) {
      return this.props.resaga.dispatchTo(ORGANISATION_API, UPDATE_ORG_ROLE, {
        payload: {
          id: orgId,
          userId: id,
          role: newRole,
        },
        onSuccess: this.changeRoleSuccess,
        onError: this.changeRoleError,
      });
    }
    return DO_NOTHING;
  };

  activateDeactivate = value => {
    const { orgId, id } = this.props;
    // this.state.changingRole = true;
    return this.props.resaga.dispatchTo(ORGANISATION_API, UPDATE_ORG_MEMBER, {
      payload: {
        id: orgId,
        userId: id,
        activated: value,
      },
      onSuccess: !value ? this.onDeactivateSuccess : this.onActiveSuccess,
      onError: this.onDialogClose,
    });
  };

  isEditable = userId => {
    const canInvite = ability.can('execute', ORG_USER);
    return this.props.me !== userId && this.props.role !== OWNER && canInvite;
  };

  renderLastCell = item => (
    <TableCellActions
      id={item.id}
      onDeleteItem={this.onDelete}
      onActivate={this.onActivateDeactivate}
      onDeactivate={this.onActivateDeactivate}
      active={this.props.activated}
    />
  );

  renderRole = () => {
    const { id, role } = this.props;
    let variant = this.isEditable(id)
      ? ORG_FIELD_VARIANTS.TEXT_FIELD
      : ORG_FIELD_VARIANTS.TEXT_ONLY;
    if (role === OWNER) variant = ORG_FIELD_VARIANTS.TEXT_OWNER;
    return <Role id={id} variant={variant} changeRole={this.changeRole} />;
  };

  renderRows = () => {
    const { id, classes, isMobile } = this.props;
    if (isMobile) {
      return this.renderRowsMobile();
    }
    const item = {
      id,
    };
    return (
      <TableRow>
        <TableCell classes={classes}>
          <KnownAs
            variant={VARIANTS.STRING_ONLY}
            id={id}
            className={classes.roleItemsKnownAsEllipsis}
            breakWord={false}
          />
        </TableCell>
        <TableCell padding="halfLeftRight">
          <Email id={id} variant={VIEW_MODE_COPY} isEllipsis />
        </TableCell>
        <TableCell padding="halfLeftRight">
          <CreatedDate id={id} />
        </TableCell>
        <TableCell padding="halfLeftRight">
          <LastSeenDate id={id} />
        </TableCell>
        <TableCell padding="halfLeftRight">
          <Activated id={id} />
        </TableCell>
        <TableCell centeredText padding="halfLeftRight">
          {this.renderRole()}
        </TableCell>
        {this.isEditable(id) ? this.renderLastCell(item) : <TableCell />}
        {this.renderDialog()}
      </TableRow>
    );
  };

  renderRowsMobile = () => {
    const { id, classes } = this.props;
    const item = {
      id,
    };
    return (
      <TableRow>
        <TableCell padding="halfLeftRight">
          <GridContainer direction="column" justify="flex-start" spacing={0}>
            <GridItem>
              <GridContainer direction="row">
                <GridItem>
                  <KnownAs
                    variant={VARIANTS.STRING_ONLY}
                    id={id}
                    className={classes.roleItemsKnownAsEllipsisMobile}
                    breakWord={false}
                    isTooltip
                  />
                </GridItem>
                <GridItem>
                  <Activated id={id} />
                </GridItem>
              </GridContainer>
            </GridItem>
            <GridItem>
              <Email id={id} variant={VIEW_MODE_COPY} isEllipsis isTooltip />
            </GridItem>
            <GridItem>
              <CreatedDate id={id} isTableMobile />
            </GridItem>
            <GridItem>
              <LastSeenDate id={id} isTableMobile />
            </GridItem>
          </GridContainer>
        </TableCell>
        <TableCell padding="halfLeftRight" centeredText>
          {this.renderRole()}
        </TableCell>
        {this.isEditable(id) ? this.renderLastCell(item) : <TableCell />}
        {this.renderDialog()}
      </TableRow>
    );
  };

  renderDefault = () => this.renderRows();

  renderDialog = () => {
    const dialogProps = this.state.dialogProp;
    return (
      <Dialog
        confirmFunc={this.onConfirmDialog}
        cancelFunc={this.onDialogClose}
        disabled={false}
        {...dialogProps}
      />
    );
  };

  render = () => {
    const { variant } = this.props;
    return LOGIC_HELPERS.switchCase(variant, {
      [ORGANISATION_ROLES_VARIANT.TABLE]: this.renderRows,
      [DEFAULT]: this.renderDefault,
    });
  };
}

RoleItems.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  // parent props
  id: PropTypes.number,
  orgId: PropTypes.number,
  variant: PropTypes.string,
  me: PropTypes.number,
  activated: PropTypes.bool,
  ownerId: PropTypes.number,
  // resaga props
  fullName: PropTypes.string,
  role: PropTypes.string,
  showInactive: PropTypes.bool,
  isMobile: PropTypes.bool,
  allActivatedIds: PropTypes.array,
};

RoleItems.defaultProps = {
  id: 0,
  variant: '',
  orgId: 0,
  me: 0,
  activated: false,
  fullName: '',
  role: '',
  ownerId: 0,
  showInactive: false,
  isMobile: false,
};

export default compose(
  withStyles(styles, { name: 'RoleItems' }),
  resaga(CONFIG),
)(RoleItems);
