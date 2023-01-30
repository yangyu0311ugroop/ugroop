import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

export const CONFIG = {
  value: {
    tourStartDate: NODE_STORE_SELECTORS.startDate,
    duration: NODE_STORE_SELECTORS.duration,
  },
  setValue: {},
};
