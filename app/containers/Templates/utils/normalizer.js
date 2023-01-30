import { normalize } from 'normalizr';
import NodeStore from 'datastore/nodeStore/schema';

export const normalizeTemplate = template => {
  const { entities, result } = normalize(template, NodeStore.folder);

  return {
    ...entities,
    id: result,
  };
};
