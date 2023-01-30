import { TOUR_CONTRIBUTOR_ROLE_TYPES } from 'apis/components/Ability/roles';
import { PENDING } from 'datastore/invitationStore/constants';
import _ from 'lodash';
import { INVITATION_STORE, TOUR_INVITATION_TYPE } from 'appConstants';
import { ARRAY_HELPERS } from 'utils/helpers/arrays';
import { SELECTOR_HELPERS } from 'utils/helpers/selectors';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { INVITATION_STORE_CACHE_KEYS } from './cacheKey';
import { INVITATION_STORE_UTILS } from './utils';

const EMPTY_ARRAY = [];

const show = ({ viewStore }) => [viewStore, 'show'];
const showCompleted = ({ viewStore }) => [viewStore, 'showCompleted'];

export const INVITATION_VIEW_STORE_SELECTORS = {
  show,
  showCompleted,
};

// region shares
/**
 * @param ids Share id's to use if array, else prop name
 * @param shareToUserIds Share userId's to filter by if array, else prop name
 */
const filterSharesByShareToUserId = ({
  ids = 'ids',
  shareToUserIds = 'shareToUserIds',
} = {}) => ({
  keyPath: ({ [ids]: i }) =>
    SELECTOR_HELPERS.propOrValueArray(ids, i).map(id =>
      shareShareToUserId({ id }),
    ),
  cacheKey: INVITATION_STORE_CACHE_KEYS.filterSharesByShareToUserId({
    ids,
    shareToUserIds,
  }),
  props: [
    SELECTOR_HELPERS.selectPropOrValueArray(ids),
    SELECTOR_HELPERS.selectPropOrValueArray(shareToUserIds),
  ],
  getter: (...selectedShareToUserIds) => {
    const shareToUserIdsValue = selectedShareToUserIds.pop();
    const idsValue = selectedShareToUserIds.pop();
    return _.zip(idsValue, selectedShareToUserIds).reduce(
      INVITATION_STORE_UTILS.filterSharesByShareToUserIdReducer(
        shareToUserIdsValue,
      ),
      EMPTY_ARRAY,
    );
  },
});

/**
 * @param ids Share id's to use if array, else prop name
 * @param nodeIds Share nodeId's to filter by if array, else prop name
 */
const filterSharesByNodeId = ({ ids = 'ids', nodeIds = 'nodeIds' } = {}) => ({
  keyPath: ({ [ids]: i }) =>
    SELECTOR_HELPERS.propOrValueArray(ids, i).map(id => shareNodeId({ id })),
  cacheKey: INVITATION_STORE_CACHE_KEYS.filterSharesByNodeId({ ids, nodeIds }),
  props: [
    SELECTOR_HELPERS.selectPropOrValueArray(ids),
    SELECTOR_HELPERS.selectPropOrValueArray(nodeIds),
  ],
  getter: (...selectedNodeIds) => {
    const nodeIdsValue = selectedNodeIds.pop();
    const idsValue = selectedNodeIds.pop();
    return _.zip(idsValue, selectedNodeIds).reduce(
      INVITATION_STORE_UTILS.filterSharesByNodeIdReducer(nodeIdsValue),
      EMPTY_ARRAY,
    );
  },
});

/**
 * @param ids Share id's to use if array, else prop name
 * @param roles Share roles to use if array, else prop name
 */
const filterSharesByRole = ({ ids = 'ids' } = {}) => ({
  keyPath: ({ [ids]: i }) =>
    SELECTOR_HELPERS.propOrValueArray(ids, i).map(id => shareRole({ id })),
  cacheKey: INVITATION_STORE_CACHE_KEYS.filterSharesByRole({ ids }),
  props: [
    SELECTOR_HELPERS.selectPropOrValueArray(ids),
    ({ roles }) => roles || TOUR_CONTRIBUTOR_ROLE_TYPES,
  ],
  getter: (...selectedRoles) => {
    const rolesValue = selectedRoles.pop();
    const idsValue = selectedRoles.pop();
    const idRoles = _.zip(idsValue, selectedRoles);
    if (!Array.isArray(rolesValue)) return [];
    const result = idRoles.reduce(
      INVITATION_STORE_UTILS.filterSharesByRolesReducer(rolesValue),
      EMPTY_ARRAY,
    );
    return result;
  },
});

