import { DATASTORE_UTILS } from 'datastore';
import dotProp from 'dot-prop-immutable';
import {
  DIETARY_PATHS,
  MEDICAL_PATHS,
  STUDENT_DETAIL_PATHS,
} from 'datastore/personDataStore/constants';
import { USER_PASSPORTS_FIELDS } from 'datastore/userStore/selectors';
import { compose } from 'redux';
import { PHONE_STORE_SCHEMA } from 'datastore/phoneStore/schema';
import UserSchema from 'datastore/userStore/schema';
import { PERSON_STORE_SCHEMA } from 'datastore/personDataStore/schema';
import { normalize } from 'normalizr';
import { isEmptyString } from 'utils/stringAdditions';
import sortBy from 'lodash/sortBy';
import get from 'lodash/get';

const addPersonById = result => {
  const person = normalize(result, PERSON_STORE_SCHEMA.person);
  return {
    peopleById: DATASTORE_UTILS.upsertObject(person.entities.person),
    files: DATASTORE_UTILS.upsertObject(person.entities.photo),
    phones: DATASTORE_UTILS.upsertObject(person.entities.phone),
    result,
  };
};

const addPeople = result => {
  const personByUserId = normalize(result, UserSchema.singlePerson);
  const person = normalize(result, PERSON_STORE_SCHEMA.person);
  return {
    people: DATASTORE_UTILS.upsertObject(personByUserId.entities.person),
    peopleById: DATASTORE_UTILS.upsertObject(person.entities.person),
    files: DATASTORE_UTILS.upsertObject(person.entities.photo),
    phones: DATASTORE_UTILS.upsertObject(person.entities.phone),
    medicals: DATASTORE_UTILS.upsertObject(person.entities.medicals),
    dietaries: DATASTORE_UTILS.upsertObject(person.entities.dietaries),
    insurancePolicies: DATASTORE_UTILS.upsertObject(
      person.entities.insurancePolicies,
    ),
    result,
  };
};

const updatePeople = (result, { oldPhoto }) => {
  const personByUserId = normalize(result, UserSchema.singlePerson);
  const person = normalize(result, PERSON_STORE_SCHEMA.person);
  // only updating email for now
  const updateNode = result.nodeId
    ? [
        DATASTORE_UTILS.updateAttribute(
          `${result.nodeId}.customData.email`,
          result.email,
        ),
      ]
    : [];
  return {
    people: DATASTORE_UTILS.upsertObject(
      personByUserId.result ? personByUserId.entities.person : {},
    ), // Skip people without userId
    peopleById: DATASTORE_UTILS.upsertObject(person.entities.person),
    files: compose(
      DATASTORE_UTILS.removeObjectById(oldPhoto),
      DATASTORE_UTILS.upsertObject(person.entities.photo),
    ),
    phones: DATASTORE_UTILS.upsertObject(person.entities.phone),
    personNode: compose(...updateNode),
    result,
  };
};

const deletePhone = (result, { userId, phoneId }) => ({
  phones: DATASTORE_UTILS.removeObjectById(userId),
  people: DATASTORE_UTILS.removeItemsArray(`${userId}.phones`, phoneId),
});

const addPhone = (result, { userId }) => {
  const normalizedPhone = normalize(result, PHONE_STORE_SCHEMA.phone);
  return {
    phones: compose(
      makeIsDefaultOne(normalizedPhone.entities.phone),
      DATASTORE_UTILS.upsertObject(normalizedPhone.entities.phone),
    ),
    people: DATASTORE_UTILS.upsertArray(
      `${userId}.phones`,
      normalizedPhone.result,
      {
        isAppendedFirst: true,
      },
    ),
  };
};

const updatePhone = result => {
  const normalizedPhone = normalize(result, PHONE_STORE_SCHEMA.phone);
  return {
    phones: compose(
      makeIsDefaultOne(normalizedPhone.entities.phone),
      DATASTORE_UTILS.upsertObject(normalizedPhone.entities.phone),
    ),
  };
};

export const makeEverythingDefaultFalse = (id, store) => {
  const tempStore = store;
  const storeKeys = Object.keys(tempStore);
  storeKeys.forEach(key => {
    if (Number(key) !== id && tempStore[key]) {
      tempStore[key].isDefault = false;
    }
  });
  return tempStore;
};

export const makeIsDefaultOne = toBeInserted => store => {
  let tempStore = { ...store };
  const keys = Object.keys(toBeInserted);
  const idToBeInserted = Number(keys[0]);

  const isDefaultChange = tempStore[idToBeInserted]
    ? tempStore[idToBeInserted].isDefault
    : toBeInserted[idToBeInserted].isDefault;

  if (isDefaultChange) {
    tempStore = makeEverythingDefaultFalse(idToBeInserted, tempStore);
  }

  return tempStore;
};

