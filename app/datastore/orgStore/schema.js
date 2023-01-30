import { schema } from 'normalizr';
import { omit, get } from 'lodash';
import { ORG_SHARE_INDICATOR } from 'datastore/invitationStore/constants';
import { FILE_STORE_SCHEMAS } from '../fileStore/schema';
export const confirmedStrat = confirmed => {
  const confirmedData = {
    ...confirmed,
    inviteFrom: confirmed.orgId,
    inviteTo: confirmed.email,
    inviteToUserId: confirmed.userId,
    content: null,
  };
  return confirmedData;
};
export const PersonStrat = person => {
  const { photo } = person;
  const avatar = get(photo, 'url', '');
  const personData = {
    ...omit(person, ['photo']),
    photo: avatar,
  };
  return personData;
};
export const pendingStrat = pending => {
  const confirmedData = {
    ...pending,
    role: pending.role,
    shareFrom: pending.inviteFrom,
    indicator: ORG_SHARE_INDICATOR,
    email: pending.inviteTo,
  };
  return confirmedData;
};
export const peopleStrat = data => {
  const peopleData = {
    ...omit(data, ['id', 'photo']),
    id: data.personId || data.id,
    photo: get(data, 'photo.url'),
  };
  return peopleData;
};

export const removeEmptyStrat = data => {
  const { pending, confirmed } = data;
  const filtered = confirmed.filter(a => a.invitationToken !== '1');
  return { id: data.id, pending, confirmed: filtered };
};
const location = new schema.Entity('location');
const preference = new schema.Entity('preference');
const details = new schema.Entity('details', {}, { idAttribute: 'id' });
const photo = new schema.Entity('photo', {}, { idAttribute: 'url' });
const members = new schema.Entity(
  'members',
  { photo },
  { idAttribute: 'userId' },
);
const connected = new schema.Entity(
  'members',
  {},
  {
    idAttribute: 'id',
  },
);
const peopleMember = new schema.Entity(
  'members',
  {},
  { idAttribute: 'userId', processStrategy: peopleStrat },
);

const confirmed = new schema.Entity(
  'confirmed',
  { photo: FILE_STORE_SCHEMAS.photo },
  { idAttribute: 'invitationToken', processStrategy: confirmedStrat },
);
const pending = new schema.Entity(
  'pending',
  {},
  { idAttribute: 'invitationToken', processStrategy: pendingStrat },
);
const roles = new schema.Entity('roles', {
  pending: [pending],
  confirmed: [members],
  connected: [connected],
});
const people = new schema.Entity(
  'people',
  {},
  { idAttribute: 'userId', processStrategy: PersonStrat },
);
const shares = new schema.Entity(
  'shares',
  {
    pending: [pending],
    confirmed: [confirmed],
  },
  { processStrategy: removeEmptyStrat },
);
const share = new schema.Entity('shares', {
  pending: [pending],
});
const user = new schema.Entity('peoples', {
  people: [people],
});
const organisation = new schema.Entity('organisation', {
  location,
  preference,
  details,
  photo: FILE_STORE_SCHEMAS.photo,
});
const organisations = [organisation];
const confirmedIds = [members];
const pendingInvitationIds = [pending];
const peopleMembers = [peopleMember];
const peopleConnected = [connected];
const organisationRole = new schema.Entity(
  'organisationRole',
  {},
  { idAttribute: 'orgId' },
);
const organisationRoles = [organisationRole];

const organisationNode = new schema.Entity('organisationNode');
const organisationNodes = [organisationNode];

const organisationData = new schema.Entity('organisationData', {
  photo: FILE_STORE_SCHEMAS.photo,
  preference,
});
const organisationDatas = [organisationData];

export const ORGANISATION_SCHEMA = {
  organisation,
  organisations,
  organisationRoles,
  organisationNodes,
  organisationDatas,
};

export default {
  organisation,
  location,
  preference,
  details,
  photo,
  roles,
  members,
  pending,
  pendingInvitationIds,
  confirmed,
  confirmedIds,
  shares,
  people,
  user,
  share,
  peopleMembers,
  peopleConnected,
};
