import { DATASTORE_UTILS } from 'datastore';
import { normalize } from 'normalizr';
import { get, set, omit, merge } from 'lodash';
import { isEmptyString } from 'utils/stringAdditions';
import schema from 'datastore/orgStore/schema';
import { compose } from 'redux';
import { OWNER } from 'utils/orgRoleConstants';

const USERS = 'users';
const INVITATIONS = 'invitations';
const CONFIRMED = 'confirmed';

const arrayHasData = array => Array.isArray(array) && array.length;
const getConfirmed = intities => {
  const data = get(intities, CONFIRMED);
  return Object.keys(data)
    .filter(key => !isEmptyString(key))
    .reduce(
      (obj, key) => ({
        ...obj,
        [key]: data[key],
      }),
      {},
    );
};
const getInvitees = (data, id) => {
  const users = get(data, USERS, {});
  const invitations = get(data, INVITATIONS, {});
  const status = get(data, `${INVITATIONS}.status`, '');
  let inviteeOrgId = get(invitations, 'orgId', null) || get(users, 'orgId', 0);
  let inviteeToken = get(invitations, 'invitationToken', null);
  let inviteeId = get(users, 'id', null);
  // Handle Existing invitation from another organisation
  if (status === 'pending' && Number(inviteeOrgId) !== id) {
    inviteeOrgId = null;
    inviteeToken = null;
    inviteeId = null;
  }
  return {
    inviteeId,
    inviteeOrgId,
    inviteeToken,
  };
};
const DEFAULT_INDEX = 0;
export const helpers = {
  arrayHasData,
  getConfirmed,
  getInvitees,
};
const addOrganisation = result => {
  const { entities } = normalize(result, schema.organisation);
  const { id, userId, rootNodeId } = result;
  return {
    origin: result,
    organisations: DATASTORE_UTILS.upsertObject(entities.organisation),
    locations: DATASTORE_UTILS.upsertObject(entities.location),
    preferences: DATASTORE_UTILS.upsertObject(entities.preference),
    details: DATASTORE_UTILS.upsertObject(entities.details),
    photos: DATASTORE_UTILS.upsertObject(entities.photo),
    organisationNode: DATASTORE_UTILS.upsertObject({
      [id]: { id, userId, rootNodeId },
    }),
    files: DATASTORE_UTILS.upsertObject(entities.photo),
    preferenceData: entities.preference,
  };
};
const updateOrganisation = result => {
  const { entities } = normalize(result, schema.organisation);
  return {
    organisations: DATASTORE_UTILS.upsertObject(entities.organisation),
    locations: DATASTORE_UTILS.upsertObject(entities.location),
    preferences: DATASTORE_UTILS.upsertObject(entities.preference),
    details: DATASTORE_UTILS.upsertObject(entities.details),
    photos: DATASTORE_UTILS.upsertObject(entities.photo),
    files: DATASTORE_UTILS.upsertObject(entities.photo),
    result,
  };
};
const replaceArray = (value, keypath) => store => set(store, keypath, value);

