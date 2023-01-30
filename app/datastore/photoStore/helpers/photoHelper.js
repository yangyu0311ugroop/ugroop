import dotProp from 'dot-prop-immutable';

// immutable function
const upsertEnumerable = list => photos => ({ ...photos, ...list });

const upsert = result => photos =>
  dotProp.merge(photos, `${result.id}`, { ...result });

// immutable function
const remove = id => photos => dotProp.delete(photos, `${id}`);

export default {
  upsert,
  upsertEnumerable,
  remove,
};
