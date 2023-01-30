import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

export const CONFIG = {
  value: {
    content: NODE_STORE_SELECTORS.content,
    description: NODE_STORE_SELECTORS.description,
    type: NODE_STORE_SELECTORS.type,
  },
};
