import {
  FETCH_EVENTS,
  FIND_ORGANISATION_ID,
  GET_ORG_MEMBERS,
  GET_ORGANISATION,
  GET_PEOPLE,
  GET_TEMPLATE_DETAIL,
  GET_TEMPLATE_HASHKEY,
  GET_TEMPLATE_TAB_DETAIL,
  GET_TIMES,
  GET_TREE,
  BATCH_RECENT_ACTIVITY,
  INIT_TEMPLATE_SETTINGS,
  NODE_API,
  ORGANISATION_API,
  TEMPLATE_API,
  TEMPLATE_TAB_API,
} from 'apis/constants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

export const CONFIG = {
  value: {},

  setValue: {
    fetching: NODE_STORE_SELECTORS.calculatedFetching,
  },

  isLoading: {
    // template management
    getTemplateDetail: [TEMPLATE_API, GET_TEMPLATE_DETAIL],
    getPeople: [TEMPLATE_API, GET_PEOPLE],
    batchRecentActivity: [TEMPLATE_API, BATCH_RECENT_ACTIVITY],
    getHashKey: [TEMPLATE_API, GET_TEMPLATE_HASHKEY],
    findOrganisationId: [TEMPLATE_API, FIND_ORGANISATION_ID],
    getOrgMembers: [ORGANISATION_API, GET_ORG_MEMBERS],
    getOrganisation: [ORGANISATION_API, GET_ORGANISATION],
    initTemplateSettings: [TEMPLATE_API, INIT_TEMPLATE_SETTINGS],
    // tab content
    getTemplateTabDetail: [TEMPLATE_TAB_API, GET_TEMPLATE_TAB_DETAIL],
    getTree: [NODE_API, GET_TREE],
    getTimes: [NODE_API, GET_TIMES],
    fetchEvents: [TEMPLATE_API, FETCH_EVENTS],
  },
};
