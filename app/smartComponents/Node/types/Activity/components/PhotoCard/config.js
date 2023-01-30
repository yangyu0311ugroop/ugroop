import {
  NODE_STORE_SELECTORS,
  NODE_VIEW_STORE_SELECTORS,
} from 'datastore/nodeStore/selectors';

export const CONFIG = {
  value: {
    editable: NODE_VIEW_STORE_SELECTORS.editable,
    createdBy: NODE_STORE_SELECTORS.createdBy,
  },
  setValue: {},
};
