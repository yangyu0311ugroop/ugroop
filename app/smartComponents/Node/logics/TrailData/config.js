import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

const types = ({ trail }) => {
  if (Array.isArray(trail)) {
    return trail.map(nodeId => NODE_STORE_SELECTORS.type({ id: nodeId }));
  }

  return NODE_STORE_SELECTORS.type({ id: trail });
};

export const GET_TRAIL = {
  value: {
    trail: NODE_STORE_SELECTORS.trail,
  },
};

export const GET_DATA = {
  value: {
    types: {
      cacheKey: ({ trail }) =>
        Array.isArray(trail) ? `${trail.toString()}.types` : `${trail}.types`,
      keyPath: types,
      props: null,
      getter: (...results) => results,
    },
  },
};
