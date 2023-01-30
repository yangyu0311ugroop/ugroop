import { RESAGA_HELPERS } from '../../../../../utils/helpers/resaga';
import { NOTIFICATION_STORE_SELECTORS } from '../../../../../datastore/notificationStore/selectors';

export const CONFIG = {
  value: {
    createdAt: RESAGA_HELPERS.subscribeIfNotGiven(
      NOTIFICATION_STORE_SELECTORS.createdAt,
      'createdAt',
    ),
  },
};
