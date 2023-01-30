import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';

export const CONFIG = {
  value: {
    children: NODE_STORE_SELECTORS.children,
    startDate: NODE_STORE_SELECTORS.startDate,
    duration: RESAGA_HELPERS.subscribeIfNotGiven(
      NODE_STORE_SELECTORS.duration,
      'duration',
    ),
  },
  setValue: {},
};
