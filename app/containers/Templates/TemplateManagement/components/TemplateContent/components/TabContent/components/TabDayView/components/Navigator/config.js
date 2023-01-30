import { TEMPLATE_MANAGEMENT_VIEWSTORE } from 'appConstants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

export const CONFIG = {
  value: {
    startDate: NODE_STORE_SELECTORS.startDate,
    ongoing: NODE_STORE_SELECTORS.calculatedOngoing,
    selectedId: ({ clickId = 'selectedId' }) => [
      TEMPLATE_MANAGEMENT_VIEWSTORE,
      clickId,
    ],
    clickId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'clickId'],
    hoverId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'hoverId'],
    markerIds: ({ routeId }) =>
      NODE_STORE_SELECTORS.calculatedMarkerIds({ id: routeId }),
  },
  setValue: {},
};
