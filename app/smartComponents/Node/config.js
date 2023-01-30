import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';

export const CONFIG = {
  value: {
    type: RESAGA_HELPERS.subscribeIfNotGiven(NODE_STORE_SELECTORS.type, 'type'),
  },
  setValue: {
    children: NODE_STORE_SELECTORS.parentChildren,
    checklists: NODE_STORE_SELECTORS.parentChecklists,
  },
};