/**
 * @param ids Share id's to use if array, else prop name
 * @param statuses Share statuses to use if array, else prop name
 */
const filterSharesByStatus = ({ ids = 'ids' } = {}) => ({
  keyPath: ({ [ids]: i }) =>
    SELECTOR_HELPERS.propOrValueArray(ids, i).map(id => shareStatus({ id })),
  cacheKey: INVITATION_STORE_CACHE_KEYS.filterSharesByStatus({ ids }),
  props: [SELECTOR_HELPERS.selectPropOrValueArray(ids)],
  getter: (...selectedStatuses) => {
    const statusesValue = [PENDING];
    const idsValue = selectedStatuses.pop();
    return _.zip(idsValue, selectedStatuses).reduce(
      INVITATION_STORE_UTILS.filterSharesByStatusesReducer(statusesValue),
      EMPTY_ARRAY,
    );
  },
});

const shares = [INVITATION_STORE, 'shares'];
const shareIds = [INVITATION_STORE, 'shareIds'];
const shareProp = ({ id, path }) => [
  ...shares,
  id,
  ...ARRAY_HELPERS.arrayIfNot(path),
];
const shareShareTo = ({ id }) => [...shares, id, 'shareTo'];
const shareShareToUserId = ({ id }) => [...shares, id, 'shareToUserId'];
const shareNodeId = ({ id }) => [...shares, id, 'nodeId'];
const shareRole = ({ id }) => [...shares, id, 'role'];
const shareStatus = ({ id }) => [...shares, id, 'status'];
const shareChildren = ({ id }) => [...shares, id, 'subNodes'];
const updatedAt = ({ id }) => [...shares, id, 'updatedAt'];
const resendUserId = ({ id }) => [...shares, id, 'resendUserId'];
// endregion

// region shareSubNodes
const shareSubNodeShareTokens = ({ ids = 'ids' } = {}) => ({
  keyPath: ({ [ids]: i }) =>
    SELECTOR_HELPERS.propOrValueArray(ids, i).map(id =>
      shareSubNodeShareToken({ id }),
    ),
  cacheKey: INVITATION_STORE_CACHE_KEYS.shareSubNodeShareTokens({ ids }),
  props: null,
  getter: (...results) => _.uniq(_.compact(results)),
});

/**
 * @param ids ShareSubNode id's to use if array, else prop name
 * @param nodeIds ShareSubNode nodeId's to filter by if array, else prop name
 */
const filterShareSubNodesByNodeId = ({
  ids = 'ids',
  nodeIds = 'nodeIds',
} = {}) => ({
  keyPath: ({ [ids]: i }) =>
    SELECTOR_HELPERS.propOrValueArray(ids, i).map(id =>
      shareSubNodeNodeId({ id }),
    ),
  cacheKey: INVITATION_STORE_CACHE_KEYS.filterShareSubNodesByNodeId({
    ids,
    nodeIds,
  }),
  props: [
    SELECTOR_HELPERS.selectPropOrValueArray(ids),
    SELECTOR_HELPERS.selectPropOrValueArray(nodeIds),
  ],
  getter: (...selectedNodeIds) => {
    const nodeIdsValue = selectedNodeIds.pop();
    const idsValue = selectedNodeIds.pop();
    return _.zip(idsValue, selectedNodeIds).reduce(
      INVITATION_STORE_UTILS.filterShareSubNodesByNodeIdReducer(nodeIdsValue),
      EMPTY_ARRAY,
    );
  },
});

/**
 * @param ids ShareSubNode id's to use if array, else prop name
 * @param roles ShareSubNode roles to use if array, else prop name
 */
