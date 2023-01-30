import { TEMPLATE_MANAGEMENT_DATASTORE } from 'appConstants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

export const CONFIG = {
  value: {
    layout: ({ templateId }) =>
      NODE_STORE_SELECTORS.calculatedLayout({ id: templateId }),
  },
};

export const TEMPLATE_CONFIG = {
  value: {
    templateId: [TEMPLATE_MANAGEMENT_DATASTORE, 'id'],
  },
};
