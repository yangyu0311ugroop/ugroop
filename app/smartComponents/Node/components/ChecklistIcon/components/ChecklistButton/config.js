import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { showChecklists } from 'smartComponents/Node/components/ChecklistIcon/config';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';

export const CONFIG = {
  value: {
    checklists: RESAGA_HELPERS.subscribeIfNotGiven(
      NODE_STORE_SELECTORS.parentChecklists,
      'checklists',
    ),
    showChecklists: RESAGA_HELPERS.subscribeIfNotGiven(
      showChecklists,
      'showChecklists',
    ),
  },
  setValue: {},
};
