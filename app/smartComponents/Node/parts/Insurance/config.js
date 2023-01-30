import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { USER_STORE_SELECTORS } from 'datastore/userStore/selectors';

export const CONFIG = {
  value: {
    userInsurancePolicy: ({ userId }) =>
      USER_STORE_SELECTORS.insurancePolicy({ id: userId }),
    mode: ({ id }) =>
      NODE_STORE_SELECTORS.nodeProp({ id, path: NODE_PATHS.insuranceMode }),
    value: ({ id }) =>
      NODE_STORE_SELECTORS.nodeProp({ id, path: NODE_PATHS.insuranceValue }),
    userPersonId: ({ userId }) => USER_STORE_SELECTORS.id({ userId }),
  },
};
