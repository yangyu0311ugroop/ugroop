import { USER_STORE_SELECTORS } from 'datastore/userStore/selectors';
import { CONFIG } from '../config';

describe('Name/config.js', () => {
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
      it('should firstName', () => {
        expect(CONFIG.value.firstName({ userId: 123 })).toEqual(
          USER_STORE_SELECTORS.firstName({ id: 123 }),
        );
      });
    });

    describe('lastName', () => {
      it('should lastName', () => {
        expect(CONFIG.value.lastName({ userId: 123 })).toEqual(
          USER_STORE_SELECTORS.lastName({ id: 123 }),
        );
      });
    });

    describe('knownAs', () => {
      it('should knownAs', () => {
        expect(CONFIG.value.knownAs({ userId: 123 })).toEqual(
          USER_STORE_SELECTORS.knownAs({ id: 123 }),
        );
      });
    });
  });
});
