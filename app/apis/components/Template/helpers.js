import {
  TEMPLATE_API,
  FETCH_EVENTS,
  CREATE_EVENT,
  PATCH_EVENT,
  DELETE_EVENT,
  CREATE_FLIGHT_BOOKING,
  PATCH_FLIGHT_BOOKING,
  DELETE_FLIGHT_BOOKING,
  CREATE_EVENT_ATTACHMENT,
  DELETE_EVENT_ATTACHMENT,
  PATCH_EVENT_ATTACHMENT,
  GET_PEOPLE,
  ADD_ROLE,
  GET_PARTICIPANTS,
  UPSERT_TEMPLATE_SETTING,
  ADD_MY_OWN_ROLE,
  UPSERT_TEMPLATE_SETTINGS,
} from 'apis/constants';
import get from 'lodash/get';
import { DATASTORE_UTILS } from 'datastore';
import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { TEMPLATE_API_EVENT_UTILS } from 'apis/components/Template/utils/events';
import moment from 'moment';
import { EVENT_VIEW_HELPERS } from 'smartComponents/Node/types/Event/helpers';
import { EVENT_UTILS } from 'utils/events';
import snackbarHelpers from 'ugcomponents/SnackBar/helpers';
import { ARRAY_HELPERS } from 'utils/helpers/arrays';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { TOUR_ROLES } from '../../../datastore/invitationStore/constants';

/**
 * @param obj
 *  templateId: template id
 *  onSuccess: success callback
 *  onError: error callback
 * @param props
 *  resaga: any resaga instance
 */
const fetchEvents = (obj, props) => {
  const { templateId, onSuccess, onError } = obj;
  props.resaga.dispatchTo(TEMPLATE_API, FETCH_EVENTS, {
    payload: {
      templateId,
    },
    onSuccess,
    onError,
  });
};

/**
 * @param obj
 *  templateId: event's template id
 *  model: containing node/data objects
 *  onSuccess: success callback
 *  onError: error callback
 * @param props
 *  resaga: any resaga instance
 */
const createEvent = (obj, props) => {
  const { templateId, model, onSuccess, onError, onEachSuccess } = obj;

  const create = (m, opts) => {
    const { node, data } = EVENT_UTILS.processCreateModel(m);

    let nodePayload = node;
    nodePayload = TEMPLATE_API_EVENT_UTILS.injectNodeType(nodePayload, data);

    props.resaga.dispatchTo(TEMPLATE_API, CREATE_EVENT, {
      payload: {
        templateId,
        data: { node: nodePayload, data },
      },
      onError,
      ...opts,
    });
  };

  const models = TEMPLATE_API_EVENT_UTILS.convertToBatchCreate(model);

  if (models.length) {
    const batch = index => {
      create(models[index], {
        onSuccess: ({ node, ...params }) => {
          LOGIC_HELPERS.ifFunction(onEachSuccess, [{ node, ...params }, index]);

          const ids = DATASTORE_UTILS.getObjectIds(node);
          const next = index + 1;
          NODE_API_HELPERS.getTimes(
            {
              id: templateId,
              ids,
              onSuccess: () => {
                if (next >= models.length && models.length > 1) {
                  const msg = `Successfully created ${models.length} events.`;
                  snackbarHelpers.openSuccessSnackbar(msg, props.resaga);
                }
              },
            },
            props,
          );

          if (!index) {
            if (onSuccess) onSuccess({ node, ...params });
          }

          if (next < models.length) {
            setTimeout(() => batch(next), 0);
          }
        },
        onError: () => {
          if (!index) {
            if (onError) onError();
          } else {
            const msg = `Error occurred while creating event ${index + 1}/${
              models.length
            }, batch operation cancelled.`;
            snackbarHelpers.openErrorSnackbar(msg, props.resaga);
          }
        },
      });
    };

    batch(0);
  }
};

/**
 * @param obj
 *  model: containing node/data objects
 *  onSuccess: success callback
 *  onError: error callback
 * @param props
 *  id: event node id
 *  dataId: event data id
 *  templateId: event's template id
 *  resaga: any resaga instance
 * @param process HACK: Find way to avoid
 */
