import { TEMPLATE_MANAGEMENT_VIEWSTORE } from 'appConstants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

export const CONFIG = {
  value: {
    markerIds: NODE_STORE_SELECTORS.calculatedMarkerIds,
    origin: NODE_STORE_SELECTORS.origin,
    destination: NODE_STORE_SELECTORS.destination,
    ids: ({ parentId }) => NODE_STORE_SELECTORS.children({ id: parentId }),

    clickId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'clickId'],
    distance: NODE_STORE_SELECTORS.calculatedDistance,
  },
  setValue: {
    clickId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'clickId'],
  },
};
