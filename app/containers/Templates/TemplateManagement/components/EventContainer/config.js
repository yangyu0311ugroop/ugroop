/**
 * Created by stephenkarpinskyj on 16/3/18.
 */

import { EVENT_STORE_VIEW_SELECTORS } from 'datastore/eventStore/selectors';

export const CONFIG = {
  value: {
    eventCreate: {
      keyPath: EVENT_STORE_VIEW_SELECTORS.eventCreate,
      spreadObject: true,
    },
    eventView: {
      keyPath: EVENT_STORE_VIEW_SELECTORS.eventView,
      spreadObject: true,
    },
    eventEdit: {
      keyPath: EVENT_STORE_VIEW_SELECTORS.eventEdit,
      spreadObject: true,
    },
    flightBookingCreate: {
      keyPath: EVENT_STORE_VIEW_SELECTORS.flightBookingCreate,
      spreadObject: true,
    },
    flightBookingView: {
      keyPath: EVENT_STORE_VIEW_SELECTORS.flightBookingView,
      spreadObject: true,
    },
    flightBookingEdit: {
      keyPath: EVENT_STORE_VIEW_SELECTORS.flightBookingEdit,
      spreadObject: true,
    },
  },

  setValue: {
    eventCreate: EVENT_STORE_VIEW_SELECTORS.eventCreate,
    eventView: EVENT_STORE_VIEW_SELECTORS.eventView,
    eventEdit: EVENT_STORE_VIEW_SELECTORS.eventEdit,
    flightBookingCreate: EVENT_STORE_VIEW_SELECTORS.flightBookingCreate,
    flightBookingView: EVENT_STORE_VIEW_SELECTORS.flightBookingView,
    flightBookingEdit: EVENT_STORE_VIEW_SELECTORS.flightBookingEdit,
  },
};
