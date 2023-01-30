import {
  USER_PASSPORTS_FIELDS,
  USER_PASSPORTS_SELECTOR_CREATOR,
} from 'datastore/userStore/selectors';

export const CONFIG = {
  value: {
    issuedDate: USER_PASSPORTS_SELECTOR_CREATOR(
      USER_PASSPORTS_FIELDS.issuedDate,
    ),
  },
  setValue: {},
};
