import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

export const CONFIG = {
  value: {
    endMode: NODE_STORE_SELECTORS.customDataEndMode,
    endValue: NODE_STORE_SELECTORS.customDataEndValue,
  },
  setValue: {},
};
