import { PORTAL_HELPERS } from '../../helpers';
import { TEMPLATE_MANAGEMENT_DATASTORE } from '../../../../appConstants';

export const CONFIG = {
  value: {
    value: { templateId: [TEMPLATE_MANAGEMENT_DATASTORE, 'id'] },
  },
  setValue: {
    ...PORTAL_HELPERS.setValue,
  },
};
