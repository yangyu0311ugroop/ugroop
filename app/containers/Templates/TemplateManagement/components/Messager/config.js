import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { TEMPLATE_MANAGEMENT_DATASTORE } from 'appConstants';
import { PORTAL_HELPERS } from '../../../../Portal/helpers';
export const CONFIG = {
  value: {
    templateId: [TEMPLATE_MANAGEMENT_DATASTORE, 'id'],
  },
  setValue: {
    ...PORTAL_HELPERS.setValue,
  },
};

export const HEADER_CONFIG = {
  value: {
    tourName: NODE_STORE_SELECTORS.content,
  },
};
