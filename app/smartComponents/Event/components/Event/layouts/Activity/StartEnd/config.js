import { EVENT_STORE_DATA_SELECTORS } from 'datastore/eventStore/selectors';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';

export const CONFIG = {
  value: {
    subtype: RESAGA_HELPERS.mapToId(
      EVENT_STORE_DATA_SELECTORS.eventSubtype,
      'dataId',
    ),
  },
  setValue: {},
};
