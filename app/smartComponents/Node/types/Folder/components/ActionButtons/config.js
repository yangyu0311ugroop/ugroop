import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

export const CONFIG = {
  value: {
    createdBy: ({ id }) => [...NODE_STORE_SELECTORS.createdBy({ id }), 'id'],
  },
  setValue: {},
};
