import { normalize } from 'normalizr';
import { recentActivity } from './schema';
import { DATASTORE_UTILS } from '../index';
const normalise = data => {
  const { entities, result } = normalize(data, recentActivity);

  return {
    recentActivities: entities.recentActivity,
    nodes: entities.node,
    files: entities.photo,
    result,
  };
};

const hideRecentActivity = (_, { nodeId }) => ({
  recentActivity: DATASTORE_UTILS.removeObjectById(nodeId),
  recentActivityIds: DATASTORE_UTILS.removeItemsInArray(nodeId),
});

const reduceDeletedNodes = normalised => (accumulate, id) => {
  if (!normalised.nodes[id]) {
    return accumulate;
  }

  return accumulate.concat(id);
};

const normaliseRecentActivity = result => {
  const normalised = normalise(result);
  const recentActivityIds = normalised.result.recentActivities.reduce(
    reduceDeletedNodes(normalised),
    [],
  );

  return {
    recentActivity: normalised.recentActivities,
    node: DATASTORE_UTILS.upsertObject(normalised.nodes),
    file: DATASTORE_UTILS.upsertObject(normalised.files),
    recentActivityIds,
  };
};

export default {
  normaliseRecentActivity,
  hideRecentActivity,
};
