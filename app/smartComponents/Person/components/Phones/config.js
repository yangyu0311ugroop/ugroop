import { USER_STORE_SELECTORS } from 'datastore/userStore/selectors';

export const CONFIG = {
  value: {
    phones: USER_STORE_SELECTORS.phones,
    showCreateForm: ({ viewStore }) => [viewStore, 'showCreateForm'],
  },
  setValue: {
    showCreateForm: ({ viewStore }) => [viewStore, 'showCreateForm'],
  },
};
