import { schema } from 'normalizr';
import { FILE_STORE_SCHEMAS } from 'datastore/fileStore/schema';
import { PHONE_STORE_SCHEMA } from 'datastore/phoneStore/schema';
import USER_STORE_SCHEMA from 'datastore/userStore/schema';

// People by personId
export const person = new schema.Entity('person', {
  photo: FILE_STORE_SCHEMAS.photo,
  phones: PHONE_STORE_SCHEMA.phones,
  passports: USER_STORE_SCHEMA.passports,
  medicals: USER_STORE_SCHEMA.medicals,
  dietaries: USER_STORE_SCHEMA.dietaries,
  studentDetails: USER_STORE_SCHEMA.studentDetails,
  insurancePolicies: USER_STORE_SCHEMA.insurancePolicies,
});

export const persons = new schema.Entity(
  'person',
  {
    photo: FILE_STORE_SCHEMAS.photos,
    phones: PHONE_STORE_SCHEMA.phones,
    passports: USER_STORE_SCHEMA.passports,
    medicals: USER_STORE_SCHEMA.medicals,
    dietaries: USER_STORE_SCHEMA.dietaries,
    studentDetails: USER_STORE_SCHEMA.studentDetails,
    insurancePolicies: USER_STORE_SCHEMA.insurancePolicies,
  },
  { idAttribute: 'userId' },
);

export const people = [person];
export const peoples = [persons];

export const PERSON_STORE_SCHEMA = {
  person,
  people,
  peoples,
};
