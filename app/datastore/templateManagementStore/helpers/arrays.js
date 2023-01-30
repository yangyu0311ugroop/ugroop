/**
 * Created by quando on 28/8/17.
 */
import { find, findIndex, indexOf, reject, some } from 'lodash';
import dotProp from 'dot-prop-immutable';
import utils from './utils';

const convertToArray = (children, onShouldConvertAll, onUpdate) => {
  const array = [];
  if (children) {
    const handleShouldConvertAll = onShouldConvertAll
      ? onShouldConvertAll(children)
      : false;
    const handleUpdate =
      onUpdate ||
      ((parent, convertedChildren) =>
        convertedChildren && convertedChildren.length
          ? dotProp.set(parent, 'children', convertedChildren)
          : parent);

    for (let i = 0; i < children.length; i += 1) {
      const subArray = [];
      let next = children[i];

      while (next) {
        let prev = next;
        next = next.nextNodes && next.nextNodes[0];
        const converted = convertToArray(
          prev.children,
          onShouldConvertAll,
          onUpdate,
        );
        prev = handleUpdate(prev, converted);
        prev = dotProp.set(prev, 'nextNodes', []);
        subArray.push(prev);
      }

      if (handleShouldConvertAll) {
        array.push(subArray);
      } else {
        return subArray;
      }
    }
  }
  return array;
};

const convertChecklistsToArray = checklists => {
  const array = [];
  if (checklists) {
    for (let i = 0; i < checklists.length; i += 1) {
      let next = checklists[i];

      while (next) {
        let prev = next;
        next = next.nextNodes && next.nextNodes[0];
        const converted = convertToArray(prev.checklists);
        prev = dotProp.set(prev, 'checklists', converted);
        prev = dotProp.set(prev, 'nextNodes', []);
        array.push(prev);
      }
    }
  }
  return array;
};

const convertNextNodesToArray = nodes => {
  if (!nodes) return [];

  if (!Array.isArray(nodes)) {
    return convertNextNodesToArray([nodes])[0];
  }

  const children = nodes;
  const array = [];

  for (let i = 0; i < children.length; i += 1) {
    let next = children[i];

    while (next) {
      const prev = next;

      // only handle 1 nextNode
      next = next.nextNodes && next.nextNodes[0];
      prev.children = convertNextNodesToArray(prev.children);

      // clean up nextNodes
      prev.nextNodes = [];

      array.push(prev);
    }
  }

  return array;
};

// immutable function
// support 2 types of payload: either wrap in { nodes } or spread to root { ...rest }
const update = (result, { parentId, node, ...rest } = {}) => array => {
  const origin = find(array, { id: result.id });
  const newNode = utils.merge(origin, node || rest, result);
  if (!parentId) {
    return utils.checkRoot(array, { id: result.id }, utils.replaceAt, newNode);
  }

  const predicate = { id: parentId };
  return utils.checkChildren(
    array,
    predicate,
    update(newNode, predicate),
    utils.replaceAt,
  );
};

// immutable function
const insert = (result, { parentId, node } = {}) => (array = []) => {
  const newNode = utils.merge(node, result);

  if (!parentId) {
    return array.concat(newNode);
  }

  const predicate = { id: parentId };
  return utils.checkChildren(
    array,
    predicate,
    insert(newNode, predicate),
    utils.replaceAt,
  );
};

// immutable function
const insertAfter = (result, { id, parentId, node } = {}) => array => {
  const newNode = utils.merge(node, result);
  const predicate = { id };

  if (!parentId) {
    return utils.checkRoot(array, predicate, utils.insertTo, newNode, 1);
  }

  return utils.checkChildren(
    array,
    { id: parentId },
    insertAfter(newNode, predicate),
    utils.replaceAt,
  );
};

// immutable function
const insertBefore = (result, { id, parentId, node } = {}) => array => {
  const newNode = utils.merge(node, result);
  const predicate = { id };

  if (!parentId) {
    return utils.checkRoot(array, predicate, utils.insertTo, newNode);
  }

  return utils.checkChildren(
    array,
    { id: parentId },
    insertBefore(newNode, predicate),
    utils.replaceAt,
  );
};

