import { NODE_STORE_HELPERS } from 'datastore/nodeStore/helpers';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

export const CONFIG = {
  value: {
    type: {
      keyPath: NODE_STORE_SELECTORS.type,
      cacheKey: ({ id }) => `nodeStore.${id}.type`,
      getter: NODE_STORE_HELPERS.translateType,
    },
  },
  setValue: {},
};
