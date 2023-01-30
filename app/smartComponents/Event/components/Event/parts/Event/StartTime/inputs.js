/**
 * Created by stephenkarpinskyj on 5/8/18.
 */

import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { NODE_STORE_HELPERS } from 'datastore/nodeStore/helpers';

export default {
  value: {
    name: NODE_STORE_HELPERS.pathToNodeInputName(NODE_PATHS.startTimeValue),
  },
  mode: {
    name: NODE_STORE_HELPERS.pathToNodeInputName(NODE_PATHS.startTimeMode),
  },
  timeZoneId: {
    name: NODE_STORE_HELPERS.pathToNodeInputName(NODE_PATHS.startTimeZoneId),
  },
  timeZoneName: {
    name: NODE_STORE_HELPERS.pathToNodeInputName(NODE_PATHS.startTimeZoneName),
  },
  tempDay: {
    name: NODE_STORE_HELPERS.pathToNodeInputName(NODE_PATHS.tempStartDay),
  },
  tempTime: {
    name: NODE_STORE_HELPERS.pathToNodeInputName(NODE_PATHS.tempStartTime),
  },
  tempMode: {
    name: NODE_STORE_HELPERS.pathToNodeInputName(NODE_PATHS.tempStartMode),
  },
  timeZoneOffset: {
    name: NODE_STORE_HELPERS.pathToNodeInputName(
      NODE_PATHS.startTimeZoneOffset,
    ),
  },
};
