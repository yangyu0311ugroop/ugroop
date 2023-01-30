import { USER_DATA_STORE, COGNITO_ACCOUNTSTORE } from 'appConstants';

export const CONFIG = {
  value: {
    id: [USER_DATA_STORE, 'userId'],
    devicetoken: [COGNITO_ACCOUNTSTORE, 'devicetoken'],
  },
};
