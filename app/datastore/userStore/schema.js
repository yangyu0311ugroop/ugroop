import { FILE_STORE_SCHEMAS } from 'datastore/fileStore/schema';
import { PHONE_STORE_SCHEMA } from 'datastore/phoneStore/schema';
import { schema } from 'normalizr';

const medical = new schema.Entity('medicals');
const medicals = [medical];

const dietary = new schema.Entity('dietaries');
const dietaries = [dietary];

const insurancePolicy = new schema.Entity('insurancePolicies');
const insurancePolicies = [insurancePolicy];

// People by userId [{ person1 }, { person2 }]
const person = new schema.Entity(
  'person',
  {
    photo: FILE_STORE_SCHEMAS.photo,
    phones: PHONE_STORE_SCHEMA.phones,
    passports: PHONE_STORE_SCHEMA.passports,
    medicals,
    dietaries,
    insurancePolicies: PHONE_STORE_SCHEMA.insurancePolicies,
  },
  { idAttribute: 'userId' },
);

const people = [person];

// normalise by email
const pendingPerson = new schema.Entity(
  'pendingPerson',
  {},
  { idAttribute: 'email' },
);
const pendingPeople = [pendingPerson];

const user = new schema.Entity('user');
const users = [user];

const organisation = new schema.Entity(
  'organisation',
  {},
  { idAttribute: 'orgId' },
);
const organisations = [organisation];

const share = new schema.Entity('share', {}, { idAttribute: 'shareTo' });
const shares = [share];

const shareId = new schema.Entity(
  'shareId',
  {},
  { idAttribute: 'shareToUserId' },
);
const shareIds = [shareId];

const tour = new schema.Entity('tour');
const tours = [tour];

const roles = new schema.Entity('roles', {
  org: organisations,
  tour: tours,
});
export const userPrefStrat = ({ value }) => value;
const userPreference = new schema.Entity(
  'preference',
  {},
  { idAttribute: 'code', processStrategy: userPrefStrat },
);
const userPreferences = [userPreference];

const passport = new schema.Entity('passport', {
  photo: FILE_STORE_SCHEMAS.photo,
});
const passports = [passport];

const studentDetail = new schema.Entity('studentDetails');
const studentDetails = [studentDetail];

const orgUser = new schema.Entity('orgUsers', {}, { idAttribute: 'orgId' });
const orgUsers = [orgUser];

export default {
  user: users,
  singlePerson: person,
  person: people,
  pendingPerson: pendingPeople,
  organisation: organisations,
  share: shares,
  shareId: shareIds,
  tour: tours,
  roles,
  passport,
  passports,
  medical,
  medicals,
  dietary,
  dietaries,
  studentDetail,
  studentDetails,
  userPreferences,
  orgUsers,
  insurancePolicies,
  insurancePolicy,
};
