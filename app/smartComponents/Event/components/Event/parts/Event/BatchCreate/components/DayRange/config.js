/**
 * Created by stephenkarpinskyj on 4/9/18.
 */

import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { EVENT_STORE_VIEW_SELECTORS } from 'datastore/eventStore/selectors';
import { TEMPLATE_MANAGEMENT_STORE_SELECTORS } from 'datastore/templateManagementStore/selectors';

// TODO: Select tabId via dayId's trail instead
export const CONFIG_TAB_ID = () => ({
  value: {
    tabId: TEMPLATE_MANAGEMENT_STORE_SELECTORS.tabId,
  },
});

export const CONFIG_IDS = () => ({
  value: {
    dayIds: NODE_STORE_SELECTORS.cachedChildren({ idProp: 'tabId' }),
    parentNodeId: NODE_STORE_SELECTORS.calculatedTrailParent(),
  },
});

export const CONFIG = () => ({
  value: {
    dayDates: NODE_STORE_SELECTORS.calculatedStartTimeValues({
      idsProp: 'dayIds',
    }),
    formCalculatedStartDayValue: EVENT_STORE_VIEW_SELECTORS.eventFormProp({
      path: NODE_PATHS.calculatedStartTimeValue,
    }),
    formCalculatedEndDayValue: EVENT_STORE_VIEW_SELECTORS.eventFormProp({
      path: NODE_PATHS.calculatedEndTimeValue,
    }),
  },
});
