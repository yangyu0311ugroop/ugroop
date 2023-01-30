import { ASC, DEFAULT_SORT_BY } from 'appConstants';
import { SORT_BY_SELECTORS } from 'datastore/nodeStore/selectors';

export const CONFIG = {
  value: {
    currentSortBy: {
      keyPath: SORT_BY_SELECTORS.sortBy,
      notSetValue: DEFAULT_SORT_BY,
    },
    currentOrder: {
      keyPath: SORT_BY_SELECTORS.order,
      notSetValue: ASC,
    },
  },
  setValue: {
    sortBy: SORT_BY_SELECTORS.sortBy,
    order: SORT_BY_SELECTORS.order,
  },
};
