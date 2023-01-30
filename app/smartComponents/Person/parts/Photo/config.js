import { USER_STORE_SELECTORS } from 'datastore/userStore/selectors';

export const CONFIG = {
  value: {
    photo: USER_STORE_SELECTORS.photo,
    knownAs: USER_STORE_SELECTORS.knownAs,
  },
  setValue: {},
};
