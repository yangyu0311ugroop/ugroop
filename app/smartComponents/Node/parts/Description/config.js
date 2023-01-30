import {
  NODE_STORE_SELECTORS,
  NODE_VIEW_STORE_SELECTORS,
} from 'datastore/nodeStore/selectors';
import { TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS } from 'datastore/templateManagementStore/selectors';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';
import { USER_STORE_SELECTORS } from 'datastore/userStore/selectors';

export const CONFIG = {
  value: {
    editable: RESAGA_HELPERS.subscribeIfNotGiven(
      NODE_VIEW_STORE_SELECTORS.editable,
      'editable',
    ),
    editing: NODE_STORE_SELECTORS.editing,
    updatingTour: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.updatingTourInfo,
    parentNodeId: NODE_STORE_SELECTORS.parentNodeId,
    userId: USER_STORE_SELECTORS.userId,
  },
};

export const CONFIG_2 = {
  value: {
    editingParent: ({ parentNodeId }) =>
      NODE_STORE_SELECTORS.editing({ id: parentNodeId }),
  },
  setValue: {},
  isLoading: {},
};
