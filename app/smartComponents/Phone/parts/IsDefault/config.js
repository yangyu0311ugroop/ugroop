import {
  PHONE_STORE_FIELDS,
  PHONE_STORE_SELECTOR_CREATOR,
} from 'datastore/phoneStore/selectors';

export const CONFIG = {
  value: {
    isDefault: PHONE_STORE_SELECTOR_CREATOR(PHONE_STORE_FIELDS.isDefault),
  },
  setValue: {},
};
