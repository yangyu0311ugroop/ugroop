import NodeNormalisers from 'apis/components/Node/normalisers';
import { TEMPLATE_API_NORMALISERS } from 'apis/components/Template/normalisers';
import { TEMPLATE_TAB_UTILS } from 'apis/components/TemplateTab/utils';
import {
  BATCH_GET_PUB_TEMPLATE_TAB,
  GET_DETAILS,
  GET_PUB_TEMPLATE_EVENTS,
  GET_PUB_TEMPLATE_HEADER,
  GET_PUB_TEMPLATE_PEOPLE,
  GET_PUB_TEMPLATE_TAB,
  GET_PUB_TEMPLATE_TIMES,
  GET_PUB_TEMPLATE_TREE,
  PUB_API,
  PUB_CREATE_INTEREST,
} from 'apis/constants';

import {
  FILE_DATA_STORE,
  ORGANISATION_DATA_STORE,
  PHONE_DATA_STORE,
  TEMPLATE_MANAGEMENT_DATASTORE,
  USER_DATA_STORE,
  ATTACHMENT_DATASTORE,
} from 'appConstants';
import { EVENT_STORE_DATA_SELECTORS } from 'datastore/eventStore/selectors';
import { NODE_SCHEMA } from 'datastore/nodeStore/schema';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { ORGANISATION_SCHEMA } from 'datastore/orgStore/schema';
import { PERSON_STORE_SCHEMA } from 'datastore/personDataStore/schema';
import arrays from 'datastore/templateManagementStore/helpers/arrays';
import tabHelpers from 'datastore/templateManagementStore/helpers/tabs';
import { DATASTORE_UTILS } from 'datastore';
import { SET_VALUE } from 'ugcomponents/SnackBar/config';
import { compose } from 'redux';
import schema from 'datastore/templateManagementStore/schema';
import helpers from 'datastore/userStore/helpers';
import dotProp from 'dot-prop-immutable';
import _, { get } from 'lodash';
import { normalize } from 'normalizr';
import { requests } from 'utils/request';
import { NODE_API_UTILS } from '../Node/utils';
import { INVITATION_STORE_SELECTORS } from '../../../datastore/invitationStore/selectors';

export const convertChildren = () => children => arrays.convert(children);

