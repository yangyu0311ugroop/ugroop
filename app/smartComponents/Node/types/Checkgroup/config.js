import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

export const CONFIG = {
  value: {
    content: NODE_STORE_SELECTORS.content, //  < use in renderBody
    checklists: ({ id }) =>
      NODE_STORE_SELECTORS.parentChecklists({ parentNodeId: id }),
    selectedChecklists: NODE_STORE_SELECTORS.selectedChecklists,
  },

  setValue: {},
};
