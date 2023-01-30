import React from 'react';
import PropTypes from 'prop-types';
import resaga from 'resaga';
import { CONFIG } from './config';

/**
 * Returns all roles that have access to participants on a template nodeId.
 */
export class ParticipantAccessRoles extends React.PureComponent {
  render = () => {
    const { children, settings } = this.props;
    return children(settings);
  };
}

ParticipantAccessRoles.propTypes = {
  // parent
  children: PropTypes.func.isRequired,

  // resaga value
  settings: PropTypes.array,
};

ParticipantAccessRoles.defaultProps = {
  settings: [],
};

export default resaga(CONFIG)(ParticipantAccessRoles);
