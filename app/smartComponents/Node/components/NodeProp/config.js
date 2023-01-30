import { NODE_API, UPDATE_NODE } from 'apis/constants';
import {
  NODE_STORE_SELECTORS,
  NODE_VIEW_STORE_SELECTORS,
} from 'datastore/nodeStore/selectors';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';

export const CONFIG = {
  value: {
    value: ({ valueKey }) => NODE_STORE_SELECTORS[valueKey],
    type: NODE_STORE_SELECTORS.type,
    editable: RESAGA_HELPERS.subscribeIfNotGiven(
      NODE_VIEW_STORE_SELECTORS.editable,
      'editable',
    ),
  },
  isLoading: {
    updatingNode: [NODE_API, UPDATE_NODE],
  },
};
