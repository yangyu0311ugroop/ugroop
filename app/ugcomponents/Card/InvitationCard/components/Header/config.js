import { arrays } from 'utils';
import { INVITATION_STORE, USER_PREFERENCE } from 'appConstants';
import { INVITATION_VIEW_STORE_SELECTORS } from 'datastore/invitationStore/selectors';
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
      keyPath: [INVITATION_STORE, 'fromMe'],
      getter: arrays.length,
    },
    receivedCount: {
      keyPath: [INVITATION_STORE, 'toMe'],
      getter: arrays.length,
    },
    completedFromMeCount: {
      keyPath: [INVITATION_STORE, 'completedFromMe'],
      getter: arrays.length,
    },
    completedToMeCount: {
      keyPath: [INVITATION_STORE, 'completedToMe'],
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
