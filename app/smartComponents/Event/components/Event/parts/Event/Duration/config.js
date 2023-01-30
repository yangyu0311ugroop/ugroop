/**
 * Created by stephenkarpinskyj on 21/8/18.
 */

import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { EVENT_STORE_VIEW_SELECTORS } from 'datastore/eventStore/selectors';
import { EVENT_PATHS } from 'datastore/eventStore/constants';

export const CONFIG = () => ({
  value: {
    startTimeMoment: NODE_STORE_SELECTORS.calculatedStartTimeMoment(),
    startMode: ({ id }) =>
      NODE_STORE_SELECTORS.nodeProp({ id, path: NODE_PATHS.startTimeMode }),
    endTime: ({ id }) =>
      NODE_STORE_SELECTORS.nodeProp({ id, path: NODE_PATHS.endTimeValue }),
    endTimeMoment: NODE_STORE_SELECTORS.calculatedEndTimeMoment(),
    endMode: ({ id }) =>
      NODE_STORE_SELECTORS.nodeProp({ id, path: NODE_PATHS.endTimeMode }),
    formType: EVENT_STORE_VIEW_SELECTORS.eventFormProp({
      path: EVENT_PATHS.type,
    }),
    formSubtype: EVENT_STORE_VIEW_SELECTORS.eventFormProp({
      path: EVENT_PATHS.subtype,
    }),
  },
});
