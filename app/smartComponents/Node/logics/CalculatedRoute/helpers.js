import dotProp from 'dot-prop-immutable';

let fetchedRoutes = {
  test: 'test',
  testMerge: { id: 2233 },
};

const getCache = (prop, value) =>
  prop && dotProp.get(fetchedRoutes, prop, value);
const setCache = (prop, value) => {
  fetchedRoutes = dotProp.set(fetchedRoutes, `${prop}`, value);
};
const mergeCache = (prop, value) => {
  fetchedRoutes = dotProp.merge(fetchedRoutes, prop, value);
};
const deleteCache = routeId => {
  fetchedRoutes = dotProp.delete(fetchedRoutes, `${routeId}`);
};
const isValid = raw => {
  if (!Array.isArray(raw) || !raw.length) {
    return false;
  }

  for (let i = 0; i < raw.length; i += 1) {
    if (!raw[i]) return false;
  }

  return true;
};

export const ROUTE_CACHE = {
  fetchedRoutes,
  delete: deleteCache,
  get: getCache,
  set: setCache,
  merge: mergeCache,
  isValid,
};
