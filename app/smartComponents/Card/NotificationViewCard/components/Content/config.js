import { NOTIFICATION_STORE_SELECTORS } from 'datastore/notificationStore/selectors';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';
import { COGNITO_ACCOUNTSTORE } from '../../../../../appConstants';
export const CONFIG = {
  value: {
    ugroopIds: RESAGA_HELPERS.subscribeIfNotGiven(
      NOTIFICATION_STORE_SELECTORS.ugroopIds,
      'ugroopIds',
    ),
  },
};

export const CONTENT_CONFIG = {
  value: {
    userId: [COGNITO_ACCOUNTSTORE, 'account', 'id'],
    senderId: RESAGA_HELPERS.subscribeIfNotGiven(
      NOTIFICATION_STORE_SELECTORS.senderId,
      'senderId',
    ),
    createdAt: RESAGA_HELPERS.subscribeIfNotGiven(
      NOTIFICATION_STORE_SELECTORS.createdAt,
      'createdAt',
    ),
    previousCreatedAt: RESAGA_HELPERS.subscribeIfNotGiven(
      NOTIFICATION_STORE_SELECTORS.previousCreatedAt,
      'createdAt',
    ),
    nodeId: RESAGA_HELPERS.subscribeIfNotGiven(
      NOTIFICATION_STORE_SELECTORS.nodeId,
      'nodeId',
    ),
    orgId: RESAGA_HELPERS.subscribeIfNotGiven(
      NOTIFICATION_STORE_SELECTORS.orgId,
      'orgId',
    ),
    method: RESAGA_HELPERS.subscribeIfNotGiven(
      NOTIFICATION_STORE_SELECTORS.method,
      'method',
    ),
    url: RESAGA_HELPERS.subscribeIfNotGiven(
      NOTIFICATION_STORE_SELECTORS.url,
      'url',
    ),
    content: RESAGA_HELPERS.subscribeIfNotGiven(
      NOTIFICATION_STORE_SELECTORS.content,
      'content',
    ),
    notificationStatus: RESAGA_HELPERS.subscribeIfNotGiven(
      NOTIFICATION_STORE_SELECTORS.notifStatus,
      'notificationStatus',
    ),
    status: RESAGA_HELPERS.subscribeIfNotGiven(
      NOTIFICATION_STORE_SELECTORS.status,
      'status',
    ),
  },
  setValue: {
    status: NOTIFICATION_STORE_SELECTORS.status,
  },
};
