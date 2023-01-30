import {
  FILE_DATA_STORE,
  PHONE_DATA_STORE,
  USER_DATA_STORE,
  NODE_STORE,
} from 'appConstants';
import {
  PERSON_DETAIL_API,
  CREATE_PERSON_FACADE,
  GET_PERSON_DETAIL,
  PATCH_PERSON_FACADE,
  UPDATE_PERSON,
  ADD_PHONE,
  REMOVE_PASSPORT,
  ADD_PASSPORT,
  PATCH_PASSPORT,
  GET_PASSPORTS_FACADE,
  REMOVE_PASSPORT_FACADE,
  CREATE_PASSPORT_FACADE,
  PATCH_PASSPORT_FACADE,
  PATCH_PHONE,
  REMOVE_PHONE,
  ADD_MEDICAL,
  PATCH_MEDICAL,
  REMOVE_MEDICAL,
  ADD_DIETARY,
  PATCH_DIETARY,
  REMOVE_DIETARY,
  ADD_STUDENT_DETAIL,
  PATCH_STUDENT_DETAIL,
  REMOVE_STUDENT_DETAIL,
  PATCH_INSURANCE_POLICY,
  REMOVE_INSURANCE_POLICY,
  ADD_INSURANCE_POLICY,
} from 'apis/constants';
import { PERSON_STORE_SELECTORS } from 'datastore/personDataStore/selectors';
import { updateAccountAvatar } from 'datastore/stormPathStore/actions';
import { requests } from 'utils/request';

import { PERSON_DETAIL_UTILS } from './utils';

