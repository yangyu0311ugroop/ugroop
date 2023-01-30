/**
 * Created by stephenkarpinskyj on 3/9/18.
 */

import { EVENT_STORE_HELPERS } from 'datastore/eventStore/helpers';
import { EVENT_PATHS } from 'datastore/eventStore/constants';

export default {
  batchCreate: {
    name: EVENT_STORE_HELPERS.pathToEventInputName(EVENT_PATHS.batchCreate),
    label: 'Create single-day activities across a range of days?',
  },
};
