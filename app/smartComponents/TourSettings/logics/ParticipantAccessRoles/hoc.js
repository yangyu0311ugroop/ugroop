import React from 'react';
import PropTypes from 'prop-types';
import ParticipantAccessRoles from './index';

export const withParticipantAccessRoles = Component => {
  const WrappedComponent = props => (
    <ParticipantAccessRoles nodeId={props.templateId}>
      {participantAccessRoles => (
        <Component participantAccessRoles={participantAccessRoles} {...props} />
      )}
    </ParticipantAccessRoles>
  );

  WrappedComponent.propTypes = {
    templateId: PropTypes.number,
  };

  WrappedComponent.defaultProp = {
    templateId: 0,
  };

  return React.memo(WrappedComponent);
};
