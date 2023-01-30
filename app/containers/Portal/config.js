import { PORTAL_HELPERS, PORTAL_IDS_SELECTOR } from 'containers/Portal/helpers';

export const CONFIG = {
  value: {
    portalIds: PORTAL_IDS_SELECTOR,
  },
  setValue: {
    ...PORTAL_HELPERS.setValue,
  },
};