const filterShareSubNodesByRole = ({ ids = 'ids', roles = 'roles' } = {}) => ({
  keyPath: ({ [ids]: i }) =>
    SELECTOR_HELPERS.propOrValueArray(ids, i).map(id =>
      shareSubNodeRole({ id }),
    ),
  cacheKey: INVITATION_STORE_CACHE_KEYS.filterShareSubNodesByRole({
    ids,
    roles,
  }),
  props: [
    SELECTOR_HELPERS.selectPropOrValueArray(ids),
    SELECTOR_HELPERS.selectPropOrValueArray(roles),
  ],
  getter: (...selectedRoles) => {
    const rolesValue = selectedRoles.pop();
    const idsValue = selectedRoles.pop();
    return _.zip(idsValue, selectedRoles).reduce(
      INVITATION_STORE_UTILS.filterShareSubNodesByRolesReducer(rolesValue),
      EMPTY_ARRAY,
    );
  },
});

const shareSubNodes = [INVITATION_STORE, 'shareSubNodes'];
const shareSubNodeIds = [INVITATION_STORE, 'shareSubNodeIds'];
const shareSubNodeNodeId = ({ id }) => [...shareSubNodes, id, 'nodeId'];
const shareSubNodeRole = ({ id }) => [...shareSubNodes, id, 'role'];
const shareSubNodeShareToken = ({ id }) => [
  ...shareSubNodes,
  id,
  'notificationToken',
];
// endregion

const notifications = [INVITATION_STORE, 'notifications'];
const contentType = ({ id }) => [...notifications, id, 'contentType'];
const content = ({ id }) => [...notifications, id, 'content', 'content'];
const contentOrgName = ({ id }) => [
  ...notifications,
  id,
  'content',
  'organisationName',
];
const joinOrganisations = [INVITATION_STORE, 'joinOrganisations'];
const createdAt = ({ id }) => [...joinOrganisations, id, 'createdAt'];
const inviteFrom = ({ id }) => [...joinOrganisations, id, 'inviteFrom'];
const orgId = ({ id }) => [...joinOrganisations, id, 'orgId'];
const role = ({ id }) => [...joinOrganisations, id, 'role'];

// region userNodes
const userNodeUserIds = ({ idsProp = 'ids' } = {}) => ({
  keyPath: ({ [idsProp]: ids }) =>
    ARRAY_HELPERS.arrayIfNot(ids).map(id =>
      INVITATION_STORE_SELECTORS.userNodeUserId({ id }),
    ),
  cacheKey: INVITATION_STORE_CACHE_KEYS.userNodeUserIds({ idsProp }),
  props: null,
  getter: (...results) => _.uniq(_.compact(results)),
});

const getUserNodeUserIds = ({ idsProp = 'ids' } = {}) => ({
  keyPath: ({ [idsProp]: ids }) =>
    ARRAY_HELPERS.arrayIfNot(ids).map(id =>
      INVITATION_STORE_SELECTORS.userNodeUserId({ id }),
    ),
  cacheKey: INVITATION_STORE_CACHE_KEYS.getUserNodeUserIds({ idsProp }),
  props: null,
  getter: (...results) => {
    results.pop();
    return _.compact(results);
  },
});

const getUserNodeUserRoles = ({ idsProp = 'ids' } = {}) => ({
  keyPath: ({ [idsProp]: ids }) =>
    ARRAY_HELPERS.arrayIfNot(ids).map(id =>
      INVITATION_STORE_SELECTORS.userNodeRole({ id }),
    ),
  cacheKey: INVITATION_STORE_CACHE_KEYS.userNodeUserRoles({ idsProp }),
  props: null,
  getter: (...results) => {
    results.pop();
    return results;
  },
});

const nodeTransfers = [INVITATION_STORE, 'transfers'];
/**
 * @param ids UserNode id's to use if array, else prop name
 * @param userIds UserNode userId's to filter by if array, else prop name
 */
