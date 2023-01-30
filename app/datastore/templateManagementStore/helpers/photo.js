import dotProp from 'dot-prop-immutable';

// immutable function
const upsert = (result, { node }) => photos => {
  const data = photos || {};
  return dotProp.merge(data, `${result.id}`, { ...node, ...result });
};

// immutable function
const remove = id => photos => dotProp.delete(photos, `${id}`);

const mergeContent = (photoId, node) => photos =>
  dotProp.merge(photos, `${photoId}`, {
    content: node.customData.photo,
    metaInfo: node.customData.metaInfo,
  });

export default {
  upsert,
  remove,
  mergeContent,
};
