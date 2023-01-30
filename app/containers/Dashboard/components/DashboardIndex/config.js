import {
  INVITATION_SWITCH_ACCOUNT_STORE,
  COGNITO_ACCOUNTSTORE,
} from 'appConstants';

export const CONFIG = {
  value: {
    me: [COGNITO_ACCOUNTSTORE, 'account', 'email'],
  },
  setValue: {
    token: [INVITATION_SWITCH_ACCOUNT_STORE, 'token'],
    decline: [INVITATION_SWITCH_ACCOUNT_STORE, 'decline'],
  },
};
