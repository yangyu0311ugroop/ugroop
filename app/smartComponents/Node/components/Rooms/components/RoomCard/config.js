import { TEMPLATE_MANAGEMENT_VIEWSTORE } from 'appConstants';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

export const CONFIG = {
  value: {
    rooms: NODE_STORE_SELECTORS.rooms,
    selectedRiskId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'selectedRoomId'],
  },
  setValue: {
    selectedRiskId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'selectedRoomId'],
    layout: NODE_STORE_SELECTORS.calculatedLayout,
    selectedRoomType: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'selectedRoomType'],
    ...PORTAL_HELPERS.setValue,
  },
};
