import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { TEMPLATE_MANAGEMENT_VIEWSTORE } from 'appConstants';
export const CONFIG = {
  value: {
    content: NODE_STORE_SELECTORS.content,
    description: NODE_STORE_SELECTORS.description,
  },
  setValue: {
    expandedParentChecklistId: [
      TEMPLATE_MANAGEMENT_VIEWSTORE,
      'expandedParentChecklistId',
    ],
  },
};
