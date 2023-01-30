import { EVENT_PATHS } from 'datastore/eventStore/constants';
import {
  EVENT_STORE_DATA_SELECTORS,
  EVENT_STORE_VIEW_SELECTORS,
} from 'datastore/eventStore/selectors';
import { NODE_PATHS } from 'datastore/nodeStore/constants';

export const CONFIG = {
  value: {
    timeZoneId: ({ id }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({
        id,
        path: NODE_PATHS.startTimeZoneId,
      }),
    key: ({ activityDetailId: id }) =>
      EVENT_STORE_DATA_SELECTORS.activityDetailProp({
        id,
        path: EVENT_PATHS.activityDetailKey,
      }),
    value: ({ activityDetailId: id }) =>
      EVENT_STORE_DATA_SELECTORS.activityDetailProp({
        id,
        path: EVENT_PATHS.activityDetailValue,
      }),
  },
  setValue: {
    currPickup: EVENT_STORE_VIEW_SELECTORS.coachFormProp({
      path: ['pickup', 'placeId'],
    }),
    eventPickup: ({ dataId }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({
        id: dataId,
        path: ['calculated', 'pickup', 'placeId'],
      }),
    eventDistance: ({ dataId }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({
        id: dataId,
        path: ['calculated', 'distance'],
      }),
    formDistance: EVENT_STORE_VIEW_SELECTORS.coachFormProp({
      path: 'distance',
    }),
  },
};
