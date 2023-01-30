import { TEMPLATE_MANAGEMENT_VIEWSTORE } from 'appConstants';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import {
  NODE_STORE_SELECTORS,
  NODE_VIEW_STORE_SELECTORS,
} from 'datastore/nodeStore/selectors';
import { COGNITO_STORE_SELECTORS } from 'datastore/stormPathStore/selectors';

export const CONFIG = {
  value: {
    selectedRoomId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'selectedRoomId'],
  },
};

export const PARENT_CONFIG = {
  value: {
    me: COGNITO_STORE_SELECTORS.myId,
    editable: NODE_VIEW_STORE_SELECTORS.editable,
    createdBy: ({ selectedRoomId }) =>
      NODE_STORE_SELECTORS.createdBy({ id: selectedRoomId }),
    parentNodeId: ({ selectedRoomId }) =>
      NODE_STORE_SELECTORS.parentNodeId({ id: selectedRoomId }),
    rooms: ({ templateId }) => NODE_STORE_SELECTORS.rooms({ id: templateId }),
  },
  setValue: {
    selectedRoomId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'selectedRoomId'],
    sortMode: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'roomSortMode'],
    ...PORTAL_HELPERS.setValue,
  },
};
