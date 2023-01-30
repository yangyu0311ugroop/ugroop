import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { NODE_PATHS } from 'datastore/nodeStore/constants';
import {
  EVENT_STORE_DATA_SELECTORS,
  EVENT_STORE_VIEW_SELECTORS,
} from 'datastore/eventStore/selectors';

export const CONFIG = {
  value: {
    timeZoneId: ({ id }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({
        id,
        path: NODE_PATHS.endTimeZoneId,
      }),
    placeId: ({ dataId }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({
        id: dataId,
        path: EVENT_PATHS.transportationDetailEndPlaceId,
      }),
    name: ({ dataId }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({
        id: dataId,
        path: EVENT_PATHS.transportationDetailEndName,
      }),
    icon: ({ dataId }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({
        id: dataId,
        path: EVENT_PATHS.transportationDetailEndIcon,
      }),
  },
  setValue: {
    currDropoff: EVENT_STORE_VIEW_SELECTORS.coachFormProp({
      path: ['dropoff', 'placeId'],
    }),
    eventDropoff: ({ dataId }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({
        id: dataId,
        path: ['calculated', 'dropoff', 'placeId'],
      }),
  },
};
