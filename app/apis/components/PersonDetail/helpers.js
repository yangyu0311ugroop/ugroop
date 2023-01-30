import {
  PERSON_DETAIL_API,
  CREATE_PERSON_FACADE,
  UPDATE_PERSON,
  REMOVE_PASSPORT,
  ADD_PASSPORT,
  PATCH_PASSPORT,
  PATCH_PASSPORT_FACADE,
  ADD_MEDICAL,
  PATCH_MEDICAL,
  REMOVE_MEDICAL,
  ADD_DIETARY,
  PATCH_DIETARY,
  REMOVE_DIETARY,
  ADD_STUDENT_DETAIL,
  PATCH_STUDENT_DETAIL,
  REMOVE_STUDENT_DETAIL,
  ADD_INSURANCE_POLICY,
  PATCH_INSURANCE_POLICY,
  REMOVE_INSURANCE_POLICY,
} from 'apis/constants';
import { PASSPORT_UTILS } from 'smartComponents/Person/components/Passports/utils';

/**
 * Creates person with nodeId or userId.
 * @param obj
 *  data: nodeId/userId and other properties
 *  ...rest (eg. onSuccess, onError, etc)
 * @param props
 *  resaga: any resaga instance
 */
const createPerson = (obj, props) => {
  const { data, ...rest } = obj;
  props.resaga.dispatchTo(PERSON_DETAIL_API, CREATE_PERSON_FACADE, {
    payload: { data },
    ...rest,
  });
};

/**
 * Updates person.
 * @param obj
 *  personId: person id (optional)
 *  userId: person user id (optional)
 *  nodeId: person node id (optional)
 *  person: updated person properties
 *  ...rest (eg. onSuccess, onError, etc)
 * @param props
 *  resaga: any resaga instance
 */
const updatePerson = (obj, props) => {
  const { personId, userId, nodeId, person, ...rest } = obj;
  const data = { ...person };
  if (personId) data.id = personId;
  if (userId) data.userId = userId;
  if (nodeId) data.nodeId = nodeId;
  props.resaga.dispatchTo(PERSON_DETAIL_API, UPDATE_PERSON, {
    payload: { data },
    ...rest,
  });
};

/**
 * Removes passport for person with person id.
 * @param obj
 *  personId: person id
 *  passportId: passport id
 *  userId: user id (for store cleanup only)
 *  ...rest (eg. onSuccess, onError, etc)
 * @param props
 *  resaga: any resaga instance
 */
const removePersonPassport = (obj, props) => {
  const { personId, passportId, userId, ...rest } = obj;
  props.resaga.dispatchTo(PERSON_DETAIL_API, REMOVE_PASSPORT, {
    payload: { personId, passportId, userId },
    ...rest,
  });
};

/**
 * Creates passport for person with person id.
 * @param obj
 *  personId: person id
 *  passport: updated passport properties
 *  ...rest (eg. onSuccess, onError, etc)
 * @param props
 *  resaga: any resaga instance
 */
const addPersonPassport = (obj, props) => {
  const { personId, passport, ...rest } = obj;
  props.resaga.dispatchTo(PERSON_DETAIL_API, ADD_PASSPORT, {
    payload: { personId, data: passport },
    ...rest,
  });
};

/**
 * Patches passport for person with person id.
 * @param obj
 *  personId: person id
 *  passportId: passport id
 *  passport: updated passport properties
 *  ...rest (eg. onSuccess, onError, etc)
 * @param props
 *  resaga: any resaga instance
 */
const updatePersonPassport = (obj, props) => {
  const { personId, passportId, passport, ...rest } = obj;
  props.resaga.dispatchTo(PERSON_DETAIL_API, PATCH_PASSPORT, {
    payload: { personId, passportId, data: passport },
    ...rest,
  });
};

/**
 * Patches passport photo for person with person id.
 * @param obj
 *  personId: person id
 *  passportId: passport id
 *  url: updated passport photo url
 *  metaInfo: updated passport photo metaInfo
 *  ...rest (eg. onSuccess, onError, etc)
 * @param props
 *  resaga: any resaga instance
 */
const updatePersonPassportPhoto = (obj, props) => {
  const { personId, passportId, url, metaInfo, ...rest } = obj;

  const photo = url
    ? {
        url,
        ...metaInfo,
      }
    : null;

  props.resaga.dispatchTo(PERSON_DETAIL_API, PATCH_PASSPORT, {
    payload: { personId, passportId, data: { photo } },
    ...rest,
  });
};

const updatePassport = (
  props,
  opts = { passportIdKey: 'id', userIdKey: 'userId' },
) => inlineForm => {
  const { model, onSuccess, onError } = inlineForm;
  const rawModel = model;
  const filteredFormData = PASSPORT_UTILS.validateData(model);

  const passportId = props[opts.passportIdKey];
  const userId = props[opts.userIdKey];

  props.resaga.dispatchTo(PERSON_DETAIL_API, PATCH_PASSPORT_FACADE, {
    payload: {
      passportId,
      userId,
      data: filteredFormData,
      rawData: rawModel,
    },
    onSuccess,
    onError,
  });
};

const updatePassportPhoto = (
  props,
  opts = {
    passportIdKey: 'id',
    userIdKey: 'userId',
  },
) => (url, metaInfo) => {
  const passportId = props[opts.passportIdKey];
  const userId = props[opts.userIdKey];

  const photo = url
    ? {
        url,
        ...metaInfo,
      }
    : null;

  props.resaga.dispatchTo(PERSON_DETAIL_API, PATCH_PASSPORT_FACADE, {
    payload: {
      passportId,
      userId,
      data: {
        photo,
      },
    },
    onSuccess: opts.onSuccess,
    onError: opts.onError,
  });
};

