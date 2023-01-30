import {
  PHONE_STORE_FIELDS,
  PHONE_STORE_SELECTOR_CREATOR,
  PHONE_STORE_SET_VALUE_SELECTOR,
} from 'datastore/phoneStore/selectors';

export const CONFIG = {
  value: {
    editable: PHONE_STORE_SELECTOR_CREATOR(PHONE_STORE_FIELDS.editable),
  },
  setValue: {
    editable: PHONE_STORE_SET_VALUE_SELECTOR.editable,
  },
};
