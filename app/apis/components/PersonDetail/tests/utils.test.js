import { DATASTORE_UTILS } from 'datastore';
import {
  PERSON_DETAIL_UTILS,
  makeIsDefaultOne,
  chooseOneAsDefault,
} from '../utils';

describe('app/apis/components/PersonDetail/utils.js', () => {
  beforeAll(() => {
    DATASTORE_UTILS.upsertObject = jest.fn(() => 'upsertObject');
    DATASTORE_UTILS.removeObjectById = jest.fn(() => 'removeObjectById');
    DATASTORE_UTILS.removeItemsArray = jest.fn(() => 'removeItemsArray');
    DATASTORE_UTILS.upsertArray = jest.fn(() => 'upsertArray');
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('addPersonById', () => {
    it('should return particular object shape', () => {
      const result = PERSON_DETAIL_UTILS.addPersonById({
        id: 1,
        photo: {
          url: 'url',
          x: 1,
          y: 1,
        },
        phones: [
          {
            id: 2,
          },
        ],
      });
      expect(result).toMatchSnapshot();
    });
  });

  describe('addPeople', () => {
    it('should return particular object shape', () => {
      const result = PERSON_DETAIL_UTILS.addPeople({
        userId: 1,
        photo: {
          url: 'url',
          x: 1,
          y: 1,
        },
      });
      expect(result).toMatchSnapshot();
    });
  });

  describe('updatePeople', () => {
    it('should return a particular object shape', () => {
      const result = PERSON_DETAIL_UTILS.updatePeople(
        {
          userId: 1,
          photo: {
            url: 'url',
            x: 1,
            y: 1,
          },
          phones: [
            {
              id: 1,
              number: '2222',
              type: 'mobile',
            },
          ],
        },
        { oldPhoto: 'oldUrl' },
      );
      expect(result).toMatchSnapshot();
    });

    it('should return a particular object shape if no userId', () => {
      const result = PERSON_DETAIL_UTILS.updatePeople(
        {
          id: 1,
          nodeId: 222,
          photo: {
            url: 'url',
            x: 1,
            y: 1,
          },
          phones: [
            {
              id: 1,
              number: '2222',
              type: 'mobile',
            },
          ],
        },
        { oldPhoto: 'oldUrl' },
      );
      expect(result).toMatchSnapshot();
    });
  });

  describe('addPhone', () => {
    it('should return a particular object shape', () => {
      const samplePhone = {
        id: 2,
        number: '222-22-22',
        type: 'mobile',
      };

      const result = PERSON_DETAIL_UTILS.addPhone(samplePhone, { userId: 1 });
      expect(result).toMatchSnapshot();
    });
  });

  describe('updatePhone', () => {
    it('should return a particular object shape', () => {
      const samplePhone = {
        id: 1,
        number: '222',
        type: 'mobile',
      };

      const result = PERSON_DETAIL_UTILS.updatePhone(samplePhone);
      expect(result).toMatchSnapshot();
    });
  });

  describe('deletePhone', () => {
    it('should return a particular object shape', () => {
      const result = PERSON_DETAIL_UTILS.deletePhone(
        {},
        { userId: 1, phoneId: 1 },
      );
      expect(result).toMatchSnapshot();
    });
  });

  describe('getPassportsFacade', () => {
    it('should return a particular object shape', () => {
      const result = PERSON_DETAIL_UTILS.getPassportsFacade({}, { userId: 1 });
      expect(result).toMatchSnapshot();
    });
  });

  describe('addPassport', () => {
    it('should return a particular object shape', () => {
      const result = PERSON_DETAIL_UTILS.addPassport(
        {},
        { userId: 1, rawData: {} },
      );
      expect(result).toMatchSnapshot();
    });

    it('should return a particular object shape if birthDate and birthPlace are included', () => {
      const result = PERSON_DETAIL_UTILS.addPassport(
        {},
        {
          userId: 1,
          rawData: {
            birthDate: '03/14/1994',
            birthPlace: 'Manila',
          },
        },
      );
      expect(result).toMatchSnapshot();
    });
  });

  describe('patchPassportFacade', () => {
    it('should return a particular object shape', () => {
      const result = PERSON_DETAIL_UTILS.patchPassportFacade(
        {},
        { userId: 1, rawData: {} },
      );
      expect(result).toMatchSnapshot();
    });

    it('should return a particular object shape if birthDate and birthPlace are included', () => {
      const result = PERSON_DETAIL_UTILS.patchPassportFacade(
        {},
        {
          userId: 1,
          rawData: {
            birthDate: '03/14/1994',
            birthPlace: 'Manila',
          },
        },
      );
      expect(result).toMatchSnapshot();
    });
  });

  describe('removePassportFacade', () => {
    it('should return a particular object shape', () => {
      const result = PERSON_DETAIL_UTILS.removePassportFacade(
        {},
        { userId: 1, passportId: 1 },
      );
      expect(result).toMatchSnapshot();
    });
  });

  describe('makeIsDefaultOne', () => {
    let mockStore;
    beforeEach(() => {
      mockStore = {
        1: {
          id: 1,
          isDefault: true,
        },
        2: {
          id: 2,
          isDefault: false,
        },
        3: {
          id: 3,
          isDefault: false,
        },
      };
    });
    it('should make all defaults to false if the item to be updated is default is true', () => {
      const toBeInserted = {
        3: {
          id: 3,
          isDefault: true,
        },
      };
      const result = makeIsDefaultOne(toBeInserted)(mockStore);
      expect(result).toMatchSnapshot();
    });
    it('should not make all defaults to false if the item to be updated is default is false', () => {
      const toBeInserted = {
        3: {
          id: 3,
          isDefault: false,
        },
      };
      mockStore[3].isDefault = true;
      const result = makeIsDefaultOne(toBeInserted)(mockStore);
      expect(result).toMatchSnapshot();
    });

    it('should not make all defaults to false if the item to be inserted is default is false', () => {
      const toBeInserted = {
        4: {
          id: 4,
          isDefault: false,
        },
      };
      const result = makeIsDefaultOne(toBeInserted)(mockStore);
      expect(result).toMatchSnapshot();
    });

    it('should make all defaults to false if the item to be inserted is default is true', () => {
      const toBeInserted = {
        4: {
          id: 4,
          isDefault: true,
        },
      };
      const result = makeIsDefaultOne(toBeInserted)(mockStore);
      expect(result).toMatchSnapshot();
    });
  });

  describe('chooseOneAsDefault', () => {
    it('should return the tempStore if keys.length is 0 (which means no items in the store)', () => {
      const result = chooseOneAsDefault(1)({});
      expect(result).toEqual({});
    });

    it('should filter out undefined and item with same id to be deleted and make the recent as default', () => {
      const mockStore = {
        1: {
          isDefault: true,
        },
        2: {
          isDefault: false,
        },
        undefined,
      };
      const result = chooseOneAsDefault(1)(mockStore);
      expect(result).toEqual({
        1: {
          isDefault: true,
        },
        2: {
          isDefault: true,
        },
        undefined,
      });
    });

    it('should not make any changes if the last item is to be deleted', () => {
      const mockStore = {
        1: {
          isDefault: true,
        },
        undefined,
      };
      const result = chooseOneAsDefault(1)(mockStore);
      expect(result).toEqual({
        1: {
          isDefault: true,
        },
        undefined,
      });
    });
  });

  describe('removePassport', () => {
    it('should return a particular object shape', () => {
      const result = PERSON_DETAIL_UTILS.removePassport(
        {},
        { personId: 1, passportId: 2, userId: 3 },
      );
      expect(result).toMatchSnapshot();
    });

    it('should return a particular object shape with no userId', () => {
      const result = PERSON_DETAIL_UTILS.removePassport(
        {},
        { personId: 1, passportId: 2 },
      );
      expect(result).toMatchSnapshot();
    });
  });

  describe('patchPassport', () => {
    it('should return a particular object shape', () => {
      const result = PERSON_DETAIL_UTILS.patchPassport({});
      expect(result).toMatchSnapshot();
    });
  });

  describe('createPassportFacade', () => {
    it('should return a particular object shape', () => {
      const result = PERSON_DETAIL_UTILS.createPassportFacade(
        {},
        {
          userId: 3,
          rawData: { birthPlace: 'birthPlace', birthDate: 'birthDate' },
        },
      );
      expect(result).toMatchSnapshot();
    });

    it('should return a particular object shape with no birthDate', () => {
      const result = PERSON_DETAIL_UTILS.createPassportFacade(
        {},
        {
          userId: 3,
          rawData: {},
        },
      );
      expect(result).toMatchSnapshot();
    });
  });

  describe('addMedical', () => {
    it('should return a particular object shape', () => {
      const result = PERSON_DETAIL_UTILS.addMedical({});
      expect(result).toMatchSnapshot();
    });
  });

  describe('patchMedical', () => {
    it('should return a particular object shape', () => {
      const result = PERSON_DETAIL_UTILS.patchMedical({});
      expect(result).toMatchSnapshot();
    });
  });

  describe('removeMedical', () => {
    it('should return a particular object shape', () => {
      const result = PERSON_DETAIL_UTILS.removeMedical(
        {},
        { personId: 1, medicalId: 2 },
      );
      expect(result).toMatchSnapshot();
    });
  });

  describe('addDietary', () => {
    it('should return a particular object shape', () => {
      const result = PERSON_DETAIL_UTILS.addDietary({});
      expect(result).toMatchSnapshot();
    });
  });

  describe('patchDietary', () => {
    it('should return a particular object shape', () => {
      const result = PERSON_DETAIL_UTILS.patchDietary({});
      expect(result).toMatchSnapshot();
    });
  });

  describe('removeDietary', () => {
    it('should return a particular object shape', () => {
      const result = PERSON_DETAIL_UTILS.removeDietary(
        {},
        { personId: 1, dietaryId: 2 },
      );
      expect(result).toMatchSnapshot();
    });
  });

  describe('addStudentDetail', () => {
    it('should return a particular object shape', () => {
      const result = PERSON_DETAIL_UTILS.addStudentDetail({});
      expect(result).toMatchSnapshot();
    });
  });

  describe('patchStudentDetail', () => {
    it('should return a particular object shape', () => {
      const result = PERSON_DETAIL_UTILS.patchStudentDetail({});
      expect(result).toMatchSnapshot();
    });
  });

  describe('removeStudentDetail', () => {
    it('should return a particular object shape', () => {
      const result = PERSON_DETAIL_UTILS.removeStudentDetail(
        {},
        { personId: 1, studentDetailId: 2 },
      );
      expect(result).toMatchSnapshot();
    });
  });

  describe('addInsurancePolicy', () => {
    it('should return a particular object shape', () => {
      const result = PERSON_DETAIL_UTILS.addInsurancePolicy({
        body: { insurancePolicy: {} },
      });
      expect(result).toMatchSnapshot();
    });
  });

  describe('patchInsurancePolicy', () => {
    it('should return a particular object shape', () => {
      const result = PERSON_DETAIL_UTILS.patchInsurancePolicy({
        body: { insurancePolicy: {} },
      });
      expect(result).toMatchSnapshot();
    });
  });

  describe('removeInsurancePolicy', () => {
    it('should return a particular object shape', () => {
      const result = PERSON_DETAIL_UTILS.removeInsurancePolicy(
        {},
        { personId: 1, id: 2 },
      );
      expect(result).toMatchSnapshot();
    });
  });
});
