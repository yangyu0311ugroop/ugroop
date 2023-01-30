import { NODE_API, UPDATE_NODE } from 'apis/constants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

export const CONFIG = {
  value: {
    status: NODE_STORE_SELECTORS.status,
    type: NODE_STORE_SELECTORS.type,
  },
  setValue: {},
  isLoading: {
    updating: [NODE_API, UPDATE_NODE],
  },
};
