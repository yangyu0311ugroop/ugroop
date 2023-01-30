/**
 * Created by stephenkarpinskyj on 10/9/18.
 */

import {
  EVENT_STORE_DATA_SELECTORS,
  EVENT_STORE_VIEW_SELECTORS,
} from 'datastore/eventStore/selectors';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { EVENT_PATHS } from 'datastore/eventStore/constants';

const selectEventDataProp = (id, path) =>
  EVENT_STORE_DATA_SELECTORS.eventProp({ id, path });
const selectEventNodeProp = (id, path) =>
  NODE_STORE_SELECTORS.nodeProp({ id, path });

export const CONFIG = {
  value: {
    value: ({ dataId, valuePath }) => selectEventDataProp(dataId, valuePath),
    icon: ({ dataId, iconPath }) => selectEventDataProp(dataId, iconPath),
    placeId: ({ dataId, placeIdPath }) =>
      selectEventDataProp(dataId, placeIdPath),
    timeZoneId: ({ id, timeZoneIdPath }) =>
      selectEventNodeProp(id, timeZoneIdPath),
    startPlaceId: ({ dataId }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({
        id: dataId,
        path: EVENT_PATHS.transportationDetailStartPlaceId,
      }),
    startName: ({ dataId }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({
        id: dataId,
        path: EVENT_PATHS.transportationDetailStartName,
      }),
    endPlaceId: ({ dataId }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({
        id: dataId,
        path: EVENT_PATHS.transportationDetailEndPlaceId,
      }),
    endName: ({ dataId }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({
        id: dataId,
        path: EVENT_PATHS.transportationDetailEndName,
      }),
    activityDetails: ({ dataId }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({
        id: dataId,
        path: EVENT_PATHS.activityDetails,
      }),
  },
};

export const CONFIG_2 = {
  value: {
    values: {
      keyPath: ({ activityDetails = [] }) =>
        activityDetails.map(id =>
          EVENT_STORE_DATA_SELECTORS.activityDetailProp({
            id,
            path: EVENT_PATHS.activityDetailValue,
          }),
        ),
      cacheKey: ({ activityDetails }) =>
        `smartComponents.Event.Location.${
          activityDetails ? activityDetails.toString() : null
        }.value`,
      props: ({ activityDetails }) => activityDetails,
      getter: (...values) => values.filter(value => !!value),
    },
  },
  setValue: {
    formPlaceId: EVENT_STORE_VIEW_SELECTORS.eventFormProp({
      path: 'location',
    }),
  },
};
