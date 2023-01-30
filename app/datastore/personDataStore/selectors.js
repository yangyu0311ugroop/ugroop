import _ from 'lodash';
import { PERSON_DATA_STORE } from 'appConstants';
import { ARRAY_HELPERS } from 'utils/helpers/arrays';
import {
  PERSON_PATHS,
  MEDICAL_PATHS,
  DIETARY_PATHS,
  STUDENT_DETAIL_PATHS,
  INSURANCE_POLICY_PATHS,
} from 'datastore/personDataStore/constants';

const EMPTY_ARRAY = [];

export const people = [PERSON_DATA_STORE, 'people'];
export const person = ({ id }) => [...people, id];
export const personProp = ({ id, path }) => [
  ...person({ id }),
  ...ARRAY_HELPERS.arrayIfNot(path),
];

export const userId = ({ id }) => [...person({ id }), ...PERSON_PATHS.userId];

export const knownAs = ({ id }) => [...person({ id }), ...PERSON_PATHS.knownAs];
export const insurancePolicy = ({ id }) => [
  ...person({ id }),
  ...PERSON_PATHS.insurancePolicy,
];
export const firstName = ({ id }) => [
  ...person({ id }),
  ...PERSON_PATHS.firstName,
];
export const middleName = ({ id }) => [
  ...person({ id }),
  ...PERSON_PATHS.middleName,
];
export const lastName = ({ id }) => [
  ...person({ id }),
  ...PERSON_PATHS.lastName,
];

export const personInsurancePolicies = ({ id }) => [
  ...person({ id }),
  ...PERSON_PATHS.insurancePolicies,
];

export const email = ({ id }) => [...person({ id }), ...PERSON_PATHS.email];
export const gender = ({ id }) => [...people, id, ...PERSON_PATHS.gender];

export const passports = ({ id }) => [
  ...person({ id }),
  ...PERSON_PATHS.passports,
];
export const medicals = ({ id }) => [
  ...person({ id }),
  ...PERSON_PATHS.medicals,
];
export const dietaries = ({ id }) => [
  ...person({ id }),
  ...PERSON_PATHS.dietaries,
];
export const studentDetails = ({ id }) => [
  ...person({ id }),
  ...PERSON_PATHS.studentDetails,
];

export const noMedical = ({ id }) => [...person({ id }), 'noMedical'];

export const noDietary = ({ id }) => [...person({ id }), 'noDietary'];

export const medical = [PERSON_DATA_STORE, 'medicals'];

export const medicalPersonId = ({ id }) => [
  ...medical,
  id,
  ...MEDICAL_PATHS.personId,
];

export const medicalDescription = ({ id }) => [
  ...medical,
  id,
  ...MEDICAL_PATHS.description,
];
export const medicalSeverity = ({ id }) => [
  ...medical,
  id,
  ...MEDICAL_PATHS.severity,
];
export const medicalAction = ({ id }) => [
  ...medical,
  id,
  ...MEDICAL_PATHS.action,
];

export const insurancePolicies = [PERSON_DATA_STORE, 'insurancePolicies'];

export const insurancePolicyPersonId = ({ id }) => [
  ...insurancePolicies,
  id,
  ...INSURANCE_POLICY_PATHS.personId,
];

export const sortMedicalsBySeverity = ({ idsProp = 'ids' } = {}) => ({
  keyPath: ({ [idsProp]: ids = [] }) => ids.map(id => medicalSeverity({ id })),
  cacheKey: ({ [idsProp]: ids }) =>
    `person.${idsProp}:${
      ids ? JSON.stringify(ids) : 'null'
    }.sortMedicalsBySeverity`,
  props: ({ [idsProp]: ids }) => ids,
  getter: (...severities) => {
    const ids = severities.pop();
    const array = ARRAY_HELPERS.uniq(
      _.orderBy(_.zip(ids, severities), ([, severity]) => severity, 'desc').map(
        ([id]) => id,
      ),
    );
    return array.length ? array : EMPTY_ARRAY;
  },
});

export const dietary = [PERSON_DATA_STORE, 'dietaries'];

export const dietaryPersonId = ({ id }) => [
  ...dietary,
  id,
  ...DIETARY_PATHS.personId,
];

export const dietaryDescription = ({ id }) => [
  ...dietary,
  id,
  ...DIETARY_PATHS.description,
];

export const studentDetail = [PERSON_DATA_STORE, 'studentDetails'];

export const studentDetailPersonId = ({ id }) => [
  ...studentDetail,
  id,
  ...STUDENT_DETAIL_PATHS.personId,
];

export const studentDetailYear = ({ id }) => [
  ...studentDetail,
  id,
  ...STUDENT_DETAIL_PATHS.year,
];

export const studentDetailClass = ({ id }) => [
  ...studentDetail,
  id,
  ...STUDENT_DETAIL_PATHS.class,
];

export const studentDetailNumber = ({ id }) => [
  ...studentDetail,
  id,
  ...STUDENT_DETAIL_PATHS.number,
];

export const PERSON_STORE_SELECTORS = {
  people,
  person,
  personProp,

  userId,

  knownAs,
  insurancePolicy,
  firstName,
  middleName,
  lastName,
  email,
  gender,

  passports,
  medicals,
  dietaries,
  studentDetails,

  medical,

  medicalPersonId,

  medicalDescription,
  medicalSeverity,
  medicalAction,

  sortMedicalsBySeverity,

  dietary,

  dietaryPersonId,

  dietaryDescription,

  studentDetail,

  studentDetailPersonId,

  studentDetailYear,
  studentDetailClass,
  studentDetailNumber,
  noDietary,
  noMedical,
  insurancePolicies,
  insurancePolicyPersonId,
  personInsurancePolicies,
};
