// TODO: Why is this file basically a duplicate of datastore/templateManagementStore/helper/lists.js????

import { List } from 'immutable';

const isOpposite = (lastOperation, newOperation) =>
  (lastOperation.action === 'MOVE_AFTER' &&
    newOperation.action === 'MOVE_BEFORE') ||
  (lastOperation.action === 'MOVE_BEFORE' &&
    newOperation.action === 'MOVE_AFTER');

const reverseAction = action =>
  action === 'MOVE_AFTER' ? 'MOVE_BEFORE' : 'MOVE_AFTER';

const isAcrossMove = ({ parentId, toBeMovedParentId }) =>
  toBeMovedParentId && parentId !== toBeMovedParentId;

const isEmpty = list => !List.isList(list) || list.size === 0;

const hasBeenMoved = (list, id) =>
  list.findIndex(({ toBeMovedId }) => toBeMovedId === id) !== -1;

const hasBeenMovedAcross = (list, id) =>
  list.findIndex(
    ({ toBeMovedId, parentId, toBeMovedParentId }) =>
      toBeMovedId === id && toBeMovedParentId && parentId !== toBeMovedParentId,
  ) !== -1;

export const canCancel = (lastOperation, newOperation) => {
  if (isAcrossMove(lastOperation) !== isAcrossMove(newOperation)) return false;

  // move 1 to after 2, then move 2 to after 1, nothing changed so we can cancel
  if (
    lastOperation.id === newOperation.toBeMovedId &&
    lastOperation.toBeMovedId === newOperation.id &&
    lastOperation.action === newOperation.action
  ) {
    return true;
  }

  // move 1 to after 2, then move 1 to before 2
  return (
    lastOperation.id === newOperation.id &&
    lastOperation.toBeMovedId === newOperation.toBeMovedId &&
    isOpposite(lastOperation, newOperation)
  );
};

// toBeMovedId and action must match
export const canOverride = (lastOperation, newOperation) => {
  if (!lastOperation || !lastOperation.id) return false;

  return (
    lastOperation.action === newOperation.action &&
    lastOperation.toBeMovedId === newOperation.toBeMovedId
  );
};

// check if we can reverse the actions
// i.e instead of move 1 to after 2, we move 2 to before 1.
// Result is same, but sometimes we can save 1 operation
const canReverse = (lastOperation, newOperation) =>
  isOpposite(lastOperation, newOperation) &&
  lastOperation.toBeMovedId === newOperation.id &&
  lastOperation.parentId === newOperation.parentId;

const reverse = (lastOperation, newOperation) => ({
  ...newOperation,
  id: newOperation.toBeMovedId,
  toBeMovedId: lastOperation.toBeMovedId,
  action: lastOperation.action,
});

// if operation is not moved across, toBeMoved is not dirty, node at position is dirty, it's better swap
const betterSwap = (list, operation) =>
  !isAcrossMove(operation) &&
  !hasBeenMoved(list, operation.toBeMovedId) &&
  hasBeenMoved(list, operation.id);

const swap = ({ toBeMovedId, id, action, ...operation }) => ({
  ...operation,
  id: toBeMovedId,
  toBeMovedId: id,
  action: reverseAction(action),
});

const push = params => list => {
  // if list is undefined or not a List
  if (!List.isList(list)) return List([params]);

  // if list is empty, simply push new action
  if (list.size === 0) return list.push(params);

  const nextOperation = params;

  const last = list.last();
  // 2 actions cancel each other, simply pop the last action out the pending queue
  if (canCancel(last, nextOperation)) {
    return list.pop();
  }

  // can reverse the action and node
  // i.e instead of move 1 to after 2, we move 2 to before 1.
  // Result is same, but sometimes we can save 1 operation
  if (canReverse(last, nextOperation)) {
    return list.push(reverse(last, nextOperation));
  }

  // otherwise push new action to end of list
  return list.push(nextOperation);
};

const defaultList = () => List();

const notBelongToSameParent = (operation = {}) => (node = {}) =>
  node.parentId !== operation.parentId;
// clear operations belong to same parent
const clear = operation => list =>
  (list || defaultList()).filter(notBelongToSameParent(operation));

const isFirstLevel = (node = {}) => !node.parentId;
// clear second level sections
const clearSections = list => (list || defaultList()).filter(isFirstLevel);

// discard all operations
const clearAll = () => list => (list || defaultList()).clear();

const toArray = list => {
  // if list is undefined or not a List
  if (!List.isList(list)) return [];

  return list.toArray();
};

// 2 adjacent actions can be merged when
// i.e. move 1 to 2 and then move 1 to 3 > move 1 to 3 directly
const optimiseList = list => {
  if (isEmpty(list)) return list;

  let currentList = list;
  let optimisedList = new List();

  while (currentList.size) {
    const lastOperation = optimisedList.last();
    const next = currentList.first();
    let nextOperation = next;

    // if last operation is dirty and this operation is not dirty, it's better swap
    if (betterSwap(optimisedList, next)) {
      nextOperation = swap(next);
    }

    if (canOverride(lastOperation, nextOperation)) {
      optimisedList = optimisedList.pop();
    }

    currentList = currentList.shift();
    optimisedList = push(nextOperation)(optimisedList);
  }

  return optimisedList;
};

const optimise = list => {
  const groups = list.groupBy(({ parentId }) =>
    parentId ? 'root' : 'children',
  );

  return groups.map(optimiseList).reduce((acc, values) => {
    let newAcc = acc;
    values.forEach(value => {
      newAcc = newAcc.push(value);
    });
    return newAcc;
  }, List());
};

export default {
  has: hasBeenMoved,
  hasBeenMoved,
  hasBeenMovedAcross,
  canReverse,
  reverseAction,
  betterSwap,
  swap,
  notBelongToSameParent,
  isFirstLevel,
  push,
  clear,
  clearSections,
  clearAll,
  toArray,
  isEmpty,
  optimise,
  optimiseList,
  default: defaultList,
};
