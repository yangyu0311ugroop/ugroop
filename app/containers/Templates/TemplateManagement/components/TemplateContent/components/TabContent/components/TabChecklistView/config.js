/**
 * Created by quando on 18/8/17.
 */
import { TEMPLATE_MANAGEMENT_VIEWSTORE } from 'appConstants';
import {
  NODE_STORE_SELECTORS,
  NODE_VIEW_STORE_SELECTORS,
} from 'datastore/nodeStore/selectors';
import { GET_CHILDREN, NODE_API, UPDATE_CHILD } from 'apis/constants';
export const DEFAULT_SELECTDAY_INDEX = -1;

export const CONFIG = {
  value: {
    selectDayId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'selectedId'],
    dayIds: NODE_STORE_SELECTORS.children,
    startDate: ({ templateId }) =>
      NODE_STORE_SELECTORS.startDate({ id: templateId }),
    secondChild: ({ templateId }) =>
      NODE_STORE_SELECTORS.calculatedGalleryId({ id: templateId }),
    editable: NODE_VIEW_STORE_SELECTORS.editable,
    editDayId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'editDayId'],
    isLoading: {
      isUpdatingNode: [NODE_API, UPDATE_CHILD],
      isGettingChildren: [NODE_API, GET_CHILDREN],
    },
  },
  setValue: {
    selectDayId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'selectedId'],
    node: NODE_STORE_SELECTORS.nodes,
  },
};
