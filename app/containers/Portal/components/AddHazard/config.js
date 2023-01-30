import { TEMPLATE_MANAGEMENT_DATASTORE } from 'appConstants';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';

export const CONFIG = {
  value: {
    id: [TEMPLATE_MANAGEMENT_DATASTORE, 'id'],
  },
  setValue: {
    ...PORTAL_HELPERS.setValue,
  },
};