const setupTour = organisation => ({
  organisations: DATASTORE_UTILS.upsertObject({
    [organisation.id]: organisation,
  }),
  organisationNode: DATASTORE_UTILS.upsertObject({
    [organisation.id]: organisation,
  }),
});
const addRoles = (result, { id }) => {
  const roleData = { id, ...result };
  const { entities } = normalize(roleData, schema.roles);
  const invIntities = get(normalize(roleData, schema.shares), 'entities');
  const { result: peopleIds } = normalize(
    result.confirmed,
    schema.confirmedIds,
  );
  const { result: pendingInvitationIds } = normalize(
    result.pending,
    schema.pendingInvitationIds,
  );
  const { entities: peopleIntities } = normalize(
    result.confirmed,
    schema.peopleMembers,
  );
  const { entities: peopleConnected } = normalize(
    result.confirmed,
    schema.peopleConnected,
  );
  const connectedIds = Object.keys(peopleConnected.members).map(Number);
  // insert activated user count
  const activated =
    result.confirmed &&
    result.confirmed.filter(o => o.activated === true).map(o => o.userId);
  if (activated) {
    entities.roles[id].activated = activated;
  }
  return {
    roles: DATASTORE_UTILS.upsertObject(entities.roles),
    members: DATASTORE_UTILS.upsertObject(entities.members),
    organisationShares: DATASTORE_UTILS.upsertObject(
      merge(get(invIntities, 'pending'), helpers.getConfirmed(invIntities)),
    ),
    shares: DATASTORE_UTILS.upsertObject(invIntities.shares),
    people: DATASTORE_UTILS.upsertObject(peopleIntities.members),
    files: DATASTORE_UTILS.upsertObject(invIntities.photo),
    organisations: compose(
      replaceArray(peopleIds, `${id}.people`),
      replaceArray(pendingInvitationIds, `${id}.pendingInvitations`),
      replaceArray(connectedIds, `${id}.connected`),
    ),
    connectedMembers: DATASTORE_UTILS.upsertObject(peopleConnected.members),
    pendingInvitationIds,
    raw: result,
  };
};
const updateRoles = result => {
  const strResult = omit(result, [
    'orgId',
    'id',
    'status',
    'createdAt',
    'updatedAt',
  ]);
  const roleData = { ...strResult };
  const { entities } = normalize(roleData, schema.members);
  return {
    members: DATASTORE_UTILS.upsertObject(entities.members),
  };
};
const updateMembers = result => {
  const members = omit(result, [
    'orgId',
    'id',
    'status',
    'createdAt',
    'updatedAt',
  ]);
  const memberData = { ...members };
  const { entities } = normalize(memberData, schema.members);
  return {
    members: DATASTORE_UTILS.upsertObject(entities.members),
  };
};
const removeMember = (result, { userId, id }) => ({
  members: DATASTORE_UTILS.removeObjectById(userId),
  roles: DATASTORE_UTILS.removeItemsArray(`${id}.confirmed`, userId),
});

const normaliseGetPerson = (result, { id }) => ({
  ...helpers.getInvitees(result, id),
});
const updateShares = (result, { id }) => {
  const roleData = { id, pending: result };
  const { entities } = normalize(roleData, schema.share);
  let invitationToken = '';
  const value = get(entities, `shares.${id}.pending`);
  if (arrayHasData(value)) {
    invitationToken = value[DEFAULT_INDEX];
  } else {
    return {};
  }
  return {
    organisationShares: DATASTORE_UTILS.upsertObject(entities.pending),
    shares: DATASTORE_UTILS.upsertArray(`${id}.pending`, invitationToken),
    organisations: DATASTORE_UTILS.upsertArray(
      `${id}.pendingInvitations`,
      invitationToken,
    ),
  };
};
const normaliseInvitationAction = data => {
  const { invitationToken, orgId } = data;
  return {
    organisationShares: DATASTORE_UTILS.removeObjectById(invitationToken),
    organisations: DATASTORE_UTILS.removeItemsArray(
      `${orgId}.pendingInvitations`,
      invitationToken,
    ),
  };
};

const normaliseCreateOrganisation = ({ organisation, orgUser }) => ({
  id: organisation.id,
  organisations: DATASTORE_UTILS.upsertObject({
    [organisation.id]: {
      ...organisation,
      createdAt: orgUser.createdAt,
      role: OWNER,
    },
  }),
  orgUsers: DATASTORE_UTILS.upsertObject({ [organisation.id]: orgUser }),
  users: DATASTORE_UTILS.upsertArray(
    `${organisation.createdBy}.organisations`,
    organisation.id,
  ),
});

const batchAddRoles = (results, { ids }) => {
  const normalizedResults = results.map((result, index) =>
    addRoles(result, { id: ids[index] }),
  );

  const operations = normalizedResults.reduce((acc, normalizedResult) => {
    const value = { ...acc };
    const keys = Object.keys(normalizedResult);

    if (Object.keys(value).length === 0) {
      return normalizedResult;
    }

    for (let i = 0; i < keys.length; i += 1) {
      value[keys[i]] = compose(
        value[keys[i]],
        normalizedResult[keys[i]],
      );
    }

    return value;
  }, {});

  return operations;
};

export const ORGANISATION_NORMALISERS = {
  batchAddRoles,
  addOrganisation,
  updateOrganisation,
  addRoles,
  updateRoles,
  updateMembers,
  removeMember,
  normaliseGetPerson,
  updateShares,
  setupTour,
  normaliseInvitationAction,
  normaliseCreateOrganisation,
  replaceArray,
};
