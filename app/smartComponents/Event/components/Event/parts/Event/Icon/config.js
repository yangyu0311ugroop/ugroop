/**
 * Created by stephenkarpinskyj on 15/8/18.
 */

import { EVENT_STORE_DATA_SELECTORS } from 'datastore/eventStore/selectors';
import { EVENT_PATHS } from 'datastore/eventStore/constants';

export const CONFIG = {
  value: {
    value: ({ dataId: id }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({
        id,
        path: EVENT_PATHS.iconOverride,
      }),
    type: ({ dataId: id }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({ id, path: EVENT_PATHS.type }),
    subtype: ({ dataId: id }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({ id, path: EVENT_PATHS.subtype }),
  },
};
