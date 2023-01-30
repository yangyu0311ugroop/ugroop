import { USER_STORE_SELECTORS } from 'datastore/userStore/selectors';
import { CONFIG } from '../config';

describe('Email/config.js', () => {
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

    describe('email', () => {
      it('should email', () => {
        expect(CONFIG.value.email({ userId: 123 })).toEqual(
          USER_STORE_SELECTORS.email({ id: 123 }),
        );
      });
    });

    describe('secondaryEmail', () => {
      it('should secondaryEmail', () => {
        expect(CONFIG.value.secondaryEmail({ userId: 123 })).toEqual(
          USER_STORE_SELECTORS.secondaryEmail({ id: 123 }),
        );
      });
    });
  });
});
