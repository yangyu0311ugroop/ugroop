/**
 * Created by Yang on 14/2/17.
 */
import { LOCAL_USER_STORE } from 'appConstants';
import { UGROOPSTORE_KEY_PREFIX } from 'containers/App/constants';
import localForage from 'localforage';

export const config = {
  whitelist: ['cognitoAcctStore', LOCAL_USER_STORE, 'ChatDrawer'],
  keyPrefix: UGROOPSTORE_KEY_PREFIX,
  debounce: 1000,
  storage: localForage,
};
