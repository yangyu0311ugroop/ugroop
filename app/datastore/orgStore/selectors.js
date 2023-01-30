/**
 * Created by Yang on 31/1/17.
 * The org data store state selectors
 */

import {
  INVITATION_STORE,
  ORG_DATASTORE,
  ORGANISATION_DATA_STORE,
  ORGANISATION_VIEWSTORE,
  RECENT,
  STARRED,
} from 'appConstants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { get, dropRight, takeRight, zip } from 'lodash';
import { matchPath } from 'react-router';
import { createSelector } from 'reselect';
import { SELECTOR_HELPERS } from 'utils/helpers/selectors';
import { isNumber } from '../../utils/numberAdditions';
export const ORG_ATTRIBUTE = {
  name: 'name',
  createdBy: 'createdBy',
};
const selectOrgDataStore = () => state => state.get(ORG_DATASTORE);
const ORGANISATIONS = 'organisations';
const LOCATION = 'locations';
const PREFERENCE = 'preferences';
const DETAILS = 'details';
const ORGTYPES = 'orgTypes';
const SUBTYPES = 'subTypes';
const ROLES = 'roles';
const MEMBERS = 'members';
const ORGSHARES = 'organisationShares';
const SHARES = 'shares';
const ORGANISATION_NODE = 'organisationNode';
const PHOTOS = 'photos';
const selectOrgansiation = () =>
  createSelector(
    selectOrgDataStore(),
    orgDataStore => orgDataStore.get('org'),
  );
const getOrganisationOrgId = [ORGANISATION_DATA_STORE, 'orgInfo', 'orgId'];
const getOwnRole = [ORGANISATION_DATA_STORE, 'orgInfo', 'role'];
const getOrganisationName = ({ id }) => [
  ORGANISATION_DATA_STORE,
  ORGANISATIONS,
  id,
  'name',
];
const organisation = ({ id }) => [ORGANISATION_DATA_STORE, ORGANISATIONS, id];
const role = ({ id }) => [ORGANISATION_DATA_STORE, 'orgUsers', id, 'role'];
const getOrganisationCreatedDate = ({ id }) => [
  ORGANISATION_DATA_STORE,
  ORGANISATIONS,
  id,
  'createdAt',
];

const getOrganisationLastSeen = ({ id }) => [
  ORGANISATION_DATA_STORE,
  MEMBERS,
  id,
  'lastSeen',
];

const getOrganisationOwnerId = ({ id }) => [
  ORGANISATION_DATA_STORE,
  ORGANISATIONS,
  id,
  'createdBy',
];

const getOrgOwnerId = ({ id }) => [
  ORGANISATION_DATA_STORE,
  ORGANISATION_NODE,
  id,
  'userId',
];
const hasPersonDetail = ({ id }) => [
  ORGANISATION_DATA_STORE,
  'members',
  id,
  'hasPersonDetail',
];
const getOrgMember = ({ id }) => [ORGANISATION_DATA_STORE, 'members', id];
const orgCountry = ({ id }) => [
  ORGANISATION_DATA_STORE,
  'organisations',
  id,
  'country',
];
const orgInfoCountry = [ORGANISATION_DATA_STORE, 'orgInfo', 'country'];
const knownAs = ({ id }) => [ORGANISATION_DATA_STORE, 'members', id, 'knownAs'];
const getPeopleIds = ({ id }) => [
  ORGANISATION_DATA_STORE,
  ORGANISATIONS,
  id,
  'people',
];

const getCountPeopleIds = ({ id }) => [
  ORGANISATION_DATA_STORE,
  ROLES,
  id,
  'activated',
  'length',
];

const getPendingInvitations = ({ id }) => [
  ORGANISATION_DATA_STORE,
  ORGANISATIONS,
  id,
  'pendingInvitations',
];

const getCountPendingInvitations = ({ id }) => [
  ORGANISATION_DATA_STORE,
  ORGANISATIONS,
  id,
  'pendingInvitations',
  'length',
];

// Get ids
const getOrganisationPhotoUrl = ({ id }) => [
  ORGANISATION_DATA_STORE,
  ORGANISATIONS,
  id,
  'photo',
];
const getOrganisationLocationId = ({ id }) => [
  ORGANISATION_DATA_STORE,
  ORGANISATIONS,
  id,
  'location',
];
const getOrganisationPreferenceId = ({ id }) => [
  ORGANISATION_DATA_STORE,
  ORGANISATIONS,
  id,
  'preference',
];
const getOrganisationDetailsId = ({ id }) => [
  ORGANISATION_DATA_STORE,
  ORGANISATIONS,
  id,
  'details',
];

