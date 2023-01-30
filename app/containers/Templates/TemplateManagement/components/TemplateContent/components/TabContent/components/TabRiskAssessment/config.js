import { TEMPLATE_MANAGEMENT_VIEWSTORE } from 'appConstants';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import {
  NODE_STORE_SELECTORS,
  NODE_VIEW_STORE_SELECTORS,
} from 'datastore/nodeStore/selectors';
import { COGNITO_STORE_SELECTORS } from 'datastore/stormPathStore/selectors';

export const CONFIG = {
  value: {
    selectedRiskId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'selectedRiskId'],
  },
};

export const PARENT_CONFIG = {
  value: {
    me: COGNITO_STORE_SELECTORS.myId,
    editable: NODE_VIEW_STORE_SELECTORS.editable,
    createdBy: ({ selectedRiskId }) =>
      NODE_STORE_SELECTORS.createdBy({ id: selectedRiskId }),
    parentNodeId: ({ selectedRiskId }) =>
      NODE_STORE_SELECTORS.parentNodeId({ id: selectedRiskId }),
    risks: ({ templateId }) => NODE_STORE_SELECTORS.risks({ id: templateId }),
  },
  setValue: {
    selectedRiskId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'selectedRiskId'],
    ...PORTAL_HELPERS.setValue,
  },
};
