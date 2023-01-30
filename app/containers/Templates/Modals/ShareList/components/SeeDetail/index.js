import { ability } from 'apis/components/Ability/ability';
import { Hidden } from '@material-ui/core';
import {
  CANCEL_INVITATION,
  INVITATION_API,
  ORGANISATION_API,
  RESEND_INVITATION,
} from 'apis/constants';
import SnackbarHelpers from 'ugcomponents/SnackBar/helpers';
import { PENDING, CANCELLED, TEXT, DEFAULT } from 'appConstants';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { helpers } from 'datastore/userStore/helpers';
import Dialog from 'ugcomponents/Dialog';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { moment } from 'utils';
import resaga from 'resaga';
import Button from 'viewComponents/Button';
import Icon from 'ugcomponents/Icon';
import { Name } from 'ugcomponents/Person';
import { NODE_SHARE } from 'utils/modelConstants';
import momentHelpers from 'utils/helpers/moment';
import { StyledSimpleRTE } from 'ugcomponents/Inputs';
import { FormattedMessage as M } from 'react-intl';
import { isEmptyRTE } from 'utils/helpers/RTE';
import { CONFIG, SEE_DETAIL_CONFIG } from './config';
import styles from './styles';
import m from './messages';

export class SeeDetail extends PureComponent {
  state = {
    resend: false,
    closing: false,
  };

  onClose = () => {
    // prevents dialog flickering
    this.setState({ closing: true });
    setTimeout(this.handleClose, 500);
  };

  handleClose = () => {
    this.setState({ resend: false, closing: false });
    const object = {
      seeDetail: null,
      fromOrg: false,
    };
    this.props.resaga.setValue(object);
  };

  cancelInvitation = () => {
    const { seeDetail, fromOrg } = this.props;
    this.props.resaga.dispatchTo(
      !fromOrg ? INVITATION_API : ORGANISATION_API,
      CANCEL_INVITATION,
      {
        payload: { token: seeDetail },
        onSuccess: this.handleClose,
      },
    );
  };

  resend = () => {
    const { seeDetail, fromOrg } = this.props;
    this.props.resaga.dispatchTo(
      !fromOrg ? INVITATION_API : ORGANISATION_API,
      RESEND_INVITATION,
      {
        payload: { token: seeDetail },
        onSuccess: this.resendInvitationSuccess,
        onError: this.resendInvitationError,
      },
    );
  };

  resendInvitationSuccess = () => {
    const { userId } = this.props;
    this.setState({ resend: true });
    this.props.resaga.setValue({
      updatedAt: momentHelpers.getDateToday(true),
      resendUserId: userId,
    });
  };

  resendInvitationError = () => {
    SnackbarHelpers.openErrorSnackbar(
      'Resend invitation failed. Please reload the page and try again',
      this.props.resaga,
    );
  };

  analyseTime = time => {
    const format = moment.renderDayDateTimeSeconds(time);
    const fromNow = moment.renderFromNow(time);

    return { format, fromNow };
  };

  renderStatusButton = (text, className, color) => () => (
    <Button
      variant="outline"
      className={className}
      noMargin
      disableRipple
      color={color}
    >
      {text}
    </Button>
  );

  renderStatus = () => {
    const { resend } = this.state;
    const { classes, status } = this.props;

    if (resend) {
      return this.renderStatusButton(
        'Invitation Sent!',
        classes.acceptedStatus,
        'primary',
      )();
    }

    return LOGIC_HELPERS.switchCase(status, {
      [PENDING]: this.renderStatusButton('Pending', classes.pendingStatus),
      [CANCELLED]: this.renderStatusButton(
        'Invitation Cancelled',
        classes.cancelledStatus,
        'alert',
      ),
      [DEFAULT]: this.renderStatusButton(
        'Invitation Accepted',
        classes.acceptedStatus,
        'primary',
      ),
    });
  };