// Get Profile
const getOrganisationAddress = ({ id }) => [
  ORGANISATION_DATA_STORE,
  LOCATION,
  id,
  'address',
];
const getOrganisationPlaceId = ({ id }) => [
  ORGANISATION_DATA_STORE,
  LOCATION,
  id,
  'placeId',
];
const getOrganisationType = ({ id }) => [
  ORGANISATION_DATA_STORE,
  ORGANISATIONS,
  id,
  'type',
];
const getOrganisationWebsite = ({ id }) => [
  ORGANISATION_DATA_STORE,
  ORGANISATIONS,
  id,
  'website',
];

// Get Preferences
const getOrganisationTimezone = ({ id }) => [
  ORGANISATION_DATA_STORE,
  PREFERENCE,
  id,
  'timezone',
];
const getOrganisationReminderFrequency = ({ id }) => [
  ORGANISATION_DATA_STORE,
  PREFERENCE,
  id,
  'reminderFrequencyDays',
];
const getOrganisationReminderAttempts = ({ id }) => [
  ORGANISATION_DATA_STORE,
  PREFERENCE,
  id,
  'reminderAttempts',
];
const getOrganisationReminderDisabled = ({ id }) => [
  ORGANISATION_DATA_STORE,
  PREFERENCE,
  id,
  'reminderDisabled',
];

const getOrganisationSeeMoreDisabled = ({ id }) => [
  ORGANISATION_DATA_STORE,
  PREFERENCE,
  id,
  'seeMoreDisabled',
];

const getOrganisationFormat = ({ id }) => [
  ORGANISATION_DATA_STORE,
  PREFERENCE,
  id,
  'format',
];
const getOrganisationCountry = ({ id }) => [
  ORGANISATION_DATA_STORE,
  PREFERENCE,
  id,
  'country',
];

const getOrganisationPaxLabel = ({ id }) => [
  ORGANISATION_DATA_STORE,
  PREFERENCE,
  id,
  'paxLabel',
];

// Get School
const getOrganisationSchoolGender = ({ id }) => [
  ORGANISATION_DATA_STORE,
  DETAILS,
  id,
  'type',
];
const schoolType = ({ id }) => [
  ORGANISATION_DATA_STORE,
  DETAILS,
  id,
  'schooltype',
];
const doe = ({ id }) => [ORGANISATION_DATA_STORE, DETAILS, id, 'doe'];
const registration = ({ id }) => [
  ORGANISATION_DATA_STORE,
  DETAILS,
  id,
  'registration',
];
const abn = ({ id }) => [ORGANISATION_DATA_STORE, DETAILS, id, 'abn'];
const acn = ({ id }) => [ORGANISATION_DATA_STORE, DETAILS, id, 'acn'];
const startTime = ({ id }) => [
  ORGANISATION_DATA_STORE,
  DETAILS,
  id,
  'starttime',
];
const endTime = ({ id }) => [ORGANISATION_DATA_STORE, DETAILS, id, 'endtime'];

// Roles
const getRoleMembersIds = ({ id }) => [
  ORGANISATION_DATA_STORE,
  ROLES,
  id,
  'confirmed',
];
const getRoleMembersPendingIds = ({ id }) => [
  ORGANISATION_DATA_STORE,
  SHARES,
  id,
  'pending',
];
const getMemberFullName = ({ id }) => [
  ORGANISATION_DATA_STORE,
  MEMBERS,
  id,
  'fullName',
];
const getMemberRootNodeId = ({ id }) => [
  ORGANISATION_DATA_STORE,
  MEMBERS,
  id,
  'rootNodeId',
];
const getMemberEmail = ({ id }) => [
  ORGANISATION_DATA_STORE,
  MEMBERS,
  id,
  'email',
];
const getMemberActivated = ({ id }) => [
  ORGANISATION_DATA_STORE,
  MEMBERS,
  id,
  'activated',
];
const getMemberRole = ({ id }) => [
  ORGANISATION_DATA_STORE,
  MEMBERS,
  id,
  'role',
];
const getMemberCreatedDate = ({ id }) => [
  ORGANISATION_DATA_STORE,
  MEMBERS,
  id,
  'createdAt',
];
const getRoleMembersConfirmedIds = {
  keyPath: ({ id }) => [ORGANISATION_DATA_STORE, SHARES, id, 'confirmed'],
  getter: confirmed =>
    // This is to handle all existing null value createdBy old data
    confirmed.filter(code => code !== ''),
};
const getActivated = {
  keyPath: ({ id }) => [ORGANISATION_DATA_STORE, MEMBERS, id, 'activated'],
  getter: activated => {
    // This is to handle all existing null value activated old data
    const value = activated === null ? true : activated;
    return value;
  },
};
// Invite
const getPendingEmail = ({ id }) => [INVITATION_STORE, ORGSHARES, id, 'email'];
const getInviteStatus = ({ id }) => [INVITATION_STORE, ORGSHARES, id, 'status'];
const getInviteRole = ({ id }) => [INVITATION_STORE, ORGSHARES, id, 'role'];
const getOrgTypes = [ORGANISATION_DATA_STORE, ORGTYPES];
const getSubTypes = [ORGANISATION_DATA_STORE, SUBTYPES];

