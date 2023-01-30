import { RESAGA_HELPERS } from 'utils/helpers/resaga';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

export const CONFIG = {
  value: {
    content: RESAGA_HELPERS.subscribeIfNotGiven(
      NODE_STORE_SELECTORS.content,
      'content',
    ),
  },
  setValue: {},
};
