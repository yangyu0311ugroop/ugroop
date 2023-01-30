import React from 'react';
import dotProp from 'dot-prop-immutable';
import { ARRAY_HELPERS } from 'utils/helpers/arrays';

export const ARRAY_MODE = {
  /**
   * Replace array.
   */
  SET: 'set',

  /**
   * Append any new array items.
   */
  APPEND: 'append',

  /**
   * Prepend any new array items.
   */
  PREPEND: 'prepend',
};

/**
 * Upsert an object into the store
 * @param toUpsert Object to upsert
 * @param set Whether to set entire object, else shallow merge object's properties
 */
const object = (toUpsert, set) => (store = {}) => {
  if (set) {
    return toUpsert;
  }

  if (toUpsert) {
    return dotProp.merge({ '': store }, '', toUpsert)[''];
  }

  return store;
};

/**
 * Upsert an array into the store
 * @param toUpsert Array to upsert
 * @param mode Method to upsert array items
 * @see ARRAY_MODE
 */
const array = (toUpsert, mode = ARRAY_MODE.APPEND) => (store = []) => {
  const toUpsertArray = ARRAY_HELPERS.arrayIfNot(toUpsert);

  if (mode === ARRAY_MODE.SET) {
    return toUpsertArray;
  }

  if (toUpsert) {
    if (mode === ARRAY_MODE.APPEND) {
      return ARRAY_HELPERS.mergeAppending(store, toUpsertArray);
    }

    if (mode === ARRAY_MODE.PREPEND) {
      return ARRAY_HELPERS.mergePrepending(store, toUpsertArray);
    }
  }

  return store;
};

/**
 * Deeply upsert object or array into the store
 * @param toUpsert Object or array to upsert
 * @param arrayMode How to upsert arrays
 * @see ARRAY_MODE
 */
const deepMerge = (toUpsert, arrayMode = ARRAY_MODE.APPEND) => store => {
  if (toUpsert) {
    if (React.isValidElement(toUpsert)) {
      return toUpsert;
    }

    if (toUpsert instanceof Array) {
      const data = store || [];
      // const arr = toUpsert.map((e) => deepMerge(e, arrayMode)(data)); // TODO
      return array(toUpsert, arrayMode)(data);
    }

    if (typeof toUpsert === 'object') {
      const data = store || {};
      return {
        ...Object.entries(toUpsert).reduce((newData, [key, value]) => {
          // Avoid dotProp executing function when we only want to set it
          if (typeof value === 'function') {
            return Object.assign({}, newData, { [key]: value });
          }
          return dotProp.set(
            newData,
            `${key}`,
            deepMerge(value, arrayMode)(newData[key]),
          );
        }, data),
      };
    }
  }

  if (toUpsert === undefined) {
    return store;
  }

  return toUpsert;
};

export default {
  object,
  array,
  deepMerge,
};
