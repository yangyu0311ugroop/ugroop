import {
  CONFIRM_INVITATION,
  DECLINE_INVITATION,
  NODE_SHARE_API,
} from 'apis/constants';
import { URL_HELPERS } from 'appConstants';
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
import { FormattedMessage as M } from 'react-intl';
import Form from 'ugcomponents/Form';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';
import { P } from 'viewComponents/Typography';
import Button from 'ugcomponents/Buttons/Button/index';
import UGLink from 'components/Link';
import UIKitButton from 'viewComponents/Button';
import { Avatar, Name, TourRoleByKey } from 'ugcomponents/Person';
import NodeContent from '../NodeContent';
import PersonalMessage from '../PersonalMessage';
import ResponseMessage from '../ResponseMessage';
import m from './messages';
import { CONFIG } from './config';
import styles from './styles';

export class Received extends PureComponent {
  response = (ACTION, token) => () => {
    const { nodeId, role } = this.props;

    this.props.resaga.dispatchTo(NODE_SHARE_API, ACTION, {
      payload: { token, nodeId, role },
      onSuccess: this.excludeToken,
    });
  };

  excludeToken = (result, payload) => {
    const { token } = payload;

    this.props.resaga.setValue({
      exclusion: RESAGA_HELPERS.concat(token),
    });
  };

  renderConfirmedButtons = () => {
    const { classes, nodeId, target } = this.props;

    return (
      <GridItem>
        <GridContainer
          alignItems="center"
          spacing={0}
          className={classes.buttons}
        >
          <GridItem>
            <Button outline="outLineGreen" dense size="small" disabled>
              Invitation accepted
            </Button>
          </GridItem>
          <GridItem>
            <UGLink
              className={classes.viewTourLnk}
              to={URL_HELPERS.tours(nodeId)}
              target={target}
            >
              <UIKitButton
                color="primary"
                size="extraSmall"
                noMargin
                className={classes.viewTourBtn}
              >
                View
              </UIKitButton>
            </UGLink>
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };

  renderRedButtons = button => {
    const { classes } = this.props;

    return (
      <GridItem className={classes.buttons}>
        <Button outline="outLineRed" dense size="small" disabled>
          {button}
        </Button>
      </GridItem>
    );
  };

  renderPendingButtons = () => {
    const { classes, token } = this.props;

    return (
      <GridItem>
        <div className={classes.pendingButtons}>
          <UIKitButton
            color="primary"
            size="small"
            noMargin
            className={classes.declineConfirmBtn}
            onClick={this.response(CONFIRM_INVITATION, token)}
          >
            <M {...m.confirmInvite} />
          </UIKitButton>
          <UIKitButton
            size="small"
            variant="outline"
            color="black"
            noMargin
            onClick={this.response(DECLINE_INVITATION, token)}
          >
            <M {...m.declineInvite} />
          </UIKitButton>
        </div>
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
        return this.renderRedButtons('Invitation declined');
      case CANCELED:
        return this.renderRedButtons('Invitation cancelled');
      case PENDING:
        return this.renderPendingButtons();
      default:
        return null;
    }
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

  renderOrg = () => {
    const { orgId, nodeOrgId, nodeOrgName } = this.props;

    if (!orgId || !nodeOrgId) return '';

    return (
      <React.Fragment>
        from &nbsp;
        {nodeOrgName}
      </React.Fragment>
    );
  };

  render = () => {
    const {
      classes,
      nodeId,
      shareFromUserId,
      role,
      status,
      personalMessage,
    } = this.props;

    // only able to click the Tour Link when confirmed
    const disabled = status !== CONFIRMED;

    return (
      <Form>
        <GridContainer>
          <GridItem className={classes.avatarGrid}>
            <Avatar sm userId={shareFromUserId} />
          </GridItem>
          <GridItem
            className={classnames(classes.grow, classes.invitationTitle)}
          >
            <P>
              <Name id={shareFromUserId} /> {this.renderOrg()} invited you to
              connect with a tour named{' '}
              <NodeContent disabled={disabled} nodeId={nodeId} /> in the role of{' '}
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

Received.propTypes = {
  // hoc props
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,

  // parent props
  token: PropTypes.string.isRequired,

  // resaga props
  shareFromUserId: PropTypes.number,
  nodeId: PropTypes.number,
  orgId: PropTypes.number,
  status: PropTypes.string,
  personalMessage: PropTypes.string,
  content: PropTypes.string,
  role: PropTypes.string,
  target: PropTypes.string,
  organisationName: PropTypes.string,
  nodeOrgName: PropTypes.string,
  nodeOrgId: PropTypes.number,
};

Received.defaultProps = {
  shareFromUserId: 0,
  nodeId: 0,
  orgId: 0,
  status: '',
  personalMessage: '',
  content: '',
  role: '',
  target: '',
  organisationName: '',
  nodeOrgName: '',
};

export default compose(
  withStyles(styles, { name: 'Received' }),
  resaga(CONFIG),
)(Received);
