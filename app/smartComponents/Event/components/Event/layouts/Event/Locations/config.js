import {
  EVENT_STORE_DATA_SELECTORS,
  EVENT_STORE_VIEW_SELECTORS,
} from 'datastore/eventStore/selectors';

export const CONFIG = {
  value: {},
  setValue: {
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
    formPickup: EVENT_STORE_VIEW_SELECTORS.coachFormProp({
      path: 'pickup',
    }),
    formDropoff: EVENT_STORE_VIEW_SELECTORS.coachFormProp({
      path: 'dropoff',
    }),
  },
};
