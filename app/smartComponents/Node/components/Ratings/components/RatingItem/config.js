import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

export const CONFIG = {
  value: {
    participants: NODE_STORE_SELECTORS.participants,
    rating: NODE_STORE_SELECTORS.rating,
    createdBy: NODE_STORE_SELECTORS.createdBy,
  },
  setValue: {},
};
