import { NODE_STORE_CACHE_KEYS } from 'datastore/nodeStore/cacheKey';
import { NODE_STORE_HELPERS } from 'datastore/nodeStore/helpers';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

export const ALL_CHECKLISTS = {
  value: {
    id: NODE_STORE_SELECTORS.checklists,
  },
};

export const CHECKITEMS_STATUS = {
  value: {
    openClosed: {
      cacheKey: NODE_STORE_CACHE_KEYS.openClosedCount,
      keyPath: NODE_STORE_SELECTORS.allStatuses,
      props: null,
      getter: NODE_STORE_HELPERS.calculateOpenClosed,
      spreadObject: true,
    },
  },
};
