import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import {
  NODE_STORE_SELECTORS,
  NODE_VIEW_STORE_SELECTORS,
} from 'datastore/nodeStore/selectors';

export const CONFIG = {
  value: {
    exist: ({ previewId }) => NODE_STORE_SELECTORS.id({ id: previewId }),
    createdBy: ({ previewId }) =>
      NODE_STORE_SELECTORS.createdBy({ id: previewId }),
    children: NODE_STORE_SELECTORS.children,
    editable: NODE_VIEW_STORE_SELECTORS.editable,
  },

  setValue: {
    ...PORTAL_HELPERS.setValue,
  },
};
