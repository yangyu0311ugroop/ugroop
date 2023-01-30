import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import {
  EVENT_STORE_DATA_SELECTORS,
  EVENT_STORE_VIEW_SELECTORS,
} from 'datastore/eventStore/selectors';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { TEMPLATE_MANAGEMENT_STORE_SELECTORS } from 'datastore/templateManagementStore/selectors';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';

export const DATA_ID_CONFIG = {
  value: {
    dataId: NODE_STORE_SELECTORS.eventDataId,
    templateId: RESAGA_HELPERS.subscribeIfNotGiven(
      TEMPLATE_MANAGEMENT_STORE_SELECTORS.templateId,
      'templateId',
    ),
  },
  setValue: {},
};

export const CONFIG = {
  value: {
    data: ({ dataId: id }) => EVENT_STORE_DATA_SELECTORS.event({ id }),
    node: NODE_STORE_SELECTORS.node,
    timelineId: ({ templateId }) =>
      NODE_STORE_SELECTORS.calculatedTimelineId({ id: templateId }),
  },
  setValue: {
    eventView: EVENT_STORE_VIEW_SELECTORS.eventView,
    ...PORTAL_HELPERS.setValue,
  },
};
