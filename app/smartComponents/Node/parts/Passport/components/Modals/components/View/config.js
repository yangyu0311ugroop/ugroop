import { PERSON_STORE_SELECTORS } from 'datastore/personDataStore/selectors';
import {
  USER_PASSPORTS_FIELDS,
  USER_PASSPORTS_SELECTOR_CREATOR,
} from 'datastore/userStore/selectors';

export const CONFIG_1 = {
  value: {
    personId: USER_PASSPORTS_SELECTOR_CREATOR(USER_PASSPORTS_FIELDS.personId),
  },
};

export const CONFIG_2 = {
  value: {
    userId: ({ personId: id }) => PERSON_STORE_SELECTORS.userId({ id }),
  },
};
