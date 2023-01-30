import { USER_STORE_SELECTORS } from 'datastore/userStore/selectors';

export const CONFIG = {
  value: {
    birthPlace: ({ userId }) => USER_STORE_SELECTORS.birthPlace({ id: userId }),
  },
  setValue: {},
};