/**
 * Adds medical to person.
 * @param obj
 *  personId: person id
 *  medical: medical properties
 *  ...rest (eg. onSuccess, onError, etc)
 * @param props
 *  resaga: any resaga instance
 */
const addMedical = (obj, props) => {
  const { personId, medical, ...rest } = obj;
  props.resaga.dispatchTo(PERSON_DETAIL_API, ADD_MEDICAL, {
    payload: { personId, data: medical },
    ...rest,
  });
};

/**
 * Patches medical of person.
 * @param obj
 *  personId: person id
 *  medicalId: medical id
 *  medical: medical properties
 *  ...rest (eg. onSuccess, onError, etc)
 * @param props
 *  resaga: any resaga instance
 */
const patchMedical = (obj, props) => {
  const { personId, medicalId, medical, ...rest } = obj;
  props.resaga.dispatchTo(PERSON_DETAIL_API, PATCH_MEDICAL, {
    payload: { personId, medicalId, data: medical },
    ...rest,
  });
};

/**
 * Removes medical from person.
 * @param obj
 *  personId: person id
 *  medicalId: medical id
 *  ...rest (eg. onSuccess, onError, etc)
 * @param props
 *  resaga: any resaga instance
 */
const removeMedical = (obj, props) => {
  const { personId, medicalId, ...rest } = obj;
  props.resaga.dispatchTo(PERSON_DETAIL_API, REMOVE_MEDICAL, {
    payload: { personId, medicalId },
    ...rest,
  });
};

/**
 * Adds dietary to person.
 * @param obj
 *  personId: person id
 *  dietary: dietary properties
 *  ...rest (eg. onSuccess, onError, etc)
 * @param props
 *  resaga: any resaga instance
 */
const addDietary = (obj, props) => {
  const { personId, dietary, ...rest } = obj;
  props.resaga.dispatchTo(PERSON_DETAIL_API, ADD_DIETARY, {
    payload: { personId, data: dietary },
    ...rest,
  });
};

/**
 * Patches dietary of person.
 * @param obj
 *  personId: person id
 *  dietaryId: dietary id
 *  dietary: dietary properties
 *  ...rest (eg. onSuccess, onError, etc)
 * @param props
 *  resaga: any resaga instance
 */
const patchDietary = (obj, props) => {
  const { personId, dietaryId, dietary, ...rest } = obj;
  props.resaga.dispatchTo(PERSON_DETAIL_API, PATCH_DIETARY, {
    payload: { personId, dietaryId, data: dietary },
    ...rest,
  });
};

/**
 * Removes dietary from person.
 * @param obj
 *  personId: person id
 *  dietaryId: dietary id
 *  ...rest (eg. onSuccess, onError, etc)
 * @param props
 *  resaga: any resaga instance
 */
const removeDietary = (obj, props) => {
  const { personId, dietaryId, ...rest } = obj;
  props.resaga.dispatchTo(PERSON_DETAIL_API, REMOVE_DIETARY, {
    payload: { personId, dietaryId },
    ...rest,
  });
};

/**
 * Adds student detail to person.
 * @param obj
 *  personId: person id
 *  studentDetail: student detail properties
 *  ...rest (eg. onSuccess, onError, etc)
 * @param props
 *  resaga: any resaga instance
 */
const addStudentDetail = (obj, props) => {
  const { personId, studentDetail, ...rest } = obj;
  props.resaga.dispatchTo(PERSON_DETAIL_API, ADD_STUDENT_DETAIL, {
    payload: { personId, data: studentDetail },
    ...rest,
  });
};

/**
 * Patches student detail of person.
 * @param obj
 *  personId: person id
 *  studentDetailId: student detail id
 *  studentDetail: student detail properties
 *  ...rest (eg. onSuccess, onError, etc)
 * @param props
 *  resaga: any resaga instance
 */
const patchStudentDetail = (obj, props) => {
  const { personId, studentDetailId, studentDetail, ...rest } = obj;
  props.resaga.dispatchTo(PERSON_DETAIL_API, PATCH_STUDENT_DETAIL, {
    payload: { personId, studentDetailId, data: studentDetail },
    ...rest,
  });
};

/**
 * Removes student detail from person.
 * @param obj
 *  personId: person id
 *  studentDetailId: student detail id
 *  ...rest (eg. onSuccess, onError, etc)
 * @param props
 *  resaga: any resaga instance
 */
const removeStudentDetail = (obj, props) => {
  const { personId, studentDetailId, ...rest } = obj;
  props.resaga.dispatchTo(PERSON_DETAIL_API, REMOVE_STUDENT_DETAIL, {
    payload: { personId, studentDetailId },
    ...rest,
  });
};

const addInsurancePolicy = (obj, props) => {
  const { personId, insurancePolicy, ...rest } = obj;
  props.resaga.dispatchTo(PERSON_DETAIL_API, ADD_INSURANCE_POLICY, {
    payload: { personId, data: insurancePolicy },
    ...rest,
  });
};

const patchInsurancePolicy = (obj, props) => {
  const { personId, id, insurancePolicy, ...rest } = obj;
  props.resaga.dispatchTo(PERSON_DETAIL_API, PATCH_INSURANCE_POLICY, {
    payload: { personId, id, data: insurancePolicy },
    ...rest,
  });
};

const removeInsurancePolicy = (obj, props) => {
  const { personId, id, ...rest } = obj;
  props.resaga.dispatchTo(PERSON_DETAIL_API, REMOVE_INSURANCE_POLICY, {
    payload: { personId, id },
    ...rest,
  });
};

export const PERSON_DETAIL_HELPER = {
  createPerson,
  updatePerson,
  removePersonPassport,
  addPersonPassport,
  updatePersonPassport,
  updatePersonPassportPhoto,
  updatePassport,
  updatePassportPhoto,
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
