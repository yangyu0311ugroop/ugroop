import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

export const CONFIG = {
  value: {
    parentChecklists: NODE_STORE_SELECTORS.parentChecklists,
    nodeContent: ({ parentNodeId }) =>
      NODE_STORE_SELECTORS.content({ id: parentNodeId }),
  },
  setValue: {},
};
