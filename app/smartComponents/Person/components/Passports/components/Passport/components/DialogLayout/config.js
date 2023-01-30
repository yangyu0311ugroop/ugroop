import {
  USER_PASSPORTS_SELECTOR_CREATOR,
  USER_PASSPORTS_FIELDS,
} from 'datastore/userStore/selectors';

export const CONFIG = {
  value: {
    photo: USER_PASSPORTS_SELECTOR_CREATOR(USER_PASSPORTS_FIELDS.photo),
  },
};
