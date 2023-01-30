import { ARRAY_HELPERS } from 'utils/helpers/arrays';
import { SELECTOR_HELPERS } from 'utils/helpers/selectors';

const remainingCheckitemsCount = ({ checklists, statuses, type }) => {
  if (!Array.isArray(checklists) || !Array.isArray(statuses)) {
    return undefined;
  }

  return `nodes.${checklists.toString()}.${statuses.toString()}.${type ||
    ''}.outstanding_completed.count`;
};
const openClosedCount = ({ id }) =>
  Array.isArray(id) ? `nodes.${id.toString()}.statuses.open_closed` : '';

const checklists = ({ id }) => `node.${id}.checklists`;

const allChecklists = ({ id }) => {
  if (!id) return undefined;

  if (Array.isArray(id)) {
    return `nodes.${id.toString()}.checklists`;
  }
  return allChecklists({ id: [id] });
};

const allStatuses = ({ id }) => {
  if (!id) return undefined;

  if (Array.isArray(id)) {
    return `nodes.${id.toString()}.statuses`;
  }
  return allStatuses({ id: [id] });
};

const cachedChildren = ({ idProp }) => ({ [idProp]: id }) =>
  `node.${id}.cachedChildren`;

const cachedIndex = ({ idProp, parentNodeIdProp }) => ({
  [idProp]: id,
  [parentNodeIdProp]: parentNodeId,
}) => `node.${parentNodeIdProp}:${parentNodeId}.${idProp}:${id}.index`;

const eventDataIds = ({ idsProp }) => ({ [idsProp]: ids }) =>
  `node.${idsProp}:${ids ? ids.toString() : 'null'}.eventDataIds`;

const addEventDataIds = ({ nodesProp }) => ({ [nodesProp]: nodes }) =>
  `node.${nodesProp}:${
    nodes ? nodes.map(({ id }) => id).toString() : 'null'
  }.addEventDataIds`;

const filterByTypes = ({ ids, types }) => ({
  [ids]: idsPropValue,
  [types]: typesPropValue,
}) => {
  const idsValue = SELECTOR_HELPERS.propOrValueArray(ids, idsPropValue);
  const typesValue = SELECTOR_HELPERS.propOrValueArray(types, typesPropValue);
  return `node.${ids}:${idsValue.toString()}.${types}:${typesValue.toString()}.filterByTypes`;
};

const filterByStatuses = ({ ids, statuses }) => ({
  [ids]: idsPropValue,
  [statuses]: statusesPropValue,
}) => {
  const idsValue = SELECTOR_HELPERS.propOrValueArray(ids, idsPropValue);
  const statusesValue = SELECTOR_HELPERS.propOrValueArray(
    statuses,
    statusesPropValue,
  );
  return `node.${ids}:${idsValue.toString()}.${statuses}:${statusesValue.toString()}.filterByStatuses`;
};

const filterAndSortByTime = ({ idProp, dateProp, nodesProp }) => ({
  [idProp]: id,
  [dateProp]: date,
  [nodesProp]: nodes,
}) =>
  `node.${id}.${date}.${
    nodes ? nodes.map(({ id: idValue }) => idValue).toString() : 'null'
  }.filterAndSortByTime`;

const filterCalculatedEvents = opts => ({ id, grouping, hasTime }) => {
  const groupingValue = ARRAY_HELPERS.arrayIfNot(grouping || opts.grouping).map(
    ({ cacheKey }) => cacheKey,
  );
  const hasTimeValue = hasTime || opts.hasTime;
  return `node.${id}.${groupingValue.toString()}.${hasTimeValue}.filterCalculatedEvents`;
};

const filterByNotMatchingTime = ({ idsProp, nodesProp }) => ({
  [idsProp]: ids,
  [nodesProp]: nodesValue,
}) =>
  `node.${idsProp}:${ids ? ids.toString() : 'null'}.${nodesProp}:${
    nodesValue ? Object.keys(nodesValue).toString() : 'null'
  }.filterByNotMatchingTime`;

const calculatedStartTimeMoment = ({ idProp }) => ({ [idProp]: id }) =>
  `node.${id}.calculatedStartTimeMoment`;

const calculatedEndTimeMoment = ({ idProp }) => ({ [idProp]: id }) =>
  `node.${id}.calculatedEndTimeMoment`;

const calculatedStartEndTimes = ({ idsProp }) => ({ [idsProp]: ids }) =>
  `node.${idsProp}:${ids ? ids.toString() : 'null'}.calculatedStartEndTimes`;

const calculatedStartTimeValues = ({ idsProp, sort }) => ({ [idsProp]: ids }) =>
  `node.${ids ? ids.toString() : 'null'}.${sort}.calculatedStartTimeValues`;

const calculatedTrailParent = ({ idProp }) => ({ [idProp]: id }) =>
  `node.${id}.calculatedTrailParent`;

const cachedCalculatedEvents = ({ idProp }) => ({ [idProp]: id }) =>
  `node.${id}.cachedCalculatedEvents`;

const cachedCalculatedNodeEvents = ({ idProp }) => ({ [idProp]: id }) =>
  `node.${id}.cachedCalculatedNodeEvents`;

const participantsWithSeats = ({ idsProp, secondIdProp }) => ({
  [idsProp]: ids,
  [secondIdProp]: secondId,
}) => `node.${ids ? ids.toString() : 'null'}.${secondId}.participantsWithSeats`;

const participantsWithoutSeats = ({ idsProp, secondIdProp }) => ({
  [idsProp]: ids,
  [secondIdProp]: secondId,
}) =>
  `node.${ids ? ids.toString() : 'null'}.${secondId}.participantsWithoutSeats`;

const templateIdByTrail = ({ idProp }) => ({ [idProp]: id }) =>
  `node.${id}.trails.templateId`;

const confirmedParticipants = ({ idsProp }) => ({ [idsProp]: ids }) =>
  `node.${ids ? ids.toString() : 'null'}.confirmedParticipants`;

const parentNodeIdViaTrail = ({ idProp }) => ({ [idProp]: id }) =>
  `node.${id}.parentNodeIdViaTrail`;

const sortByProp = ({ ids, path, reverse }) => ({
  [ids]: idsPropValue,
  [path]: pathPropValue,
}) => {
  const idsValue = SELECTOR_HELPERS.propOrValueArray(ids, idsPropValue);
  const pathValue = SELECTOR_HELPERS.propOrValueArray(path, pathPropValue);
  return `node.${ids}:${idsValue.toString()}.${path}:${pathValue.toString()}.${reverse}.filterByTypes`;
};

export const NODE_STORE_CACHE_KEYS = {
  checklists,
  allChecklists,
  allStatuses,
  remainingCheckitemsCount,
  openClosedCount,
  cachedChildren,
  cachedIndex,
  eventDataIds,
  addEventDataIds,
  filterByTypes,
  filterByStatuses,
  filterAndSortByTime,
  filterCalculatedEvents,
  filterByNotMatchingTime,
  calculatedStartTimeMoment,
  calculatedEndTimeMoment,
  calculatedStartEndTimes,
  calculatedStartTimeValues,
  calculatedTrailParent,
  cachedCalculatedEvents,
  cachedCalculatedNodeEvents,
  sortByProp,
  participantsWithoutSeats,
  participantsWithSeats,
  confirmedParticipants,
  parentNodeIdViaTrail,
  templateIdByTrail,
};
