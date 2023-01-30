import {
  COGNITO_ACCOUNTSTORE,
  TEMPLATE_MANAGEMENT_VIEWSTORE,
} from 'appConstants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

export const CONFIG = {
  value: {
    ids: NODE_STORE_SELECTORS.timeNode,
    expandedChecklistId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'expandedChecklistId'],
    me: [COGNITO_ACCOUNTSTORE, 'account', 'id'],
  },
  setValue: {},
};
