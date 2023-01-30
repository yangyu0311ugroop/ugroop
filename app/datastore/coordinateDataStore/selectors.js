import { COORDINATE_DATA_STORE } from 'appConstants';

// define data store selectors
const ids = () => [COORDINATE_DATA_STORE, 'recentActivityIds'];
const lastUpdate = ({ id }) => [
  COORDINATE_DATA_STORE,
  'recentActivities',
  id,
  'updatedat',
];
const lastAccess = ({ id }) => [
  COORDINATE_DATA_STORE,
  'userActivities',
  id,
  'lastaccessat',
];
const action = ({ id }) => [
  COORDINATE_DATA_STORE,
  'recentActivities',
  id,
  'action',
];
const actionObjType = ({ id }) => [
  COORDINATE_DATA_STORE,
  'recentActivities',
  id,
  'targetType',
];

export const COORDINATE_DATA_STORE_SELECTORS = {
  ids,
  lastUpdate,
  lastAccess,
  action,
  actionObjType,
};
