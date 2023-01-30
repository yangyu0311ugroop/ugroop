import { EVENT_PATHS } from 'datastore/eventStore/constants';
import {
  EVENT_STORE_DATA_SELECTORS,
  EVENT_STORE_VIEW_SELECTORS,
} from 'datastore/eventStore/selectors';

export const CONFIG = {
  value: {
    type: ({ dataId }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({
        id: dataId,
        path: EVENT_PATHS.type,
      }),
    value: ({ activityDetailId: id }) =>
      EVENT_STORE_DATA_SELECTORS.activityDetailProp({
        id,
        path: EVENT_PATHS.activityDetailValue,
      }),
    subtype: ({ dataId }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({
        id: dataId,
        path: EVENT_PATHS.subtype,
      }),
    dropoffPlaceId: ({ dataId }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({
        id: dataId,
        path: EVENT_PATHS.transportationDetailEndPlaceId,
      }),
    dropoffName: ({ dataId }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({
        id: dataId,
        path: EVENT_PATHS.transportationDetailEndName,
      }),
    dropoffIcon: ({ dataId }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({
        id: dataId,
        path: EVENT_PATHS.transportationDetailEndIcon,
      }),
    pickupName: ({ dataId }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({
        id: dataId,
        path: EVENT_PATHS.transportationDetailStartName,
      }),
    pickupPlaceId: ({ dataId }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({
        id: dataId,
        path: EVENT_PATHS.transportationDetailStartPlaceId,
      }),
    pickupIcon: ({ dataId }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({
        id: dataId,
        path: EVENT_PATHS.transportationDetailStartIcon,
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
