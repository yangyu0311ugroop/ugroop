import { EVENTS_API, GET_EVENTS_BY_ID } from 'apis/constants';
import { EVENT_STORE } from 'appConstants';
import { EVENT_SCHEMA } from 'datastore/eventStore/schema';
import { requests } from 'utils/request';
import { normalize } from 'normalizr';

export const CONFIG = {
  name: EVENTS_API,

  requests: {
    [GET_EVENTS_BY_ID]: ({ ids }) =>
      requests.fetchWithAuthorisation('get', `/${EVENTS_API}?ids=[${ids}]`),
  },

  processResult: {
    [GET_EVENTS_BY_ID]: result => {
      const eventNormalize = normalize(result.eventList, EVENT_SCHEMA.events);
      const { entities } = eventNormalize;

      const flightNormalize = normalize(
        result.flightBookingList,
        EVENT_SCHEMA.flightBookings,
      );
      const { entities: flightEntities } = flightNormalize;

      const { events, attachments } = entities;
      const { flightBookings } = flightEntities;

      const flightBookingIds = flightNormalize.result;

      return {
        events,
        attachments,
        flightBookings,
        flightBookingIds,
      };
    },
  },

  setValue: {
    events: [EVENT_STORE, 'events'],
    attachments: [EVENT_STORE, 'attachments'],
    flightBookings: [EVENT_STORE, 'flightBookings'],
    flightBookingIds: [EVENT_STORE, 'flightBookingIds'],
  },

  processError: {},

  manuallySubscribe: true, // will not auto-subscribe to all values in `@@values`
};
