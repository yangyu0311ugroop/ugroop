import { NODE_VIEW_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';

export const CONFIG = {
  value: {
    editable: RESAGA_HELPERS.subscribeIfNotGiven(
      NODE_VIEW_STORE_SELECTORS.editable,
      'editable',
    ),
  },
  setValue: {},
  isLoading: {},
};