// immutable function
const remove = ({ id, parentId }) => array => {
  if (!parentId) {
    return utils.checkRoot(array, { id }, utils.removeAt);
  }

  return utils.checkChildren(
    array,
    { id: parentId },
    remove({ id }),
    utils.replaceAt,
  );
};

// immutable function
const moveBefore = ({ id, toBeMovedId, parentId }) => array => {
  if (!parentId) {
    const predicate = { id: toBeMovedId };
    const node = find(array, predicate);

    // new array without nodes-to-be-moved
    const removedNodes = reject(array, predicate);

    return utils.checkRoot(removedNodes, { id }, utils.insertTo, node);
  }

  return utils.checkChildren(
    array,
    { id: parentId },
    moveBefore({ id, toBeMovedId }),
    utils.replaceAt,
  );
};

// immutable function
const patchInArray = (id, obj) => array => {
  const key = { id };
  const match = find(array, key);
  if (match) {
    const index = indexOf(array, match);
    const newNode = utils.merge(match, obj);
    return utils.replaceAt(array, index, newNode);
  }
  return array;
};

const removeChild = ({ parentId, toBeMovedId, toBeMovedParentId }) => array => {
  // find sub-level array contains toBeMoved
  const toBeMovedIndex = findIndex(array, {
    id: toBeMovedParentId || parentId,
  });
  const { children: toBeMovedArray, ...toBeMovedOrigin } = array[
    toBeMovedIndex
  ];

  // get toBeMoved nodes
  const removedChild = find(toBeMovedArray, { id: toBeMovedId });

  // filter toBeMoved nodes out of the array
  const children = reject(toBeMovedArray, { id: toBeMovedId });
  const updatedToBeMoved = { ...toBeMovedOrigin, children };

  // update the root array with the new sub-level array
  return {
    updatedArray: utils.replaceAt(array, toBeMovedIndex, updatedToBeMoved),
    removedChild,
  };
};

const insertChild = ({ parentId, doInsert } = {}) => array => {
  if (!parentId) return array;

  // find the array contains the new position nodes
  const parentIndex = findIndex(array, { id: parentId });
  const { children: secondLevel, ...origin } = array[parentIndex];

  // move toBeMoved nodes to that array
  const newChildren = doInsert(secondLevel);

  // update the root array with new sub-level array
  return utils.replaceAt(array, parentIndex, {
    ...origin,
    children: newChildren,
  });
};

const moveAcross = (
  { id, parentId, toBeMovedId, toBeMovedParentId },
  nodeToBeMoved,
) => array => {
  if (parentId) {
    // update the root array with the new sub-level array
    const { updatedArray, removedChild } = removeChild({
      parentId,
      toBeMovedId,
      toBeMovedParentId,
    })(array);

    return insertChild({
      parentId,
      doInsert: moveAcross({ id, toBeMovedId }, removedChild),
    })(updatedArray);
  }

  // insert toBeMoved to after new position nodes
  const node = findIndex(array, { id });
  return utils.insertTo(array, node + 1, nodeToBeMoved);
};

const moveInside = ({
  parentId,
  toBeMovedId,
  toBeMovedParentId,
  ...operation
}) => array => {
  if (!parentId) return array;

  // update the root array with the new sub-level array
  const { updatedArray, removedChild } = removeChild({
    parentId,
    toBeMovedId,
    toBeMovedParentId,
  })(array);

  // find the array contains the new position nodes
  const parentIndex = findIndex(updatedArray, { id: parentId });
  const { children: secondLevel, ...origin } = updatedArray[parentIndex];

  // if there are children, should move to after the last child
  if (secondLevel && secondLevel.length) {
    return moveAcross({
      parentId,
      toBeMovedId,
      toBeMovedParentId,
      ...operation,
    })(array);
  }

  // otherwise init the children array with removedChild
  return utils.replaceAt(updatedArray, parentIndex, {
    ...origin,
    children: [removedChild],
  });
};

