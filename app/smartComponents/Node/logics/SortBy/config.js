import {
  ASC,
  CREATED_AT,
  DEFAULT_SORT_BY,
  DUE_DATE,
  PERCENTAGE,
} from 'appConstants';
import {
  NODE_STORE_SELECTORS,
  SORT_BY_SELECTORS,
} from 'datastore/nodeStore/selectors';
import { first } from 'lodash';
import momentjs from 'moment';

// select start time value
const calculatedStartTimeValue = id =>
  NODE_STORE_SELECTORS.calculatedStartTimeValue({ id });
const createdAt = id => NODE_STORE_SELECTORS.createdAt({ id });
const percentage = id => NODE_STORE_SELECTORS.percentage({ id });
const sortValue = order => (a, b) => {
  const aValue = first(a);
  const bValue = first(b);

  // asc
  if (order === ASC) {
    if (!bValue) return 1;
    if (!aValue) return -1;

    return aValue > bValue ? 1 : -1;
  }

  // desc
  if (!bValue) return -1;
  if (!aValue) return 1;
  return aValue < bValue ? 1 : -1;
};
const sortTime = order => (a, b) => {
  const aValue = first(a);
  const bValue = first(b);

  // asc
  if (order === ASC) {
    if (!bValue) return 1;
    if (!aValue) return -1;
    return momentjs(first(a)).isAfter(first(b)) ? 1 : -1;
  }

  // desc
  if (!bValue) return -1;
  if (!aValue) return 1;
  return momentjs(first(a)).isBefore(first(b)) ? 1 : -1;
};

const getSelector = sortBy => {
  switch (sortBy) {
    case CREATED_AT:
      return helpers.createdAt;
    case DUE_DATE:
      return helpers.calculatedStartTimeValue;
    case PERCENTAGE:
      return helpers.percentage;
    default:
      return null;
  }
};

const getSortFunction = (sortBy, order) => {
  switch (sortBy) {
    case CREATED_AT:
      return helpers.sortTime(order);
    case DUE_DATE:
      return helpers.sortTime(order);
    case PERCENTAGE:
      return helpers.sortValue(order);
    default:
      return null;
  }
};

export const helpers = {
  percentage,
  createdAt,
  calculatedStartTimeValue,
  getSelector,
  getSortFunction,
  sortTime,
  sortValue,
};

export const SORT_BY = {
  value: {
    sortBy: {
      keyPath: SORT_BY_SELECTORS.sortBy,
      notSetValue: DEFAULT_SORT_BY,
    },
    order: {
      keyPath: SORT_BY_SELECTORS.order,
      notSetValue: ASC,
    },
  },
};

export const ALL_VALUES = {
  value: {
    values: {
      cacheKey: ({ ids, sortBy, order }) =>
        `timeStartValue.${ids.toString()}.${sortBy}.${order}`,
      keyPath: ({ ids, sortBy }) => ids.map(helpers.getSelector(sortBy)),
      props: ({ ids }) => ids,
      getter: (...values) => {
        const ids = values.pop();

        // make array of [value, id]
        return values.map((value, index) => [value, ids[index]]);
      },
    },
    sortedIds: {
      getter: ({ values, sortBy, order }) => {
        const sortFunction = helpers.getSortFunction(sortBy, order);

        return values
          .slice() // clone array
          .sort(sortFunction) // sort array based on first element: value
          .map(value => value[1]); // then return array of second element: id
      },
    },
  },
};
