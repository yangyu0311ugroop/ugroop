/**
 * Created by quando on 18/8/17.
 */
import { TEMPLATE_MANAGEMENT_VIEWSTORE } from 'appConstants';
import {
  NODE_STORE_SELECTORS,
  NODE_VIEW_STORE_SELECTORS,
} from 'datastore/nodeStore/selectors';

export const DEFAULT_SELECTDAY_INDEX = -1;

export const CONFIG = {
  value: {
    checklists: ({ templateId }) =>
      NODE_STORE_SELECTORS.parentChecklists({
        parentNodeId: templateId,
      }),
    selectDayId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'selectedId'],
    editable: NODE_VIEW_STORE_SELECTORS.editable,
  },
  setValue: {
    selectDayId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'selectedId'],
  },
};
