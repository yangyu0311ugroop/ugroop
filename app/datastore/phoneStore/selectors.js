import { PHONE_DATA_STORE } from 'appConstants';

export const PHONE_STORE_SET_VALUE_SELECTOR = {
  editable: ({ id }) => [PHONE_DATA_STORE, 'phones', id, 'editable'],
};

export const PHONE_STORE_FIELDS = {
  type: 'type',
  number: 'number',
  isDefault: 'isDefault',
  editable: 'editable',
};

export const PHONE_STORE_SELECTOR_CREATOR = field => ({ id }) => [
  PHONE_DATA_STORE,
  'phones',
  id,
  field,
];
