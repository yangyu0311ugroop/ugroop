import {
  CREATE_PERSON_FACADE,
  GET_PERSON_DETAIL,
  PATCH_PERSON_FACADE,
  UPDATE_PERSON,
  REMOVE_PHONE,
  ADD_PHONE,
  PATCH_PHONE,
  REMOVE_PASSPORT,
  ADD_PASSPORT,
  PATCH_PASSPORT,
  GET_PASSPORTS_FACADE,
  REMOVE_PASSPORT_FACADE,
  CREATE_PASSPORT_FACADE,
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
import { requests } from 'utils/request';

import { CONFIG } from '../config';

describe('PersonDetail/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG).toBe('object');
    });
  });

  describe('requests', () => {
    it('still matches snapshot', () => {
      requests.fetchWithAuthorisation = jest.fn();

      CONFIG.requests[CREATE_PERSON_FACADE]({ data: { nodeId: 123 } });
      CONFIG.requests[GET_PERSON_DETAIL]({ userId: 123 });
      CONFIG.requests[PATCH_PERSON_FACADE]({
        data: { firstName: 'firstName' },
        userId: 123,
      });
      CONFIG.requests[UPDATE_PERSON]({ userId: 123, data: {} });
      CONFIG.requests[REMOVE_PHONE]({ phoneId: 1, userId: 1 });
      CONFIG.requests[ADD_PHONE]({ data: {}, userId: 1 });
      CONFIG.requests[PATCH_PHONE]({ data: {}, userId: 1, phoneId: 1 });
      CONFIG.requests[REMOVE_PASSPORT]({ personId: 1, passportId: 2 });
      CONFIG.requests[ADD_PASSPORT]({ personId: 1, data: {} });
      CONFIG.requests[PATCH_PASSPORT]({ personId: 1, passportId: 2, data: {} });
      CONFIG.requests[GET_PASSPORTS_FACADE]({ userId: 1 });
      CONFIG.requests[REMOVE_PASSPORT_FACADE]({ userId: 1, passportId: 2 });
      CONFIG.requests[CREATE_PASSPORT_FACADE]({ userId: 1, data: {} });
      CONFIG.requests[PATCH_PASSPORT_FACADE]({
        userId: 1,
        passportId: 1,
        data: {},
      });
      CONFIG.requests[ADD_MEDICAL]({ personId: 1, data: {} });
      CONFIG.requests[PATCH_MEDICAL]({ personId: 1, medicalId: 2, data: {} });
      CONFIG.requests[REMOVE_MEDICAL]({ personId: 1, medicalId: 2 });
      CONFIG.requests[ADD_DIETARY]({ personId: 1, data: {} });
      CONFIG.requests[PATCH_DIETARY]({ personId: 1, dietaryId: 2, data: {} });
      CONFIG.requests[REMOVE_DIETARY]({ personId: 1, dietaryId: 2 });
      CONFIG.requests[ADD_STUDENT_DETAIL]({ personId: 1, data: {} });
      CONFIG.requests[PATCH_STUDENT_DETAIL]({
        personId: 1,
        studentDetailId: 2,
        data: {},
      });
      CONFIG.requests[REMOVE_STUDENT_DETAIL]({
        personId: 1,
        studentDetailId: 2,
      });

      CONFIG.requests[ADD_INSURANCE_POLICY]({ personId: 1, data: {} });
      CONFIG.requests[PATCH_INSURANCE_POLICY]({ personId: 1, id: 2, data: {} });
      CONFIG.requests[REMOVE_INSURANCE_POLICY]({ personId: 1, id: 2 });

      expect(requests.fetchWithAuthorisation).toBeCalled();
      expect(requests.fetchWithAuthorisation.mock.calls).toMatchSnapshot();
    });
  });

  describe('onSuccess', () => {
    describe('PATCH_PERSON_FACADE', () => {
      it('should have array of functions that returns a particular shape', () => {
        const successFunc = CONFIG.onSuccess[PATCH_PERSON_FACADE];

        expect(
          successFunc[0]({
            result: {
              photo: {
                url: 'url',
                x: 1,
                y: 1,
                width: 1,
                height: 1,
                scale: 1,
                rotate: 1,
              },
            },
          }),
        ).toMatchSnapshot();
      });
      it('should return a particular shape of object if photo is not existing in result', () => {
        const successFunc = CONFIG.onSuccess[PATCH_PERSON_FACADE];

        expect(
          successFunc[0]({
            result: {},
          }),
        ).toMatchSnapshot();
      });
    });
  });

  describe('setValue', () => {
    it('should exists', () => {
      expect(typeof CONFIG.setValue).toBe('object');
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof CONFIG.value).toBe('object');
    });
  });
});