const patchEvent = (obj, props, process = true) => {
  const { model, onSuccess, onError } = obj;
  const { id, dataId, templateId } = props;

  const { node, data } = EVENT_UTILS.processPatchModel(model, process);

  let dataPayload = data;
  if (dataPayload) {
    dataPayload = TEMPLATE_API_EVENT_UTILS.injectDataId(dataPayload, dataId);
  }

  let nodePayload = node;
  if (nodePayload) {
    const parentNodeId = EVENT_UTILS.getChangedParentNodeId(model);
    nodePayload = TEMPLATE_API_EVENT_UTILS.wrapInBatchOperations(
      nodePayload,
      id,
      parentNodeId,
      dataId,
    );
  }

  props.resaga.dispatchTo(TEMPLATE_API, PATCH_EVENT, {
    payload: {
      id,
      templateId,
      data: { batchNode: nodePayload, data: dataPayload },
    },
    onSuccess,
    onError,
  });
};

const saveEventAmounts = ({ amounts, data, onSuccess, onError, ...props }) => {
  const type = EVENT_VIEW_HELPERS.type(data);
  const subtype = EVENT_VIEW_HELPERS.subtype(data);
  const eventAmountId = EVENT_VIEW_HELPERS.eventAmountId(data);

  return TEMPLATE_API_HELPERS.patchEvent(
    {
      model: {
        data: {
          detail: { type: subtype },
          type,
          eventAmounts: {
            ...amounts,
            id: eventAmountId,
          },
        },
      },
      onSuccess,
      onError,
    },
    props,
  );
};

const saveFlightBookingAmounts = ({
  amounts,
  data,
  onSuccess,
  onError,
  ...props
}) => {
  const amountId = EVENT_VIEW_HELPERS.bookingAmountId(data);

  const model = {
    bookingAmounts: {
      ...amounts,
      id: amountId,
    },
  };

  TEMPLATE_API_HELPERS.patchFlightBooking(
    {
      model,
      onSuccess,
      onError,
    },
    props,
  );
};

const patchAmount = ({ model, ...props }) => {
  const eventAmounts = get(model, 'data.eventAmounts');

  if (eventAmounts) {
    return saveEventAmounts({
      ...props,
      amounts: eventAmounts,
    });
  }

  const flightBookingAmounts = get(model, 'bookingAmounts');
  if (flightBookingAmounts) {
    return saveFlightBookingAmounts({
      ...props,
      amounts: flightBookingAmounts,
    });
  }

  return null;
};

/**
 * @param obj
 *  id: event node id
 *  dataId: event data id
 *  templateId: event's template id
 *  onSuccess: success callback
 *  onError: error callback
 * @param props
 *  resaga: any resaga instance
 */
const deleteEvent = (obj, props) => {
  const { id, dataId, templateId, onSuccess, onError } = obj;
  props.resaga.dispatchTo(TEMPLATE_API, DELETE_EVENT, {
    payload: { id, dataId, templateId },
    onSuccess,
    onError,
  });
};

/**
 * @param obj
 *  templateId: flightBooking's template id
 *  model: data
 *  onSuccess: success callback
 *  onError: error callback
 * @param props
 *  resaga: any resaga instance
 */
const createFlightBooking = (obj, props) => {
  const { templateId, model, onSuccess, onError } = obj;
  props.resaga.dispatchTo(TEMPLATE_API, CREATE_FLIGHT_BOOKING, {
    payload: { templateId, data: model },
    onSuccess,
    onError,
  });
};

/**
 * @param obj
 *  model: data
 *  onSuccess: success callback
 *  onError: error callback
 * @param props
 *  dataId: flightBooking data id
 *  templateId: flightBooking's template id
 *  resaga: any resaga instance
 */
const patchFlightBooking = (obj, props) => {
  const { model, onSuccess, onError } = obj;
  const { dataId, templateId } = props;
  props.resaga.dispatchTo(TEMPLATE_API, PATCH_FLIGHT_BOOKING, {
    payload: { dataId, templateId, data: model },
    onSuccess,
    onError,
  });
};

