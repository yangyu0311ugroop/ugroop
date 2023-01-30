/**
 * Created by stephenkarpinskyj on 5/8/18.
 */

import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { NODE_STORE_HELPERS } from 'datastore/nodeStore/helpers';

export default {
  value: {
    name: NODE_STORE_HELPERS.pathToNodeInputName(NODE_PATHS.endTimeValue),
  },
  mode: {
    name: NODE_STORE_HELPERS.pathToNodeInputName(NODE_PATHS.endTimeMode),
  },
  timeZoneId: {
    name: NODE_STORE_HELPERS.pathToNodeInputName(NODE_PATHS.endTimeZoneId),
  },
  timeZoneName: {
    name: NODE_STORE_HELPERS.pathToNodeInputName(NODE_PATHS.endTimeZoneName),
  },
  tempDay: {
    name: NODE_STORE_HELPERS.pathToNodeInputName(NODE_PATHS.tempEndDay),
  },
  tempTime: {
    name: NODE_STORE_HELPERS.pathToNodeInputName(NODE_PATHS.tempEndTime),
  },
  tempMode: {
    name: NODE_STORE_HELPERS.pathToNodeInputName(NODE_PATHS.tempEndMode),
  },
  timeZoneOffset: {
    name: NODE_STORE_HELPERS.pathToNodeInputName(NODE_PATHS.endTimeZoneOffset),
  },
};
