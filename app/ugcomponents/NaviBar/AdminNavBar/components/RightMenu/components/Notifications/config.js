import { NOTIFICATION_STORE_SELECTORS } from 'datastore/notificationStore/selectors';

export const CONFIG = {
  value: {
    ids: NOTIFICATION_STORE_SELECTORS.ugroopIds,
  },
};

export const CONFIG2 = {
  value: {
    count: NOTIFICATION_STORE_SELECTORS.totalCountUnRead,
  },
};