  renderInvitationDetail = button => {
    const {
      classes,
      createdAt,
      updatedAt,
      shareFrom,
      role,
      organisationName,
      inviteToOrganisation,
      resendUserId,
      personalMessage,
    } = this.props;
    const { format, fromNow } = this.analyseTime(updatedAt || createdAt);
    const translatedRole = helpers.translateRole(role);

    const orgName = LOGIC_HELPERS.ifElse(
      inviteToOrganisation,
      organisationName,
      'Another Organisation',
    );

    return (
      <React.Fragment>
        <GridContainer direction="column" className={classes.headlineContent}>
          <GridItem>
            <GridContainer direction="row">
              <GridItem>
                <M {...m.invitationSentLabel} />
              </GridItem>
              <GridItem>
                <Icon
                  icon="calendar-full"
                  size="small"
                  className={classes.icon}
                />
                <strong>
                  <Tooltip placement="top" title={format}>
                    <span className={classes.fromNow}>{fromNow}</span>
                  </Tooltip>
                </strong>
              </GridItem>
              <GridItem>
                <M {...m.byText} />
              </GridItem>
              <GridItem>
                <Icon icon="user" size="small" className={classes.icon} />
                <Name id={!resendUserId ? shareFrom : resendUserId} />
              </GridItem>
            </GridContainer>
          </GridItem>
          <GridItem>
            <M {...m.tourRoleLabel} />
            <Icon icon="file-preview" size="small" className={classes.icon} />
            <strong>{translatedRole}</strong>
          </GridItem>
          {!isEmptyRTE(personalMessage) && (
            <GridItem>
              <GridContainer direction="column" spacing={0}>
                <GridItem>
                  <M {...m.personalMessageLabel} />
                </GridItem>
                <GridItem className={classes.personalMessage}>
                  <StyledSimpleRTE readOnly value={personalMessage} />
                </GridItem>
              </GridContainer>
            </GridItem>
          )}
          {inviteToOrganisation && (
            <GridItem>
              <M {...m.organisationLabel} />
              <Icon icon="users-plus" size="small" className={classes.icon} />
              <strong>{orgName}</strong>
            </GridItem>
          )}
          <GridItem>{this.renderStatus()}</GridItem>
        </GridContainer>
        {button ? <hr className={classes.Hr} /> : null}
      </React.Fragment>
    );
  };

  renderDialogButtons = () => {
    const { status } = this.props;
    const { resend } = this.state;

    let template = 'custom';
    let confirmButton = (
      <span>
        <Hidden smDown>
          <Icon icon="refresh" size="small" />
        </Hidden>

        <M {...m.reSendInvitationText} />
      </span>
    );
    let confirmFunc = this.resend;
    const cancelFunc = this.cancelInvitation;
    const cancelButton = 'Cancel Invitation';
    const canResend = ability.can('create', NODE_SHARE);
    const canDelete = ability.can('delete', NODE_SHARE);
    let button = LOGIC_HELPERS.ifElse(canResend, 2, 1);
    button = LOGIC_HELPERS.ifElse(status === PENDING, button, 0);

    if (button === 1) {
      template = 'delete';
      confirmFunc = cancelFunc;
      confirmButton = cancelButton;
    } else if (button === 0) {
      template = 'delete';
    }

    if (resend) {
      template = 'confirm';
      button = 0;
    } else if (!canDelete) {
      template = 'custom';
      button = 0;
    }

    return {
      template,
      button,
      confirmButton,
      confirmFunc,
      cancelButton,
      cancelFunc,
    };
  };

  renderSubTitle = () => {
    const { classes, shareTo, shareToUserId, email } = this.props;
    const defaultName = shareTo || email;
    return shareToUserId ? (
      <div className={classes.subTitle}>{defaultName}</div>
    ) : (
      ''
    );
  };

  renderInvitee = () => {
    const { classes, shareFrom, shareTo, shareToUserId, email } = this.props;

    if (!shareFrom) return null;

    const { content, headline } = classes;
    const { button, ...buttonProps } = this.renderDialogButtons();
    const customClassnames = {
      headline,
      content: classNames(button && content),
    };

    const headlineText = this.renderInvitationDetail(button);
    const defaultName = shareTo || email;

    const headlineTitle = shareToUserId ? (
      <>
        <Name id={shareToUserId} email={shareTo} variant={TEXT} />
        {this.renderSubTitle()}
      </>
    ) : (
      defaultName
    );

    return {
      headlineTitle,
      headlineText,
      customClassnames,
      button,
      ...buttonProps,
    };
  };

  render = () => {
    const { closing } = this.state;
    const { seeDetail, isLoading } = this.props;
    const content = this.renderInvitee();

    return (
      <Dialog
        open={!closing && !!seeDetail}
        headlineIcon="ug-invitation-detail"
        dialogTitle="Invitation Dialog"
        onCloseFunc={this.onClose}
        disabled={isLoading}
        {...content}
      />
    );
  };
}

SeeDetail.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  seeDetail: PropTypes.string,
  email: PropTypes.string,

  // resaga props
  shareFrom: PropTypes.number,
  shareTo: PropTypes.string,
  shareToUserId: PropTypes.number,
  userId: PropTypes.number,
  resendUserId: PropTypes.number,
  createdAt: PropTypes.string,
  updatedAt: PropTypes.string,
  organisationName: PropTypes.string,
  inviteToOrganisation: PropTypes.bool,
  role: PropTypes.string,
  status: PropTypes.string,
  fromOrg: PropTypes.bool,
  isLoading: PropTypes.bool,
  templateId: PropTypes.number,
  personalMessage: PropTypes.string,
};

SeeDetail.defaultProps = {
  shareFrom: 0,
  shareTo: null,
  shareToUserId: null,
  seeDetail: '',
  createdAt: '',
  updatedAt: '',
  role: '',
  status: '',
  fromOrg: false,
  organisationName: '',
  inviteToOrganisation: false,
  personalMessage: '',
};

export default compose(
  withStyles(styles, { name: 'SeeDetail' }),
  resaga(SEE_DETAIL_CONFIG),
  resaga(CONFIG),
)(SeeDetail);
