/**
 * Created by stephenkarpinskyj on 12/10/18.
 */

import { COGNITO_STORE_SELECTORS } from 'datastore/stormPathStore/selectors';

export const CONFIG = {
  value: {
    authenticated: {
      keyPath: COGNITO_STORE_SELECTORS.account,
      getter: account => !!account,
    },
  },
};
