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
        path: NODE_PATHS.startTimeZoneId,
      }),
    name: ({ dataId }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({
        id: dataId,
        path: EVENT_PATHS.transportationDetailStartName,
      }),
    placeId: ({ dataId }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({
        id: dataId,
        path: EVENT_PATHS.transportationDetailStartPlaceId,
      }),
    icon: ({ dataId }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({
        id: dataId,
        path: EVENT_PATHS.transportationDetailStartIcon,
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
  },
};
