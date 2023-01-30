/**
 * Created by stephenkarpinskyj on 20/11/18.
 */

import {
  EVENT_STORE_DATA_SELECTORS,
  EVENT_STORE_VIEW_SELECTORS,
} from 'datastore/eventStore/selectors';
import { EVENT_PATHS } from 'datastore/eventStore/constants';

export const CONFIG = {
  value: {
    value: ({ dataId: id }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({
        id,
        path: EVENT_PATHS.bookingNumber,
      }),
    formType: EVENT_STORE_VIEW_SELECTORS.eventFormProp({
      path: EVENT_PATHS.type,
    }),
    formSubtype: EVENT_STORE_VIEW_SELECTORS.eventFormProp({
      path: EVENT_PATHS.subtype,
    }),
  },
};
