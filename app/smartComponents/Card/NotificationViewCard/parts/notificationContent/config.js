import { USER_STORE_SELECTORS } from '../../../../../datastore/userStore/selectors';

export const CONFIG = {
  value: {
    firstName: USER_STORE_SELECTORS.firstName,
    lastName: USER_STORE_SELECTORS.lastName,
    knownAs: USER_STORE_SELECTORS.knownAs,
  },
};
