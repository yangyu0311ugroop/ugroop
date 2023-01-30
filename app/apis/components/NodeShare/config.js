import { normalize } from 'normalizr';
import schema from 'datastore/sharedTemplateListDataStore/schema';
import { ORGANISATION_SCHEMA } from 'datastore/orgStore/schema';
import { NODE_SCHEMA } from 'datastore/nodeStore/schema';
import userScheme from 'datastore/userStore/schema';
import {
  ABILITY_DATA_STORE,
  SHARED_TEMPLATES_DATASTORE,
  NODE_STORE,
  ORGANISATION_DATA_STORE,
  FILE_DATA_STORE,
  USER_DATA_STORE,
} from 'appConstants';
import upsertHelpers, { ARRAY_MODE } from 'utils/helpers/upsertStore';
import {
  NODE_SHARE_API,
  CONFIRM_INVITATION,
  DECLINE_INVITATION,
  GET_SHARED_TEMPLATES,
} from 'apis/constants';
import { DATASTORE_UTILS } from 'datastore';
import { INVITATION_STORE_SCHEMA } from 'datastore/invitationStore/schema';
import { INVITATION_STORE_SELECTORS } from 'datastore/invitationStore/selectors';
import { requests } from 'utils/request';
import { DEFAULT_LIMIT } from 'containers/Templates/constants';

const normaliseConfirmInvitation = ({
  nodeShare: { notificationToken, status, updatedAt },
  userNodes,
}) => ({
  shares: DATASTORE_UTILS.upsertObject({
    [notificationToken]: { status, updatedAt },
  }),
  shareIds: upsertHelpers.array(notificationToken, ARRAY_MODE.APPEND),
  userNodes: DATASTORE_UTILS.upsertObject(
    normalize(userNodes, INVITATION_STORE_SCHEMA.userNodes).entities.userNodes,
  ),
  userNodeIds: upsertHelpers.array(
    DATASTORE_UTILS.getObjectIds(userNodes),
    ARRAY_MODE.APPEND,
  ),
});

const normaliseDeclineInvitation = ({
  notificationToken,
  status,
  updatedAt,
}) => ({
  shares: DATASTORE_UTILS.upsertObject({
    [notificationToken]: { status, updatedAt },
  }),
  shareIds: upsertHelpers.array(notificationToken, ARRAY_MODE.APPEND),
});
const normaliseSharedTemplate = res => {
  const templateListObject = {
    id: 'sharedTours',
    children: res.nodes,
  };
  const { entities, result } = normalize(templateListObject, schema.folder);
  const { entities: nodeEntities } = normalize(res.nodes, NODE_SCHEMA.node);
  const { entities: orgEntities } = normalize(
    res.orgList,
    ORGANISATION_SCHEMA.organisations,
  );
  const { entities: userNodeEntities } = normalize(
    res.userNodes,
    INVITATION_STORE_SCHEMA.userNodes,
  );
  const { entities: userEntities } = normalize(res.users, userScheme.person);
  // insert tour roles
  if (userNodeEntities.userNodes) {
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(entities.children)) {
      const userNode = Object.values(userNodeEntities.userNodes).find(
        o => o.nodeId === parseInt(key, 10),
      );
      if (userNode) {
        if (value.tourRoles) {
          value.tourRoles.push(userNode.role);
        } else {
          value.tourRoles = [userNode.role];
        }
      }
    }
  }

  const photoData = {
    ...userEntities.photo,
    ...orgEntities.photo,
    ...nodeEntities.photo,
  };
  return {
    children: entities.children,
    folder: entities.folder,
    nodes: DATASTORE_UTILS.upsertObject(nodeEntities.node),
    id: result,
    org: DATASTORE_UTILS.upsertObject(orgEntities.organisation),
    photo: DATASTORE_UTILS.upsertObject(photoData),
    person: DATASTORE_UTILS.upsertObject(userEntities.person),
  };
};
export const helpers = {
  normaliseConfirmInvitation,
  normaliseDeclineInvitation,
  normaliseSharedTemplate,
};

export const CONFIG = {
  name: NODE_SHARE_API,

  requests: {
    [CONFIRM_INVITATION]: ({ token, content }) =>
      requests.fetchWithAuthorisation(
        'post',
        `/${NODE_SHARE_API}/${token}/confirm`,
        { content },
      ),
    [DECLINE_INVITATION]: ({ token, content }) =>
      requests.fetchWithAuthorisation(
        'post',
        `/${NODE_SHARE_API}/${token}/decline`,
        { content },
      ),
    [GET_SHARED_TEMPLATES]: ({
      pageSelected,
      page,
      offset,
      sortOrder,
      sortField,
    }) => {
      const newLimit =
        page && page !== 0 ? (page + 1) * DEFAULT_LIMIT : DEFAULT_LIMIT;
      const param = `offset=${offset}&limit=${newLimit}&sortby=${sortField}:${sortOrder},id`;
      const url =
        pageSelected === 'shareToMe'
          ? `/nodeshares/sharedToMe?${param}`
          : `/nodeshares/sharedFromMe?${param}`;
      return requests.fetchWithAuthorisation('get', url);
    },
  },

  processResult: {
    [CONFIRM_INVITATION]: helpers.normaliseConfirmInvitation,
    [DECLINE_INVITATION]: helpers.normaliseDeclineInvitation,
    [GET_SHARED_TEMPLATES]: helpers.normaliseSharedTemplate,
  },

  value: {
    tourAbilities: {
      keyPath: [ABILITY_DATA_STORE, 'definitions', 'tour'],
      isEqual: () => true, // static object, tell resaga to never update
    },
  },

  setValue: {
    shares: INVITATION_STORE_SELECTORS.shares,
    shareIds: INVITATION_STORE_SELECTORS.shareIds,
    userNodes: INVITATION_STORE_SELECTORS.userNodes,
    userNodeIds: INVITATION_STORE_SELECTORS.userNodeIds,
    tours: [ABILITY_DATA_STORE, 'tours'],
    sortOrder: [SHARED_TEMPLATES_DATASTORE, 'sortOrder'],
    sortField: [SHARED_TEMPLATES_DATASTORE, 'sortField'],
    viewSelected: [SHARED_TEMPLATES_DATASTORE, 'viewSelected'],
    pageSelected: [SHARED_TEMPLATES_DATASTORE, 'pageSelected'],
    currResultCount: [SHARED_TEMPLATES_DATASTORE, 'currResultCount'],
    nodes: [NODE_STORE, 'nodes'],
    org: [ORGANISATION_DATA_STORE, 'organisations'],
    photo: [FILE_DATA_STORE, 'files'],
    person: [USER_DATA_STORE, 'people'],
  },

  manuallySubscribe: true, // will not auto-subscribe to all values in `@@values`
};