export const CONFIG = {
  name: PERSON_DETAIL_API,
  requests: {
    [CREATE_PERSON_FACADE]: ({ data }) =>
      requests.fetchWithAuthorisation(
        'post',
        `/${PERSON_DETAIL_API}/facade`,
        data,
      ),
    [GET_PERSON_DETAIL]: ({ userId }) =>
      requests.fetchWithAuthorisation(
        'get',
        `/${PERSON_DETAIL_API}/${userId}/facade`,
      ),
    [PATCH_PERSON_FACADE]: ({ data, userId }) =>
      requests.fetchWithAuthorisation(
        'patch',
        `/${PERSON_DETAIL_API}/${userId}/facade`,
        data,
      ),
    [UPDATE_PERSON]: ({ data }) =>
      requests.fetchWithAuthorisation('patch', `/${PERSON_DETAIL_API}`, data),
    [REMOVE_PHONE]: ({ phoneId, userId }) =>
      requests.fetchWithAuthorisation(
        'delete',
        `/${PERSON_DETAIL_API}/${userId}/phones/${phoneId}`,
      ),
    [ADD_PHONE]: ({ data, userId }) =>
      requests.fetchWithAuthorisation(
        'post',
        `/${PERSON_DETAIL_API}/${userId}/phones`,
        data,
      ),
    [PATCH_PHONE]: ({ data, userId, phoneId }) =>
      requests.fetchWithAuthorisation(
        'patch',
        `/${PERSON_DETAIL_API}/${userId}/phones/${phoneId}`,
        data,
      ),
    [REMOVE_PASSPORT]: ({ personId, passportId }) =>
      requests.fetchWithAuthorisation(
        'delete',
        `/${PERSON_DETAIL_API}/${personId}/passports/${passportId}`,
      ),
    [ADD_PASSPORT]: ({ personId, data }) =>
      requests.fetchWithAuthorisation(
        'post',
        `/${PERSON_DETAIL_API}/${personId}/passports`,
        data,
      ),
    [PATCH_PASSPORT]: ({ personId, passportId, data }) =>
      requests.fetchWithAuthorisation(
        'patch',
        `/${PERSON_DETAIL_API}/${personId}/passports/${passportId}`,
        data,
      ),
    [GET_PASSPORTS_FACADE]: ({ userId }) =>
      requests.fetchWithAuthorisation(
        'get',
        `/${PERSON_DETAIL_API}/${userId}/Passports/facade`,
      ),
    [REMOVE_PASSPORT_FACADE]: ({ userId, passportId }) =>
      requests.fetchWithAuthorisation(
        'delete',
        `/${PERSON_DETAIL_API}/${userId}/Passports/${passportId}/facade`,
      ),
    [CREATE_PASSPORT_FACADE]: ({ data, userId }) =>
      requests.fetchWithAuthorisation(
        'post',
        `/${PERSON_DETAIL_API}/${userId}/Passports/facade`,
        data,
      ),
    [PATCH_PASSPORT_FACADE]: ({ userId, passportId, data }) =>
      requests.fetchWithAuthorisation(
        'patch',
        `/${PERSON_DETAIL_API}/${userId}/Passports/${passportId}/facade`,
        data,
      ),
    [ADD_MEDICAL]: ({ personId, data }) =>
      requests.fetchWithAuthorisation(
        'post',
        `/${PERSON_DETAIL_API}/${personId}/medicals`,
        data,
      ),
    [PATCH_MEDICAL]: ({ personId, medicalId, data }) =>
      requests.fetchWithAuthorisation(
        'patch',
        `/${PERSON_DETAIL_API}/${personId}/medicals/${medicalId}`,
        data,
      ),
    [REMOVE_MEDICAL]: ({ personId, medicalId }) =>
      requests.fetchWithAuthorisation(
        'delete',
        `/${PERSON_DETAIL_API}/${personId}/medicals/${medicalId}`,
      ),
    [ADD_DIETARY]: ({ personId, data }) =>
      requests.fetchWithAuthorisation(
        'post',
        `/${PERSON_DETAIL_API}/${personId}/dietaries`,
        data,
      ),
    [PATCH_DIETARY]: ({ personId, dietaryId, data }) =>
      requests.fetchWithAuthorisation(
        'patch',
        `/${PERSON_DETAIL_API}/${personId}/dietaries/${dietaryId}`,
        data,
      ),
    [REMOVE_DIETARY]: ({ personId, dietaryId }) =>
      requests.fetchWithAuthorisation(
        'delete',
        `/${PERSON_DETAIL_API}/${personId}/dietaries/${dietaryId}`,
      ),
    [ADD_STUDENT_DETAIL]: ({ personId, data }) =>
      requests.fetchWithAuthorisation(
        'post',
        `/${PERSON_DETAIL_API}/${personId}/studentDetails`,
        data,
      ),
    [PATCH_STUDENT_DETAIL]: ({ personId, studentDetailId, data }) =>
      requests.fetchWithAuthorisation(
        'patch',
        `/${PERSON_DETAIL_API}/${personId}/studentDetails/${studentDetailId}`,
        data,
      ),
    [REMOVE_STUDENT_DETAIL]: ({ personId, studentDetailId }) =>
      requests.fetchWithAuthorisation(
        'delete',
        `/${PERSON_DETAIL_API}/${personId}/studentDetails/${studentDetailId}`,
      ),
    [ADD_INSURANCE_POLICY]: ({ personId, data }) =>
      requests.fetchWithAuthorisation(
        'post',
        `/${PERSON_DETAIL_API}/${personId}/insurancePolicies`,
        data,
      ),
    [PATCH_INSURANCE_POLICY]: ({ personId, id, data }) =>
      requests.fetchWithAuthorisation(
        'patch',
        `/${PERSON_DETAIL_API}/${personId}/insurancePolicies/${id}`,
        data,
      ),
    [REMOVE_INSURANCE_POLICY]: ({ personId, id }) =>
      requests.fetchWithAuthorisation(
        'delete',
        `/${PERSON_DETAIL_API}/${personId}/insurancePolicies/${id}`,
      ),
  },
  processResult: {
    [CREATE_PERSON_FACADE]: PERSON_DETAIL_UTILS.addPersonById,
    [GET_PERSON_DETAIL]: PERSON_DETAIL_UTILS.addPeople,
    [PATCH_PERSON_FACADE]: PERSON_DETAIL_UTILS.updatePeople,
    [UPDATE_PERSON]: PERSON_DETAIL_UTILS.updatePeople,
    [REMOVE_PHONE]: PERSON_DETAIL_UTILS.deletePhone,
    [ADD_PHONE]: PERSON_DETAIL_UTILS.addPhone,
    [PATCH_PHONE]: PERSON_DETAIL_UTILS.updatePhone,
    [REMOVE_PASSPORT]: PERSON_DETAIL_UTILS.removePassport,
    [ADD_PASSPORT]: PERSON_DETAIL_UTILS.addPassport,
    [PATCH_PASSPORT]: PERSON_DETAIL_UTILS.patchPassport,
    [GET_PASSPORTS_FACADE]: PERSON_DETAIL_UTILS.getPassportsFacade,
    [REMOVE_PASSPORT_FACADE]: PERSON_DETAIL_UTILS.removePassportFacade,
    [CREATE_PASSPORT_FACADE]: PERSON_DETAIL_UTILS.createPassportFacade,
    [PATCH_PASSPORT_FACADE]: PERSON_DETAIL_UTILS.patchPassportFacade,
    [ADD_MEDICAL]: PERSON_DETAIL_UTILS.addMedical,
    [PATCH_MEDICAL]: PERSON_DETAIL_UTILS.patchMedical,
    [REMOVE_MEDICAL]: PERSON_DETAIL_UTILS.removeMedical,
    [ADD_DIETARY]: PERSON_DETAIL_UTILS.addDietary,
    [PATCH_DIETARY]: PERSON_DETAIL_UTILS.patchDietary,
    [REMOVE_DIETARY]: PERSON_DETAIL_UTILS.removeDietary,
    [ADD_STUDENT_DETAIL]: PERSON_DETAIL_UTILS.addStudentDetail,
    [PATCH_STUDENT_DETAIL]: PERSON_DETAIL_UTILS.patchStudentDetail,
    [REMOVE_STUDENT_DETAIL]: PERSON_DETAIL_UTILS.removeStudentDetail,
    [ADD_INSURANCE_POLICY]: PERSON_DETAIL_UTILS.addInsurancePolicy,
    [PATCH_INSURANCE_POLICY]: PERSON_DETAIL_UTILS.patchInsurancePolicy,
    [REMOVE_INSURANCE_POLICY]: PERSON_DETAIL_UTILS.removeInsurancePolicy,
  },
  onSuccess: {
    [PATCH_PERSON_FACADE]: [
      ({ result }) => {
        if (result.photo) {
          const { url, x, y, width, height, scale, rotate } = result.photo;
          return updateAccountAvatar({
            url,
            metaInfo: {
              x: Number(x),
              y: Number(y),
              width: Number(width),
              height: Number(height),
              scale: Number(scale),
              rotate: Number(rotate),
            },
          });
        }

        return updateAccountAvatar({});
      },
    ],
  },
  value: {},
  setValue: {
    people: [USER_DATA_STORE, 'people'],
    peopleById: PERSON_STORE_SELECTORS.people,
    phones: [PHONE_DATA_STORE, 'phones'],
    files: [FILE_DATA_STORE, 'files'],
    passports: [USER_DATA_STORE, 'passports'],
    medicals: PERSON_STORE_SELECTORS.medical,
    dietaries: PERSON_STORE_SELECTORS.dietary,
    studentDetails: PERSON_STORE_SELECTORS.studentDetail,
    personNode: [NODE_STORE, 'nodes'],
    insurancePolicies: PERSON_STORE_SELECTORS.insurancePolicies,
  },
  manuallySubscribe: true,
};
