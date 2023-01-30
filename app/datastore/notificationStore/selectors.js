import { NOTIFICATION_DATASTORE } from '../../appConstants';
import { isEmptyString } from '../../utils/stringAdditions';

const ugroopIds = [NOTIFICATION_DATASTORE, 'ugroopIds'];
const notificationStatus = id => [
  NOTIFICATION_DATASTORE,
  'ugroop',
  id,
  'status',
];
const totalCountUnRead = {
  keyPath: ({ ids }) =>
    ids && ids.map(id => NOTIFICATION_STORE_SELECTORS.notificationStatus(id)),
  props: [({ ids }) => ids],
  getter: (...array) => {
    const ids = array.pop();
    if (ids && ids.length > 0) {
      const clonearray = [...array];
      clonearray.splice(0, 0, 0);
      return clonearray.reduce((acuValue, nextValue) => {
        let copyValue = acuValue;
        if (!isEmptyString(nextValue) && nextValue === 'read') {
          return copyValue;
        }
        copyValue += 1;
        return copyValue;
      });
    }
    return 0;
  },
  cacheKey: ({ ids }) => {
    if (ids && ids.length > 0) {
      return `notifications.${ids.toString()}.totalCountUnRead`;
    }
    return 'notifications.empty.totalCountUnRead';
  },
};

const senderId = ({ id }) => [NOTIFICATION_DATASTORE, 'ugroop', id, 'senderId'];
const createdAt = ({ id }) => [
  NOTIFICATION_DATASTORE,
  'ugroop',
  id,
  'createdAt',
];
const previousCreatedAt = ({ previousId }) => [
  NOTIFICATION_DATASTORE,
  'ugroop',
  previousId,
  'createdAt',
];
const method = ({ id }) => [NOTIFICATION_DATASTORE, 'ugroop', id, 'method'];
const nodeId = ({ id }) => [NOTIFICATION_DATASTORE, 'ugroop', id, 'nodeId'];
const orgId = ({ id }) => [NOTIFICATION_DATASTORE, 'ugroop', id, 'orgId'];
const url = ({ id }) => [NOTIFICATION_DATASTORE, 'ugroop', id, 'url'];
const content = ({ id }) => [NOTIFICATION_DATASTORE, 'ugroop', id, 'content'];
const status = ({ id }) => [NOTIFICATION_DATASTORE, 'ugroop', id, 'status'];
const notifStatus = ({ id }) => [
  NOTIFICATION_DATASTORE,
  'ugroop',
  id,
  'notificationStatus',
];

const getWhatsNew = state =>
  state.get(NOTIFICATION_DATASTORE).get('whatsNew', []);

export const NOTIFICATION_STORE_SELECTORS = {
  senderId,
  createdAt,
  previousCreatedAt,
  ugroopIds,
  notifStatus,
  notificationStatus,
  totalCountUnRead,
  method,
  nodeId,
  orgId,
  url,
  content,
  status,
};

export const NOTIFICATION_STORE_RESELECTORS = {
  getWhatsNew,
};
