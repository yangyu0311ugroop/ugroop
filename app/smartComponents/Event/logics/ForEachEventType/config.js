/**
 * Created by stephenkarpinskyj on 31/8/18.
 */

import { EVENT_STORE_DATA_SELECTORS } from 'datastore/eventStore/selectors';
import { EVENT_PATHS } from 'datastore/eventStore/constants';

export const CONFIG = {
  value: {
    storeType: ({ dataId: id }) =>
      id
        ? EVENT_STORE_DATA_SELECTORS.eventProp({ id, path: EVENT_PATHS.type })
        : undefined,
    storeSubtype: ({ dataId: id }) =>
      id
        ? EVENT_STORE_DATA_SELECTORS.eventProp({
            id,
            path: EVENT_PATHS.subtype,
          })
        : undefined,
  },
};
