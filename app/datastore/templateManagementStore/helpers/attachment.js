import dotProp from 'dot-prop-immutable';

// immutable function
const upsert = (result, { node }) => attachments => {
  const data = attachments || {};
  return dotProp.merge(data, `${result.id}`, { ...node, ...result });
};

// immutable function
const remove = id => attachments => dotProp.delete(attachments, `${id}`);

export default {
  upsert,
  remove,
};
