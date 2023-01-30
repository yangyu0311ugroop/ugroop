import React from 'react';
import PropTypes from 'prop-types';
import ParticipantList from 'smartComponents/Node/components/ParticipantList';
import { VARIANTS } from 'variantsConstants';

export const withParticipants = Component => {
  const ParticipantsHOC = props => (
    <ParticipantList
      templateId={props.templateId}
      variant={VARIANTS.RENDER_PROP}
    >
      {({ participants, filteredParticipants }) => (
        <Component
          {...props}
          participants={participants}
          filteredParticipants={filteredParticipants}
        />
      )}
    </ParticipantList>
  );

  ParticipantsHOC.propTypes = {
    templateId: PropTypes.number,
  };

  ParticipantsHOC.defaultProps = {};

  return React.memo(ParticipantsHOC);
};