const filterUserNodesByUserId = ({
  ids = 'ids',
  userIds = 'userIds',
} = {}) => ({
  keyPath: ({ [ids]: i }) =>
    SELECTOR_HELPERS.propOrValueArray(ids, i).map(id => userNodeUserId({ id })),
  cacheKey: INVITATION_STORE_CACHE_KEYS.filterUserNodesByUserId({
    ids,
    userIds,
  }),
  props: [
    SELECTOR_HELPERS.selectPropOrValueArray(ids),
    SELECTOR_HELPERS.selectPropOrValueArray(userIds),
  ],
  getter: (...selectedUserIds) => {
    const userIdsValue = selectedUserIds.pop();
    const idsValue = selectedUserIds.pop();
    return _.zip(idsValue, selectedUserIds).reduce(
      INVITATION_STORE_UTILS.filterUserNodesByUserIdReducer(userIdsValue),
      EMPTY_ARRAY,
    );
  },
});

/**
 * @param ids UserNode id's to use if array, else prop name
 * @param nodeIds UserNode nodeId's to filter by if array, else prop name
 */
const filterUserNodesByNodeId = ({
  ids = 'ids',
  nodeIds = 'nodeIds',
} = {}) => ({
  keyPath: ({ [ids]: i }) =>
    SELECTOR_HELPERS.propOrValueArray(ids, i).map(id => userNodeNodeId({ id })),
  cacheKey: INVITATION_STORE_CACHE_KEYS.filterUserNodesByNodeId({
    ids,
    nodeIds,
  }),
  props: [
    SELECTOR_HELPERS.selectPropOrValueArray(ids),
    SELECTOR_HELPERS.selectPropOrValueArray(nodeIds),
  ],
  getter: (...selectedNodeIds) => {
    const nodeIdsValue = selectedNodeIds.pop();
    const idsValue = selectedNodeIds.pop();
    return _.zip(idsValue, selectedNodeIds).reduce(
      INVITATION_STORE_UTILS.filterUserNodesByNodeIdReducer(nodeIdsValue),
      EMPTY_ARRAY,
    );
  },
});

/**
 * @param ids UserNode id's to use if array, else prop name
 * @param roles UserNode roles to filter by if array, else prop name
 */
const filterUserNodesByRole = ({
  ids = 'ids',
  roles: staticRoles = null,
} = {}) => ({
  keyPath: ({ [ids]: i }) =>
    SELECTOR_HELPERS.propOrValueArray(ids, i).map(id => userNodeRole({ id })),
  cacheKey: INVITATION_STORE_CACHE_KEYS.filterUserNodesByRole({
    ids,
    staticRoles,
  }),
  props: [
    SELECTOR_HELPERS.selectPropOrValueArray(ids),
    ({ roles }) => staticRoles || roles || TOUR_CONTRIBUTOR_ROLE_TYPES,
  ],
  getter: (...selectedRoles) => {
    const rolesValue = selectedRoles.pop();
    const idsValue = selectedRoles.pop();
    if (!Array.isArray(rolesValue)) return [];
    const filterResult = _.zip(idsValue, selectedRoles).reduce(
      INVITATION_STORE_UTILS.filterUserNodesByRolesReducer(rolesValue),
      EMPTY_ARRAY,
    );
    return filterResult;
  },
});

const userNodes = [INVITATION_STORE, 'userNodes'];
const userNodeIds = [INVITATION_STORE, 'userNodeIds'];
const userNodeProp = ({ id, path }) => [
  ...userNodes,
  id,
  ...ARRAY_HELPERS.arrayIfNot(path),
];
const userNodeNodeId = ({ id }) => [...userNodes, id, 'nodeId'];
const userNodeRole = ({ id }) => [...userNodes, id, 'role'];
const userNodeUserId = ({ id }) => [...userNodes, id, 'userId'];
const userNodeUserNodeId = ({ id }) => [...userNodes, id, 'userNodeId'];
const userNodeUserNodes = ({ id }) => [...userNodes, id, 'userNodes'];
const userNodeCustomRole = ({ id }) => [...userNodes, id, 'userRole'];
// endregion

const nodeContent = ({ id }) => [...nodeTransfers, id, 'content'];

