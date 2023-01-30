/**
 * Created by stephenkarpinskyj on 8/10/18.
 */

import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { EVENT_STORE_VIEW_SELECTORS } from 'datastore/eventStore/selectors';

export const CONFIG = {
  value: {},
  setValue: {
    eventCreate: EVENT_STORE_VIEW_SELECTORS.eventCreate,
    ...PORTAL_HELPERS.setValue,
  },
};
