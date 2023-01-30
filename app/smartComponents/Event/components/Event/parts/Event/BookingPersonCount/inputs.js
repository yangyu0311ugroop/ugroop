import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { EVENT_STORE_HELPERS } from 'datastore/eventStore/helpers';

export default {
  personCount: {
    name: EVENT_STORE_HELPERS.pathToEventInputName(
      EVENT_PATHS.bookingPersonCount,
    ),
    makeEmptyZero: true,
  },
};
