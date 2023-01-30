import React from 'react';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import _ from 'lodash';
import { FormattedMessage as M } from 'react-intl';
import resaga from 'resaga';
import { VARIANTS } from 'variantsConstants';
import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { PENDING } from 'datastore/invitationStore/constants';
import { INVITATION_STORE_HOC } from 'datastore/invitationStore/hoc';
import A from 'htmlComponents/A';
import { withStyles } from 'components/material-ui';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import Button from 'viewComponents/Button';
import { H6 } from 'viewComponents/Typography';
import { SimpleRTE } from 'ugcomponents/Inputs';
import { Avatar, Name } from 'ugcomponents/Person';
import { TOUR_CONTRIBUTOR_ROLE_TYPES } from 'apis/components/Ability/roles';
import Form from 'ugcomponents/Form';
import { ADD_INVITE_ERROR_MSG } from 'appConstants';
import JText from 'components/JText';
import { NameUtility } from 'utils/displayNameUtility';
import m from './messages';
import inputs from './inputs';
import { CONFIG } from './config';
import style from './style';
import InviteButton from './buttons';

export class LinkedUserInviteUser extends React.PureComponent {
  state = {
    loading: false,
    error: null,
  };

  componentDidUpdate = prevProps => {
    const { invitationDetailOpen } = this.props;
    if (prevProps.invitationDetailOpen !== invitationDetailOpen) {
      if (invitationDetailOpen) {
        this.disableClickAway();
      } else {
        this.enableClickAway();
      }
    }
  };

  getNamePopoverProps = () => {
    if (!this.NamePopoverProps) {
      this.NamePopoverProps = {
        onEnter: this.handleNamePopoverEnter,
        onExit: this.handleNamePopoverExit,
      };
    }
    return this.NamePopoverProps;
  };

  getUserExists = () => {
    const { linkedUserId } = this.props;
    return !!linkedUserId;
  };

  getUserPending = () => {
    const { shareStatus } = this.props;
    return shareStatus === PENDING;
  };

  getUserHasRole = () => {
    const { userIdsWithRole, linkedUserId } = this.props;
    return userIdsWithRole.includes(linkedUserId);
  };

  getUserConnected = () => {
    const { userIdsConnected, linkedUserId, ownerId } = this.props;
    const trueCondition =
      linkedUserId === ownerId || userIdsConnected.includes(linkedUserId);
    return LOGIC_HELPERS.ifElse(
      linkedUserId === null && ownerId === null,
      false,
      trueCondition,
    );
  };

  getUserNeedsInvitation = () =>
    !this.getUserPending() && !this.getUserConnected();

  getUserNeedsRole = () => this.getUserConnected() && !this.getUserHasRole();

  setLinkedUserMessage = linkedUserMessage => {
    this.props.resaga.setValue({ linkedUserMessage });
  };

  enableClickAway = () => {
    const { onSetClickAway } = this.props;
    onSetClickAway(true);
  };

  disableClickAway = () => {
    const { onSetClickAway } = this.props;
    onSetClickAway(false);
  };

  finish = () => {
    const { onNext } = this.props;
    onNext();
  };

  handleMessageChange = value => {
    const { debounceMs } = this.props;
    if (!this.setLinkedUserMessageDebounce) {
      this.setLinkedUserMessageDebounce = _.debounce(
        this.setLinkedUserMessage,
        debounceMs,
      );
    }
    this.setLinkedUserMessageDebounce(value);
  };

  handleNamePopoverEnter = () => {
    this.disableClickAway();
  };

  handleNamePopoverExit = () => {
    this.enableClickAway();
  };

  handleValidSubmit = ({ model }) => {
    const {
      templateId,
      id,
      role,
      linkeeRole,
      email,
      linkedUserId,
      personEmail,
      firstName,
      lastName,
    } = this.props;

    const subNodes = linkeeRole && { nodeId: id, role: linkeeRole };
    const recipient = LOGIC_HELPERS.ifElse(email === '', personEmail, email);
    const fullName = NameUtility.userDisplayName({
      firstName,
      lastName,
    });

    if (this.getUserNeedsInvitation()) {
      this.setState({ loading: true });
      NODE_API_HELPERS.shareNode(
        {
          id: templateId,
          role,
          shareTo: recipient,
          shareToUserId: linkedUserId,
          fullName,
          subNodes,
          ...model,
          onSuccess: (result, payload) => {
            this.props.resaga.setValue({
              nodeShareSuccess: {
                userId: payload.shareToUserId,
                email: payload.payload.shareTo,
                role: payload.payload.role,
              },
            });
            this.fetchParticipants();
          }, // this.handleShareNodeSuccess,
          onError: this.handleShareNodeError,
        },
        this.props,
      );
    }

    if (this.getUserNeedsRole()) {
      this.setState({ loading: true });
      TEMPLATE_API_HELPERS.addRole(
        {
          id: templateId,
          userId: linkedUserId,
          role,
          subNodes,
          ...model,
          onSuccess: this.handleAddRoleSuccess,
          onError: this.handleAddRoleError,
        },
        this.props,
      );
    }
  };

