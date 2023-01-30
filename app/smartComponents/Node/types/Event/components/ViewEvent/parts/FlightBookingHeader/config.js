import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import {
  EVENT_STORE_DATA_SELECTORS,
  EVENT_STORE_VIEW_SELECTORS,
} from 'datastore/eventStore/selectors';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';

export const CONFIG = {
  value: {
    data: RESAGA_HELPERS.subscribeIfNotGiven(
      EVENT_STORE_DATA_SELECTORS.flightBooking,
      'data',
    ),
  },
  setValue: {
    flightBookingView: EVENT_STORE_VIEW_SELECTORS.flightBookingView,
    ...PORTAL_HELPERS.setValue,
  },
};
