import { USER_STORE_SELECTORS } from 'datastore/userStore/selectors';
import { CONFIG } from '../config';

describe('PersonalInfo/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG).toBe('object');
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

    describe('firstName', () => {
      it('should return firstName', () => {
        expect(CONFIG.value.firstName({ userId: 111 })).toEqual(
          USER_STORE_SELECTORS.firstName({ id: 111 }),
        );
      });
    });

    describe('lastName', () => {
      it('should return lastName', () => {
        expect(CONFIG.value.lastName({ userId: 111 })).toEqual(
          USER_STORE_SELECTORS.lastName({ id: 111 }),
        );
      });
    });

    describe('knownAs', () => {
      it('should return knownAs', () => {
        expect(CONFIG.value.knownAs({ userId: 111 })).toEqual(
          USER_STORE_SELECTORS.knownAs({ id: 111 }),
        );
      });
    });

    describe('email', () => {
      it('should return email', () => {
        expect(CONFIG.value.email({ userId: 111 })).toEqual(
          USER_STORE_SELECTORS.email({ id: 111 }),
        );
      });
    });

    describe('secondaryEmail', () => {
      it('should return secondaryEmail', () => {
        expect(CONFIG.value.secondaryEmail({ userId: 111 })).toEqual(
          USER_STORE_SELECTORS.secondaryEmail({ id: 111 }),
        );
      });
    });

    describe('gender', () => {
      it('should return gender', () => {
        expect(CONFIG.value.gender({ userId: 111 })).toEqual(
          USER_STORE_SELECTORS.gender({ id: 111 }),
        );
      });
    });

    describe('birthDate', () => {
      it('should return birthDate', () => {
        expect(CONFIG.value.birthDate({ userId: 111 })).toEqual(
          USER_STORE_SELECTORS.birthDate({ id: 111 }),
        );
      });
    });

    describe('birthPlace', () => {
      it('should return birthPlace', () => {
        expect(CONFIG.value.birthPlace({ userId: 111 })).toEqual(
          USER_STORE_SELECTORS.birthPlace({ id: 111 }),
        );
      });
    });

    describe('insurancePolicy', () => {
      it('should return insurancePolicy', () => {
        expect(CONFIG.value.insurancePolicy({ userId: 111 })).toEqual(
          USER_STORE_SELECTORS.insurancePolicy({ id: 111 }),
        );
      });
    });

    describe('phones', () => {
      it('should return phones', () => {
        expect(CONFIG.value.phones({ userId: 111 })).toEqual(
          USER_STORE_SELECTORS.phones({ id: 111 }),
        );
      });
    });

    describe('medicals', () => {
      it('should return medicals', () => {
        expect(CONFIG.value.medicals({ userId: 111 })).toEqual(
          USER_STORE_SELECTORS.medicals({ id: 111 }),
        );
      });
    });

    describe('dietaries', () => {
      it('should return dietaries', () => {
        expect(CONFIG.value.dietaries({ userId: 111 })).toEqual(
          USER_STORE_SELECTORS.dietaries({ id: 111 }),
        );
      });
    });
  });
});
