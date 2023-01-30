import { TOUR_CONTRIBUTOR_ROLE_TYPES } from 'apis/components/Ability/roles';
import React from 'react';
import PropTypes from 'prop-types';
import NodeRoles from 'smartComponents/Node/logics/NodeRole';
import { TOUR_INTERESTED, TOUR_PARTICIPANT } from 'utils/modelConstants';

export const withNodeRole = Component => {
  const WrappedComponent = props => (
    <NodeRoles
      nodeId={props.templateId}
      userId={props.userId}
      roles={[
        ...TOUR_CONTRIBUTOR_ROLE_TYPES,
        TOUR_PARTICIPANT,
        TOUR_INTERESTED,
      ]}
    >
      {roles => <Component roles={roles} {...props} />}
    </NodeRoles>
  );

  WrappedComponent.propTypes = {
    templateId: PropTypes.number,
    userId: PropTypes.number,
  };

  return WrappedComponent;
};
