import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

export const CONFIG = {
  value: {
    startTime: NODE_STORE_SELECTORS.calculatedStart,
    endTime: NODE_STORE_SELECTORS.calculatedEnd,
  },
  setValue: {},
};
