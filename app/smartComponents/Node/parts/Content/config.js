import { NODE_API, UPDATE_NODE } from 'apis/constants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { ORGANISATION_STORE_SELECTORS } from 'datastore/orgStore/selectors';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';

export const CONFIG = {
  value: {
    content: RESAGA_HELPERS.subscribeIfNotGiven(
      NODE_STORE_SELECTORS.content,
      'content',
    ),
    type: NODE_STORE_SELECTORS.type,
    status: NODE_STORE_SELECTORS.status,
    memberIds: ({ orgId }) =>
      ORGANISATION_STORE_SELECTORS.getRoleMembersIds({ id: orgId }),
  },
  setValue: {
    nodes: NODE_STORE_SELECTORS.nodes,
  },
  isLoading: {
    updatingNode: [NODE_API, UPDATE_NODE],
  },
};
