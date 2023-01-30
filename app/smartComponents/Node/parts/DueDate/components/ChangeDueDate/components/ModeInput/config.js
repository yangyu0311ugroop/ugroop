import { NODE_STORE_HELPERS } from 'datastore/nodeStore/helpers';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

export const CONFIG = {
  value: {
    type: NODE_STORE_SELECTORS.type,
    dueDate: NODE_STORE_SELECTORS.dueDate,
    parentType: NODE_STORE_SELECTORS.parentType,
    translateType: {
      keyPath: NODE_STORE_SELECTORS.parentType,
      getter: NODE_STORE_HELPERS.translateType,
    },
  },
  setValue: {},
};
