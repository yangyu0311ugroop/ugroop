import { GET_CHILDREN, NODE_API, UPDATE_CHILD } from 'apis/constants';

import { TEMPLATE_MANAGEMENT_VIEWSTORE } from 'appConstants';
import {
  NODE_STORE_SELECTORS,
  NODE_VIEW_STORE_SELECTORS,
} from 'datastore/nodeStore/selectors';

export const CONFIG = {
  value: {
    dayIds: NODE_STORE_SELECTORS.children,
    selectDayId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'selectedId'],
    editDayId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'editDayId'],
    editable: NODE_VIEW_STORE_SELECTORS.editable,
  },
  isLoading: {
    isUpdatingNode: [NODE_API, UPDATE_CHILD],
    isGettingChildren: [NODE_API, GET_CHILDREN],
  },
  setValue: {
    node: NODE_STORE_SELECTORS.nodes,
  },
};
