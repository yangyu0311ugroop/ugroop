import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';

export const CONFIG = {
  value: {
    impact: RESAGA_HELPERS.subscribeIfNotGiven(
      NODE_STORE_SELECTORS.impact,
      'impact',
    ),
    likelihood: RESAGA_HELPERS.subscribeIfNotGiven(
      NODE_STORE_SELECTORS.likelihood,
      'likelihood',
    ),
  },
  setValue: {},
};
