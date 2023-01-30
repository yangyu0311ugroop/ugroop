import NodeNormalisers from 'apis/components/Node/normalisers';
import { NODE_API_UTILS } from 'apis/components/Node/utils';
import {
  ADD_IMAGE_SUCCESS,
  ADD_ROLE,
  BATCH_RECENT_ACTIVITY,
  CHANGE_ROLE,
  CREATE_EVENT,
  CREATE_EVENT_ATTACHMENT,
  CREATE_FLIGHT_BOOKING,
  DELETE_EVENT,
  DELETE_EVENT_ATTACHMENT,
  DELETE_FLIGHT_BOOKING,
  FETCH_EVENTS,
  FIND_ORGANISATION_ID,
  GET_PARTICIPANTS,
  GET_PEOPLE,
  GET_PERSON,
  GET_TEMPLATE_DETAIL,
  GET_TEMPLATE_FEATURED_LIST,
  GET_TEMPLATE_HASHKEY,
  INIT_TEMPLATE_SETTINGS,
  PATCH_EVENT,
  PATCH_EVENT_ATTACHMENT,
  PATCH_FLIGHT_BOOKING,
  REMOVE_TEMPLATE,
  REMOVE_USER_FROM_TOUR,
  TEMPLATE_API,
  UPSERT_TEMPLATE_SETTING,
  UPDATE_HASHKEY,
  ACCEPT_TOUR_OWNERSHIP,
  POST_HASHKEY,
  REMOVE_HASHKEY,
  ADD_MY_OWN_ROLE,
  LIST_TEMPLATE_CUSTOM_DATA,
  PATCH_TEMPLATE_CUSTOM_DATA,
  EMAIL_ME_EVENT_ADDRESS,
  CHANGE_CUSTOM_USER_ROLE,
  GET_ORG_MEMBERS,
  UPSERT_TEMPLATE_SETTINGS,
} from 'apis/constants';
import {
  ABILITY_DATA_STORE,
  COORDINATE_DATA_STORE,
  DISCUSSION_DATASTORE,
  FILE_DATA_STORE,
  INVITATION_STORE,
  NODE_STORE,
  NODE_STORE_ITEM,
  ORGANISATION_DATA_STORE,
  PHONE_DATA_STORE,
  USER_DATA_STORE,
} from 'appConstants';
import { DATASTORE_UTILS } from 'datastore';
import { ATTACHMENT_STORE_SELECTORS } from 'datastore/attachmentStore/selectors';
import { EVENT_STORE_DATA_SELECTORS } from 'datastore/eventStore/selectors';
import { INVITATION_STORE_SELECTORS } from 'datastore/invitationStore/selectors';
import { NODE_SCHEMA } from 'datastore/nodeStore/schema';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { PERSON_STORE_SELECTORS } from 'datastore/personDataStore/selectors';
import arrays from 'datastore/templateManagementStore/helpers/arrays';
import schema from 'datastore/templateManagementStore/schema';
import helpers from 'datastore/userStore/helpers';
import dotProp from 'dot-prop-immutable';
import set from 'lodash/set';
import get from 'lodash/get';
import { normalize } from 'normalizr';
import { compose } from 'redux';
import { SET_VALUE } from 'ugcomponents/SnackBar/config';
import { ARRAY_HELPERS } from 'utils/helpers/arrays';
import { DAY, TAB_GALLERY, TEMPLATE } from 'utils/modelConstants';
import { requests } from 'utils/request';
import { TEMPLATE_API_NORMALISERS } from './normalisers';
import { TEMPLATE_API_HELPERS } from './helpers';

export const convertChecklists = checklists =>
  arrays.convertChecklistsToArray(checklists);

export const onUpdate = (parent, convertedChildren) => {
  switch (parent.type) {
    case DAY: {
      const convertedParent = dotProp.set(
        parent,
        'checklists',
        arrays.convertChecklistsToArray,
      );
      return dotProp.set(convertedParent, 'children', convertedChildren);
    }
    case TAB_GALLERY: {
      return dotProp.set(parent, 'children', arrays.convertNextNodesToArray);
    }
    default: {
      return dotProp.set(parent, 'children', convertedChildren);
    }
  }
};

