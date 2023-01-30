/**
 * Created by stephenkarpinskyj on 16/8/18.
 */

import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { EVENT_STORE_HELPERS } from 'datastore/eventStore/helpers';

export default {
  subtype: {
    name: EVENT_STORE_HELPERS.pathToEventInputName(EVENT_PATHS.subtype),
  },
};
