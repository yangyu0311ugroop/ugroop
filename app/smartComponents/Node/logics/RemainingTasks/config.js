import { NODE_STORE_CACHE_KEYS } from 'datastore/nodeStore/cacheKey';
import { NODE_STORE_HELPERS } from 'datastore/nodeStore/helpers';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

// get all tasks belong to OPEN checklists
export const ALL_CHECKLISTS = {
  value: {
    checklists: NODE_STORE_SELECTORS.allChecklistIds,
    statuses: NODE_STORE_SELECTORS.allChecklistStatuses,
    type: NODE_STORE_SELECTORS.type,
    status: NODE_STORE_SELECTORS.status,
  },
};

// count status of those tasks
export const CHECKITEMS_STATUS = {
  value: {
    remainingCompleted: {
      cacheKey: NODE_STORE_CACHE_KEYS.remainingCheckitemsCount,
      keyPath: NODE_STORE_SELECTORS.checklistsStatus,
      props: null,
      getter: NODE_STORE_HELPERS.calculateRemaining,
      spreadObject: true,
    },
    percentage: { getter: NODE_STORE_HELPERS.calculateProgress },
    total: { getter: NODE_STORE_HELPERS.calculateTotal },
  },
  setValue: {
    percentage: NODE_STORE_SELECTORS.percentage,
  },
};
