import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

export const CONFIG = {
  value: {
    createdBy: NODE_STORE_SELECTORS.createdBy,
    type: NODE_STORE_SELECTORS.type,
    lastModifiedBy: NODE_STORE_SELECTORS.lastModifiedBy,
    content: NODE_STORE_SELECTORS.content,
    isEditable: NODE_STORE_SELECTORS.isEditable,
    shortDescription: NODE_STORE_SELECTORS.shortDescription,
  },
};