const organisationId = [ORGANISATION_DATA_STORE, 'organisationId'];
const rootNodeId = ({ id }) => [
  ORGANISATION_DATA_STORE,
  ORGANISATION_NODE,
  id,
  'rootNodeId',
];

const organisationIdFromURL = ({ location }) => {
  const match = matchPath(location.pathname, {
    path: '/orgs/:id',
    strict: false,
  });

  const id = get(match, 'params.id');
  if (id === 'personal') return -1;

  return Number.parseInt(id, 10);
};
const organisationIdFromMyToursURL = ({ location }) => {
  const myTourUrl = matchPath(location.pathname, {
    path: '/my-tours/:id',
    strict: false,
  });

  const myOrgUrl = matchPath(location.pathname, {
    path: '/orgs/:id',
    strict: false,
  });

  const id = get(myTourUrl || myOrgUrl, 'params.id');
  if (id === RECENT || id === STARRED) return id;
  if (id === 'personal') return -1;

  return Number.parseInt(id, 10);
};

const showInactive = [ORGANISATION_VIEWSTORE, 'showInactive'];

const getMemberEmailByIds = {
  keyPath: ({ peopleIds = [] }) => peopleIds.map(id => getMemberEmail({ id })),
  getter: (...args) => dropRight(args, 1),
};
const getMemberIdsAndEmail = {
  keyPath: ({ roleMemberIds }) =>
    (roleMemberIds || []).map(id => getMemberRole({ id })),
  props: ({ roleMemberIds: ids }) => ids,
  getter: (...args) => {
    const mrole = dropRight(args, 1);
    const [ids] = takeRight(args, 1);
    if (!ids) return [];
    const idsRole = zip(ids, mrole);
    return idsRole;
  },
};

const getMemberIdsAndActivated = {
  keyPath: ({ roleMemberIds }) =>
    (roleMemberIds || []).map(id => getMemberActivated({ id })),
  props: ({ roleMemberIds: ids }) => ids,
  getter: (...args) => {
    const mrole = dropRight(args, 1);
    const [ids] = takeRight(args, 1);
    if (!ids) return [];
    const idsRole = zip(ids, mrole);
    return idsRole;
  },
};

const organisationIdFromNode = ({ match }) => {
  const id = get(match, 'params.id', 0);

  return NODE_STORE_SELECTORS.organisationId({ id });
};

const getOrganisationSeats = {
  keyPath: [
    ({ orgIdKey = 'orgId', [orgIdKey]: orgId }) =>
      getCountPendingInvitations({ id: orgId }),
    ({ orgIdKey = 'orgId', [orgIdKey]: orgId }) =>
      getCountPeopleIds({ id: orgId }),
  ],
  props: null,
  getter: (countA, countB) => {
    if (isNumber(countA) && isNumber(countB)) {
      return countA + countB;
    }
    return undefined;
  },
  cacheKey: ({ orgId }) => `${orgId}.seats`,
};

const intercomDetails = ({ ids = 'ids', fn, propName = '' } = {}) => ({
  keyPath: ({ [ids]: i }) =>
    SELECTOR_HELPERS.propOrValueArray(ids, i)
      .filter(id => id > 0)
      .map(id => fn({ id })),
  cacheKey: ({ [ids]: i }) =>
    `list.intercomOrg.${SELECTOR_HELPERS.propOrValueArray(
      ids,
      i,
    ).toString()}.${propName}`,
  getter: (...values) => {
    values.pop();
    return values.join('|');
  },
});

const organisations = [ORGANISATION_DATA_STORE, ORGANISATIONS];

