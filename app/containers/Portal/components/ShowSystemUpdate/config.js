import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { LOCAL_USER_SELECTOR } from 'datastore/userStore/selectors';

export const CONFIG = {
  value: {
    readUpdates: LOCAL_USER_SELECTOR.readUpdates,
  },
  setValue: {
    readUpdates: LOCAL_USER_SELECTOR.readUpdates,
    ...PORTAL_HELPERS.setValue,
  },
};
