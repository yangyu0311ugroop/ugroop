import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';

export const CONFIG = {
  value: {
    ratings: RESAGA_HELPERS.mapToId(
      NODE_STORE_SELECTORS.ratings,
      'parentNodeId',
    ),
  },
  setValue: {},
};
