import { ability } from 'apis/components/Ability/ability';
import {
  TOUR_CONTRIBUTOR_ROLE,
  TOUR_CONTRIBUTOR_ROLE_TYPES,
  TOUR_ROLE,
} from 'apis/components/Ability/roles';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { compose } from 'redux';
import resaga from 'resaga';

import InterestedPerson from 'containers/Templates/TemplateManagement/components/TemplateHeader/components/InterestedList/components/InterestedPerson';
import TemplateParticipantList from 'containers/Templates/TemplateManagement/components/TemplateHeader/components/ParticipantList';
import ConfirmedParticipant from 'containers/Templates/TemplateManagement/components/TemplateHeader/components/ParticipantList/components/ConfirmedParticipant';
import { NodeRole } from 'smartComponents/Node/logics';
import { ParticipantAccessRoles } from 'smartComponents/TourSettings/logics';
import { PARTICIPANT_ACCESS_LEVELS } from 'utils/constants/people';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import {
  PARTICIPANT,
  TOUR_INTERESTED,
  TOUR_PARTICIPANT,
} from 'utils/modelConstants';
import { VARIANTS } from 'variantsConstants';

import { CONFIG, CONFIG_0 } from './config';
import styles from './styles';

export class Participants extends PureComponent {
  getParticipantListProps = (
    myInterestedPersonNodeId,
    myConfirmedParticipantNodeId,
    participantAccessRoles,
    myRoles,
  ) => {
    const { templateId } = this.props;

    if (ability.can('execute', PARTICIPANT)) {
      return {
        parentId: templateId,
        isTemplateId: true,
      };
    }

    // HACK: Exclude participant role if current user not confirmed participant
    const roles = myRoles.filter(
      r => r !== TOUR_ROLE.TOUR_PARTICIPANT || !!myConfirmedParticipantNodeId,
    );

    if (participantAccessRoles.some(r => roles.indexOf(r) >= 0)) {
      return {
        parentId: templateId,
        interestedPersonNodeId: myInterestedPersonNodeId,
        participantNodeId: myConfirmedParticipantNodeId,
        defaultAccessLevel: PARTICIPANT_ACCESS_LEVELS.limited,
        includeInviteMode: false,
        includeFormsMode: false,
        includeStatusFilters: false,
        isTemplateId: true,
      };
    }

    if (myInterestedPersonNodeId) {
      return {
        parentId: myInterestedPersonNodeId,
        isTemplateId: false,
        includeInviteMode: false,
        isInterestedPerson: true,
      };
    }

    // Tour could still contain my non-confirmed participant
    return {
      parentId: templateId,
      isTemplateId: true,
      useList: false,
      hideParticipants:
        myRoles.includes(TOUR_CONTRIBUTOR_ROLE.TOUR_VIEWER) ||
        myRoles.includes(TOUR_CONTRIBUTOR_ROLE.TOUR_COLLABORATOR),
    };
  };

  handleCreateClick = () => {
    const { templateId } = this.props;
    this.props.resaga.setValue({
      participantCreateOpen: true,
      participantCreateParentNodeId: templateId,
      participantCreateMode: null,
    });
  };

  renderParticipantsWithMyRoles = (...args) => myRoles => {
    const { renderList } = this.props;
    const participantNodeId = args[1];
    return LOGIC_HELPERS.ifFunction(
      renderList,
      [
        {
          ...this.props,
          ...this.getParticipantListProps(...args, myRoles),
          participantNodeId,
          myRoles,
        },
      ],
      <TemplateParticipantList
        participantNodeId={participantNodeId}
        {...this.props}
        {...this.getParticipantListProps(...args, myRoles)}
      />,
    );
  };

  renderParticipantsWithParticipantAccessRoles = (
    ...args
  ) => participantAccessRoles => {
    const { templateId, myId } = this.props;
    return (
      <NodeRole
        userId={myId}
        nodeId={templateId}
        roles={[
          ...TOUR_CONTRIBUTOR_ROLE_TYPES,
          TOUR_PARTICIPANT,
          TOUR_INTERESTED,
        ]}
      >
        {this.renderParticipantsWithMyRoles(...args, participantAccessRoles)}
      </NodeRole>
    );
  };

  renderParticipantsWithMyConfirmedParticipantNodeId = (
    ...args
  ) => myConfirmedParticipantNodeId => {
    const { templateId } = this.props;
    return (
      <ParticipantAccessRoles nodeId={templateId}>
        {this.renderParticipantsWithParticipantAccessRoles(
          ...args,
          myConfirmedParticipantNodeId,
        )}
      </ParticipantAccessRoles>
    );
  };

  renderParticipantsWithMyInterestedPersonNodeId = myInterestedPersonNodeId => {
    const { participantIds, myId } = this.props;
    return (
      <ConfirmedParticipant
        variant={VARIANTS.RENDER_PROP}
        participantIds={participantIds}
        userId={myId}
        mode="me"
      >
        {this.renderParticipantsWithMyConfirmedParticipantNodeId(
          myInterestedPersonNodeId,
        )}
      </ConfirmedParticipant>
    );
  };

  render = () => {
    const { interestedPersonIds, myId, variant } = this.props;

    return (
      <InterestedPerson
        variant={VARIANTS.RENDER_PROP}
        interestedPersonIds={interestedPersonIds}
        userId={myId}
        mode="me"
        newVariant={variant}
      >
        {this.renderParticipantsWithMyInterestedPersonNodeId}
      </InterestedPerson>
    );
  };
}

Participants.propTypes = {
  // hoc props
  resaga: PropTypes.object.isRequired,

  // parent props
  renderList: PropTypes.func,
  variant: PropTypes.string,

  // resaga props
  myId: PropTypes.number,
  interestedPersonIds: PropTypes.array,
  participantIds: PropTypes.array,
  templateId: PropTypes.number,
};

Participants.defaultProps = {
  interestedPersonIds: [],
  participantIds: [],
  myId: 0,
  templateId: 0,
};

export default compose(
  withStyles(styles, { name: 'Participants' }),
  resaga(CONFIG_0),
  resaga(CONFIG),
)(Participants);
