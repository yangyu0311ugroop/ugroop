/**
 * Created by stephenkarpinskyj on 12/4/18.
 */
import { DATASTORE_UTILS } from 'datastore';
import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { EVENT_STORE_HELPERS } from 'datastore/eventStore/helpers';
import { NODE_BATCH_ACTIONS, NODE_PATHS } from 'datastore/nodeStore/constants';
import { NODE_STORE_HELPERS } from 'datastore/nodeStore/helpers';
import dotProp from 'dot-prop-immutable';
import { EVENT_UTILS } from 'utils/events';
import upsertHelpers, { ARRAY_MODE } from 'utils/helpers/upsertStore';

export const convertToBatchCreate = model => {
  let m = model;

  const batchCreatePath = EVENT_STORE_HELPERS.pathToEventInputName(
    EVENT_PATHS.batchCreate,
  );
  const batchCreate = dotProp.get(model, batchCreatePath, false);
  m = dotProp.delete(m, batchCreatePath);

  if (batchCreate) {
    const dayRangePath = EVENT_STORE_HELPERS.pathToEventInputName(
      EVENT_PATHS.tempDayRange,
    );
    const dayRange = dotProp.get(model, dayRangePath, []);
    m = dotProp.delete(m, dayRangePath);

    const tempStartDayPath = NODE_STORE_HELPERS.pathToNodeInputName(
      NODE_PATHS.tempStartDay,
    );

    return dayRange.map(id => {
      let currM = m;
      currM = dotProp.set(currM, tempStartDayPath, `${id}`);
      // currM = dotProp.set(currM, tempEndDayPath, DEFAULT_DURATION);
      return currM;
    });
  }

  return [m];
};

export const injectNodeType = (node, data) => {
  const model = { node, data };
  const type = dotProp.get(
    model,
    EVENT_STORE_HELPERS.pathToEventInputName(EVENT_PATHS.type),
    null,
  );
  const subtype = dotProp.get(
    model,
    EVENT_STORE_HELPERS.pathToEventInputName(EVENT_PATHS.subtype),
    null,
  );
  return {
    ...node,
    type: EVENT_UTILS.dataTypeToNodeType(type, subtype),
  };
};

export const injectDataId = (data, dataId) => ({
  ...data,
  id: dataId,
});

export const wrapInBatchOperations = (node, id, parentNodeId, dataId) => {
  const updateEvent = {
    node,
    id,
    action: NODE_BATCH_ACTIONS.UPDATE_EVENT,
  };

  const moveInside = parentNodeId
    ? {
        parentId: parentNodeId,
        toBeMovedId: id,
        action: NODE_BATCH_ACTIONS.MOVE_INSIDE,
      }
    : null;

  const operations = [];
  operations.push(updateEvent);
  if (moveInside) operations.push(moveInside);
  return { operations, dataId };
};

const upsertEvents = props => ({
  events,
  flightBookings,
  attachments,
  activityDetail,
}) => {
  const obj = {};
  if (activityDetail) {
    obj.activityDetail = DATASTORE_UTILS.upsertObject(activityDetail);
  }
  if (events) {
    obj.events = DATASTORE_UTILS.upsertObject(events);
  }
  if (attachments) {
    obj.eventAttachments = DATASTORE_UTILS.upsertObject(attachments);
  }
  if (flightBookings) {
    obj.flightBookings = DATASTORE_UTILS.upsertObject(flightBookings);
  }
  obj.flightBookingIds = upsertHelpers.array(
    DATASTORE_UTILS.getObjectIds(flightBookings),
    ARRAY_MODE.SET,
  );
  props.resaga.setValue(obj);
};

const upsertEvent = props => params => {
  const { node, calculatedNodes, events, activityDetail, attachments } = params;

  const obj = { amountLastUpdated: Date.now() };

  if (node) {
    obj.nodes = upsertHelpers.deepMerge(node, ARRAY_MODE.APPEND);
  }
  if (attachments) {
    obj.eventAttachments = upsertHelpers.deepMerge(
      attachments,
      ARRAY_MODE.APPEND,
    );
  }
  if (calculatedNodes) {
    obj.calculatedNodes = upsertHelpers.deepMerge(
      calculatedNodes,
      ARRAY_MODE.APPEND,
    );
  }
  if (events) obj.events = upsertHelpers.deepMerge(events, ARRAY_MODE.SET);
  if (activityDetail)
    obj.activityDetail = upsertHelpers.deepMerge(
      activityDetail,
      ARRAY_MODE.SET,
    );
  props.resaga.setValue(obj);
};

const deleteEvent = props => (_, { templateId, id }) => {
  props.resaga.setValue({
    amountLastUpdated: Date.now(),
    nodes: nodes => ({ ...nodes, [id]: undefined }),
    calculatedNodes: DATASTORE_UTILS.removeItemsArray(
      `${templateId}.calculated.events`,
      id,
    ),
  });
};

const upsertFlightBooking = props => ({ flightBookings }) => {
  const obj = { amountLastUpdated: Date.now() };
  if (flightBookings) {
    obj.flightBookings = upsertHelpers.deepMerge(
      flightBookings,
      ARRAY_MODE.SET,
    );
    obj.flightBookingIds = upsertHelpers.deepMerge(
      DATASTORE_UTILS.getObjectIds(flightBookings),
      ARRAY_MODE.APPEND,
    );
  }
  props.resaga.setValue(obj);
};

const deleteFlightBooking = props => (_, { dataId }) => {
  const obj = {
    flightBookings: DATASTORE_UTILS.removeObjectById(dataId),
    flightBookingIds: DATASTORE_UTILS.removeItemsInArray(dataId),
    amountLastUpdated: Date.now(),
  };
  props.resaga.setValue(obj);
};

export const TEMPLATE_API_EVENT_UTILS = {
  convertToBatchCreate,
  injectNodeType,
  injectDataId,
  wrapInBatchOperations,
  upsertEvents,
  upsertEvent,
  deleteEvent,
  upsertFlightBooking,
  deleteFlightBooking,
};
