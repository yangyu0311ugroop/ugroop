/**
 * Created by stephenkarpinskyj on 21/8/18.
 */

import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { EVENT_STORE_VIEW_SELECTORS } from 'datastore/eventStore/selectors';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';

export const CONFIG_TAB_ID = {
  value: {
    tabId: {
      keyPath: RESAGA_HELPERS.mapToId(
        NODE_STORE_SELECTORS.calculatedTimelineId,
        'templateId',
      ),
      props: ({ tabId }) => tabId,
      getter: (timelineId, tabId) => tabId || timelineId,
    },
  },
};

export const CONFIG_IDS = {
  value: {
    dayIds: NODE_STORE_SELECTORS.cachedChildren({ idProp: 'tabId' }),
    parentNodeId: NODE_STORE_SELECTORS.calculatedTrailParent(),
  },
};

export const CONFIG = {
  value: {
    dayDates: NODE_STORE_SELECTORS.calculatedStartTimeValues({
      idsProp: 'dayIds',
    }),
    formBatchCreate: EVENT_STORE_VIEW_SELECTORS.eventFormProp({
      path: EVENT_PATHS.batchCreate,
    }),
  },
};
