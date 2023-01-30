import {
  DASHBOARD_VIEW_STORE,
  APP_DATA_CACHE,
  SHARED_TEMPLATES_DATASTORE,
  TEMPLATE_MANAGEMENT_VIEWSTORE,
} from 'appConstants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

export const CONFIG = {
  value: {
    content: NODE_STORE_SELECTORS.content,
    search: [DASHBOARD_VIEW_STORE, 'search'],
    cardImageUrl: ({ id }) => [APP_DATA_CACHE, 'cardImageList', id],
    isSharedTours: [SHARED_TEMPLATES_DATASTORE, 'pageSelected'],
    parentNodeId: NODE_STORE_SELECTORS.parentNodeId,
    searchTemplateView: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'search'],
  },
};

export const CONFIG2 = {
  value: {
    parentParentNodeId: NODE_STORE_SELECTORS.parentParentNodeId,
  },
};
