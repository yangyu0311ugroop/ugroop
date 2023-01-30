import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import {
  NODE_STORE_SELECTORS,
  NODE_VIEW_STORE_SELECTORS,
} from 'datastore/nodeStore/selectors';
import { GET_TEMPLATE_DETAIL, TEMPLATE_API } from 'apis/constants';

export const CONFIG = {
  value: {
    ids: NODE_STORE_SELECTORS.children,
    children: NODE_STORE_SELECTORS.calculatedVisibleChildren,
    privateIds: NODE_STORE_SELECTORS.calculatedPrivateIds,
    hiddenIds: NODE_STORE_SELECTORS.calculatedHiddenIds,
    disableRYI: NODE_STORE_SELECTORS.disableRYI,
    editable: NODE_VIEW_STORE_SELECTORS.editable,
  },
  setValue: {
    ...PORTAL_HELPERS.setValue,
  },
  isLoading: {
    fetchingTemplate: [TEMPLATE_API, GET_TEMPLATE_DETAIL],
  },
};
