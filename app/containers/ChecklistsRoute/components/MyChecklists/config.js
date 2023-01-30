import {
  COGNITO_ACCOUNTSTORE,
  TEMPLATE_MANAGEMENT_VIEWSTORE,
} from 'appConstants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

export const PARENT_NODE_CONFIG = {
  value: {
    parentNodeId: [COGNITO_ACCOUNTSTORE, 'account', 'rootnodeid'],
  },
};

export const CONFIG = {
  value: {
    parentChecklists: NODE_STORE_SELECTORS.parentChecklists,
    expandedParentChecklistId: [
      TEMPLATE_MANAGEMENT_VIEWSTORE,
      'expandedParentChecklistId',
    ],
  },
  setValue: {
    addChecklistParentId: [
      TEMPLATE_MANAGEMENT_VIEWSTORE,
      'addChecklistParentId',
    ],
  },
};
