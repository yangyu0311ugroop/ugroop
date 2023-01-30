import { TEMPLATE_MANAGEMENT_DATASTORE } from 'appConstants';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';

export const TEMPLATE_CONFIG = {
  value: { id: [TEMPLATE_MANAGEMENT_DATASTORE, 'id'] },
};
export const CONFIG = {
  value: {},
  setValue: {
    ...PORTAL_HELPERS.setValue,
  },
};
