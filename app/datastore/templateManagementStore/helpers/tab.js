import dotProp from 'dot-prop-immutable';
import _, { indexOf } from 'lodash';

// immutable function
const upsert = (result, { node }) => tabs =>
  dotProp.merge(tabs, `${result.id}`, { ...node, ...result });

// immutable function
const remove = id => tabs => dotProp.delete(tabs, `${id}`);

// immutable function
const updateChildren = (id, children) => tabs =>
  dotProp.set(tabs, `${id}.children`, children);

// immutable function
const updateTabChildrenIDs = ids => tab => dotProp.set(tab, 'children', ids);

// immutable function
const insertChildren = (parentId, ids) => tabs => {
  const children = getChildrenIds(parentId)(tabs);
  const index = _.indexOf(children, ids);
  if (index === -1) {
    return dotProp.merge(tabs, `${parentId}.children`, ids);
  }
  return tabs;
};

const insertChildBefore = (
  parentId,
  beforeId,
  id,
  type = 'children',
) => days => {
  const children = getChildrenIds(parentId, type)(days);
  const index = _.indexOf(children, beforeId);
  if (index !== -1) {
    const newArray = _.concat(
      [],
      _.slice(children, 0, index),
      id,
      _.slice(children, index, children.length + 1),
    );
    return dotProp.set(days, `${parentId}.${type}`, newArray);
  }
  return days;
};

const insertChildAfter = (parentId, afterId, id, type = 'children') => days => {
  const children = getChildrenIds(parentId, type)(days);
  const index = _.indexOf(children, afterId);
  if (index !== -1) {
    const newArray = _.concat(
      [],
      _.slice(children, 0, index + 1),
      id,
      _.slice(children, index + 1, children.length + 1),
    );
    return dotProp.set(days, `${parentId}.${type}`, newArray);
  }
  return days;
};

const getChildrenIds = (parentId, type = 'children') => tabs =>
  dotProp.get(tabs, `${parentId}.${type}`, []);

// immutable function
const removeChildrenById = (parentId, id) => tabs => {
  const children = getChildrenIds(parentId)(tabs);
  const index = _.indexOf(children, id);
  if (index !== -1) {
    return dotProp.delete(tabs, `${parentId}.children.${index}`);
  }
  return tabs;
};

// immutable function
const insertChild = (parentId, childId) => tabs => {
  const children = getChildrenIds(parentId)(tabs);

  const index = indexOf(children, childId);
  if (index === -1) {
    return dotProp.merge(tabs, `${parentId}.children`, childId);
  }

  return tabs;
};

export default {
  upsert,
  remove,
  insertChild,
  insertChildren,
  insertChildBefore,
  insertChildAfter,
  removeChildrenById,
  updateChildren,
  updateTabChildrenIDs,
};
