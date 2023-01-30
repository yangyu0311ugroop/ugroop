/**
 * Created by stephenkarpinskyj on 19/8/18.
 */

import dotProp from 'dot-prop-immutable';
import get from 'lodash/get';
import merge from 'lodash/merge';
import { normalize } from 'normalizr';
import ARRAY_HELPERS from 'utils/helpers/arrays';
import upsertHelpers from 'utils/helpers/upsertStore';
import { NODE_SCHEMA } from 'datastore/nodeStore/schema';
import { NODE_STORE_UTILS } from 'datastore/nodeStore/utils';
import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { EVENT_SCHEMA } from 'datastore/eventStore/schema';
import { PERSON_STORE_SCHEMA } from 'datastore/personDataStore/schema';
import set from 'lodash/set';
import utils from 'datastore/utils';

const fetchEvents = ({
  eventList: events,
  flightBookingList: flightBookings,
}) => ({
  ...normalize({ events, flightBookings }, EVENT_SCHEMA).entities,
});

const createEvent = ({ data, node }, { templateId }) => {
  const { node: normalizedNode, ...rest } = normalize(
    [node],
    NODE_SCHEMA.node,
  ).entities;

  return {
    node: {
      ...normalizedNode,
    },
    calculatedNodes: {
      [templateId]: dotProp.set({}, 'calculated.events', [node.id]),
    },
    ...rest,
    ...normalize({ events: [data] }, EVENT_SCHEMA).entities,
    amountLastUpdated: Date.now(),
  };
};

const patchEvent = ({ data: eventData }, { data: { batchNode, data } }) => {
  const operations = dotProp.get(batchNode, 'operations', []);
  const node = NODE_STORE_UTILS.parseEventNodeBatchOperations(operations);
  let deepDataCopy = merge(data, eventData);

  if (deepDataCopy.eventAttachments) {
    deepDataCopy.eventAttachments = deepDataCopy.eventAttachments.reduce(
      (accu, attachment) => {
        if (attachment.isDeleted) return accu;

        return accu.concat(attachment);
      },
      [],
    );
  }

  const transportationSubtype = get(
    eventData,
    EVENT_PATHS.transportationType,
    null,
  );

  let nodes;
  if (node) nodes = normalize([node], NODE_SCHEMA.node).entities;
  if (transportationSubtype && data) {
    deepDataCopy = set(
      data,
      EVENT_PATHS.transportationType,
      transportationSubtype,
    );
  }

  let events;
  if (Object.keys(deepDataCopy).length > 0) {
    const activityDetails = dotProp.get(
      eventData,
      EVENT_PATHS.activityDetails,
      null,
    );
    if (activityDetails)
      deepDataCopy = dotProp.set(
        deepDataCopy,
        EVENT_PATHS.activityDetails,
        activityDetails,
      );
    events = normalize({ events: [deepDataCopy] }, EVENT_SCHEMA).entities;
  }

  return {
    ...nodes,
    ...events,
    raw: deepDataCopy,
  };
};

const createFlightBooking = result => ({
  ...normalize({ flightBookings: [result] }, EVENT_SCHEMA).entities,
});

const patchFlightBooking = ({ id, bookingAmounts }, { data }) => ({
  ...normalize(
    {
      flightBookings: [
        {
          id,
          ...data,
          bookingAmounts,
        },
      ],
    },
    EVENT_SCHEMA,
  ).entities,
});

const createEventAttachment = (result, { eventId }) => {
  if (Array.isArray(result)) {
    const { entities, result: ids } = normalize(
      result,
      EVENT_SCHEMA.attachments,
    );

    return {
      eventAttachments: utils.upsertObject(entities.attachments),
      events: utils.upsertArray(`${eventId}.eventAttachments`, ids),
    };
  }

  const { entities } = normalize(result, EVENT_SCHEMA.attachment);

  return {
    eventAttachments: utils.upsertObject(entities.attachments),
    events: utils.upsertArray(`${eventId}.eventAttachments`, result.id),
  };
};

const patchEventAttachment = result => {
  const { entities } = normalize(result, EVENT_SCHEMA.attachment);

  return {
    eventAttachments: utils.upsertObject(entities.attachments),
  };
};

const deleteEventAttachment = (_, { attachmentId, eventId }) => ({
  events: utils.removeItemsArray(`${eventId}.eventAttachments`, attachmentId),
  eventAttachments: utils.removeObjectById(attachmentId),
});

const getParticipants = ({ nodes, people }) => {
  const { node, attachment } = normalize(
    ARRAY_HELPERS.arrayIfNot(nodes),
    NODE_SCHEMA.node,
  ).entities;
  const {
    person,
    photo,
    phones,
    passport,
    medicals,
    dietaries,
    studentDetails,
    insurancePolicies,
  } = normalize(people, PERSON_STORE_SCHEMA.people).entities;
  return {
    nodes: upsertHelpers.deepMerge(node),
    attachment: utils.upsertObject(attachment),
    peopleById: utils.upsertObject(person),
    photo: utils.upsertObject(photo),
    personPhones: utils.upsertObject(phones),
    passports: utils.upsertObject(passport),
    medicals: utils.upsertObject(medicals),
    dietaries: utils.upsertObject(dietaries),
    studentDetails: utils.upsertObject(studentDetails),
    insurancePolicies: utils.upsertObject(insurancePolicies),
  };
};

export const TEMPLATE_API_NORMALISERS = {
  fetchEvents,
  createEvent,
  patchEvent,
  createFlightBooking,
  patchFlightBooking,
  createEventAttachment,
  patchEventAttachment,
  deleteEventAttachment,

  getParticipants,
};
