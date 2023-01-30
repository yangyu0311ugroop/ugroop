import { USER_STORE_SELECTORS } from 'datastore/userStore/selectors';
import { SET_VALUE } from 'ugcomponents/SnackBar/config';

export const CONFIG = {
  value: {},
  setValue: {
    knownAs: USER_STORE_SELECTORS.knownAs,
    ...SET_VALUE,
  },
};
