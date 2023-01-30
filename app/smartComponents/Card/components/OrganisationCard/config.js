import { USER_STORE_SELECTORS } from 'datastore/userStore/selectors';

export const CONFIG_ID = {
  value: {
    userId: USER_STORE_SELECTORS.userId,
  },
  setValue: {},
};

export const CONFIG = {
  value: {
    organisations: ({ userId }) =>
      USER_STORE_SELECTORS.organisations({ id: userId }),
    orgInvitations: ({ userId }) =>
      USER_STORE_SELECTORS.orgInvitations({ id: userId }),
  },
  setValue: {},
};
