import {
  USER_PASSPORTS_FIELDS,
  USER_PASSPORTS_SELECTOR_CREATOR,
  USER_STORE_SELECTORS,
} from 'datastore/userStore/selectors';

export const CONFIG = {
  value: {
    passports: ({ userId }) => USER_STORE_SELECTORS.passports({ id: userId }),
    issuedDate: USER_PASSPORTS_SELECTOR_CREATOR(
      USER_PASSPORTS_FIELDS.issuedDate,
    ),
  },
  setValue: {},
};
