/**
 * Created by stephenkarpinskyj on 15/8/18.
 */

import { EVENT_STORE_DATA_SELECTORS } from 'datastore/eventStore/selectors';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

const selectEventDataProp = (id, path) =>
  EVENT_STORE_DATA_SELECTORS.eventProp({ id, path });
const selectEventNodeProp = (id, path) =>
  NODE_STORE_SELECTORS.nodeProp({ id, path });

export const CONFIG = {
  value: {
    value: ({ dataId, valuePath }) => selectEventDataProp(dataId, valuePath),
    cityName: ({ dataId, cityNamePath }) =>
      selectEventDataProp(dataId, cityNamePath),
    iataCode: ({ dataId, iataCodePath }) =>
      selectEventDataProp(dataId, iataCodePath),
    timeZoneId: ({ id, timeZoneIdPath }) =>
      selectEventNodeProp(id, timeZoneIdPath),
  },
};