/**
 * @param obj
 *  dataId: flightBooking data id
 *  templateId: flightBooking's template id
 *  onSuccess: success callback
 *  onError: error callback
 * @param props
 *  resaga: any resaga instance
 */
const deleteFlightBooking = (obj, props) => {
  const { dataId, templateId, onSuccess, onError } = obj;
  props.resaga.dispatchTo(TEMPLATE_API, DELETE_FLIGHT_BOOKING, {
    payload: { dataId, templateId },
    onSuccess,
    onError,
  });
};

const createEventAttachment = (
  { eventId, templateId, data, onSuccess, onError },
  resaga,
) => {
  resaga.dispatchTo(TEMPLATE_API, CREATE_EVENT_ATTACHMENT, {
    payload: {
      eventId,
      templateId,
      data,
    },
    onSuccess,
    onError,
  });
};

const patchEventAttachment = (
  { eventId, templateId, attachmentId, data, onSuccess, onError },
  resaga,
) => {
  resaga.dispatchTo(TEMPLATE_API, PATCH_EVENT_ATTACHMENT, {
    payload: {
      eventId,
      templateId,
      attachmentId,
      data,
    },
    onSuccess,
    onError,
  });
};

const deleteEventAttachment = (
  { eventId, templateId, attachmentId, onSuccess, onError },
  resaga,
) => {
  resaga.dispatchTo(TEMPLATE_API, DELETE_EVENT_ATTACHMENT, {
    payload: {
      eventId,
      templateId,
      attachmentId,
    },
    onSuccess,
    onError,
  });
};

/**
 * @param obj
 *  id: node id
 *  ...rest (eg. onSuccess, onError, etc)
 * @param props
 *  resaga: any resaga instance
 */
const getPeople = (obj, props) => {
  const { id, ...rest } = obj;
  const payload = { id };
  props.resaga.dispatchTo(TEMPLATE_API, GET_PEOPLE, { payload, ...rest });
};

/**
 * @param obj
 *  id: node id
 *  ...rest (eg. onSuccess, onError, etc)
 * @param props
 *  resaga: any resaga instance
 */
const batchRecentActivity = (obj, props) => {
  const { id, ...rest } = obj;
  const payload = { id };
  props.resaga.dispatchTo(TEMPLATE_API, GET_PEOPLE, { payload, ...rest });
};

/**
 * @param obj
 *  id: node id
 *  userId: user id
 *  role: new role
 *  subNodes: extra {nodeId, role}'s to include in invitation (optional)
 *  ...rest (eg. onSuccess, onError, etc)
 * @param props
 *  resaga: any resaga instance
 */
const addRole = (obj, props) => {
  const { id, userId, role, subNodes, organisationId, ...rest } = obj;
  const payload = {
    id,
    userId,
    role,
    organisationId,
    subNodes: ARRAY_HELPERS.arrayIfNot(subNodes),
  };
  props.resaga.dispatchTo(TEMPLATE_API, ADD_ROLE, { payload, ...rest });
};

/**
 * @param obj
 *  id: template node id
 *  ids: one or more participant node id's
 *  ...rest (eg. onSuccess, onError, etc)
 * @param props
 *  resaga: any resaga instance
 */
const getParticipants = (obj, props) => {
  const { id, ids, ...rest } = obj;
  const payload = { id, ids };
  props.resaga.dispatchTo(TEMPLATE_API, GET_PARTICIPANTS, { payload, ...rest });
};

/**
 * @param obj
 *  id: template node id
 *  settingId: template setting id
 *  ...rest (eg. onSuccess, onError, etc)
 * @param props
 *  resaga: any resaga instance
 */
const upsertSetting = (obj, props) => {
  const { id, settingId, key, value, ...rest } = obj;

  props.resaga.dispatchTo(TEMPLATE_API, UPSERT_TEMPLATE_SETTING, {
    payload: {
      id,
      settingId,
      data: {
        customData: { key, value },
      },
    },
    ...rest,
  });
};

