import { EVENT_PATHS } from 'datastore/eventStore/constants';
import {
  EVENT_STORE_DATA_SELECTORS,
  EVENT_STORE_VIEW_SELECTORS,
} from 'datastore/eventStore/selectors';

export const CONFIG = {
  value: {
    startValue: ({ activityDetailStart: id }) =>
      EVENT_STORE_DATA_SELECTORS.activityDetailProp({
        id,
        path: EVENT_PATHS.activityDetailValue,
      }),
    endValue: ({ activityDetailEnd: id }) =>
      EVENT_STORE_DATA_SELECTORS.activityDetailProp({
        id,
        path: EVENT_PATHS.activityDetailValue,
      }),
    type: ({ dataId }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({
        id: dataId,
        path: EVENT_PATHS.type,
      }),
    subtype: ({ dataId }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({
        id: dataId,
        path: EVENT_PATHS.subtype,
      }),
  },
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
