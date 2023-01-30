import {
  CANCEL_INVITATION,
  INVITATION_API,
  RESEND_INVITATION,
} from 'apis/constants';
import classnames from 'classnames';
import GridContainer from 'components/GridContainer/index';
import GridItem from 'components/GridItem/index';
import {
  CANCELED,
  CONFIRMED,
  DECLINED,
  PENDING,
} from 'datastore/invitationStore/constants';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';
import { P } from 'viewComponents/Typography';
import Button from 'ugcomponents/Buttons/Button/index';
import Form from 'ugcomponents/Form';
import UIKitButton from 'viewComponents/Button';
import { Avatar, Name, TourRoleByKey } from 'ugcomponents/Person';
import NodeContent from '../NodeContent';
import PersonalMessage from '../PersonalMessage';
import ResponseMessage from '../ResponseMessage';
import { CONFIG } from './config';
import styles from './styles';

export class Sent extends PureComponent {
  state = {
    resend: false,
  };

  cancelInvitation = token => () => {
    this.props.resaga.dispatchTo(INVITATION_API, CANCEL_INVITATION, {
      payload: { token },
    });
  };

  resendInvitation = token => () => {
    this.props.resaga.dispatchTo(INVITATION_API, RESEND_INVITATION, {
      payload: { token },
      onSuccess: this.resendInvitationSuccess,
    });
  };

  resendInvitationSuccess = () => {
    this.setState({ resend: true });
  };

  renderConfirmedButtons = () => {
    const { classes } = this.props;

    return (
      <GridItem>
        <GridContainer alignItems="center" spacing={0}>
          <GridItem>
            <div className={classes.buttons}>
              <Button outline="outLineGreen" dense size="small" disabled>
                Invitation accepted
              </Button>
            </div>
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };

  renderDeclinedButtons = () => {
    const { classes } = this.props;

    return (
      <GridItem>
        <GridContainer alignItems="center" spacing={0}>
          <GridItem>
            <div className={classes.buttons}>
              <Button outline="outLineRed" dense size="small" disabled>
                Invitation declined
              </Button>
            </div>
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };

  renderCanceledButtons = () => {
    const { classes } = this.props;

    return (
      <GridItem>
        <GridContainer alignItems="center" spacing={0}>
          <GridItem>
            <div className={classes.buttons}>
              <Button outline="outLineRed" dense size="small" disabled>
                Invitation cancelled
              </Button>
            </div>
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };

  renderPendingButtons = () => {
    const { classes, token } = this.props;
    const { resend } = this.state;

    return (
      <GridItem>
        <GridContainer alignItems="center" spacing={0}>
          <GridItem xs={12}>
            <div className={classes.pendingButtons}>
              <UIKitButton
                size="small"
                className={classes.declineConfirmBtn}
                onClick={this.resendInvitation(token)}
                disabled={resend}
                noMargin
              >
                {resend ? 'Invitation sent!' : 'Resend the invitation'}
              </UIKitButton>
              <UIKitButton
                size="small"
                variant="outline"
                color="black"
                noMargin
                onClick={this.cancelInvitation(token)}
              >
                Cancel the invitation
              </UIKitButton>
            </div>
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };

  renderButtons = isPending => {
    const { status } = this.props;

    if (!isPending && status === PENDING) {
      return null;
    }

    if (isPending && status !== PENDING) {
      return null;
    }

    switch (status) {
      case CONFIRMED:
        return this.renderConfirmedButtons();
      case DECLINED:
        return this.renderDeclinedButtons();
      case CANCELED:
        return this.renderCanceledButtons();
      case PENDING:
        return this.renderPendingButtons();
      default:
        return null;
    }
  };

  renderAvatar = () => {
    const { shareToUserId } = this.props;

    if (!shareToUserId) {
      return null;
    }

    return (
      <GridItem>
        <Avatar sm userId={shareToUserId} />
      </GridItem>
    );
  };

  renderPersonalMessage = () => {
    const { personalMessage } = this.props;
    if (!personalMessage) {
      return '.'; // full stop
    }

    return ' with a personal message:';
  };

  renderResponseMessage = () => {
    const { content } = this.props;

    return <ResponseMessage content={content} />;
  };

  renderTourOrg = () => {
    const { organisationName } = this.props;
    if (!organisationName) return null;
    return (
      <React.Fragment>
        {' '}
        from <strong>{organisationName}</strong>
      </React.Fragment>
    );
  };

  render = () => {
    const {
      classes,
      nodeId,
      shareTo,
      shareToUserId,
      role,
      personalMessage,
    } = this.props;

    return (
      <Form>
        <GridContainer>
          {this.renderAvatar()}
          <GridItem
            className={classnames(classes.grow, classes.invitationTitle)}
          >
            <P>
              You invited <Name id={shareToUserId} email={shareTo} /> to connect
              with a tour named <NodeContent nodeId={nodeId} />
              {this.renderTourOrg()} in the role of{' '}
              <TourRoleByKey role={role} />
              {this.renderPersonalMessage()}
            </P>
            {this.renderResponseMessage()}
          </GridItem>
        </GridContainer>
        <PersonalMessage content={personalMessage} />
        {this.renderButtons()}
        {this.renderButtons(true)}
      </Form>
    );
  };
}

Sent.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  token: PropTypes.string.isRequired,

  // resaga props
  shareTo: PropTypes.string, // email
  shareToUserId: PropTypes.number,
  nodeId: PropTypes.number,
  personalMessage: PropTypes.string,
  organisationName: PropTypes.string,
  status: PropTypes.string,
  content: PropTypes.string,
  role: PropTypes.string,
};

Sent.defaultProps = {
  shareTo: '',
  shareToUserId: 0,
  nodeId: 0,
  personalMessage: '',
  organisationName: '',
  status: '',
  content: '',
  role: '',
};

export default compose(
  withStyles(styles, { name: 'Sent' }),
  resaga(CONFIG),
)(Sent);