const upsertSettings = (obj, props) => {
  const { templateId, values, ...rest } = obj;
  props.resaga.dispatchTo(TEMPLATE_API, UPSERT_TEMPLATE_SETTINGS, {
    payload: {
      templateId,
      values,
    },
    ...rest,
  });
};

const getObjectIds = object => {
  if (!object || Object.keys(object).length === 0) {
    return [];
  }
  return Object.keys(object).map(id => parseInt(id, 10));
};

const addMyOwnRole = (obj, props) => {
  const {
    id,
    role,
    shareTo,
    shareToUserId,
    shareFromUserId,
    content,
    organisationId,
    subNodes,
    ...rest
  } = obj;

  const payload = {
    id,
    payload: {
      role,
      content,
      shareTo,
      shareToUserId,
      shareFromUserId,
      roleName: TOUR_ROLES[role],
      organisationId,
      subNodes: ARRAY_HELPERS.arrayIfNot(subNodes),
    },
    shareToUserId,
  };

  props.resaga.dispatchTo(TEMPLATE_API, ADD_MY_OWN_ROLE, { payload, ...rest });
};

const moveToDay = ({ id, eventData, onSuccess, dayId, templateId }, props) => {
  const { startTimeMode, startTimeValue, type, dataId } = eventData;

  const node = {
    customData: {
      start: {
        mode: LOGIC_HELPERS.ifElse(
          startTimeMode === 'unanchored',
          'relative',
          'relativeAtTime',
        ),
        tempDay: `${dayId}`,
        tempTime: LOGIC_HELPERS.ifElse(
          startTimeMode === 'unanchored',
          undefined,
          LOGIC_HELPERS.ifElse(
            startTimeValue,
            moment()
              .startOf('day')
              .add(moment.duration(startTimeValue))
              .format('HH:mm'),
          ),
        ),
      },
    },
    type,
  };

  return TEMPLATE_API_HELPERS.patchEvent(
    {
      model: { node },
      onSuccess,
    },
    { ...props, id, dataId, templateId },
  );
};

const moveToUnplanned = (
  { id, eventData, onSuccess, timelineId, templateId },
  props,
) => {
  const { startTimeValue, type, dataId } = eventData;

  const node = {
    customData: {
      start: {
        mode: 'unanchored',
        tempDay: `${timelineId}`,
        tempTime: LOGIC_HELPERS.ifElse(
          startTimeValue,
          moment()
            .startOf('day')
            .add(moment.duration(startTimeValue))
            .format('HH:mm'),
        ),
      },
    },
    type,
  };

  return TEMPLATE_API_HELPERS.patchEvent(
    {
      model: { node },
      onSuccess,
    },
    { ...props, id, dataId, templateId },
  );
};

const reactivateEvent = (
  { id, dataId, onSuccess, templateId, type, subtype },
  props,
) => {
  TEMPLATE_API_HELPERS.patchEvent(
    {
      model: {
        data: {
          detail: { type: subtype },
          type,
          cancellation: null,
        },
      },
      onSuccess,
    },
    { ...props, id, dataId, templateId },
  );
};

const convertAttachments = (data = {}) => {
  if (!data.eventAttachments || Array.isArray(data.eventAttachments))
    return data;

  const parsedData = data;

  // convert object to array
  parsedData.eventAttachments = Object.keys(data.eventAttachments).map(
    key => data.eventAttachments[key],
  );

  return parsedData;
};

export const TEMPLATE_API_HELPERS = {
  convertAttachments,
  moveToDay,
  moveToUnplanned,
  reactivateEvent,
  fetchEvents,
  createEvent,
  patchEvent,
  patchAmount,
  deleteEvent,
  createFlightBooking,
  patchFlightBooking,
  deleteFlightBooking,
  createEventAttachment,
  patchEventAttachment,
  deleteEventAttachment,
  batchRecentActivity,
  getPeople,
  addRole,

  getParticipants,

  upsertSetting,
  upsertSettings,

  getObjectIds,
  addMyOwnRole,
};
