import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import _ from 'lodash';
import resaga from 'resaga';
import {
  TEMPLATE,
  PARTICIPANT,
  INTERESTED_PERSON,
  PARTICIPANTS,
  INTERESTED_PEOPLE,
  TOUR_CONTRIBUTOR,
} from 'utils/modelConstants';
import { ability } from 'apis/components/Ability/ability';
import { INVITATION_STORE_HOC } from 'datastore/invitationStore/hoc';
import GridContainer from 'components/GridContainer';
import GridItem from 'components/GridItem';
import UserNode from 'smartComponents/Invitation/UserNode';
import {
  TOUR_ROLE,
  TOUR_ROLE_TYPES,
  TOUR_CONTRIBUTOR_ROLE_TYPES,
} from 'apis/components/Ability/roles';
import { withNodeRole } from 'smartComponents/Node/hoc/withNodeRole';
import { withStyles } from 'components/material-ui';
import AddRole from './components/AddRole';
import { CONFIG_1, CONFIG_2, CONFIG_3 } from './config';
import styles from './styles';

export class UserNodeList extends React.PureComponent {
  getContributorUserNodeId = () => {
    const { contributorUserNodeIds } = this.props;
    return _.first(contributorUserNodeIds);
  };

  getInterestedUserNodeId = () => {
    const { interestedUserNodeIds } = this.props;
    return _.first(interestedUserNodeIds);
  };

  getParticipantUserNodeId = () => {
    const { participantUserNodeIds } = this.props;
    return _.first(participantUserNodeIds);
  };

  // TODO: Rely on back-end to omit data that user shouldn't see
  canShowOtherRoles = () => {
    const { userId, myId } = this.props;
    return ability.can('update', TEMPLATE) || userId === myId;
  };

  canAddRoles = () => ability.can('update', TEMPLATE);

  renderPart = (Component, props = {}) => <Component {...props} />;

  renderUserNode = (id, showRemove = true, props = {}) =>
    id && (
      <GridItem key={id}>
        <UserNode id={id} showRemove={showRemove} {...props} />
      </GridItem>
    );

  renderOtherNone = () => null;

  renderContributorAddRole = () => {
    const { nodeId, userId } = this.props;
    const defaultProps = { templateId: nodeId, userId };
    return (
      <React.Fragment>
        {this.canAddRoles() &&
          this.renderPart(AddRole, {
            ...defaultProps,
            type: TOUR_CONTRIBUTOR,
          })}
      </React.Fragment>
    );
  };

  renderAddOthers = () => {
    const interestedUserNodeId = this.getInterestedUserNodeId();
    const participantUserNodeId = this.getParticipantUserNodeId();
    const { nodeId, userId } = this.props;
    const defaultProps = { templateId: nodeId, userId };
    return (
      <React.Fragment>
        {!interestedUserNodeId &&
          this.canAddRoles() &&
          this.showFollower() &&
          this.renderPart(AddRole, {
            ...defaultProps,
            role: TOUR_ROLE.TOUR_INTERESTED,
            type: INTERESTED_PERSON,
            childKey: INTERESTED_PEOPLE,
            isTextCenter: true,
          })}
        {!participantUserNodeId &&
          this.canAddRoles() &&
          this.renderPart(AddRole, {
            ...defaultProps,
            role: TOUR_ROLE.TOUR_PARTICIPANT,
            type: PARTICIPANT,
            childKey: PARTICIPANTS,
            isTextCenter: true,
          })}
      </React.Fragment>
    );
  };

  renderOther = () => {
    const { paxLabel } = this.props;
    const interestedUserNodeId = this.getInterestedUserNodeId();
    const participantUserNodeId = this.getParticipantUserNodeId();
    const canRemove = this.canShowOtherRoles();

    return interestedUserNodeId || participantUserNodeId ? (
      <React.Fragment>
        {this.renderUserNode(interestedUserNodeId, canRemove)}
        {this.renderUserNode(participantUserNodeId, canRemove, {
          roleInstead: paxLabel,
        })}
      </React.Fragment>
    ) : (
      this.renderOtherNone()
    );
  };

  renderOtherSection = () =>
    this.canShowOtherRoles() && (
      <React.Fragment>
        {this.renderOther()}
        {this.renderAddOthers()}
      </React.Fragment>
    );

  renderContributorNone = () => (
    <GridItem>{this.renderContributorAddRole()}</GridItem>
  );

  showFollower = () => {
    const { ownerId, userId, roles } = this.props;
    const arr = roles.filter(role => role !== TOUR_ROLE.TOUR_OWNER);
    const hasRoles = arr.filter(a => TOUR_CONTRIBUTOR_ROLE_TYPES.includes(a));
    return !hasRoles.length && ownerId !== userId;
  };

  renderContributor = () => {
    const { onRenderContributor } = this.props;
    const contributorUserNodeId = this.getContributorUserNodeId();
    const rendered = onRenderContributor
      ? onRenderContributor(contributorUserNodeId)
      : this.renderUserNode(
          contributorUserNodeId,
          this.canShowOtherRoles(),
          true,
        );
    return rendered || this.renderContributorNone();
  };

  renderContributorSection = () => (
    <React.Fragment>{this.renderContributor()}</React.Fragment>
  );

  render = () => {
    const { classes } = this.props;
    return (
      <GridContainer direction="column" alignItems="center" spacing={0}>
        <GridItem>
          <GridContainer
            className={classes.addMarginBottom}
            spacing={0}
            direction="column"
            alignItems="center"
          >
            {this.renderContributorSection()}
            {this.renderOtherSection()}
          </GridContainer>
        </GridItem>
      </GridContainer>
    );
  };
}

UserNodeList.propTypes = {
  // hoc
  classes: PropTypes.object.isRequired,
  userNodeIds: PropTypes.array,

  // parent
  id: PropTypes.number,
  nodeId: PropTypes.number,
  userId: PropTypes.number,
  onRenderContributor: PropTypes.func,

  // resaga value
  myId: PropTypes.number,
  contributorUserNodeIds: PropTypes.array,
  interestedUserNodeIds: PropTypes.array,
  participantUserNodeIds: PropTypes.array,
  ownerId: PropTypes.number,
  roles: PropTypes.array,
  templateId: PropTypes.number,
  paxLabel: PropTypes.string,
};

UserNodeList.defaultProps = {
  userNodeIds: [],

  id: null,
  nodeId: null,
  userId: null,
  onRenderContributor: null,

  myId: null,
  contributorUserNodeIds: [],
  interestedUserNodeIds: [],
  participantUserNodeIds: [],
  roles: [],
};

export default compose(
  withStyles(styles, { name: 'UserNodeList' }),
  resaga(CONFIG_1),
  INVITATION_STORE_HOC.selectUserNodeIds({
    userIds: 'userId',
    nodeIds: 'nodeId',
    roles: TOUR_ROLE_TYPES,
  }),
  withNodeRole,
  resaga(CONFIG_2),
  resaga(CONFIG_3),
)(UserNodeList);
