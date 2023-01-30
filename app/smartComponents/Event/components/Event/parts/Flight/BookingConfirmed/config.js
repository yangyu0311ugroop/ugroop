/**
 * Created by stephenkarpinskyj on 20/11/18.
 */

import { EVENT_STORE_DATA_SELECTORS } from 'datastore/eventStore/selectors';
import {
  EVENT_PATHS,
  FLIGHT_BOOKING_PATHS,
} from 'datastore/eventStore/constants';

export const CONFIG_ID = {
  value: {
    bookingId: ({ dataId: id }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({
        id,
        path: EVENT_PATHS.flightBooking,
      }),
  },
};

export const CONFIG_DATA = {
  value: {
    value: ({ bookingId: id }) =>
      EVENT_STORE_DATA_SELECTORS.flightBookingProp({
        id,
        path: FLIGHT_BOOKING_PATHS.number,
      }),
  },
};
