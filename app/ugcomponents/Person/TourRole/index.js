import { Can } from 'apis/components/Ability/components/Can';
import {
  CHANGE_ROLE,
  INVITATION_API,
  RESEND_INVITATION,
  TEMPLATE_API,
} from 'apis/constants';
import { DO_NOTHING, OWNER, PENDING } from 'appConstants';
import classnames from 'classnames';
import {
  CANCELED,
  TOUR_ROLES,
  TOUR_CONTRIBUTOR_ROLES,
} from 'datastore/invitationStore/constants';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import Button from 'viewComponents/Button';
import { NODE_SHARE } from 'utils/modelConstants';
import SnackbarHelpers from 'ugcomponents/SnackBar/helpers';
import { Hidden } from '@material-ui/core';
import momentHelpers from 'utils/helpers/moment';
import { CONFIG } from './config';
import style from './style';
import RoleSelection from './roleSelection';

export class TourRole extends PureComponent {
  state = {
    resend: false,
    resendSuccess: false,
    changingRole: false,
    changeRoleFailed: false,
  };

  componentWillMount = () => {
    this.tourOptions = TOUR_CONTRIBUTOR_ROLES;
  };

  resendInvitation = token => () => {
    this.props.resaga.dispatchTo(INVITATION_API, RESEND_INVITATION, {
      payload: { token },
      onSuccess: this.resendInvitationSuccess,
      onError: this.resendInvitationError,
    });
  };

  resendInvitationSuccess = () => {
    this.setState({ resend: true, resendSuccess: true });
    this.props.resaga.setValue({ updatedAt: momentHelpers.getDateToday(true) });
  };

  resendInvitationError = () => {
    this.setState({ resend: true, resendSuccess: false });
    SnackbarHelpers.openErrorSnackbar(
      'Resend invitation failed. Please reload the page and try again',
      this.props.resaga,
    );
  };

  shouldRenderStatus = () => {
    const { status, role } = this.props;

    return role !== OWNER && (status === PENDING || status === CANCELED);
  };

  changeRole = newRole => {
    const { templateId, userId, role } = this.props;

    if (newRole && role !== newRole) {
      this.setState({ changingRole: true });
      return this.props.resaga.dispatchTo(TEMPLATE_API, CHANGE_ROLE, {
        payload: {
          id: templateId,
          userId,
          role: newRole,
        },
        onSuccess: this.changeRoleSuccess,
        onError: this.changeRoleError,
      });
    }

    return DO_NOTHING;
  };

  changeRoleSuccess = () => {
    this.setState({ changingRole: false, changeRoleFailed: false });
  };

  changeRoleError = error => {
    this.setState({ changingRole: false, changeRoleFailed: error });
  };

  renderInvitationStatus = () => {
    const { classes, token, status } = this.props;
    const { resend } = this.state;

    if (status !== PENDING) {
      return null;
    }

    return (
      <span>
        <Can do="create" on={NODE_SHARE}>
          {resend ? (
            <Button
              dense
              color="gray"
              size="extraSmall"
              variant="outline"
              className={
                this.state.resendSuccess
                  ? classes.disabledBtn
                  : classes.failedDisabledBtn
              }
            >
              {this.state.resendSuccess
                ? 'Invitation sent!'
                : 'Resend invitation failed!'}
            </Button>
          ) : (
            <Button
              dense
              size="extraSmall"
              color="primary"
              variant="outline"
              onClick={this.resendInvitation(token)}
              className={classes.button}
            >
              Resend invitation
            </Button>
          )}
        </Can>
      </span>
    );
  };

  renderCanceled = () => {
    const { classes, status } = this.props;

    if (status !== CANCELED) {
      return null;
    }

    return (
      <span>
        <Button
          dense
          size="extraSmall"
          color="alert"
          variant="outline"
          className={classes.disabledBtn}
        >
          Invitation cancelled
        </Button>
      </span>
    );
  };

  renderEditing = () => {
    const { role, editingLabel, templateId } = this.props;
    return (
      <RoleSelection
        editable={false}
        editingLabel={editingLabel}
        role={role}
        templateId={templateId}
      />
    );
  };

  renderEditable = () => {
    const { role, editableLabel, templateId } = this.props;
    const { changingRole, changeRoleFailed } = this.state;
    return (
      <RoleSelection
        editable
        editableLabel={editableLabel}
        changingRole={changingRole}
        changeRoleFailed={changeRoleFailed}
        role={role}
        templateId={templateId}
        changeRole={this.changeRole}
      />
    );
  };

  renderReadonly = () => {
    const { classes, role, showStatus, token } = this.props;

    const shouldRenderStatus = this.shouldRenderStatus();

    const pendingLabel = shouldRenderStatus && 'As';
    const content = (
      <div
        className={classnames(
          classes.readOnly,
          !showStatus && classes.minimise,
        )}
      >
        {showStatus && pendingLabel}
        {showStatus && (
          <span className={classes.existTourRole}>
            &nbsp;
            {TOUR_ROLES[role] || TOUR_ROLES.tour_owner}
          </span>
        )}
        {this.renderInvitationStatus()}
        {this.renderCanceled()}
      </div>
    );
    if (!token) {
      return content;
    }
    return <Hidden smDown>{content}</Hidden>;
  };

  render = () => {
    const { classes, className, role, editable } = this.props;
    let content;

    if (editable) {
      content = this.renderEditable();
    } else if (role) {
      content = this.renderReadonly();
    } else {
      content = this.renderEditing();
    }

    return (
      <span className={classnames(classes.root, className)}>{content}</span>
    );
  };
}

TourRole.propTypes = {
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // from parent
  userId: PropTypes.number, // user id
  token: PropTypes.string,
  className: PropTypes.string,
  editable: PropTypes.bool,
  templateId: PropTypes.number, // template id
  editingLabel: PropTypes.string,
  showStatus: PropTypes.bool,
  editableLabel: PropTypes.string,

  // from resaga
  role: PropTypes.string,
  status: PropTypes.string,
};

TourRole.defaultProps = {
  userId: 0,
  token: '',
  className: '',
  editable: false,
  templateId: 0,
  role: '',
  status: '',
  editingLabel: 'Select contributor role',
  showStatus: true,
  editableLabel: 'Change role',
};

export default compose(
  withStyles(style, { name: 'TourRole' }),
  resaga(CONFIG),
)(TourRole);
