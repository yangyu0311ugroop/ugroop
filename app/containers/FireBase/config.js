import {
  NOTIFICATION_DATASTORE,
  TEMPLATE_MANAGEMENT_VIEWSTORE,
  USER_DATA_STORE,
} from 'appConstants';

export const CONFIG = {
  value: {
    id: [USER_DATA_STORE, 'userId'],
  },
  setValue: {
    ugroopNotifications: [NOTIFICATION_DATASTORE, 'ugroop'],
    ugroopIds: [NOTIFICATION_DATASTORE, 'ugroopIds'],
    refresh: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'refresh'],
  },
};
