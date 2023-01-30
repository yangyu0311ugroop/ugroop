import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import {
  USER_USERS_FIELDS,
  USER_USERS_SELECTOR_CREATOR,
} from 'datastore/userStore/selectors';

export const CONFIG = {
  value: {
    index: NODE_STORE_SELECTORS.index,
    userId: NODE_STORE_SELECTORS.lastModifiedBy,
  },
  setValue: {},
};

export const USER_USERS_CONFIG = {
  value: {
    orgId: ({ userId }) =>
      USER_USERS_SELECTOR_CREATOR(USER_USERS_FIELDS.orgId)({ id: userId }),
  },
};
