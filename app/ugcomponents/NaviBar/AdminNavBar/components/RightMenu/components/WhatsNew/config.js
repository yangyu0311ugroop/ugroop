import { LOCAL_USER_SELECTOR } from 'datastore/userStore/selectors';
import { PORTAL_HELPERS } from '../../../../../../../containers/Portal/helpers';
import { COGNITO_STORE_SELECTOR } from '../../../../../../../datastore/stormPathStore/selectors.resaga';

export const CONFIG_USER_ID = {
  value: {
    userId: COGNITO_STORE_SELECTOR.userId.value,
  },
};

export const CONFIG = {
  value: {
    readUpdates: LOCAL_USER_SELECTOR.readUpdates,
  },
  setValue: {
    ...PORTAL_HELPERS.setValue,
  },
};
