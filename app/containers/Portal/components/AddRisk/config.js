import {
  TEMPLATE_MANAGEMENT_DATASTORE,
  TEMPLATE_MANAGEMENT_VIEWSTORE,
} from 'appConstants';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

export const TEMPLATE_CONFIG = {
  value: { id: [TEMPLATE_MANAGEMENT_DATASTORE, 'id'] },
};
export const CONFIG = {
  value: {},
  setValue: {
    selectedRiskId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'selectedRiskId'],
    layout: NODE_STORE_SELECTORS.calculatedLayout,
    ...PORTAL_HELPERS.setValue,
  },
};
