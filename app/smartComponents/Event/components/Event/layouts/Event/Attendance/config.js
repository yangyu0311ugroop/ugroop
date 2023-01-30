/**
 * Created by stephenkarpinskyj on 9/11/18.
 */

import { EVENT_STORE_DATA_SELECTORS } from 'datastore/eventStore/selectors';

export const CONFIG = () => ({
  value: {
    hasAttendance: EVENT_STORE_DATA_SELECTORS.hasAttendance(),
  },
});
