/**
 * Created by stephenkarpinskyj on 4/9/18.
 */

import { EVENT_STORE_VIEW_SELECTORS } from 'datastore/eventStore/selectors';
import { EVENT_PATHS } from 'datastore/eventStore/constants';

export const CONFIG = {
  value: {
    formBatchCreate: EVENT_STORE_VIEW_SELECTORS.eventFormProp({
      path: EVENT_PATHS.batchCreate,
    }),
  },
  setValue: {
    formBatchCreate: EVENT_STORE_VIEW_SELECTORS.eventFormProp({
      path: EVENT_PATHS.batchCreate,
    }),
  },
};
