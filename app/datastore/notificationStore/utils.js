import { NOTIFICATION_DATASTORE } from 'appConstants';

export const SELECT = {
  UNREAD_COUNT: [NOTIFICATION_DATASTORE, 'unreadCount'],
};

export const KEYS = {
  UGROOPS: 'ugroops',
  NOTIFICATIONS: 'notifications',
  NODES: 'nodes',
  COMMENTS: 'comments',
  PEOPLE: 'people',
  NOTIFICATION_IDS: 'notificationIds',
};

const makeSetValueConfig = () => {
  const config = {};
  Object.values(KEYS).forEach(v => {
    config[v] = [NOTIFICATION_DATASTORE, v];
  });
  return config;
};

export default {
  makeSetValueConfig,
};
