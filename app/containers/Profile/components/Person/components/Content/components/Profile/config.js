import { USER_STORE_SELECTORS } from 'datastore/userStore/selectors';

export const CONFIG = {
  value: {
    personId: ({ id }) => USER_STORE_SELECTORS.id({ userId: id }),
  },
  setValue: {},
};