const connectedMembersUserId = ({ id }) => [
  ORGANISATION_DATA_STORE,
  'connectedMembers',
  id,
  'userId',
];
const connectedMembersRole = ({ id }) => [
  ORGANISATION_DATA_STORE,
  'connectedMembers',
  id,
  'role',
];

const connectedMembersProp = ({ id, keyProp }) => ({
  keyPath: ({ [id]: memberId }) => [
    ORGANISATION_DATA_STORE,
    'connectedMembers',
    memberId,
    keyProp,
  ],
  getter: value => value,
});

const connectedMembers = ({ id }) => ({
  keyPath: ({ [id]: orgId }) => [
    ORGANISATION_DATA_STORE,
    ORGANISATIONS,
    orgId,
    'connected',
  ],
  getter: ids => ids,
});
const getConnectedIdByUserId = ({ user }) => ({
  keyPath: ({ ids = [] }) => ids.map(id => connectedMembersUserId({ id })),
  cacheKey: ({ ids: i }) =>
    `id.connectedId.${SELECTOR_HELPERS.propOrValueArray(
      'ids',
      i,
    ).toString()}.${user}`,
  props: ({ ids, [user]: userId }) => ({
    ids,
    userId,
  }),
  getter: (...values) => {
    const props = values.pop();
    const { userId, ids } = props;
    const idx = values.indexOf(userId);
    return get(ids, `${idx}`);
  },
});

const children = ({ id }) => [
  ORGANISATION_DATA_STORE,
  'organisationTours',
  id,
  'children',
];

const getOrganisationPhotoType = ({ id }) => [
  ORGANISATION_DATA_STORE,
  PHOTOS,
  id,
  'type',
];

const getOrganisationPhotoId = ({ id }) => [
  ORGANISATION_DATA_STORE,
  PHOTOS,
  id,
  'id',
];

export const ORGANISATION_STORE_SELECTORS = {
  children,
  organisationId,
  organisationIdFromURL,
  organisationIdFromMyToursURL,
  organisationIdFromNode,
  role,
  getOrganisationName,
  name: getOrganisationName,
  rootNodeId,
  hasPersonDetail,
  getOrgMember,
  getRoleMembersIds,
  knownAs,
  orgCountry,
  orgInfoCountry,
  getMemberIdsAndEmail,
  getMemberRole,
  getPeopleIds,
  getOrganisationOwnerId,
  getOrgOwnerId,
  getOrganisationType,
  getOrganisationSeats,
  organisation,
  intercomDetails,
  organisations,
  connectedMembers,
  connectedMembersUserId,
  getConnectedIdByUserId,
  connectedMembersRole,
  connectedMembersProp,
  getOrganisationPhotoType,
  getOrganisationPhotoId,
};

export const ORGANISATION_VIEW_STORE_SELECTORS = {
  showInactive,
};
export const ORGANISATION_SHOOL_SELECTOR = {
  doe,
  registration,
  abn,
  acn,
  startTime,
  endTime,
  schoolType,
};

export {
  getOrgOwnerId,
  selectOrgansiation,
  getOrganisationCreatedDate,
  getOrganisationLastSeen,
  selectOrgDataStore,
  getOrganisationOrgId,
  getOrganisationName,
  getOrganisationPhotoUrl,
  getOrganisationAddress,
  getOrganisationPlaceId,
  getOrganisationType,
  getOrganisationWebsite,
  getOrganisationTimezone,
  getOrganisationFormat,
  getOrganisationCountry,
  getOrganisationSchoolGender,
  getOrgTypes,
  getOrganisationLocationId,
  getOrganisationPreferenceId,
  getOrganisationDetailsId,
  getSubTypes,
  getRoleMembersIds,
  getMemberFullName,
  getMemberRootNodeId,
  getMemberEmail,
  getMemberRole,
  getMemberCreatedDate,
  getRoleMembersPendingIds,
  getActivated,
  getPendingEmail,
  getInviteStatus,
  getInviteRole,
  getOrganisationOwnerId,
  getRoleMembersConfirmedIds,
  getOwnRole,
  getPeopleIds,
  getMemberEmailByIds,
  getPendingInvitations,
  getMemberIdsAndEmail,
  getMemberIdsAndActivated,
  getOrganisationReminderAttempts,
  getOrganisationReminderFrequency,
  getOrganisationReminderDisabled,
  getOrganisationSeeMoreDisabled,
  getOrganisationPhotoType,
  getOrganisationPhotoId,
  getOrganisationPaxLabel,
};
