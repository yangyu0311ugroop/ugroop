import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

export const CONFIG = {
  value: {
    type: NODE_STORE_SELECTORS.type,
    content: NODE_STORE_SELECTORS.content,
    createdBy: NODE_STORE_SELECTORS.createdBy,
    shortDescription: NODE_STORE_SELECTORS.shortDescription,
    duration: NODE_STORE_SELECTORS.duration,
    lastModifiedBy: NODE_STORE_SELECTORS.lastModifiedBy,
  },
};
