import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

export const CONFIG = {
  value: {
    content: NODE_STORE_SELECTORS.content,
    type: NODE_STORE_SELECTORS.type,
    isEditable: NODE_STORE_SELECTORS.isEditable,
  },
};
