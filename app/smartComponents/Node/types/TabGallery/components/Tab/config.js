import { BATCH_DELETE_CHILDREN, NODE_API } from 'apis/constants';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import {
  NODE_STORE_SELECTORS,
  NODE_VIEW_STORE_SELECTORS,
} from 'datastore/nodeStore/selectors';

export const CONFIG = {
  value: {
    selectedIds: NODE_STORE_SELECTORS.calculatedSelectedIds,
    clickMode: NODE_STORE_SELECTORS.calculatedClickMode,
    previewId: NODE_STORE_SELECTORS.calculatedPreviewId,
    editable: NODE_VIEW_STORE_SELECTORS.editable,
  },

  setValue: {
    ...PORTAL_HELPERS.setValue,

    selectedIds: NODE_STORE_SELECTORS.calculatedSelectedIds,
    clickMode: NODE_STORE_SELECTORS.calculatedClickMode,
    previewId: NODE_STORE_SELECTORS.calculatedPreviewId,
  },

  isLoading: {
    batchDeleting: [NODE_API, BATCH_DELETE_CHILDREN],
  },
};
