import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import { PARTICIPANT_ACCESS_LEVELS } from 'utils/constants/people';
import { VARIANTS } from 'variantsConstants';
import { ParticipantAccessLevel } from 'smartComponents/Node/logics';
import Node from 'smartComponents/Node';

export class ParticipantListItem extends React.PureComponent {
  getRestProps = () =>
    omit(this.props, [
      'id',
      'defaultAccessLevel',
      'interestedPersonNodeId',
      'participantNodeId',
    ]);

  renderWithAccessLevel = () => accessLevel => {
    const { id } = this.props;
    return (
      <Node
        id={id}
        variant={VARIANTS.ROW}
        accessLevel={accessLevel}
        {...this.getRestProps()}
      />
    );
  };

  render = () => {
    const {
      id,
      loading,
      defaultAccessLevel,
      interestedPersonNodeId,
      participantNodeId,
    } = this.props;
    return (
      <ParticipantAccessLevel
        id={id}
        defaultAccessLevel={defaultAccessLevel}
        interestedPersonNodeId={interestedPersonNodeId}
        participantNodeId={participantNodeId}
      >
        {this.renderWithAccessLevel(loading)}
      </ParticipantAccessLevel>
    );
  };
}

ParticipantListItem.propTypes = {
  // parent
  id: PropTypes.number,
  defaultAccessLevel: PropTypes.string,
  interestedPersonNodeId: PropTypes.number,
  participantNodeId: PropTypes.number,
  loading: PropTypes.bool,
};

ParticipantListItem.defaultProps = {
  id: null,
  defaultAccessLevel: PARTICIPANT_ACCESS_LEVELS.full,
  interestedPersonNodeId: null,
  participantNodeId: null,
  loading: false,
};

export default ParticipantListItem;
