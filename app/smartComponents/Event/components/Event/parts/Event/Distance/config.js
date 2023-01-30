import { USER_PREFERENCE } from 'appConstants';
import {
  EVENT_STORE_DATA_SELECTORS,
  EVENT_STORE_VIEW_SELECTORS,
} from 'datastore/eventStore/selectors';
import { COGNITO_STORE_SELECTORS } from 'datastore/stormPathStore/selectors';
import { USERS_PREFERENCE_SELECTORS } from 'datastore/userStore/selectors';

export const CONFIG = {
  value: {
    userId: COGNITO_STORE_SELECTORS.myId,
    formDistance: EVENT_STORE_VIEW_SELECTORS.coachFormProp({
      path: 'distance',
    }),
    eventDistance: ({ dataId }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({
        id: dataId,
        path: ['calculated', 'distance'],
      }),
  },
};

export const GET_PREFERRED_MEASUREMENT = {
  value: {
    measurement: ({ userId }) =>
      USERS_PREFERENCE_SELECTORS.getUserPreference({
        id: userId,
        key: USER_PREFERENCE.PREFERRED_DISTANCE_MEASUREMENT,
      }),
  },
};
