import { TEMPLATE_MANAGEMENT_VIEWSTORE } from 'appConstants';
import {
  NODE_STORE_SELECTORS,
  NODE_VIEW_STORE_SELECTORS,
} from 'datastore/nodeStore/selectors';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';

export const CONFIG = {
  value: {
    content: ({ id }) => NODE_STORE_SELECTORS.content({ id }),
    createdBy: NODE_STORE_SELECTORS.createdBy,
    editable: RESAGA_HELPERS.subscribeIfNotGiven(
      NODE_VIEW_STORE_SELECTORS.editable,
      'editable',
    ),
  },
  setValue: {
    editSections: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'editSections'],
  },
};
