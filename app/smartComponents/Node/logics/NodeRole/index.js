import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import resaga from 'resaga';
import { TOUR_ROLE_TYPES, TOUR_ROLE } from 'apis/components/Ability/roles';
import { INVITATION_STORE_HOC } from 'datastore/invitationStore/hoc';
import { INTERESTED_PEOPLE } from 'utils/modelConstants';
import { CONFIG } from './config';

/**
 * Returns all roles that a particular userId has on a nodeId.
 */
export class NodeRole extends React.PureComponent {
  getRoles = () => {
    const { roles, myId, ownerId } = this.props;

    // HACK
    if (myId === ownerId) {
      return [TOUR_ROLE.TOUR_OWNER, ...roles];
    }

    return roles;
  };

  render = () => {
    const { children } = this.props;
    return children(this.getRoles());
  };
}

NodeRole.propTypes = {
  // parent
  children: PropTypes.func.isRequired,

  // resaga value
  roles: PropTypes.array,
  myId: PropTypes.number,
  ownerId: PropTypes.number,
};

NodeRole.defaultProps = {
  roles: [],
  myId: null,
  ownerId: null,
};

export default compose(
  INVITATION_STORE_HOC.selectUserNodeIds({
    userIds: 'userId',
    nodeIds: 'nodeId',
    roles: [...TOUR_ROLE_TYPES, INTERESTED_PEOPLE],
  }),
  resaga(CONFIG),
)(NodeRole);
