import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

export const CONFIG = {
  value: {
    nextNodeId: NODE_STORE_SELECTORS.firstNextNodeId,
  },
  setValue: {
    checklists: NODE_STORE_SELECTORS.parentChecklists,
    nextNodes: NODE_STORE_SELECTORS.nextNodes,
  },
};
