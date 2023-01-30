import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { TEMPLATE_MANAGEMENT_VIEWSTORE } from 'appConstants';

export const CONFIG_TAB_ID = {
  value: {
    tabId: ({ templateId }) =>
      NODE_STORE_SELECTORS.calculatedTimelineId({ id: templateId }),
  },
};

export const CONFIG = {
  value: {
    startDate: ({ templateId }) =>
      NODE_STORE_SELECTORS.startDate({ id: templateId }),
    displayDate: ({ templateId }) =>
      NODE_STORE_SELECTORS.displayDate({ id: templateId }),
    weekDay: ({ templateId }) =>
      NODE_STORE_SELECTORS.weekDay({ id: templateId }),
    duration: ({ templateId }) =>
      NODE_STORE_SELECTORS.duration({ id: templateId }),
    dayIds: ({ tabId }) => NODE_STORE_SELECTORS.children({ id: tabId }),
  },
  setValue: {
    selectedId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'selectedId'],
  },
};
