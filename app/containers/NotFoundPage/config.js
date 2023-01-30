import { COGNITO_ACCOUNTSTORE as ACCOUNT } from 'appConstants';

export const CONFIG = {
  value: {
    account: {
      keyPath: [ACCOUNT, 'account'],
      getter: account => !!account,
    },
  },
};