export const chooseOneAsDefault = toBeDeleted => store => {
  const tempStore = { ...store };
  const keys = Object.keys(tempStore);
  if (keys.length === 0) return tempStore;

  // I get the next very recent passport by sorting it by id
  // then reverse it (since sortBy is asc by default)
  // then getting the very first item in array (which is the very recent one by id)
  const recentId = sortBy(keys)
    .reverse()
    .filter(key => key !== 'undefined' && key !== toBeDeleted.toString())[0];
  // Check if it's necessary to make the recently added default
  // by checking if the deleted item is the default passport
  const isDefault = store[toBeDeleted].isDefault;

  if (isDefault && recentId) {
    tempStore[recentId].isDefault = true;
  }

  return tempStore;
};

const removePassport = (result, { personId, passportId, userId }) => {
  const setValue = {
    peopleById: DATASTORE_UTILS.removeItemsArray(
      `${personId}.passports`,
      passportId,
    ),
    passports: DATASTORE_UTILS.removeObjectById(passportId),
  };

  if (userId) {
    setValue.people = DATASTORE_UTILS.removeItemsArray(
      `${userId}.passports`,
      passportId,
    );
  }

  return setValue;
};

const addPassport = result => {
  const personId = dotProp.get(result, USER_PASSPORTS_FIELDS.personId, null);
  const { entities, result: normalizedResult } = normalize(
    result,
    UserSchema.passport,
  );
  return {
    // TODO: Also update userStore.person.passports array (where person is stored by userId)
    peopleById: DATASTORE_UTILS.upsertArray(
      `${personId}.passports`,
      normalizedResult,
    ),
    passports: DATASTORE_UTILS.upsertObject(entities.passport),
    files: DATASTORE_UTILS.upsertObject(entities.photo),
  };
};

const patchPassport = result => {
  const { entities } = normalize(result, UserSchema.passport);
  return {
    passports: DATASTORE_UTILS.upsertObject(entities.passport),
    files: DATASTORE_UTILS.upsertObject(entities.photo),
  };
};

const createPassportFacade = (result, { userId, rawData }) => {
  const { birthPlace, birthDate } = rawData;
  const params = [];

  const bday = isEmptyString(birthDate) ? null : birthDate;

  params.push(DATASTORE_UTILS.updateAttribute(`${userId}.birthDate`, bday));
  params.push(
    DATASTORE_UTILS.updateAttribute(`${userId}.birthPlace`, birthPlace),
  );

  const normalizedPassport = normalize(result, UserSchema.passport);
  return {
    passports: compose(
      makeIsDefaultOne(normalizedPassport.entities.passport),
      DATASTORE_UTILS.upsertObject(normalizedPassport.entities.passport),
    ),
    files: DATASTORE_UTILS.upsertObject(normalizedPassport.entities.photo),
    people: compose(
      DATASTORE_UTILS.upsertArray(
        `${userId}.passports`,
        normalizedPassport.result,
        {
          isAppendedFirst: true,
        },
      ),
      ...params,
    ),
  };
};

const getPassportsFacade = (result, { userId }) => {
  const normalizedPassport = normalize(result, UserSchema.passports);
  return {
    passports: DATASTORE_UTILS.upsertObject(
      normalizedPassport.entities.passport,
    ),
    files: DATASTORE_UTILS.upsertObject(normalizedPassport.entities.photo),
    people: DATASTORE_UTILS.upsertArray(
      `${userId}.passports`,
      normalizedPassport.result,
    ),
  };
};

const removePassportFacade = (result, { passportId, userId }) => ({
  people: DATASTORE_UTILS.removeItemsArray(`${userId}.passports`, passportId),
  passports: compose(
    DATASTORE_UTILS.removeObjectById(passportId),
    chooseOneAsDefault(passportId),
  ),
});

const patchPassportFacade = (result, payload) => {
  const rawData = get(payload, 'rawData', {});
  const userId = get(payload, 'userId', 0);
  const params = [];

  Object.keys(rawData).forEach(key => {
    params.push(
      DATASTORE_UTILS.updateAttribute(`${userId}.${key}`, rawData[key]),
    );
  });

  const normalizedPassport = normalize(result, UserSchema.passport);

  return {
    passports: compose(
      makeIsDefaultOne(normalizedPassport.entities.passport),
      DATASTORE_UTILS.upsertObject(normalizedPassport.entities.passport),
    ),
    files: DATASTORE_UTILS.upsertObject(normalizedPassport.entities.photo),
    people: compose(...params),
  };
};

