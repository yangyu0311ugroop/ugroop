const appendItem = (folderId, items) => folder => ({
  [folderId]: {
    ...folder[folderId],
    children: [...folder[folderId].children, ...items],
  },
});

const appendChildren = items => children => ({
  ...children,
  ...items,
});

const addItem = (parent, folderId, child, item) => {
  const newChildren = [item.id, ...parent.children];
  const newFolder = Object.assign({}, parent, { children: newChildren });
  const folder = { [folderId]: newFolder };

  const newItems = { [item.id]: item, ...child };
  return { folder, children: newItems };
};

const deleteItem = (parent, folderId, children, item) => {
  const newChildren = parent.children.filter(childId => childId !== item.id);
  const newFolder = Object.assign({}, parent, { children: newChildren });
  const folder = { [folderId]: newFolder };

  const newItems = Object.keys(children).reduce((result, key) => {
    const numKey = parseInt(key, 10);
    if (numKey !== item.id) {
      return { ...result, [numKey]: children[numKey] };
    }
    return result;
  }, {});

  return { folder, children: newItems };
};

const batchDelete = (parent, folderId, children, items) => {
  const newChildren = parent.children.filter(
    childId => !(items.filter(item => item.id === childId).length > 0),
  );
  const newFolder = Object.assign({}, parent, { children: newChildren });
  const folder = { [folderId]: newFolder };

  const newItems = Object.keys(children).reduce((result, key) => {
    if (!(items.filter(item => item.id === parseInt(key, 10)).length > 0))
      return { ...result, [key]: children[key] };
    return result;
  }, {});

  return { folder, children: newItems };
};

const updateSingleChildren = (id, attribute, value) => children => ({
  ...children,
  [id]: { ...children[id], [attribute]: value },
});

const appendPeople = newPeople => oldPeople => ({ ...oldPeople, ...newPeople });

export default {
  updateSingleChildren,
  addItem,
  deleteItem,
  batchDelete,
  appendItem,
  appendChildren,
  appendPeople,
};
