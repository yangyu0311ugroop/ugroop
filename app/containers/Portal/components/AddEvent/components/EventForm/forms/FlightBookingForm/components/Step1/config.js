import { TEMPLATE_MANAGEMENT_DATASTORE } from 'appConstants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

export const TEMPLATE_ID_CONFIG = {
  value: {
    templateId: [TEMPLATE_MANAGEMENT_DATASTORE, 'id'],
  },
};

export const CONFIG = {
  value: {
    dayIds: ({ timelineId }) =>
      NODE_STORE_SELECTORS.children({ id: timelineId }),
  },
  setValue: {},
};
