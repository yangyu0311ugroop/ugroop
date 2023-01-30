import { DEFAULT, PENDING, TEXT } from 'appConstants';
import { ORGANISATION_API, RESEND_INVITATION } from 'apis/constants';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import {
  CANCELED,
  ORG_ROLES,
  EXCLUDED_ORG_ROLES,
} from 'datastore/invitationStore/constants';
import { InlineRadioGroup } from 'ugcomponents/Inputs/index';
import { injectIntl } from 'react-intl';
import { omit, findKey } from 'lodash';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import Button from 'viewComponents/Button';
import { H1, P, H5 } from 'viewComponents/Typography';
import { ORG_FIELD_VARIANTS } from 'smartComponents/Organisation/constants';
import SnackbarHelpers from 'ugcomponents/SnackBar/helpers';
import { ORGANISATION_HELPER } from 'datastore/orgStore/helpers/orgHelper';
import Hidden from '@material-ui/core/Hidden';
import momentHelpers from 'utils/helpers/moment';
import m from './messages';
import { CONFIG } from './config';
import styles from './styles';
import { ORG_FORM_NAME } from './constants';

export class Role extends PureComponent {
  state = {
    resend: false,
    resendSuccess: false,
  };

  getInputLabelProps = {
    shrink: true,
  };

  getStrippedOwnProps = () =>
    omit(this.props, [
      'resaga',
      'role',
      'id',
      'classes',
      'inviteStatus',
      'changeRole',
      'inviteRole',
      'changingRole',
      'changeRoleFailed',
    ]);

  resendInvitation = token => () => {
    this.props.resaga.dispatchTo(ORGANISATION_API, RESEND_INVITATION, {
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

  renderEditable = () => {
    const { classes, role, changingRole, changeRoleFailed } = this.props;
    const assignableRole = ORGANISATION_HELPER.getAssignableRole();
    const assignSameRole = findKey(
      assignableRole,
      o => o.toLowerCase() === role,
    );
    return LOGIC_HELPERS.ifElse(
      assignSameRole,
      <InlineRadioGroup
        loading={changingRole}
        showSaved={!changeRoleFailed}
        highlightSelected
        required
        autoClose
        color="primary"
        name={ORG_FORM_NAME}
        label={m.editLabel.defaultMessage}
        tooltip={m.tooltipLabel.defaultMessage}
        valueLabel=""
        value={role}
        options={assignableRole}
        className={classes.newTourRole}
        onChange={this.props.changeRole}
        excludeOptions={EXCLUDED_ORG_ROLES}
      />,
      this.renderTextOnly(),
    );
  };

  renderEditing = () => {
    const { classes, role, disableEditing } = this.props;
    const assignableRole = ORGANISATION_HELPER.getAssignableRole();
    return (
      <InlineRadioGroup
        required
        name="role"
        label="Select role"
        valueLabel="Their role in this org will be"
        value={role}
        options={assignableRole}
        className={classes.newTourRole}
        disabled={disableEditing}
        excludeOptions={EXCLUDED_ORG_ROLES}
      />
    );
  };

  renderInvitationStatus = () => {
    const { classes, inviteStatus, token } = this.props;
    const { resend } = this.state;

    if (inviteStatus !== PENDING) {
      return null;
    }
    return (
      <span>
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
            className={classes.button}
            onClick={this.resendInvitation(token)}
          >
            Resend invitation
          </Button>
        )}
      </span>
    );
  };

  renderCanceled = () => {
    const { classes, inviteStatus } = this.props;

    if (inviteStatus !== CANCELED) {
      return null;
    }

    return (
      <span>
        <Button
          dense
          size="small"
          color="alert"
          variant="outline"
          className={classes.disabledBtn}
        >
          Invitation cancelled
        </Button>
      </span>
    );
  };

  renderTextOnly = () => {
    const { classes } = this.props;
    return (
      <div className={classes.textOnly}>
        <P {...this.getStrippedOwnProps()}>{this.renderText()}</P>
      </div>
    );
  };

  renderTextWithlabel = () => {
    const { classes, role, id } = this.props;
    if (!role) return '';
    const content = (
      <div className={classes.withLabel}>
        <H5 noMargin className={classes.roleLabel}>
          {' '}
          {m.orgLabel.defaultMessage}{' '}
        </H5>
        <H5 noMargin className={classes.textLabel} data-testId={`orgRole${id}`}>
          {' '}
          {this.renderText()}{' '}
        </H5>
      </div>
    );
    return content;
  };

  renderText = () => {
    const { role, inviteRole } = this.props;

    return ORG_ROLES[role || inviteRole] || '';
  };

  renderOwner = () => {
    const { classes } = this.props;
    return (
      <div className={classes.textOnly}>
        <P {...this.getStrippedOwnProps()}>Owner</P>
      </div>
    );
  };

  renderDefault = () => {
    const { classes, role } = this.props;
    return (
      <React.Fragment>
        <div className={classes.lineIndicator} />
        <H1 className={classes.name} noMargin {...this.getStrippedOwnProps()}>
          {role}
        </H1>
      </React.Fragment>
    );
  };

  renderReadonly = () => {
    const { classes } = this.props;

    return (
      <div className={classes.readOnly}>
        <span className={classes.existOrgRole}>{this.renderText()}</span>
        <Hidden smDown>{this.renderInvitationStatus()}</Hidden>
        <Hidden smDown>{this.renderCanceled()}</Hidden>
      </div>
    );
  };

  render = () => {
    const { variant } = this.props;
    return LOGIC_HELPERS.switchCase(variant, {
      [ORG_FIELD_VARIANTS.TEXT_ONLY]: this.renderTextOnly,
      [ORG_FIELD_VARIANTS.TEXT_FIELD]: this.renderEditable,
      [ORG_FIELD_VARIANTS.TEXT_EDITING]: this.renderEditing,
      [ORG_FIELD_VARIANTS.TEXT_READ_ONLY]: this.renderReadonly,
      [ORG_FIELD_VARIANTS.TEXT_OWNER]: this.renderOwner,
      [ORG_FIELD_VARIANTS.TEXT_WITH_LABEL]: this.renderTextWithlabel(),
      [TEXT]: this.renderText,
      [DEFAULT]: this.renderDefault,
    });
  };
}

Role.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
  // parent props
  id: PropTypes.number,
  variant: PropTypes.string,
  changeRole: PropTypes.func,
  changingRole: PropTypes.bool,
  changeRoleFailed: PropTypes.bool,
  token: PropTypes.string,
  disableEditing: PropTypes.bool,

  // resaga props
  role: PropTypes.string,
  inviteRole: PropTypes.string,
  inviteStatus: PropTypes.string,
};

Role.defaultProps = {
  variant: ORG_FIELD_VARIANTS.TEXT_ONLY,
  changingRole: false,
  changeRoleFailed: false,
  role: '',
  token: '',
  inviteRole: null,
  inviteStatus: '',
  id: 0,
  disableEditing: false,
};

export default compose(
  injectIntl,
  withStyles(styles, { name: 'Role' }),
  resaga(CONFIG),
)(Role);
