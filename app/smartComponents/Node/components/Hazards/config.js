import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

export const CONFIG = {
  value: {
    ids: NODE_STORE_SELECTORS.children,
  },
  setValue: {
    ...PORTAL_HELPERS.setValue,
  },
};
