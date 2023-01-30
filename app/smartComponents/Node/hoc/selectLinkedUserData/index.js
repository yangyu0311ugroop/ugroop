import { compose } from 'redux';
import resaga from 'resaga';
import { PENDING } from 'appConstants';
import withPropFilter from 'utils/hoc/withPropFilter';
import { INVITATION_STORE_HOC } from 'datastore/invitationStore/hoc';
import { CONFIG } from './config';

/**
 * @param nodeIdProp Name of node id prop to search
 * @param roles Optional array of roles to filter by or name of prop
 * @param outputProp Prop name of linked userId
 * @returns The following props
 *  [outputProp] Linked userId
 *  shareToken: Related share token
 *  userNodeId: Related userNode id
 *  invitationPending: Whether user has a pending invitation
 *  userConnected: Whether user has a role on node
 */
export default ({ nodeIdProp, roles, outputProp = 'userId' }) =>
  compose(
    INVITATION_STORE_HOC.selectShareSubNodeIds({
      nodeIds: nodeIdProp,
      roles,
      selectShareTokens: true,
      shareStatuses: [PENDING],
      outputProp: 'shareTokens',
    }),
    INVITATION_STORE_HOC.selectUserNodeIds({
      nodeIds: nodeIdProp,
      roles,
      outputProp: 'userNodeIds',
    }),
    resaga(CONFIG({ outputProp })),
    withPropFilter({ filter: ['shareTokens', 'userNodeIds'] }),
  );
