import { NODE_STORE } from 'appConstants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
export const CONFIG = {
  value: {
    tabId: ({ templateId, activeTabIndex }) => [
      NODE_STORE,
      'nodes',
      templateId,
      'visibleChildren',
      activeTabIndex,
    ],
    tabs: ({ templateId }) =>
      NODE_STORE_SELECTORS.calculatedVisibleChildren({ id: templateId }),
  },
};
