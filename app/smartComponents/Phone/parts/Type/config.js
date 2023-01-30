import {
  PHONE_STORE_FIELDS,
  PHONE_STORE_SELECTOR_CREATOR,
} from 'datastore/phoneStore/selectors';

export const CONFIG = {
  value: {
    type: PHONE_STORE_SELECTOR_CREATOR(PHONE_STORE_FIELDS.type),
  },
  setValue: {},
};
