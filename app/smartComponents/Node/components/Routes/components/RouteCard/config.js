import {
  TEMPLATE_MANAGEMENT_DATASTORE,
  TEMPLATE_MANAGEMENT_VIEWSTORE,
} from 'appConstants';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

export const TEMPLATE_ID = {
  value: {
    templateId: [TEMPLATE_MANAGEMENT_DATASTORE, 'id'],
  },
};

export const CONFIG = {
  value: {
    routes: NODE_STORE_SELECTORS.routes,
    selectedRouteId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'selectedRouteId'],
    layout: ({ templateId }) =>
      NODE_STORE_SELECTORS.calculatedLayout({ id: templateId }),
    clickId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'clickId'],
    selectedId: NODE_STORE_SELECTORS.calculatedSelectedId,
    showDetail: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'showDetail'],
  },
  setValue: {
    selectedRouteId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'selectedRouteId'],
    layout: ({ templateId }) =>
      NODE_STORE_SELECTORS.calculatedLayout({ id: templateId }),
    selectedId: NODE_STORE_SELECTORS.calculatedSelectedId,
    clickId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'clickId'],
    showDetail: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'showDetail'],
    ...PORTAL_HELPERS.setValue,
  },
};
