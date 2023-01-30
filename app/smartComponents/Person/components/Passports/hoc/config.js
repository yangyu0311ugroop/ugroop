import {
  USER_PASSPORTS_SELECTOR_CREATOR,
  USER_PASSPORTS_FIELDS,
} from 'datastore/userStore/selectors';
import { SET_VALUE } from 'ugcomponents/SnackBar/config';

export const CONFIG = {
  value: {
    passportNumber: USER_PASSPORTS_SELECTOR_CREATOR(
      USER_PASSPORTS_FIELDS.passportNumber,
    ),
  },
  setValue: {
    ...SET_VALUE,
    editable: USER_PASSPORTS_SELECTOR_CREATOR(USER_PASSPORTS_FIELDS.editable),
  },
};
