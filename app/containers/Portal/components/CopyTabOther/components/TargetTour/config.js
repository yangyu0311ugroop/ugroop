import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { NODE_STORE } from 'appConstants';
import { PORTAL_HELPERS } from '../../../../helpers';

export const CONFIG = {
  value: {
    content: ({ targetTourId }) =>
      NODE_STORE_SELECTORS.content({ id: targetTourId }),
    sectionIds: ({ tabId }) => [NODE_STORE, 'nodes', tabId, 'children'],
    targetTabIds: ({ targetTourId }) =>
      NODE_STORE_SELECTORS.children({ id: targetTourId }),
    sourceTabIds: ({ templateId }) =>
      NODE_STORE_SELECTORS.children({ id: templateId }),
    visibleTabIds: ({ targetTourId }) =>
      NODE_STORE_SELECTORS.calculatedVisibleChildren({ id: targetTourId }),
  },
  setValue: {
    tabs: [NODE_STORE, 'nodes'],
    ...PORTAL_HELPERS.setValue,
  },
};
