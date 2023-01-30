/**
 * Created by stephenkarpinskyj on 15/8/18.
 */

import {
  EVENT_STORE_VIEW_SELECTORS,
  EVENT_STORE_DATA_SELECTORS,
} from 'datastore/eventStore/selectors';
import { EVENT_PATHS } from 'datastore/eventStore/constants';

// TODO: Start selecting from a well-maintained id array in template.calculated.flightBookingIds

export const CONFIG_1 = () => ({
  value: {
    value: ({ dataId: id }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({
        id,
        path: EVENT_PATHS.flightBooking,
      }),
    flightBookingIds: EVENT_STORE_DATA_SELECTORS.flightBookingIds,
  },
});

export const CONFIG_2 = () => ({
  value: {
    formValue: EVENT_STORE_VIEW_SELECTORS.eventFormProp({
      path: EVENT_PATHS.flightBooking,
    }),
    flightBookingIds: EVENT_STORE_DATA_SELECTORS.filterFlightBookingsByTemplateId(
      { idsProp: 'flightBookingIds' },
    ),
  },
  setValue: {
    flightBookingCreate: EVENT_STORE_VIEW_SELECTORS.flightBookingCreate,
    flightBookingView: EVENT_STORE_VIEW_SELECTORS.flightBookingView,
    flightBookingEdit: EVENT_STORE_VIEW_SELECTORS.flightBookingEdit,
  },
});
