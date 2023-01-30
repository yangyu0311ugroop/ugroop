import { COGNITO_ACCOUNTSTORE, NOTIFICATION_DATASTORE } from 'appConstants';
import { RESAGA_HELPERS } from '../../../../../utils/helpers/resaga';
import { NOTIFICATION_STORE_SELECTORS } from '../../../../../datastore/notificationStore/selectors';

export const CONFIG = {
  value: {
    userId: [COGNITO_ACCOUNTSTORE, 'account', 'id'],
    ugroopIds: RESAGA_HELPERS.subscribeIfNotGiven(
      NOTIFICATION_STORE_SELECTORS.ugroopIds,
      'ugroopIds',
    ),
  },
  setValue: {
    ugroopStatus: [NOTIFICATION_DATASTORE, 'ugroop'],
  },
};