export const CONFIG = {
  name: PUB_API,

  setValue: {
    user: [USER_DATA_STORE, 'users'],
    person: [USER_DATA_STORE, 'people'],
    photo: [FILE_DATA_STORE, 'files'],
    organisation: [ORGANISATION_DATA_STORE, 'organisations'],
    location: [ORGANISATION_DATA_STORE, 'locations'],
    files: [FILE_DATA_STORE, 'files'],
    nodes: NODE_STORE_SELECTORS.nodes,
    calculatedNodes: NODE_STORE_SELECTORS.calculatedNodes,
    events: EVENT_STORE_DATA_SELECTORS.events,
    flightBookings: EVENT_STORE_DATA_SELECTORS.flightBookings,
    flightBookingIds: EVENT_STORE_DATA_SELECTORS.flightBookingIds,
    id: [TEMPLATE_MANAGEMENT_DATASTORE, 'id'],
    shares: INVITATION_STORE_SELECTORS.shares,
    shareIds: INVITATION_STORE_SELECTORS.shareIds,
    userNodes: INVITATION_STORE_SELECTORS.userNodes,
    userNodeIds: INVITATION_STORE_SELECTORS.userNodeIds,
    personPhones: [PHONE_DATA_STORE, 'phones'],
    attachments: [ATTACHMENT_DATASTORE, 'attachments'],
    nodeSettings: NODE_STORE_SELECTORS.nodeSettings,
    ...SET_VALUE,
  },

  requests: {
    [GET_PUB_TEMPLATE_EVENTS]: ({ hashkey }) =>
      requests.fetchWithURL('get', `/${PUB_API}/template/${hashkey}/events`),
    [GET_PUB_TEMPLATE_PEOPLE]: ({ hashkey }) =>
      requests.fetchWithURL('get', `/${PUB_API}/template/${hashkey}/people`),
    [GET_PUB_TEMPLATE_TIMES]: ({ hashkey, ids }) => {
      if (Array.isArray(ids) && ids.length) {
        return requests.fetchWithURL(
          'get',
          `/${PUB_API}/template/${hashkey}/times?ids=${JSON.stringify(ids)}`,
        );
      }

      return undefined;
    },
    [GET_PUB_TEMPLATE_TREE]: ({ hashkey }) =>
      requests.fetchWithURL('get', `/${PUB_API}/template/${hashkey}/tree`),
    [GET_PUB_TEMPLATE_HEADER]: ({ hashkey }) =>
      requests.fetchWithURL('get', `/${PUB_API}/template/${hashkey}`),
    [GET_PUB_TEMPLATE_TAB]: ({ hashkey, id }) =>
      requests.fetchWithURL('get', `/${PUB_API}/template/${hashkey}/tab/${id}`),
    [BATCH_GET_PUB_TEMPLATE_TAB]: ({ hashkey, items }) =>
      Promise.all(
        items.map(async item =>
          requests.fetchWithURL(
            'get',
            `/${PUB_API}/template/${hashkey}/tab/${item.id}`,
          ),
        ),
      ),
    [PUB_CREATE_INTEREST]: ({ hashkey, data }) =>
      requests.fetchWithURL(
        'post',
        `/${PUB_API}/template/${hashkey}/interest`,
        data,
      ),
    [GET_DETAILS]: ({ userIds = [], organisationIds = [] }) => {
      if (!userIds.length && !organisationIds.length) {
        return {};
      }

      return requests.fetchWithURL(
        'get',
        `/${PUB_API}/details?userIds=${JSON.stringify(
          userIds,
        )}&organisationIds=${JSON.stringify(organisationIds)}`,
      );
    },
  },

  processResult: {
    [GET_PUB_TEMPLATE_TREE]: NodeNormalisers.getTree,
    [GET_PUB_TEMPLATE_EVENTS]: TEMPLATE_API_NORMALISERS.fetchEvents,
    [GET_PUB_TEMPLATE_PEOPLE]: helpers.normaliseGetPeople,
    [GET_PUB_TEMPLATE_HEADER]: (template, param) => {
      const origin = dotProp.set(template, 'children', convertChildren());

      const { entities, result } = normalize(origin, schema.templates);

      const { templates } = entities;
      const rest = templates;
      const { hashkeyDescription } = rest[origin.id];
      const getHashKeyDescription = {
        [origin.id]: {
          haskeyDescription: hashkeyDescription || null,
          hashkey: get(param, 'hashkey', ''),
        },
      };
      const { entities: nodeEntities } = normalize(
        origin,
        NODE_SCHEMA.singleNode,
      );

      const settings = NodeNormalisers.createTemplateSettings(
        template,
        nodeEntities,
      );

      const calculatedTabs = {
        [origin.id]: {
          calculated: {
            galleryId: NODE_API_UTILS.getGalleryId(origin),
            timelineId: NODE_API_UTILS.getTimelineId(origin),
            peopleTabId: NODE_API_UTILS.getTimelineId(origin),
          },
        },
      };
      const { photo, organisation, ...spread } = entities;

      return {
        ...spread,
        organisation: DATASTORE_UTILS.upsertObject(organisation),
        nodes: compose(
          DATASTORE_UTILS.upsertObject(nodeEntities.node),
          DATASTORE_UTILS.upsertObject(nodeEntities.eventNodes),
          DATASTORE_UTILS.upsertObject(calculatedTabs),
          DATASTORE_UTILS.upsertObject(getHashKeyDescription),
        ),
        files: compose(
          DATASTORE_UTILS.upsertObject(photo),
          DATASTORE_UTILS.upsertObject(nodeEntities.photo),
        ),
        id: result,
        nodeSettings: DATASTORE_UTILS.upsertObject(settings),
      };
    },
    [GET_PUB_TEMPLATE_TAB]: (result, payload) => {
      const { type, children, id, parentNodeId } = result;
      const tabChildrenData = tabHelpers.convertChildrenToArray(type, children);
      const normalised = normalize(tabChildrenData, NODE_SCHEMA.node);
      const entities = normalised.entities;
      const ids = normalised.result;
      const templateId = parentNodeId || payload.templateId;

      return {
        nodes: compose(
          DATASTORE_UTILS.upsertObject(entities.node),
          DATASTORE_UTILS.upsertObject(entities.eventNodes),
          DATASTORE_UTILS.upsertArray(`${id}.children`, ids),
        ),
        calculatedNodes: DATASTORE_UTILS.upsertArray(
          `${templateId}.calculated.events`,
          DATASTORE_UTILS.getObjectIds(entities.eventNodes),
        ),
        files: DATASTORE_UTILS.upsertObject(
          Object.assign(
            get(entities, 'photo', {}),
            get(entities, 'attachment', {}),
          ),
        ),
        attachments: DATASTORE_UTILS.upsertObject(
          Object.assign(get(entities, 'attachment', {})),
        ),
        ids,
      };
    },
    [BATCH_GET_PUB_TEMPLATE_TAB]: result =>
      TEMPLATE_TAB_UTILS.addMultipleNode(result),
    [PUB_CREATE_INTEREST]: (result = []) => {
      const id = get(result, '0.parentNodeId');
      const desc = get(result, '0.hashkeyDescription');
      const getHashKeyDescription = {
        [id]: {
          haskeyDescription: desc || null,
        },
      };
      return {
        nodes: DATASTORE_UTILS.upsertObject(getHashKeyDescription),
      };
    },
    [GET_DETAILS]: ({ persons = [], organisations = [] }) => {
      if (!persons.length && !organisations.length) return {};

      const { person, photo } = normalize(
        persons,
        PERSON_STORE_SCHEMA.peoples,
      ).entities;

      const { organisation, photo: orgPhoto, location } = normalize(
        organisations,
        ORGANISATION_SCHEMA.organisations,
      ).entities;

      return {
        person: DATASTORE_UTILS.upsertObject(person),
        organisation: DATASTORE_UTILS.upsertObject(organisation),
        location: DATASTORE_UTILS.upsertObject(location),
        photo: compose(
          DATASTORE_UTILS.upsertObject(photo),
          DATASTORE_UTILS.upsertObject(orgPhoto),
        ),
      };
    },
  },

  processError: error =>
    _.get(error, 'response.error.headers.error') || // 500 error
    _.get(error, 'response.error.message') || // 4xx errors
    error, // others

  manuallySubscribe: true, // will not auto-subscribe to all values in `@@values`
};
