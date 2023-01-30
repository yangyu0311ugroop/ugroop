import React from 'react';
import PropTypes from 'prop-types';
import resaga from 'resaga';
import { PARTICIPANT_ACCESS_LEVELS } from 'utils/constants/people';
import { CONFIG } from './config';

/**
 * Returns participant access level based on a default value and
 * current user's interestedPerson + participant node id's on same tour.
 */
export class ParticipantAccessLevel extends React.PureComponent {
  getAccessLevel = () => {
    const {
      id,
      defaultAccessLevel,
      interestedPersonNodeId,
      participantNodeId,
      parentNodeId,
    } = this.props;

    if (participantNodeId === id) {
      return PARTICIPANT_ACCESS_LEVELS.full;
    }

    if (interestedPersonNodeId === parentNodeId) {
      return PARTICIPANT_ACCESS_LEVELS.full;
    }

    return defaultAccessLevel;
  };

  render = () => {
    const { children } = this.props;
    return children(this.getAccessLevel());
  };
}

ParticipantAccessLevel.propTypes = {
  // parent
  id: PropTypes.number,
  children: PropTypes.func.isRequired,
  defaultAccessLevel: PropTypes.string,
  interestedPersonNodeId: PropTypes.number,
  participantNodeId: PropTypes.number,

  // resaga value
  parentNodeId: PropTypes.number,
};

ParticipantAccessLevel.defaultProps = {
  id: null,
  defaultAccessLevel: PARTICIPANT_ACCESS_LEVELS.full,
  interestedPersonNodeId: null,
  participantNodeId: null,

  parentNodeId: null,
};

export default resaga(CONFIG)(ParticipantAccessLevel);
