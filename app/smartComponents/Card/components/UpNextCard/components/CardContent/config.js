import {
  GET_TIMES,
  NODE_API,
  USER_API,
  UPDATE_USER_PREFERENCE,
  GET_USER_RELATED_TEMPLATES,
  EVENTS_API,
  GET_EVENTS_BY_ID,
} from 'apis/constants';
import { DASHBOARD_VIEW_STORE, USER_PREFERENCE } from 'appConstants';
import { COGNITO_STORE_SELECTORS } from 'datastore/stormPathStore/selectors';
import { USERS_PREFERENCE_SELECTORS } from 'datastore/userStore/selectors';

export const USER_ID_CONFIG = {
  value: {
    userId: COGNITO_STORE_SELECTORS.myId,
  },
};

export const CONFIG = {
  value: {
    times: [DASHBOARD_VIEW_STORE, 'times'],
    open: {
      keyPath: ({ userId }) => [
        USERS_PREFERENCE_SELECTORS.getUserPreference({
          id: userId,
          key: USER_PREFERENCE.DASH_BOARD_UP_NEXT,
        }),
      ],
      getter: (value = USER_PREFERENCE.BOOL_VALUE) =>
        value === USER_PREFERENCE.BOOL_VALUE,
    },
  },
  setValue: {},
  isLoading: {
    fetchUserRelatedTemplates: [USER_API, GET_USER_RELATED_TEMPLATES],
    fetchTimes: [NODE_API, GET_TIMES],
    updateUserPreference: [USER_API, UPDATE_USER_PREFERENCE],
    fetchEvents: [EVENTS_API, GET_EVENTS_BY_ID],
  },
};
