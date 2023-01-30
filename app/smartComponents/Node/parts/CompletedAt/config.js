import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';

export const CONFIG = {
  value: {
    completedAt: RESAGA_HELPERS.subscribeIfNotGiven(
      NODE_STORE_SELECTORS.completedAt,
      'completedAt',
    ),
  },
  setValue: {},
};
