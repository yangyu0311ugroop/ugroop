import { TEMPLATE_MANAGEMENT_DATASTORE } from 'appConstants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
export const CONFIG = {
  value: {
    id: [TEMPLATE_MANAGEMENT_DATASTORE, 'id'],
  },
};

export const RYI_CONFIG = {
  value: {
    disableRYI: NODE_STORE_SELECTORS.disableRYI,
  },
};
