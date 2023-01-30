import { TEMPLATE_MANAGEMENT_VIEWSTORE } from 'appConstants';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

export const CONFIG = {
  value: {
    risks: NODE_STORE_SELECTORS.risks,
    selectedRiskId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'selectedRiskId'],
  },
  setValue: {
    selectedRiskId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'selectedRiskId'],
    layout: NODE_STORE_SELECTORS.calculatedLayout,
    ...PORTAL_HELPERS.setValue,
  },
};
