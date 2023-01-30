import { arrays } from 'utils';
import { USER_PREFERENCE } from 'appConstants';
import {
  INVITATION_STORE_SELECTORS,
  INVITATION_VIEW_STORE_SELECTORS,
} from 'datastore/invitationStore/selectors';
import { COGNITO_STORE_SELECTORS } from 'datastore/stormPathStore/selectors';
import { USERS_PREFERENCE_SELECTORS } from 'datastore/userStore/selectors';

export const USER_ID_CONFIG = {
  value: {
    userId: COGNITO_STORE_SELECTORS.myId,
  },
};
export const CONFIG = {
  value: {
    show: INVITATION_VIEW_STORE_SELECTORS.show,
    showCompleted: INVITATION_VIEW_STORE_SELECTORS.showCompleted,

    sentCount: {
      keyPath: ({ type }) => INVITATION_STORE_SELECTORS.sent({ type }),
      getter: arrays.length,
    },
    receivedCount: {
      keyPath: ({ type }) => INVITATION_STORE_SELECTORS.received({ type }),
      getter: arrays.length,
    },
    completedFromMeCount: {
      keyPath: ({ type }) =>
        INVITATION_STORE_SELECTORS.completedFromMe({ type }),
      getter: arrays.length,
    },
    completedToMeCount: {
      keyPath: ({ type }) => INVITATION_STORE_SELECTORS.completedToMe({ type }),
      getter: arrays.length,
    },
    expanded: {
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

  setValue: {
    show: INVITATION_VIEW_STORE_SELECTORS.show,
  },
};
