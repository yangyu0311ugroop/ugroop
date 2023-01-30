import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';

export const showChecklists = ({ parentNodeId }) =>
  NODE_STORE_SELECTORS.calculatedShowChecklists({ id: parentNodeId });

export const CONFIG = {
  value: {
    checklists: NODE_STORE_SELECTORS.parentChecklists,
    showChecklists: RESAGA_HELPERS.subscribeIfNotGiven(
      showChecklists,
      'showChecklists',
    ),
  },
  setValue: {
    showChecklists: ({ parentNodeId }) =>
      NODE_STORE_SELECTORS.calculatedShowChecklists({ id: parentNodeId }),
  },
};
