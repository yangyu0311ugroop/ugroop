/**
 * Created by stephenkarpinskyj on 5/4/18.
 */

import _ from 'lodash';

const remove = (array, value) => {
  const index = array.indexOf(value);
  if (index >= 0) {
    return removeAt(array, index);
  }
  return array;
};

const removeAt = (array, index) => [
  ..._.slice(array, 0, index),
  ..._.slice(array, index + 1),
];

const insertAt = (array, index, element) => [
  ..._.slice(array, 0, index),
  element,
  ..._.slice(array, index),
];

const mergeAppending = (array, array2) => {
  let result = array || [];

  if (array2) {
    array2.forEach(e => {
      const exists = array && array.indexOf(e) !== -1;
      if (!exists) {
        result = insertAt(result, result.length, e);
      }
    });
  }

  return result;
};

const mergePrepending = (array, array2) => {
  let result = array || [];

  if (array2) {
    array2.forEach(e => {
      const exists = array && array.indexOf(e) !== -1;
      if (!exists) {
        result = insertAt(result, 0, e);
      }
    });
  }

  return result;
};

const length = array => (Array.isArray(array) ? array.length : undefined);

const caches = {};
const EMPTY_ARRAY = [];

const arrayIfNot = arg => {
  if (arg) {
    if (Array.isArray(arg)) {
      return arg;
    }
    const key = typeof arg === 'object' ? JSON.stringify(arg) : arg;
    if (!caches[key]) {
      caches[key] = [arg];
    }
    return caches[key];
  }
  return EMPTY_ARRAY;
};

/*
 * these array comparision is only suitable for array contains primitive type
 * ex: isSame(['11','22'], ['aa']);
 * */
const isSame = (a1, a2) => {
  if (!a1 || !a2) return false;
  let res;
  if ((a1 && a1.length) >= (a2 && a2.length)) {
    res = _.difference(a1, a2);
  } else {
    res = _.difference(a2, a1);
  }
  if (res && res.length > 0) {
    return false;
  }
  return true;
};

const uniq = array => _.uniq(_.compact(array));

export const ARRAY_HELPERS = {
  remove,
  removeAt,
  insertAt,
  mergeAppending,
  mergePrepending,
  length,
  arrayIfNot,
  uniq,
  isSame,
};

export default ARRAY_HELPERS;