// Selctor by type
const transferToMe = [INVITATION_STORE, 'transferToMe'];
const transferFromMe = [INVITATION_STORE, 'transferFromMe'];
const fromMe = [INVITATION_STORE, 'fromMe'];
const toMe = [INVITATION_STORE, 'toMe'];

const isTransfer = type => type === TOUR_INVITATION_TYPE.TRANSFER;
const sent = ({ type }) =>
  LOGIC_HELPERS.ifElse(isTransfer(type), transferFromMe, fromMe);

const received = ({ type }) =>
  LOGIC_HELPERS.ifElse(isTransfer(type), transferToMe, toMe);

const completedToMe = ({ type }) =>
  LOGIC_HELPERS.ifElse(
    isTransfer(type),
    [INVITATION_STORE, 'transferedToMe'],
    [INVITATION_STORE, 'completedToMe'],
  );

const completedFromMe = ({ type }) =>
  LOGIC_HELPERS.ifElse(
    isTransfer(type),
    [INVITATION_STORE, 'transferedFromMe'],
    [INVITATION_STORE, 'completedFromMe'],
  );

const shareToUserId = ({ token, type = TOUR_INVITATION_TYPE.SHARE }) => [
  INVITATION_STORE,
  type,
  token,
  LOGIC_HELPERS.ifElse(isTransfer(type), 'transferToUserId', 'shareToUserId'),
];

const shareTo = ({ token, type = TOUR_INVITATION_TYPE.SHARE }) => [
  INVITATION_STORE,
  type,
  token,
  LOGIC_HELPERS.ifElse(isTransfer(type), 'transferTo', 'shareTo'),
];

const shareFromUserId = ({ token, type = TOUR_INVITATION_TYPE.SHARE }) => [
  INVITATION_STORE,
  type,
  token,
  LOGIC_HELPERS.ifElse(isTransfer(type), 'transferFrom', 'shareFrom'),
];

const nodeId = ({ token, type = TOUR_INVITATION_TYPE.SHARE }) => [
  INVITATION_STORE,
  type,
  token,
  LOGIC_HELPERS.ifElse(isTransfer(type), 'nodeId', 'nodeId'),
];

const sharedProp = ({ token, type = TOUR_INVITATION_TYPE.SHARE, keyProp }) => [
  INVITATION_STORE,
  type,
  token,
  keyProp,
];

export const INVITATION_STORE_SELECTORS = {
  shares,
  shareIds,
  shareProp,
  shareShareTo,
  shareShareToUserId,
  shareNodeId,
  shareRole,
  shareStatus,
  shareChildren,
  updatedAt,
  resendUserId,
  filterSharesByShareToUserId,
  filterSharesByNodeId,
  filterSharesByRole,
  filterSharesByStatus,

  shareSubNodes,
  shareSubNodeIds,
  shareSubNodeNodeId,
  shareSubNodeRole,
  shareSubNodeShareToken,
  shareSubNodeShareTokens,
  filterShareSubNodesByNodeId,
  filterShareSubNodesByRole,
  nodeTransfers,
  transferToMe,
  transferFromMe,
  nodeContent,

  notifications,
  contentType,

  joinOrganisations,
  createdAt,
  inviteFrom,
  orgId,
  role,

  // TODO: Move to specific UserNodeStore or a generic RelationshipStore?
  userNodes,
  userNodeIds,
  userNodeProp,
  userNodeNodeId,
  userNodeRole,
  userNodeUserId,
  userNodeUserNodeId,
  userNodeUserNodes,
  userNodeUserIds,
  getUserNodeUserIds,
  getUserNodeUserRoles,
  filterUserNodesByUserId,
  filterUserNodesByNodeId,
  filterUserNodesByRole,
  userNodeCustomRole,

  sent,
  received,
  completedToMe,
  completedFromMe,
  shareToUserId,
  shareFromUserId,
  nodeId,
  sharedProp,
  content,
  contentOrgName,
  shareTo,
  toMe,
  fromMe,
};
