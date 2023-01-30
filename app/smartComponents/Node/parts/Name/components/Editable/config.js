import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { USER_STORE_SELECTORS } from 'datastore/userStore/selectors';

export const CONFIG = {
  value: {
    userPersonId: USER_STORE_SELECTORS.id,
    namePersonId: ({ id }) =>
      NODE_STORE_SELECTORS.nodeProp({ id, path: NODE_PATHS.namePersonId }),
  },
};