  fetchParticipants = () => {
    const { templateId, id } = this.props;
    const ids = [id];
    TEMPLATE_API_HELPERS.getParticipants(
      { id: templateId, ids, onSuccess: this.handleShareNodeSuccess },
      this.props,
    );
  };

  handleShareNodeSuccess = () => {
    this.setState({ loading: false });
    this.props.resaga.setValue({
      linkedUserEmail: null,
    });
    this.finish();
  };

  handleShareNodeError = () => {
    const { firstName, lastName } = this.props;
    const fullname = `${firstName} ${lastName}`;
    const message = `${fullname} ${ADD_INVITE_ERROR_MSG}`;
    this.setState({ loading: false, error: message });
  };

  handleAddRoleSuccess = () => {
    this.setState({ loading: false });
    this.props.resaga.setValue({
      linkedUserEmail: null,
    });
    this.finish();
  };

  handleAddRoleError = () => {
    this.setState({ loading: false });
  };

  handleInvitationDetailsClick = e => {
    const { linkedUserToken } = this.props;
    e.preventDefault();
    this.props.resaga.setValue({ invitationDetailOpen: linkedUserToken });
  };

  renderUser = () => {
    const { classes, linkedUserId, email } = this.props;
    return (
      <GridItem>
        <GridContainer alignItems="center" wrap="nowrap">
          {!!linkedUserId && (
            <GridItem>
              <Avatar sm userId={linkedUserId} />
            </GridItem>
          )}
          <GridItem className={classes.userItem}>
            <GridContainer direction="column">
              <GridItem
                className={
                  this.getUserExists() ? classes.nameContainer : classes.root
                }
              >
                <Name
                  id={linkedUserId}
                  email={email}
                  PopoverProps={this.getNamePopoverProps()}
                />
              </GridItem>
              <GridItem className={classes.statusContainer}>
                <span className={classes.userStatus}>
                  {this.renderStatus()}
                </span>
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
      </GridItem>
    );
  };

  renderStatus = () => {
    if (this.getUserExists()) {
      return 'REGISTERED USER';
    }

    return null;
  };

  renderUninvited = () => {
    const { firstName, classes } = this.props;
    return this.getUserExists() ? (
      <GridItem>
        <H6 dense>
          <M {...m.found} />
        </H6>
      </GridItem>
    ) : (
      <GridItem>
        <H6 dense className={classes.wrap}>
          {firstName ? (
            <M {...m.notFoundWithName} values={{ firstName }} />
          ) : (
            <M {...m.notFound} />
          )}
        </H6>
      </GridItem>
    );
  };

  renderPendingInvitationButton = () => (
    <A onClick={this.handleInvitationDetailsClick}>
      <M {...m.pendingButtonLabel} />
    </A>
  );

  renderPending = () => {
    const { firstName } = this.props;
    return this.getUserExists() ? (
      <GridItem>
        <H6 dense>
          <M {...m.pendingFound} />
          {this.renderPendingInvitationButton()}
          <M {...m.pendingFoundSuffix} />
        </H6>
      </GridItem>
    ) : (
      <GridItem>
        <H6 dense>
          {firstName ? (
            <React.Fragment>
              <M {...m.pendingNotFoundWithName} values={{ firstName }} />
              {this.renderPendingInvitationButton()}
              <M {...m.pendingNotFoundSuffix} />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <M {...m.pendingNotFound} values={{ firstName }} />
              {this.renderPendingInvitationButton()}
              <M {...m.pendingNotFoundSuffix} />
            </React.Fragment>
          )}
        </H6>
      </GridItem>
    );
  };

  renderHasRole = () => (
    <GridItem>
      <H6 dense>
        <M {...m.hasRole} />
      </H6>
    </GridItem>
  );

  renderConnected = () => (
    <GridItem>
      <H6 dense>
        <M {...m.connected} />
      </H6>
    </GridItem>
  );

