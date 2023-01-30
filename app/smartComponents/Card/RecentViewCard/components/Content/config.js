import { COORDINATE_DATA_STORE_SELECTORS } from 'datastore/coordinateDataStore/selectors';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';
export const CONFIG = {
  value: {
    ids: RESAGA_HELPERS.subscribeIfNotGiven(
      COORDINATE_DATA_STORE_SELECTORS.ids,
    ),
  },
};
