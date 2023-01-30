import { TEMPLATE_MANAGEMENT_VIEWSTORE } from 'appConstants';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

export const DAY_IDS_CONFIG = {
  value: {
    dayIds: NODE_STORE_SELECTORS.children,
  },
};

export const CONFIG = {
  value: {
    hoverId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'hoverId'],
    clickId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'clickId'],

    selectedId: NODE_STORE_SELECTORS.calculatedSelectedId,
    routes: NODE_STORE_SELECTORS.routes,
  },
  setValue: {
    ...PORTAL_HELPERS.setValue,

    layout: ({ templateId }) =>
      NODE_STORE_SELECTORS.calculatedLayout({ id: templateId }),
    hoverId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'hoverId'],
  },
};