  renderSearchResult = () => {
    const { error } = this.state;
    if (error) return null;
    if (this.getUserHasRole()) {
      return this.renderHasRole();
    }

    if (this.getUserConnected()) {
      return this.renderConnected();
    }

    if (this.getUserPending()) {
      return this.renderPending();
    }

    return this.renderUninvited();
  };

  renderMessage = () => {
    const { classes, linkedUserMessage } = this.props;
    const { error } = this.state;
    if (error) return null;
    return (
      this.getUserNeedsInvitation() && (
        <SimpleRTE
          className={classes.message}
          value={linkedUserMessage}
          onChange={this.handleMessageChange}
          {...inputs.message}
        />
      )
    );
  };

  renderBackButton = () => {
    const { classes, onBack } = this.props;
    const { loading } = this.state;
    return (
      <GridItem>
        <Button
          className={classes.backButton}
          disabled={loading}
          variant={VARIANTS.OUTLINE}
          dense
          size="extraSmall"
          weight="bold"
          onClick={onBack}
        >
          <M {...m.backButtonLabel} />
        </Button>
      </GridItem>
    );
  };

  renderError = () => {
    const { error } = this.state;
    if (error) {
      return (
        <GridItem>
          <JText bold danger nowrap={false}>
            {error}
          </JText>
        </GridItem>
      );
    }
    return null;
  };

  renderAddRoleButton = () => {
    const { classes } = this.props;
    const { loading } = this.state;
    return (
      this.getUserNeedsRole() && (
        <GridItem>
          <Button
            className={classes.addRoleButton}
            type="submit"
            disabled={loading}
            dense
            size="extraSmall"
            weight="bold"
          >
            {loading ? (
              <M {...m.addRoleButtonLoadingLabel} />
            ) : (
              <M {...m.addRoleButtonLabel} />
            )}
          </Button>
        </GridItem>
      )
    );
  };

  render = () => (
    <Form onFormValidSubmit={this.handleValidSubmit}>
      <GridContainer direction="column">
        {this.renderError()}
        {this.renderSearchResult()}
        {this.renderUser()}
        {this.renderMessage()}
        <GridItem />
        <GridItem>
          <GridContainer>
            {this.renderBackButton()}
            <InviteButton
              loading={this.state.loading}
              error={this.state.error}
              needsInvitation={this.getUserNeedsInvitation()}
              templateId={this.props.templateId}
              role={this.props.role}
            />
            {this.renderAddRoleButton()}
          </GridContainer>
        </GridItem>
      </GridContainer>
    </Form>
  );
}

LinkedUserInviteUser.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,
  resaga: PropTypes.object.isRequired,
  userIdsWithRole: PropTypes.array,
  userIdsConnected: PropTypes.array,

  // parent
  templateId: PropTypes.number,
  id: PropTypes.number,
  role: PropTypes.string,
  linkeeRole: PropTypes.string,
  onBack: PropTypes.func,
  onNext: PropTypes.func,
  onSetClickAway: PropTypes.func,
  debounceMs: PropTypes.number,
  linkedUserId: PropTypes.number,
  linkedUserToken: PropTypes.string,
  personEmail: PropTypes.string,

  // resaga value
  ownerId: PropTypes.number,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  shareStatus: PropTypes.string,
  linkedUserMessage: PropTypes.string,
  invitationDetailOpen: PropTypes.string,
};

LinkedUserInviteUser.defaultProps = {
  userIdsWithRole: [],
  userIdsConnected: [],

  templateId: null,
  id: null,
  role: null,
  linkeeRole: null,
  onBack: () => {},
  onNext: () => {},
  onSetClickAway: () => {},
  debounceMs: 100,
  linkedUserId: null,
  linkedUserToken: null,

  ownerId: null,
  firstName: '',
  lastName: '',
  email: '',
  shareStatus: null,
  linkedUserMessage: '',
  invitationDetailOpen: '',
};

export default compose(
  withStyles(style, {
    name: 'Templates/Modals/Participant/View/LinkedUser/InviteUser',
  }),
  INVITATION_STORE_HOC.selectUserNodeUserIds({
    nodeIds: 'templateId',
    roles: 'role',
    outputProp: 'userIdsWithRole',
  }),
  INVITATION_STORE_HOC.selectUserNodeUserIds({
    nodeIds: 'templateId',
    roles: TOUR_CONTRIBUTOR_ROLE_TYPES,
    outputProp: 'userIdsConnected',
  }),
  resaga(CONFIG),
)(LinkedUserInviteUser);
