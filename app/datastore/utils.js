import dotProp from 'dot-prop-immutable';
import omit from 'lodash/omit';
import without from 'lodash/without';
import { merge, get, union, findIndex } from 'lodash';

// sometimes we cannot use dotProp.merge as key might contain `.` (a dot) i.e. in email
// this problem will be resolved once we migrate to using userId instead of email
const upsertByKey = (key, value) => (store = {}) => ({
  ...store,
  [key]: typeof value === 'object' ? merge({}, store[key], value) : value,
});

const upsertObject = (data, value) => store => {
  if (typeof data !== 'object') {
    // user called upsertObject(key, value)
    return upsertByKey(data, value)(store);
  }

  return Object.keys(data).reduce(
    (newStore, key) => upsertByKey(key, data[key])(newStore),
    store,
  );
};

const updateSpecificObjectAttribute = (
  attributeName,
  attributeNewValue,
  path = '',
) => store => {
  if (path === '') {
    return { ...store, [attributeName]: attributeNewValue };
  }

  return {
    ...store,
    [path]: { ...store[path], [attributeName]: attributeNewValue },
  };
};

const upsertArray = (path, value, opts = {}) => (store = {}) => {
  const values = Array.isArray(value) ? value : [value];

  if (path === '') {
    return opts.isAppendedFirst ? union(values, store) : union(store, values);
  }

  const newValues = opts.isAppendedFirst
    ? union(values, get(store, path, []))
    : union(get(store, path, []), values);

  return dotProp.set(store, path, newValues);
};

const updateAttribute = (path, value) => store =>
  dotProp.set(store, path, value);

const upsertArrayInsideObj = (
  objId,
  attributeName,
  newValue,
  opts = { isReversed: true },
) => store => {
  const value = Array.isArray(newValue) ? newValue : [newValue];
  const oldArr = store[objId][attributeName];
  const oldObj = store[objId];
  let newArray = union(oldArr, value);
  if (opts.isReversed) {
    newArray = union(value, oldArr);
  }
  return { ...store, [objId]: { ...oldObj, [attributeName]: newArray } };
};

const upsertObjIntoArray = (obj, array, filter = undefined) => {
  const index = findIndex(array, filter);
  if (isEmptyObj(filter) || index === -1) {
    array.push(obj);
  } else {
    array.splice(index, 1, obj);
  }
  return array;
};

const removeObjFromArray = (array, filter) => {
  const index = findIndex(array, filter);
  if (index > -1) {
    array.splice(index, 1);
  }
  return array;
};

const removeIdInArrayInsideObject = (
  idToBeRemoved,
  path,
  attributeName,
) => store => {
  const ids = Array.isArray(idToBeRemoved) ? idToBeRemoved : [idToBeRemoved];
  return {
    [path]: {
      ...store[path],
      [attributeName]: store[path][attributeName].filter(
        id => !ids.includes(id),
      ),
    },
  };
};

const removeObjectById = (...idsToBeRemoved) => store =>
  omit(store, [...idsToBeRemoved]);

const removeItemsArray = (path, ...values) => store =>
  dotProp.set(store, path, without(dotProp.get(store, path), ...values));

const removeItemsInArray = (...idsToBeRemoved) => (ids = []) => {
  const toBeRemovedIds = [...idsToBeRemoved];
  return ids.filter(id => !toBeRemovedIds.includes(id));
};

const removeItemsInArrayById = (
  id,
  pathToArray,
  ...idsToBeRemoved
) => store => {
  const toBeRemovedIds = [...idsToBeRemoved];
  return {
    ...store,
    [id]: {
      ...store[id],
      [pathToArray]: store[id][pathToArray].filter(
        itemId => !toBeRemovedIds.includes(itemId),
      ),
    },
  };
};

const isEmptyObj = obj => {
  if (obj === undefined) {
    return true;
  }
  return Object.keys(obj).length === 0;
};

const updateObject = (data, filter) => storeData => {
  const existedData = storeData.slice();
  const index = findIndex(existedData, filter);
  if (index !== -1) {
    existedData.splice(index, 1, data);
    return existedData;
  }
  return existedData;
};
/**
 * Converts an object of id/objects to an array of id's
 */
const getObjectIds = (obj, { number = true } = {}) => {
  if (!obj) return [];
  const keys = Object.keys(obj);
  if (number) return keys.map(id => Number.parseInt(id, 10));
  return keys;
};

const upsert = (item, defaultData) => (data = defaultData) => {
  if (Array.isArray(data)) {
    return data.indexOf(item) === -1 ? data.concat(item) : data;
  }

  if (typeof data === 'object') {
    return upsertObject(item)(data);
  }

  return data;
};

const remove = (id, defaultData) => (data = defaultData) => {
  if (Array.isArray(data)) {
    return data.indexOf(id) !== -1
      ? dotProp.delete(data, data.indexOf(id))
      : data;
  }

  if (typeof data === 'object') {
    return dotProp.delete(data, id);
  }

  return data;
};

const incrementValue = key => storeData => {
  const copy = Object.assign(storeData, {});
  let oldValue = storeData[key];
  if (oldValue) {
    oldValue += 1;
    copy[key] = oldValue;
  } else {
    copy[key] = 1;
  }
  return copy;
};

const decrementValue = key => storeData => {
  const copy = Object.assign(storeData, {});
  let oldValue = storeData[key];
  if (oldValue) {
    oldValue -= 1;
    copy[key] = oldValue;
  } else {
    copy[key] = 0;
  }
  return copy;
};

const arrayAdd = item => upsert(item, []);
const objectAdd = item => upsert(item, {});
const objectUpdate = item => upsert(item, {});
const arrayRemove = item => remove(item, []);
const objectRemove = item => remove(item, {});
const toggle = value => !value;

export const DATA_HELPERS = {
  arrayAdd,
  objectAdd,
  objectUpdate,
  arrayRemove,
  objectRemove,
  toggle,
};

export default {
  updateObject,
  upsertObject,
  upsertArray,
  upsertObjIntoArray,
  upsertArrayInsideObj,
  updateSpecificObjectAttribute,
  removeIdInArrayInsideObject,
  removeObjectById,
  removeItemsInArray,
  removeItemsInArrayById,
  removeItemsArray,
  removeObjFromArray,
  updateAttribute,
  getObjectIds,
  incrementValue,
  decrementValue,
};
