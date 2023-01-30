import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';

export const CONFIG = {
  value: {
    createdAt: RESAGA_HELPERS.subscribeIfNotGiven(
      NODE_STORE_SELECTORS.createdAt,
      'createdAt',
    ),
  },
  setValue: {},
};
