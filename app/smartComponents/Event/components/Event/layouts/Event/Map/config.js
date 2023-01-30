import {
  EVENT_STORE_DATA_SELECTORS,
  EVENT_STORE_VIEW_SELECTORS,
} from 'datastore/eventStore/selectors';

export const CONFIG = {
  value: {
    formPickup: EVENT_STORE_VIEW_SELECTORS.coachFormProp({
      path: 'pickup',
    }),
    formDropoff: EVENT_STORE_VIEW_SELECTORS.coachFormProp({
      path: 'dropoff',
    }),
    eventPickup: ({ dataId }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({
        id: dataId,
        path: ['calculated', 'pickup'],
      }),
    eventDropoff: ({ dataId }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({
        id: dataId,
        path: ['calculated', 'dropoff'],
      }),
  },
  setValue: {
    distance: EVENT_STORE_VIEW_SELECTORS.coachFormProp({
      path: 'distance',
    }),
    eventDistance: ({ dataId }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({
        id: dataId,
        path: ['calculated', 'distance'],
      }),
    pickup: EVENT_STORE_VIEW_SELECTORS.coachFormProp({
      path: ['pickup', 'placeId'],
    }),
    dropoff: EVENT_STORE_VIEW_SELECTORS.coachFormProp({
      path: ['dropoff', 'placeId'],
    }),
  },
};
