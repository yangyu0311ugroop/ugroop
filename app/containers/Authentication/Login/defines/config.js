import {
  NOTIFICATION_DATASTORE,
  INVITATION_SWITCH_ACCOUNT_STORE,
} from 'appConstants';
import { get } from 'lodash';
import { SIGN_IN, USER_API } from '../../../../apis/constants';
/**
 * Created by quando on 30/3/17.
 */

export const LOGIN_FORM = 'loginForm';
export const CONFIG = {
  value: {
    notifications: {
      keyPath: ({ match }) => [
        NOTIFICATION_DATASTORE,
        'notifications',
        get(match, 'params.token'),
        'remoteContent',
      ],
      spreadObject: true,
    },
    token: {
      getter: ({ match }) => get(match, 'params.token'),
    },
    isRegisterByInvitation: {
      getter: ({ shareTo, senderEmail, organisationName }) =>
        !!(shareTo && senderEmail && organisationName),
    },
    switchToken: [INVITATION_SWITCH_ACCOUNT_STORE, 'token'],
    decline: [INVITATION_SWITCH_ACCOUNT_STORE, 'decline'],
  },

  setValue: {
    switchToken: [INVITATION_SWITCH_ACCOUNT_STORE, 'token'],
    decline: [INVITATION_SWITCH_ACCOUNT_STORE, 'decline'],
  },
  isLoading: {
    signInLoading: [USER_API, SIGN_IN],
  },
};
