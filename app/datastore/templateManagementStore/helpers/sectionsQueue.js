import { List } from 'immutable';

const defaultList = () => List();

const has = (list = defaultList(), id) =>
  list.findIndex(({ toBeMovedId }) => toBeMovedId === id) !== -1;

// discard all operations
const clearAll = () => (list = defaultList()) => list.clear();

const push = ({ toBeMovedParentId, toBeMovedId }) => list => {
  const operation = { toBeMovedParentId, toBeMovedId };

  // if list is undefined or not a List
  if (!List.isList(list)) return List([operation]);

  // if list is empty, simply push new action
  if (list.size === 0) return list.push(operation);

  // if already exist then do nothing
  if (has(list, operation.toBeMovedId)) return list;

  // otherwise push new action to end of list
  return list.push(operation);
};

const pushAll = (list, operation) => {
  if (operation.checkOperations) {
    return operation.checkOperations.reduce(
      (reduction, eachOperation) => push(eachOperation)(reduction),
      list,
    );
  }

  return push(operation)(list);
};

const remove = operation => (list = defaultList()) =>
  list.filter(item => item.toBeMovedId !== operation.toBeMovedId);

const removeAll = (list, operation) => {
  if (operation.checkOperations) {
    return operation.checkOperations.reduce(
      (reduction, eachOperation) => remove(eachOperation)(reduction),
      list,
    );
  }

  return remove(operation)(list);
};

const insertOrRemove = operation => list => {
  if (operation.checked) {
    return pushAll(list, operation);
  }

  return removeAll(list, operation);
};

const generateQueue = data =>
  Object.keys(data).reduce(
    (queue, key) =>
      queue.concat({
        toBeMovedId: parseInt(key, 10),
        toBeMovedParentId: data[key].dayId,
      }),
    [],
  );

const generateList = (lastChildId, parentId, toBeMovedData) => {
  const array = [];
  if (!toBeMovedData) return List(array);

  const [firstMove, ...rest] = generateQueue(toBeMovedData);

  if (lastChildId !== -1) {
    if (firstMove.toBeMovedId !== lastChildId) {
      array.push({
        id: lastChildId,
        parentId,
        toBeMovedId: firstMove.toBeMovedId,
        toBeMovedParentId: firstMove.toBeMovedParentId,
        action: 'MOVE_AFTER',
      });
    }
  } else {
    array.push({
      parentId,
      toBeMovedId: firstMove.toBeMovedId,
      toBeMovedParentId: firstMove.toBeMovedParentId,
      action: 'MOVE_INSIDE',
    });
  }
  let id = firstMove.toBeMovedId;

  rest.forEach(({ toBeMovedParentId, toBeMovedId }) => {
    if (toBeMovedId !== id) {
      array.push({
        id,
        parentId,
        toBeMovedId,
        toBeMovedParentId,
        action: 'MOVE_AFTER',
      });
      id = toBeMovedId;
    }
  });

  return List(array);
};

const updateIndex = parentId => sectionsQueue =>
  sectionsQueue.map(operation => ({
    ...operation,
    toBeMovedParentId: parentId,
  }));

export default {
  defaultList,
  insertOrRemove,
  push,
  has,
  remove,
  clearAll,
  generateList,
  updateIndex,
};
