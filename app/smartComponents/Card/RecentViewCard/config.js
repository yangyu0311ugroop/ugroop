import { COGNITO_STORE_SELECTORS } from 'datastore/stormPathStore/selectors';
import { USERS_PREFERENCE_SELECTORS } from 'datastore/userStore/selectors';
import { USER_PREFERENCE } from 'appConstants';
import { USER_API, UPDATE_USER_PREFERENCE } from 'apis/constants';
import { COORDINATE_DATA_STORE_SELECTORS } from 'datastore/coordinateDataStore/selectors';

export const USER_ID_CONFIG = {
  value: {
    userId: COGNITO_STORE_SELECTORS.myId,
  },
};

export const CONFIG = {
  value: {
    open: {
      keyPath: ({ userId }) => [
        USERS_PREFERENCE_SELECTORS.getUserPreference({
          id: userId,
          key: USER_PREFERENCE.DASH_BOARD_ACTIVITY,
        }),
      ],
      getter: (value = USER_PREFERENCE.BOOL_VALUE) =>
        value === USER_PREFERENCE.BOOL_VALUE,
    },
    ids: COORDINATE_DATA_STORE_SELECTORS.ids,
  },
  isLoading: {
    updateUserpreferenceLoading: [USER_API, UPDATE_USER_PREFERENCE],
  },
};
