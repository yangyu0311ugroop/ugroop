import {
  USER_API,
  UPDATE_USER_PREFERENCE,
  TEMPLATE_API,
  GET_TEMPLATE_FEATURED_LIST,
} from 'apis/constants';
import { COGNITO_STORE_SELECTORS } from 'datastore/stormPathStore/selectors';
import { USERS_PREFERENCE_SELECTORS } from 'datastore/userStore/selectors';
import { NODE_STORE, NODE_STORE_ITEM, USER_PREFERENCE } from 'appConstants';

export const USER_ID_CONFIG = {
  value: {
    userId: COGNITO_STORE_SELECTORS.myId,
  },
};

export const CONFIG = {
  value: {
    featuredTours: [NODE_STORE, NODE_STORE_ITEM.FEATURED_TOURS],
    open: {
      keyPath: ({ userId }) => [
        USERS_PREFERENCE_SELECTORS.getUserPreference({
          id: userId,
          key: USER_PREFERENCE.DASH_BOARD_FEATURED_TOURS,
        }),
      ],
      getter: (value = USER_PREFERENCE.BOOL_VALUE) =>
        value === USER_PREFERENCE.BOOL_VALUE,
    },
  },
  isLoading: {
    fetchingFeaturedTours: [TEMPLATE_API, GET_TEMPLATE_FEATURED_LIST],
    updateUserPreference: [USER_API, UPDATE_USER_PREFERENCE],
  },
};
