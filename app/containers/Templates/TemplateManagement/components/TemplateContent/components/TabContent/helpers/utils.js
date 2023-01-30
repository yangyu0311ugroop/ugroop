import { findIndex, merge as lodashMerge, slice } from 'lodash';

const isNotMoving = ({ id, toBeMovedId } = {}) => id === toBeMovedId;

const isMovingAcross = ({ parentId, toBeMovedParentId } = {}) =>
  parentId !== toBeMovedParentId;

const isMovingInside = ({ id, action } = {}) => !id && action === 'MOVE_INSIDE';

const removeAt = (array = [], position) => [
  ...slice(array, 0, position),
  ...slice(array, position + 1),
];

const replaceAt = (array = [], position, value) => [
  ...slice(array, 0, position),
  value,
  ...slice(array, position + 1),
];

const insertTo = (array = [], position = array.length, value) => [
  ...slice(array, 0, position),
  value,
  ...slice(array, position),
];

const merge = (payload, ...others) => {
  let photos = {};
  // check if image is uploaded in custom data
  if (payload && payload.customData && payload.customData.photo) {
    photos = { photos: [{ content: payload.customData.photo }] };
  }

  return lodashMerge({}, payload, photos, ...others);
};

const checkRoot = (array, predicate, action, node, offset = 0) => {
  const index = findIndex(array, predicate);
  if (index === -1) {
    // not found, do nothing
    return array;
  }

  return action(array, index + offset, node);
};

const checkChildren = (array, predicate, subAction, action) => {
  // find in sub-level
  const index = findIndex(array, predicate);
  if (index === -1) {
    // not found, do nothing
    return array;
  }

  const { children, ...origin } = array[index];

  // insert to origin.children then replace it in origin
  const newChildren = subAction(children);
  const updatedOrigin = { ...origin, children: newChildren };

  // replace origin with updated one
  return action(array, index, updatedOrigin);
};

// compare 2 nodes by their IDs
const equaliser = (array2 = []) => (node1, index) =>
  array2[index] && node1 ? node1.id !== array2[index].id : true;

export default {
  isNotMoving,
  isMovingAcross,
  isMovingInside,
  removeAt,
  replaceAt,
  insertTo,
  merge,
  checkRoot,
  checkChildren,
  equaliser,
};
