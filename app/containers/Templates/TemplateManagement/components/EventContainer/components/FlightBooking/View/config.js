/**
 * Created by stephenkarpinskyj on 14/11/18.
 */

import {
  EVENT_STORE_VIEW_SELECTORS,
  EVENT_STORE_DATA_SELECTORS,
} from 'datastore/eventStore/selectors';
import { FLIGHT_BOOKING_PATHS } from 'datastore/eventStore/constants';

export const CONFIG = {
  value: {
    templateId: ({ dataId: id }) =>
      EVENT_STORE_DATA_SELECTORS.flightBookingTemplateId({ id }),
    name: ({ dataId }) =>
      EVENT_STORE_DATA_SELECTORS.flightBookingProp({
        id: dataId,
        path: FLIGHT_BOOKING_PATHS.name,
      }),
  },
  setValue: {
    flightBookingEdit: EVENT_STORE_VIEW_SELECTORS.flightBookingEdit,
  },
};