export const convertChildren = children =>
  arrays.convert(children, undefined, onUpdate);

export const CONFIG = {
  name: TEMPLATE_API,

  setValue: {
    days: [NODE_STORE, 'nodes'],
    files: [FILE_DATA_STORE, 'files'],

    attachment: ATTACHMENT_STORE_SELECTORS.attachments,
    eventAttachments: EVENT_STORE_DATA_SELECTORS.eventAttachments,
    link: [NODE_STORE, 'links'],
    linkIds: [NODE_STORE, 'linkIds'],
    peopleById: PERSON_STORE_SELECTORS.people,
    photo: [FILE_DATA_STORE, 'files'],
    nodes: NODE_STORE_SELECTORS.nodes,
    calculatedNodes: NODE_STORE_SELECTORS.calculatedNodes,
    passports: [USER_DATA_STORE, 'passports'],
    medicals: PERSON_STORE_SELECTORS.medical,
    dietaries: PERSON_STORE_SELECTORS.dietary,
    studentDetails: PERSON_STORE_SELECTORS.studentDetail,
    share: INVITATION_STORE_SELECTORS.shares,
    shareIds: INVITATION_STORE_SELECTORS.shareIds,
    shareSubNode: INVITATION_STORE_SELECTORS.shareSubNodes,
    shareSubNodeIds: INVITATION_STORE_SELECTORS.shareSubNodeIds,
    userNodes: INVITATION_STORE_SELECTORS.userNodes,
    userNodeIds: INVITATION_STORE_SELECTORS.userNodeIds,
    notification: [INVITATION_STORE, 'notifications'],
    person: [USER_DATA_STORE, 'people'],
    personPhones: [PHONE_DATA_STORE, 'phones'],
    user: [USER_DATA_STORE, 'users'],
    organisation: [ORGANISATION_DATA_STORE, 'organisations'],
    activityDetail: EVENT_STORE_DATA_SELECTORS.activityDetail,
    tours: [ABILITY_DATA_STORE, 'tours'],

    events: EVENT_STORE_DATA_SELECTORS.events,
    amountLastUpdated: EVENT_STORE_DATA_SELECTORS.amountLastUpdated,
    flightBookings: EVENT_STORE_DATA_SELECTORS.flightBookings,
    flightBookingIds: EVENT_STORE_DATA_SELECTORS.flightBookingIds,

    nodeSettings: NODE_STORE_SELECTORS.nodeSettings,

    feedbacks: [DISCUSSION_DATASTORE, 'feedbacks'],

    comments: [DISCUSSION_DATASTORE, 'comments'],

    [NODE_STORE_ITEM.FEATURED_TOURS]: [
      NODE_STORE,
      NODE_STORE_ITEM.FEATURED_TOURS,
    ],
    userActivities: [COORDINATE_DATA_STORE, 'userActivities'],
    recentActivityIds: [COORDINATE_DATA_STORE, 'recentActivityIds'],
    nodeTransfers: INVITATION_STORE_SELECTORS.nodeTransfers,
    hashkey: NODE_STORE_SELECTORS.hashkey,
    organisationTours: [ORGANISATION_DATA_STORE, 'organisationTours'],
    insurancePolicies: PERSON_STORE_SELECTORS.insurancePolicies,
    ...SET_VALUE,
  },

  requests: {
    [GET_TEMPLATE_DETAIL]: ({ id }) =>
      requests.fetchWithAuthorisation('get', `/${TEMPLATE_API}/${id}`),
    [GET_TEMPLATE_HASHKEY]: ({ id }) =>
      requests.fetchWithAuthorisation('get', `/${TEMPLATE_API}/${id}/hashkey`),
    [GET_TEMPLATE_FEATURED_LIST]: () =>
      requests.fetchWithAuthorisation('get', `/${TEMPLATE_API}/featured`),
    [FETCH_EVENTS]: ({ templateId }) =>
      requests.fetchWithAuthorisation(
        'get',
        `/${TEMPLATE_API}/${templateId}/events`,
      ),
    [CREATE_EVENT]: ({ templateId, data }) =>
      requests.fetchWithAuthorisation(
        'post',
        `/${TEMPLATE_API}/${templateId}/event`,
        data,
      ),
    [PATCH_EVENT]: ({ id, templateId, data }) =>
      requests.fetchWithAuthorisation(
        'patch',
        `/${TEMPLATE_API}/${templateId}/event/${id}`,
        data,
      ),
    [DELETE_EVENT]: ({ id, dataId, templateId }) =>
      requests.fetchWithAuthorisation(
        'delete',
        `/${TEMPLATE_API}/${templateId}/event/${id}/${dataId}`,
      ),

    [CREATE_FLIGHT_BOOKING]: ({ templateId, data }) =>
      requests.fetchWithAuthorisation(
        'post',
        `/${TEMPLATE_API}/${templateId}/flightBooking`,
        data,
      ),
    [PATCH_FLIGHT_BOOKING]: ({ dataId, templateId, data }) =>
      requests.fetchWithAuthorisation(
        'patch',
        `/${TEMPLATE_API}/${templateId}/flightBooking/${dataId}`,
        data,
      ),
    [DELETE_FLIGHT_BOOKING]: ({ dataId, templateId }) =>
      requests.fetchWithAuthorisation(
        'delete',
        `/${TEMPLATE_API}/${templateId}/flightBooking/${dataId}`,
      ),

    [BATCH_RECENT_ACTIVITY]: ({ id }) =>
      requests.fetchWithAuthorisation(
        'get',
        `/${TEMPLATE_API}/${id}/${BATCH_RECENT_ACTIVITY}`,
      ),
    [GET_PEOPLE]: ({ id }) =>
      requests.fetchWithAuthorisation('get', `/${TEMPLATE_API}/${id}/people`),
    [GET_PERSON]: ({ id, email }) =>
      requests.fetchWithAuthorisation(
        'get',
        `/${TEMPLATE_API}/${id}/people/${email}`,
      ),

    [CHANGE_ROLE]: ({ id, userId, role }) =>
      requests.fetchWithAuthorisation(
        'patch',
        `/${TEMPLATE_API}/${id}/changeRole/${userId}`,
        { role },
      ),
    [ADD_ROLE]: ({ id, userId, role, subNodes, organisationId }) =>
      requests.fetchWithAuthorisation(
        'post',
        `/${TEMPLATE_API}/${id}/role/${userId}`,
        { role, subNodes, organisationId },
      ),
    [REMOVE_TEMPLATE]: ({ id }) =>
      requests.fetchWithAuthorisation('delete', `/${TEMPLATE_API}/${id}`),
    [FIND_ORGANISATION_ID]: ({ id }) =>
      requests.fetchWithAuthorisation(
        'get',
        `/${TEMPLATE_API}/${id}/organisationId`,
      ),
    [CREATE_EVENT_ATTACHMENT]: ({ templateId, eventId, data }) => {
      if (Array.isArray(data)) {
        return Promise.all(
          data.map(file =>
            requests.fetchWithAuthorisation(
              'post',
              `/${TEMPLATE_API}/${templateId}/event/${eventId}/attachment`,
              file,
            ),
          ),
        );
      }

      return requests.fetchWithAuthorisation(
        'post',
        `/${TEMPLATE_API}/${templateId}/event/${eventId}/attachment`,
        data,
      );
    },
    [DELETE_EVENT_ATTACHMENT]: ({ templateId, eventId, attachmentId }) =>
      requests.fetchWithAuthorisation(
        'delete',
        `/${TEMPLATE_API}/${templateId}/event/${eventId}/attachment/${attachmentId}`,
      ),
    [PATCH_EVENT_ATTACHMENT]: ({ templateId, eventId, attachmentId, data }) =>
      requests.fetchWithAuthorisation(
        'patch',
        `/${TEMPLATE_API}/${templateId}/event/${eventId}/attachment/${attachmentId}`,
        data,
      ),
    [REMOVE_USER_FROM_TOUR]: ({ id, userId, data }) =>
      requests.fetchWithAuthorisation(
        'patch',
        `/${TEMPLATE_API}/${id}/removeUserFromTour/${userId}`,
        data,
      ),
    [INIT_TEMPLATE_SETTINGS]: ({ id }) =>
      requests.fetchWithAuthorisation(
        'post',
        `/${TEMPLATE_API}/${id}/initTemplateSetting`,
      ),
    [UPSERT_TEMPLATE_SETTING]: ({ id, settingId, data }) =>
      requests.fetchWithAuthorisation(
        'put',
        `/${TEMPLATE_API}/${id}/templateSettings/${settingId}`,
        data,
      ),
    [UPSERT_TEMPLATE_SETTINGS]: ({ templateId, values }) =>
      Promise.all(
        values.map(({ settingId, data }) =>
          requests.fetchWithAuthorisation(
            'put',
            `/${TEMPLATE_API}/${templateId}/templateSettings/${settingId}`,
            data,
          ),
        ),
      ),
    [GET_PARTICIPANTS]: ({ id, ids }) => {
      const idsArray = ARRAY_HELPERS.arrayIfNot(ids);

      if (idsArray.length) {
        return requests.fetchWithAuthorisation(
          'get',
          `/${TEMPLATE_API}/${id}/participants?ids=${JSON.stringify(idsArray)}`,
        );
      }

      return undefined;
    },
    [ADD_IMAGE_SUCCESS]: ({ id, ids }) =>
      requests.fetchWithAuthorisation(
        'get',
        `/${TEMPLATE_API}/${id}/addImagesSuccess?ids=${JSON.stringify(ids)}`,
      ),
    [UPDATE_HASHKEY]: ({ id, ...payload }) =>
      requests.fetchWithAuthorisation(
        'patch',
        `/Templates/${id}/hashkey`,
        payload,
      ),
    [ACCEPT_TOUR_OWNERSHIP]: ({ id, data }) =>
      requests.fetchWithAuthorisation(
        'patch',
        `/${TEMPLATE_API}/${id}/acceptOwnership`,
        data,
      ),
    [POST_HASHKEY]: ({ id }) =>
      requests.fetchWithAuthorisation('post', `/Templates/${id}/hashkey`),
    [REMOVE_HASHKEY]: ({ id }) =>
      requests.fetchWithAuthorisation('delete', `/Templates/${id}/hashkey`),
    [LIST_TEMPLATE_CUSTOM_DATA]: ({ query }) => {
      const q = JSON.stringify(query);
      return requests.fetchWithAuthorisation(
        'get',
        `/Templates/listCustomData?listOptions=${q}`,
      );
    },
    [PATCH_TEMPLATE_CUSTOM_DATA]: ({ id, data }) =>
      requests.fetchWithAuthorisation(
        'patch',
        `/Templates/${id}/patchCustomData`,
        data,
      ),
    [ADD_MY_OWN_ROLE]: ({ id, payload }) =>
      requests.fetchWithAuthorisation(
        'post',
        `/Templates/${id}/shareToMe`,
        payload,
      ),
    [EMAIL_ME_EVENT_ADDRESS]: ({ id, data }) =>
      requests.fetchWithAuthorisation(
        'post',
        `/Templates/${id}/emailMeEventEmailSettings`,
        data,
      ),
    [CHANGE_CUSTOM_USER_ROLE]: ({ id, userId, data }) =>
      requests.fetchWithAuthorisation(
        'patch',
        `/${TEMPLATE_API}/${id}/changeCustomUserRole/${userId}`,
        data,
      ),
    [GET_ORG_MEMBERS]: ({ id }) =>
      requests.fetchWithAuthorisation(
        'get',
        `/${TEMPLATE_API}/${id}/getOrgMembers`,
      ),
  },

  processResult: {
    [FETCH_EVENTS]: TEMPLATE_API_NORMALISERS.fetchEvents,
    [CREATE_EVENT]: TEMPLATE_API_NORMALISERS.createEvent,
    [PATCH_EVENT]: TEMPLATE_API_NORMALISERS.patchEvent,

    [CREATE_FLIGHT_BOOKING]: TEMPLATE_API_NORMALISERS.createFlightBooking,
    [PATCH_FLIGHT_BOOKING]: TEMPLATE_API_NORMALISERS.patchFlightBooking,

    [CREATE_EVENT_ATTACHMENT]: TEMPLATE_API_NORMALISERS.createEventAttachment,
    [DELETE_EVENT_ATTACHMENT]: TEMPLATE_API_NORMALISERS.deleteEventAttachment,
    [PATCH_EVENT_ATTACHMENT]: TEMPLATE_API_NORMALISERS.patchEventAttachment,

    [GET_PEOPLE]: helpers.normaliseGetPeople,
    [GET_PERSON]: helpers.normaliseGetPerson,
    [BATCH_RECENT_ACTIVITY]: helpers.normaliseBatchRecentActivity,
    [CHANGE_ROLE]: (userNode, { token }) => ({
      share: DATASTORE_UTILS.upsertObject({ [token]: { role: userNode.role } }),
      userNodes: DATASTORE_UTILS.upsertObject(userNode.id, userNode),
    }),
    [ADD_ROLE]: helpers.normaliseAddRole,
    [FIND_ORGANISATION_ID]: node => ({
      nodes: nodes =>
        set(
          nodes,
          [node.id, 'customData', 'organisationId'],
          node.calculated.organisationId,
        ),
      id: node.id,
      node,
    }),
    [REMOVE_TEMPLATE]: NodeNormalisers.batchDeleteNode,
    [GET_TEMPLATE_DETAIL]: template => {
      let origin = dotProp.set(template, 'children', convertChildren);
      origin = dotProp.set(
        origin,
        'checklists',
        arrays.convertChecklistsToArray,
      );

      const { entities, result } = normalize(origin, schema.templates);

      const { hashkey, events, ...rest } = entities;

      const { photo: orgPhoto, organisation } = rest;

      const hashkeyDescription = get(origin, 'hashkey.description');

      const { entities: nodeEntities } = normalize(
        origin,
        NODE_SCHEMA.singleNode,
      );

      const { photo } = nodeEntities;
      const settings = NodeNormalisers.createTemplateSettings(
        template,
        nodeEntities,
      );

      const calculatedTabs = {
        [origin.id]: {
          calculated: {
            galleryId: NODE_API_UTILS.getGalleryId(origin),
            timelineId: NODE_API_UTILS.getTimelineId(origin),
            peopleTabId: NODE_API_UTILS.getPeopleTabId(origin),
          },
        },
      };

      const getHashKeyDescription = {
        [origin.id]: {
          haskeyDescription: hashkeyDescription || null,
        },
      };
      const numberLink = TEMPLATE_API_HELPERS.getObjectIds(nodeEntities.link);
      const numberFollowers = TEMPLATE_API_HELPERS.getObjectIds(
        nodeEntities.follower,
      );
      const linkIds = [...numberLink, ...numberFollowers];
      let groups = {};
      if (nodeEntities.group) {
        groups = Object.keys(nodeEntities.group).reduce((accu, id) => {
          if (get(nodeEntities.group[id], 'type') === 'group') {
            const grp = nodeEntities.group[id];
            return { ...accu, [id]: grp };
          }
          return accu;
        }, {});
      }

      return {
        ...rest,
        organisation: DATASTORE_UTILS.upsertObject(organisation),
        link: compose(
          DATASTORE_UTILS.upsertObject(nodeEntities.link),
          DATASTORE_UTILS.upsertObject(nodeEntities.follower),
        ),
        linkIds: DATASTORE_UTILS.upsertArray('', linkIds),
        photo: compose(
          DATASTORE_UTILS.upsertObject(photo),
          DATASTORE_UTILS.upsertObject(orgPhoto),
        ),
        nodes: compose(
          DATASTORE_UTILS.upsertObject(nodeEntities.node),
          DATASTORE_UTILS.upsertObject(groups),
          DATASTORE_UTILS.upsertObject(nodeEntities.risks),
          DATASTORE_UTILS.upsertObject(nodeEntities.hazards),
          DATASTORE_UTILS.upsertObject(events),
          DATASTORE_UTILS.upsertObject(nodeEntities.rooms),
          DATASTORE_UTILS.upsertObject(nodeEntities.eventNodes),
          DATASTORE_UTILS.upsertObject(nodeEntities.participantNodes),
          DATASTORE_UTILS.upsertArray(
            `${origin.id}.calculated.participants`,
            DATASTORE_UTILS.getObjectIds(nodeEntities.participantNodes),
          ),
          DATASTORE_UTILS.upsertObject(calculatedTabs),
          DATASTORE_UTILS.upsertObject(getHashKeyDescription),
        ),
        calculatedNodes: DATASTORE_UTILS.upsertArray(
          `${origin.id}.calculated.events`,
          DATASTORE_UTILS.getObjectIds(nodeEntities.eventNodes),
        ),
        id: result,
        nodeSettings: DATASTORE_UTILS.upsertObject(settings),
        feedbacks: DATASTORE_UTILS.upsertObject(nodeEntities.feedbacks),
        comments: DATASTORE_UTILS.upsertObject(nodeEntities.comments),
      };
    },
    [GET_TEMPLATE_HASHKEY]: data => {
      const { hashkey, nodeId, description } = data;
      const node = { [nodeId]: { hashkey, haskeyDescription: description } };
      return {
        nodes: DATASTORE_UTILS.upsertObject(node),
      };
    },
    [GET_TEMPLATE_FEATURED_LIST]: toursArray => {
      const result = toursArray.reduce((acc, tour) => {
        acc[tour.id] = { content: tour.content, type: TEMPLATE };
        return acc;
      }, {});

      return {
        [NODE_STORE_ITEM.FEATURED_TOURS]: result,
        nodes: DATASTORE_UTILS.upsertObject(result),
        raw: toursArray,
      };
    },
    [REMOVE_USER_FROM_TOUR]: helpers.removePeople,
    [INIT_TEMPLATE_SETTINGS]: NodeNormalisers.initTemplateSettings,
    [UPSERT_TEMPLATE_SETTING]: NodeNormalisers.upsertTemplateSetting,
    [UPSERT_TEMPLATE_SETTINGS]: NodeNormalisers.upsertTemplateSettings,
    [GET_PARTICIPANTS]: TEMPLATE_API_NORMALISERS.getParticipants,
    [UPDATE_HASHKEY]: result => {
      const getHashKeyDescription = {
        [result.nodeId]: {
          haskeyDescription: result.description || null,
          disableRYI: result.disableRYI,
        },
      };
      return {
        nodes: DATASTORE_UTILS.upsertObject(getHashKeyDescription),
      };
    },
    [ACCEPT_TOUR_OWNERSHIP]: ({ notification }) => ({
      nodeTransfers: DATASTORE_UTILS.upsertObject(notification),
    }),
    [ADD_MY_OWN_ROLE]: helpers.normaliseAddRole,
    [CHANGE_CUSTOM_USER_ROLE]: (userNode, param) => {
      let nodeData = userNode;
      const id = userNode ? userNode.id : param.userNodeId;

      if (!nodeData) {
        nodeData = { userRole: get(param, 'data.userRole') };
      }

      return {
        userNodes: DATASTORE_UTILS.upsertObject(id, nodeData),
      };
    },
  },

  manuallySubscribe: true, // will not auto-subscribe to all values in `@@values`
};
