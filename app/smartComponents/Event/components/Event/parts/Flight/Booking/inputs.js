/**
 * Created by stephenkarpinskyj on 20/8/18.
 */

import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { EVENT_STORE_HELPERS } from 'datastore/eventStore/helpers';

export default {
  booking: {
    name: EVENT_STORE_HELPERS.pathToEventInputName(EVENT_PATHS.flightBooking),
  },
  bookingField: {
    SelectProps: {
      native: false,
    },
  },
  bookingEditable: {
    SelectProps: {
      displayEmpty: true,
    },
  },
};
