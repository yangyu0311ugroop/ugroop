import { COGNITO_ACCOUNTSTORE, USER_PREFERENCE } from 'appConstants';
import { INVITATION_VIEW_STORE_SELECTORS } from 'datastore/invitationStore/selectors';
import { COGNITO_STORE_SELECTORS } from 'datastore/stormPathStore/selectors';
import { USERS_PREFERENCE_SELECTORS } from 'datastore/userStore/selectors';
import { USER_API, UPDATE_USER_PREFERENCE } from 'apis/constants';

export const USER_ID_CONFIG = {
  value: {
    userId: COGNITO_STORE_SELECTORS.myId,
  },
};
export const CONFIG = {
  value: {
    userId: [COGNITO_ACCOUNTSTORE, 'account', 'id'],
    showCompleted: INVITATION_VIEW_STORE_SELECTORS.showCompleted,
    open: {
      keyPath: ({ userId }) => [
        USERS_PREFERENCE_SELECTORS.getUserPreference({
          id: userId,
          key: USER_PREFERENCE.DASH_BOARD_INVITATION,
        }),
      ],
      getter: (value = USER_PREFERENCE.BOOL_VALUE) =>
        value === USER_PREFERENCE.BOOL_VALUE,
    },
  },

  setValue: {},
  isLoading: {
    updateUserPreference: [USER_API, UPDATE_USER_PREFERENCE],
  },
};
