import { TEMPLATE_MANAGEMENT_VIEWSTORE } from 'appConstants';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

export const CONFIG = {
  value: {
    createdBy: NODE_STORE_SELECTORS.createdBy,
    layout: ({ templateId }) =>
      NODE_STORE_SELECTORS.calculatedLayout({ id: templateId }),
    routes: NODE_STORE_SELECTORS.routes,
    selectedId: NODE_STORE_SELECTORS.calculatedSelectedId,
  },
  setValue: {
    layout: ({ templateId }) =>
      NODE_STORE_SELECTORS.calculatedLayout({ id: templateId }),
    selectedId: NODE_STORE_SELECTORS.calculatedSelectedId,
    clickId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'clickId'],
    showDetail: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'showDetail'],
    ...PORTAL_HELPERS.setValue,
  },
};
