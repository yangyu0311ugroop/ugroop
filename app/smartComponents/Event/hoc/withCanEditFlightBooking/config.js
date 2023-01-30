import { FLIGHT_BOOKING_PATHS } from 'datastore/eventStore/constants';
import { EVENT_STORE_DATA_SELECTORS } from 'datastore/eventStore/selectors';

export const CONFIG = {
  value: {
    createdBy: ({ dataId: id }) =>
      EVENT_STORE_DATA_SELECTORS.flightBookingProp({
        id,
        path: FLIGHT_BOOKING_PATHS.createdBy,
      }),
  },
};
