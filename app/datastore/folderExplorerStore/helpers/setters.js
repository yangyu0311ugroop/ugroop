const moveChildren = (idToBeMoved, destinationId) => (store = {}) => {
  if (!store[destinationId]) return store;

  const childrenAttribute = store[destinationId].children;
  const nodeToBeMoved = store[idToBeMoved];
  const newChildren = [...childrenAttribute, nodeToBeMoved];

  return {
    ...store,
    [destinationId]: { ...store[destinationId], children: newChildren },
  };
};

const copyChildren = (copiedNode, destinationId) => (store = {}) => {
  if (!store[destinationId]) return store;

  const childrenAttribute = store[destinationId].children;
  const newChildren = [...childrenAttribute, copiedNode];

  return {
    ...store,
    [destinationId]: { ...store[destinationId], children: newChildren },
  };
};

export default {
  moveChildren,
  copyChildren,
};
