import dropRight from 'lodash/dropRight';
import sortBy from 'lodash/sortBy';
import { get, difference, findIndex, find, cloneDeep, map } from 'lodash';
import takeRight from 'lodash/takeRight';
import zip from 'lodash/zip';
import { PARTICIPANT } from 'utils/modelConstants';

// for sorting of participants
const sortByKind = firstItem => {
  if (firstItem[1] === PARTICIPANT) return 1;

  return -1;
};
const sortArrayItems = (order = 'asc') => (firstItem, secondItem) => {
  if (order.toLowerCase() === 'asc') {
    if (firstItem[1] > secondItem[1]) {
      return 1;
    }

    if (firstItem[1] < secondItem[1]) {
      return -1;
    }

    return 0;
  }

  // desc order
  if (firstItem[1] < secondItem[1]) {
    return 1;
  }

  if (firstItem[1] > secondItem[1]) {
    return -1;
  }

  return 0;
};

const sortFolderItemsByName = (order = 'asc') => (firstItem, secondItem) => {
  if (order.toLowerCase() === 'asc') {
    if (firstItem.content > secondItem.content) {
      return 1;
    }

    if (firstItem.content < secondItem.content) {
      return -1;
    }

    return 0;
  }

  // desc order
  if (firstItem.content < secondItem.content) {
    return 1;
  }

  if (firstItem.content > secondItem.content) {
    return -1;
  }

  return 0;
};

const sorterConfig = (
  sortField,
  sortFunction,
  {
    sortFieldKey = 'sortField',
    sortFunctionKey = 'sortFunction',
    cacheKey = 'store',
    selectorCreator,
  } = {},
) => ({
  keyPath: ({ ids }) => ids.map(id => selectorCreator(sortField)({ id })),
  cacheKey: ({ ids }) =>
    `${cacheKey}.${
      ids ? ids.toString() : null
    }.${sortFieldKey}.${sortFunctionKey}.sort`,
  props: ({ ids }) => ids,
  getter: (...args) => {
    const sortBasis = dropRight(args, 1);
    const [ids] = takeRight(args, 1);
    const unsorted = zip(ids, sortBasis);

    if (ids.length === 0) return [];

    return sortBy(unsorted, sortFunction).map(([id]) => id);
  },
});

// Make the value with true always first
const sortBool = ([, value]) => !value;

const sortValue = ([, value]) => (value ? value.toLowerCase() : value);

const sortObjectValue = target => o => get(o, target, '');

export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};

export const sortBasedOnOtherArray = (sortedValues, arrayObjs, key) => {
  if (!sortedValues) return arrayObjs;
  const cloneSortedValues = cloneDeep(sortedValues);
  const flattenValues = map(arrayObjs, o => o[key]);
  const diff = difference(sortedValues, flattenValues);
  const diff2 = difference(flattenValues, sortedValues);
  if (diff && diff.length > 0) {
    const diffValue = diff[0];
    const replaceValue = diff2[0];
    const index = findIndex(sortedValues, o => o === diffValue);
    cloneSortedValues[index] = replaceValue;
    return cloneSortedValues.map(o => find(arrayObjs, i => i[key] === o));
  }
  return cloneSortedValues.map(o => find(arrayObjs, i => i[key] === o));
};

export const SORT_HELPERS = {
  sortFolderItemsByName,
  sortArrayItems,
  sortBool,
  sortValue,
  sorterConfig,
  sortObjectValue,
  sortBasedOnOtherArray,
  sortByKind,
};

export default {
  sortFolderItemsByName,
};
