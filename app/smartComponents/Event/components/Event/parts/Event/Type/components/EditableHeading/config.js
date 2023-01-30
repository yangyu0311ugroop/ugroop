/**
 * Created by stephenkarpinskyj on 20/8/18.
 */

import { EVENT_STORE_VIEW_SELECTORS } from 'datastore/eventStore/selectors';
import { EVENT_PATHS } from 'datastore/eventStore/constants';

export const CONFIG = {
  value: {
    formValue: EVENT_STORE_VIEW_SELECTORS.eventFormProp({
      path: EVENT_PATHS.type,
    }),
  },
  setValue: {
    formValue: EVENT_STORE_VIEW_SELECTORS.eventFormProp({
      path: EVENT_PATHS.type,
    }),
    formSubtype: EVENT_STORE_VIEW_SELECTORS.eventFormProp({
      path: EVENT_PATHS.subtype,
    }),
  },
};
