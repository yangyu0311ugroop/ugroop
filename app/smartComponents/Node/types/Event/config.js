import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import {
  EVENT_STORE_DATA_SELECTORS,
  EVENT_STORE_VIEW_SELECTORS,
} from 'datastore/eventStore/selectors';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { TEMPLATE_MANAGEMENT_STORE_SELECTORS } from 'datastore/templateManagementStore/selectors';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';

export const CONFIG = {
  value: {
    dataId: NODE_STORE_SELECTORS.eventDataId,
    templateId: RESAGA_HELPERS.subscribeIfNotGiven(
      TEMPLATE_MANAGEMENT_STORE_SELECTORS.templateId,
      'templateId',
    ),
  },
  setValue: {},
};

export const CONFIG_EVENT_DATA = {
  value: {
    event: ({ dataId: id }) => EVENT_STORE_DATA_SELECTORS.event({ id }),
    tabId: ({ templateId }) =>
      NODE_STORE_SELECTORS.calculatedTimelineId({ id: templateId }),
    vicinity: NODE_STORE_SELECTORS.vicinity,
    startTimeMode: NODE_STORE_SELECTORS.customDataStartMode,
    startTimeValue: NODE_STORE_SELECTORS.customDataStartValue,
    type: NODE_STORE_SELECTORS.type,
  },
  setValue: {
    eventView: EVENT_STORE_VIEW_SELECTORS.eventView,
    ...PORTAL_HELPERS.setValue,
  },
};
