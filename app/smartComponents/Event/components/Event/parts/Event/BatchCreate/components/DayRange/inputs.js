/**
 * Created by stephenkarpinskyj on 4/9/18.
 */

import { EVENT_STORE_HELPERS } from 'datastore/eventStore/helpers';
import { EVENT_PATHS } from 'datastore/eventStore/constants';

export default {
  tempDayRange: {
    name: EVENT_STORE_HELPERS.pathToEventInputName(EVENT_PATHS.tempDayRange),
  },
};
