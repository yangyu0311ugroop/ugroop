import { USER_STORE_SELECTORS } from 'datastore/userStore/selectors';

export const CONFIG = {
  value: {
    email: ({ userId }) => USER_STORE_SELECTORS.email({ id: userId }),
    secondaryEmail: ({ userId }) =>
      USER_STORE_SELECTORS.secondaryEmail({ id: userId }),
  },
  setValue: {},
};