const addMedical = response => {
  const { entities, result } = normalize(response, UserSchema.medical);
  const personId = dotProp.get(response, MEDICAL_PATHS.personId, null);
  return {
    peopleById: DATASTORE_UTILS.upsertArray(`${personId}.medicals`, result),
    medicals: DATASTORE_UTILS.upsertObject(entities.medicals),
  };
};

const patchMedical = response => {
  const { entities } = normalize(response, UserSchema.medical);
  return {
    medicals: DATASTORE_UTILS.upsertObject(entities.medicals),
  };
};

const removeMedical = (response, { personId, medicalId }) => ({
  peopleById: DATASTORE_UTILS.removeItemsArray(
    `${personId}.medicals`,
    medicalId,
  ),
  medicals: DATASTORE_UTILS.removeObjectById(medicalId),
});

const addDietary = response => {
  const { entities, result } = normalize(response, UserSchema.dietary);
  const personId = dotProp.get(response, DIETARY_PATHS.personId, null);
  return {
    peopleById: DATASTORE_UTILS.upsertArray(`${personId}.dietaries`, result),
    dietaries: DATASTORE_UTILS.upsertObject(entities.dietaries),
  };
};

const patchDietary = response => {
  const { entities } = normalize(response, UserSchema.dietary);
  return {
    dietaries: DATASTORE_UTILS.upsertObject(entities.dietaries),
  };
};

const removeDietary = (response, { personId, dietaryId }) => ({
  peopleById: DATASTORE_UTILS.removeItemsArray(
    `${personId}.dietaries`,
    dietaryId,
  ),
  dietaries: DATASTORE_UTILS.removeObjectById(dietaryId),
});

const addStudentDetail = response => {
  const { entities, result } = normalize(response, UserSchema.studentDetail);
  const personId = dotProp.get(response, STUDENT_DETAIL_PATHS.personId, null);
  return {
    peopleById: DATASTORE_UTILS.upsertArray(
      `${personId}.studentDetails`,
      result,
    ),
    studentDetails: DATASTORE_UTILS.upsertObject(entities.studentDetails),
  };
};

const patchStudentDetail = response => {
  const { entities } = normalize(response, UserSchema.studentDetail);
  return {
    studentDetails: DATASTORE_UTILS.upsertObject(entities.studentDetails),
  };
};

const removeStudentDetail = (response, { personId, studentDetailId }) => ({
  peopleById: DATASTORE_UTILS.removeItemsArray(
    `${personId}.studentDetails`,
    studentDetailId,
  ),
  studentDetails: DATASTORE_UTILS.removeObjectById(studentDetailId),
});

const addInsurancePolicy = response => {
  const { insurancePolicy } = response.body;
  const { entities, result } = normalize(
    insurancePolicy,
    UserSchema.insurancePolicy,
  );
  const personId = dotProp.get(
    insurancePolicy,
    STUDENT_DETAIL_PATHS.personId,
    null,
  );
  return {
    peopleById: DATASTORE_UTILS.upsertArray(
      `${personId}.insurancePolicies`,
      result,
    ),
    insurancePolicies: DATASTORE_UTILS.upsertObject(entities.insurancePolicies),
    addResult: insurancePolicy,
  };
};

const patchInsurancePolicy = response => {
  const { insurancePolicy } = response.body;
  const { entities } = normalize(insurancePolicy, UserSchema.insurancePolicy);
  return {
    insurancePolicies: DATASTORE_UTILS.upsertObject(entities.insurancePolicies),
    patchResult: response,
  };
};

const removeInsurancePolicy = (response, { personId, id }) => ({
  peopleById: DATASTORE_UTILS.removeItemsArray(
    `${personId}.insurancePolicies`,
    id,
  ),
  insurancePolicies: DATASTORE_UTILS.removeObjectById(id),
});

export const PERSON_DETAIL_UTILS = {
  addPersonById,
  addPeople,
  updatePeople,
  deletePhone,
  addPhone,
  updatePhone,
  removePassport,
  addPassport,
  patchPassport,
  createPassportFacade,
  removePassportFacade,
  patchPassportFacade,
  getPassportsFacade,
  addMedical,
  patchMedical,
  removeMedical,
  addDietary,
  patchDietary,
  removeDietary,
  addStudentDetail,
  patchStudentDetail,
  removeStudentDetail,
  addInsurancePolicy,
  patchInsurancePolicy,
  removeInsurancePolicy,
};
