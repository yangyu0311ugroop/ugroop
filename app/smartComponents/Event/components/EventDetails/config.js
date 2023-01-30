import { TEMPLATE_MANAGEMENT_STORE_SELECTORS } from 'datastore/templateManagementStore/selectors';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import {
  EVENT_STORE_VIEW_SELECTORS,
  EVENT_STORE_DATA_SELECTORS,
} from 'datastore/eventStore/selectors';

export const CONFIG_ID = {
  value: {
    dataId: NODE_STORE_SELECTORS.eventDataId,
    templateId: TEMPLATE_MANAGEMENT_STORE_SELECTORS.templateId,
  },
};

export const CONFIG = {
  value: {
    event: EVENT_STORE_DATA_SELECTORS.cachedEvent,
    active: NODE_STORE_SELECTORS.calculatedActive,
    calculatedStartTime: NODE_STORE_SELECTORS.calculatedStartTimeMoment(),
    calculatedEndTime: NODE_STORE_SELECTORS.calculatedEndTimeMoment,
    calculatedTimeMode: NODE_STORE_SELECTORS.calculatedEndTimeMode,
  },
  setValue: {
    eventView: EVENT_STORE_VIEW_SELECTORS.eventView,
    active: NODE_STORE_SELECTORS.calculatedActive,
  },
};
