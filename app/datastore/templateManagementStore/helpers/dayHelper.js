import dotProp from 'dot-prop-immutable';
import _ from 'lodash';

// immutable function
const upsert = (result, { node }) => days => {
  const data = days || {};
  return dotProp.merge(data, `${result.id}`, { ...node, ...result });
};

// immutable function
const initChild = (result, { node }) => () =>
  dotProp.merge({}, `${result.id}`, { ...node, ...result });

// immutable function
const remove = id => days => dotProp.delete(days, `${id}`);

// immutable function
const insertChildren = (parentId, ids) => days => {
  const children = getChildrenIds(parentId)(days);
  const index = _.indexOf(children, ids);
  if (index === -1) {
    return dotProp.merge(days, `${parentId}.children`, ids);
  }
  return days;
};

const insertChildBefore = (parentId, beforeId, id) => days => {
  const children = getChildrenIds(parentId)(days);
  const index = _.indexOf(children, beforeId);
  if (index !== -1) {
    const newArray = _.concat(
      [],
      _.slice(children, 0, index),
      id,
      _.slice(children, index, children.length + 1),
    );
    return dotProp.set(days, `${parentId}.children`, newArray);
  }
  return days;
};

const insertChildAfter = (parentId, afterId, id) => days => {
  const children = getChildrenIds(parentId)(days);
  const index = _.indexOf(children, afterId);
  if (index !== -1) {
    const newArray = _.concat(
      [],
      _.slice(children, 0, index + 1),
      id,
      _.slice(children, index + 1, children.length + 1),
    );
    return dotProp.set(days, `${parentId}.children`, newArray);
  }
  return days;
};

const getChildrenIds = parentId => days =>
  dotProp.get(days, `${parentId}.children`, []);
// immutable function
const removeChildrenById = (parentId, id) => days => {
  const children = getChildrenIds(parentId)(days);
  const index = _.indexOf(children, id);
  if (index !== -1) {
    return dotProp.delete(days, `${parentId}.children.${index}`);
  }
  return days;
};

// immutable function
const insertPhoto = (parentId, ids) => photoData => {
  const photos = getPhotoIds(parentId)(photoData);
  const index = _.indexOf(photos, ids);
  if (index === -1) {
    return dotProp.merge(photoData, `${parentId}.photos`, ids);
  }
  return photoData;
};

// immutable function
const setPhoto = (dayId, ids) => days =>
  dotProp.set(days, `${dayId}.photos`, ids);

const getPhotoIds = parentId => days =>
  dotProp.get(days, `${parentId}.photos`, []);
// immutable function
const removePhotoById = (parentId, id) => days => {
  const children = getPhotoIds(parentId)(days);
  const index = _.indexOf(children, id);
  if (index !== -1) {
    return dotProp.delete(days, `${parentId}.photos.${index}`);
  }
  return days;
};

export default {
  upsert,
  remove,
  initChild,
  insertChildren,
  removeChildrenById,
  insertChildBefore,
  insertChildAfter,
  insertPhoto,
  setPhoto,
  removePhotoById,
};
