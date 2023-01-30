import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { NODE_PATHS } from 'datastore/nodeStore/constants';

export const CONFIG = {
  value: {
    firstName: ({ id }) =>
      NODE_STORE_SELECTORS.nodeProp({ id, path: NODE_PATHS.firstName }),
    lastName: ({ id }) =>
      NODE_STORE_SELECTORS.nodeProp({ id, path: NODE_PATHS.lastName }),
  },
  setValue: {},
};
