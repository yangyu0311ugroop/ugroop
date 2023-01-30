import { COGNITO_STORE_SELECTORS } from 'datastore/stormPathStore/selectors';

export const CONFIG = {
  value: {
    account: {
      keyPath: COGNITO_STORE_SELECTORS.account,
      getter: account => !!account,
    },
  },
};
