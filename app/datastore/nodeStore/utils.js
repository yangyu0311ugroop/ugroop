import _ from 'lodash';
import applyFilter from 'loopback-filters';
import { EVENT_VIEW_HELPERS } from 'smartComponents/Node/types/Event/helpers';
import { NODE_CONSTANTS } from 'utils/constants/nodes';
import ARRAY_HELPERS from 'utils/helpers/arrays';
import { NODE_HELPERS } from 'utils/helpers/nodes';
import { MOMENT_HELPERS } from 'utils/helpers/moment';
import { SELECTOR_HELPERS } from 'utils/helpers/selectors';
import { NODE_BATCH_ACTIONS } from 'datastore/nodeStore/constants';

const filterTrailsByIdReducer = id => (acc, trail) => {
  if (trail && trail.indexOf(id) >= 0) {
    return [...acc, trail[0]];
  }
  return acc;
};

const filterByTypesReducer = SELECTOR_HELPERS.filterIncludesReducer;

const filterByStatusesReducer = SELECTOR_HELPERS.filterIncludesReducer;

const filterByDateReducer = time => (acc, [id, currentTime]) =>
  MOMENT_HELPERS.isSame(time, currentTime) ? [...acc, id] : acc;

const filterAndSortByTime = ({ date, events }) => {
  const nodes = [];

  events.forEach(({ id, type, subtype, start, end, cancellation }) => {
    const dayCount = MOMENT_HELPERS.diffInUnit(start.value, end.value, 'd');
    const push = (position, time) => {
      nodes.push({
        id,
        type,
        subtype,
        ...time,
        position,
        dayCount,
        cancellation,
      });
    };

    let started = false;
    let ended = false;

    if (timeMatchesDate(start, date)) {
      started = true;
      push(NODE_CONSTANTS.POSITIONS.start, start);
    }

    if (timeMatchesDate(end, date)) {
      ended = true;
      push(NODE_CONSTANTS.POSITIONS.end, end);
    }

    if (!started && !ended) {
      const middled = MOMENT_HELPERS.isBetween(
        date,
        start.value,
        end.value,
        'd',
      );

      if (middled) {
        // Assume event exists in starting timeZoneId until end of event
        push(NODE_CONSTANTS.POSITIONS.middle, start);
      }
    }
  });

  // 1. Event starts/ends with time (sort by time)
  // 2. Event middles (sort by id)
  // 3. Event starts/ends with no time (sort by id then start/end)
  const FIRST = '/';
  const LAST = '{';
  return _.sortBy(nodes, ({ id, value, timeZoneId, mode, position }) => {
    if (position === NODE_CONSTANTS.POSITIONS.middle) {
      return `${LAST}${id}`;
    }
    if (!NODE_HELPERS.hasTimeComponent(mode)) {
      if (position === NODE_CONSTANTS.POSITIONS.start) {
        return `${LAST}${LAST}${id}${FIRST}`;
      }
      return `${LAST}${LAST}${id}${LAST}`;
    }
    return `${FIRST}${MOMENT_HELPERS.setTimeZone(
      value,
      timeZoneId,
    ).toISOString()}`;
  });
};

const calculatedEventsFilter = ({
  grouping,
  hasTime,
  hideCancelled,
  showType,
}) => ({ type, subtype, position, mode, dayCount, cancellation }) => {
  const data = { type, detail: { type: subtype } };

  if (!NODE_HELPERS.checkHasTime(hasTime, mode)) {
    return false;
  }

  // hide cancelled event if hideCancelled option is true
  if (hideCancelled && cancellation) {
    return false;
  }

  // Includes events that match all properties of at least 1 grouping
  return ARRAY_HELPERS.arrayIfNot(grouping).reduce(
    (acc, { where, positions, dayCountType }) => {
      if (!acc) {
        let match = true;

        if (
          match &&
          where &&
          !applyFilter([{ type, subtype, dayCount, position }], { where })
            .length
        ) {
          match = false;
        }

        if (
          match &&
          positions &&
          !ARRAY_HELPERS.arrayIfNot(positions).includes(position)
        ) {
          match = false;
        }

        if (match && !NODE_HELPERS.checkDayCount(dayCountType, dayCount)) {
          match = false;
        }

        if (match && showType) {
          if (showType === 'Food' && !EVENT_VIEW_HELPERS.isFood(data))
            match = false;
          if (showType === 'Activity') {
            if (!EVENT_VIEW_HELPERS.isActivity(data)) match = false;
            if (EVENT_VIEW_HELPERS.isFood(data)) match = false;
          }
          if (
            showType === 'Accommodation' &&
            !EVENT_VIEW_HELPERS.isAccommodation(data)
          )
            match = false;
          if (
            showType === 'Transportation' &&
            !EVENT_VIEW_HELPERS.isTransportation(data)
          )
            match = false;
        }

        return match;
      }

      return acc;
    },
    false,
  );
};

const filterByNotMatchingTime = (nodesValue, nodeStartTimes) => {
  const checkNoMatch = time =>
    !!time && !nodeStartTimes.find(nodeTime => timeMatchesDate(time, nodeTime));

  const result = [];

  nodesValue.forEach(({ id, start, end }) => {
    if (checkNoMatch(start)) {
      result.push({
        id,
        position: NODE_CONSTANTS.POSITIONS.start,
        value: start.value,
      });
    }

    if (checkNoMatch(end)) {
      result.push({
        id,
        position: NODE_CONSTANTS.POSITIONS.end,
        value: start.value,
      });
    }
  });

  return _.sortBy(result, ({ value }) => value).map(({ id, position }) => ({
    id,
    position,
  }));
};

const idValueReducer = (acc, [id, value]) =>
  id !== undefined ? [...acc, { id, value }] : acc;

const idValuesReducer = (acc, [id, values]) =>
  id !== undefined && values ? [...acc, { id, ...values }] : acc;

const calculatedTimeMoment = MOMENT_HELPERS.setTimeZone;

const getParentInTrail = (trail, id) => {
  if (trail) {
    const index = trail.indexOf(id);
    if (index < trail.length - 1) {
      return trail[index + 1];
    }
  }
  return null;
};

const timeMatchesDate = (time, date) =>
  time &&
  date &&
  NODE_HELPERS.isAnchored(time.mode) &&
  MOMENT_HELPERS.isSame(time.value, date, 'd');

const updateEventBatchOperationToNode = ({ id, node }) => ({
  id,
  ...node,
});

const moveInsideBatchOperationToNode = ({ parentId, node }) => ({
  parentNodeId: parentId,
  ...node,
});

const batchOperationToNodeFunc = ({ action }) => {
  switch (action) {
    case NODE_BATCH_ACTIONS.UPDATE_EVENT:
      return updateEventBatchOperationToNode;

    case NODE_BATCH_ACTIONS.MOVE_INSIDE:
      return moveInsideBatchOperationToNode;

    default:
      return node => node;
  }
};

const parseEventNodeBatchOperations = operations =>
  operations.length
    ? operations.reduce(
        (node, op) => ({
          ...node,
          ...batchOperationToNodeFunc(op)(op),
        }),
        {},
      )
    : null;

export const NODE_STORE_UTILS = {
  filterTrailsByIdReducer,
  filterByTypesReducer,
  filterByStatusesReducer,
  filterByDateReducer,
  filterAndSortByTime,
  calculatedEventsFilter,
  filterByNotMatchingTime,
  idValueReducer,
  idValuesReducer,
  calculatedTimeMoment,
  getParentInTrail,
  parseEventNodeBatchOperations,
};
