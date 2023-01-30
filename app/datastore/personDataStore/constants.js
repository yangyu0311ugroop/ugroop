import { ARRAY_HELPERS } from 'utils/helpers/arrays';

const makePath = path => ARRAY_HELPERS.arrayIfNot(path);

export const PERSON_PATHS = {
  userId: makePath('userId'),
  nodeId: makePath('nodeId'),

  firstName: makePath('firstName'),
  middleName: makePath('middleName'),
  lastName: makePath('lastName'),
  knownAs: makePath('knownAs'),
  insurancePolicy: makePath('insurancePolicy'),
  email: makePath('email'),
  gender: makePath('gender'),
  birthDate: makePath('birthDate'),

  passports: makePath('passports'),
  medicals: makePath('medicals'),
  dietaries: makePath('dietaries'),
  studentDetails: makePath('studentDetails'),
  insurancePolicies: makePath('insurancePolicies'),
};

const makeMedicalPath = path => ARRAY_HELPERS.arrayIfNot(path);
const makeCalculatedMedicalPath = path => [
  'calculated',
  'medical',
  ...ARRAY_HELPERS.arrayIfNot(path),
];

export const MEDICAL_PATHS = {
  personId: makeMedicalPath('personId'),

  description: makeMedicalPath('description'),
  severity: makeMedicalPath('severity'),
  action: makeMedicalPath('action'),

  calculatedSeverity: makeCalculatedMedicalPath('severity'),
  calculatedCount: makeCalculatedMedicalPath('count'),
};

const makeDietaryPath = path => ARRAY_HELPERS.arrayIfNot(path);
const makeCalculatedDietaryPath = path => [
  'calculated',
  'dietary',
  ...ARRAY_HELPERS.arrayIfNot(path),
];

export const DIETARY_PATHS = {
  personId: makeDietaryPath('personId'),

  description: makeDietaryPath('description'),

  calculatedCount: makeCalculatedDietaryPath('count'),
};

const makeInsurancePolicyPath = path => ARRAY_HELPERS.arrayIfNot(path);

export const INSURANCE_POLICY_PATHS = {
  personId: makeInsurancePolicyPath('personId'),
  id: makeInsurancePolicyPath('id'),
  insuranceNumber: makeInsurancePolicyPath('insuranceNumber'),
  companyName: makeInsurancePolicyPath('companyName'),
  commencementDate: makeInsurancePolicyPath('commencementDate'),
  expiryDate: makeInsurancePolicyPath('expiryDate'),
  emergencyPhone: makeInsurancePolicyPath('emergencyPhone'),
};

const makeStudentDetailPath = path => ARRAY_HELPERS.arrayIfNot(path);

export const STUDENT_DETAIL_PATHS = {
  personId: makeStudentDetailPath('personId'),

  year: makeStudentDetailPath('year'),
  class: makeStudentDetailPath('class'),
  number: makeStudentDetailPath('number'),
};