const moveLocally = ({ id, parentId, toBeMovedId }) => array => {
  if (parentId) {
    const parentIndex = findIndex(array, { id: parentId });
    const { children: secondLevel, ...origin } = array[parentIndex];
    const updatedChildren = moveLocally({ id, toBeMovedId })(secondLevel);

    return utils.replaceAt(array, parentIndex, {
      ...origin,
      children: updatedChildren,
    });
  }

  const nodeIndex = findIndex(array, { id: toBeMovedId }); // new array without nodes-to-be-moved
  const removedNodes = reject(array, { id: toBeMovedId });
  const node = findIndex(removedNodes, { id });

  // insert nodes-to-be-moved to after nodes
  return utils.insertTo(removedNodes, node + 1, array[nodeIndex]);
};

const moveAfter = operation => array => {
  if (operation.size) {
    return operation.reduce((newArray, op) => moveAfter(op)(newArray), array);
  }

  if (utils.isNotMoving(operation)) {
    return array;
  }

  if (utils.isMovingAcross(operation)) {
    if (utils.isMovingInside(operation)) {
      return moveInside(operation)(array);
    }

    return moveAcross(operation)(array);
  }

  return moveLocally(operation)(array);
};

const isEqual = (array1 = [], array2 = [], operation = {}) => {
  if (array1.length !== array2.length) return false;
  if (array1.length === 0 && array2.length === 0) return true;

  // compare first level nodes
  if (!operation.parentId) {
    // `lodash.some` will stop and return true as soon as any equaliser returns true
    return !some(array1, utils.equaliser(array2));
  }

  // compare sub-level nodes
  // need to find the indices of their parents
  const child1Index = findIndex(array1, { id: operation.parentId });
  const child2Index = findIndex(array2, { id: operation.parentId });

  // get sub-level arrays
  const child1 = array1[child1Index].children;
  const child2 = array2[child2Index].children;

  // call itself to compare as first level arrays
  return isEqual(child1, child2);
};

// check if current index is equal to original index, of all days and sections
// stop as soon as there is a different
const isAllEqual = array => {
  const hasDifferences = some(
    array,
    ({ id, children, origin }, parentIndex) => {
      if (!origin) return false;

      if (origin.index !== parentIndex) return true;

      if (!children || !children.length) {
        return false;
      }

      return some(children, ({ origin: sectionOrigin }, sectionIndex) => {
        if (!sectionOrigin) return false;

        return (
          sectionOrigin.parentId !== id ||
          sectionOrigin.parentIndex !== parentIndex ||
          sectionOrigin.sectionIndex !== sectionIndex
        );
      });
    },
  );

  return !hasDifferences;
};

// add origins to each day and section
const setIndex = array =>
  array.map((parent, parentIndex) => {
    // eslint-disable-next-line no-unused-vars
    const { id, children, origin, ...day } = parent;
    if (!children) {
      return { id, origin: { index: parentIndex }, ...day };
    }

    const newChildren = children.map((section, sectionIndex) => {
      const { origin: sectionOrigin, ...sectionRest } = section;
      if (
        sectionOrigin &&
        sectionOrigin.parentId === id &&
        sectionOrigin.parentIndex === parentIndex &&
        sectionOrigin.sectionIndex === sectionIndex
      )
        return section;

      return {
        ...sectionRest,
        origin: { parentId: id, parentIndex, sectionIndex },
      };
    });

    return {
      id,
      children: newChildren,
      origin: { index: parentIndex },
      ...day,
    };
  });

export default {
  convert: convertToArray,
  convertChecklistsToArray,
  convertNextNodesToArray,
  insert,
  update,
  remove,
  moveAfter,
  moveBefore,
  insertAfter,
  insertBefore,
  isEqual,
  isAllEqual,
  setIndex,
  removeChild,
  insertChild,
  moveAcross,
  moveInside,
  moveLocally,
  patch: patchInArray,
};
