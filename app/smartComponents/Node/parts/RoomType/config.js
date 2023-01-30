import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';

export const CONFIG = {
  value: {
    roomType: RESAGA_HELPERS.subscribeIfNotGiven(
      NODE_STORE_SELECTORS.roomType,
      'roomType',
    ),
  },
  setValue: {},
};
