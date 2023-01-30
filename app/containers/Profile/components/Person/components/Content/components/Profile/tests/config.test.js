import { USER_STORE_SELECTORS } from 'datastore/userStore/selectors';
import { CONFIG } from '../config';

describe('Profile/config.js', () => {
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

    it('should have personId', () => {
      expect(CONFIG.value.personId({ id: 1 })).toEqual(
        USER_STORE_SELECTORS.id({ userId: 1 }),
      );
    });
  });
});
