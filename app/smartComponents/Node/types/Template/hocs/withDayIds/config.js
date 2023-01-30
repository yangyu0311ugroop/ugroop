import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { TEMPLATE_MANAGEMENT_STORE_SELECTORS } from 'datastore/templateManagementStore/selectors';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';

export const TEMPLATE_ID_CONFIG = {
  value: {
    templateId: RESAGA_HELPERS.subscribeIfNotGiven(
      TEMPLATE_MANAGEMENT_STORE_SELECTORS.templateId,
      'templateId',
    ),
  },
};

export const TAB_ID_CONFIG = {
  value: {
    tabId: ({ templateId }) =>
      NODE_STORE_SELECTORS.calculatedTimelineId({ id: templateId }),
  },
};

export const CONFIG = {
  value: {
    dayIds: ({ tabId }) => NODE_STORE_SELECTORS.children({ id: tabId }),
  },
  setValue: {},
};
