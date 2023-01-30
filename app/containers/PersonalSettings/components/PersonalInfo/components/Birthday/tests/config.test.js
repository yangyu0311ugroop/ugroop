import { USER_STORE_SELECTORS } from 'datastore/userStore/selectors';
import { CONFIG } from '../config';

describe('Birthday/config.js', () => {
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

    describe('birthPlace', () => {
      it('should return birthPlace', () => {
        expect(CONFIG.value.birthPlace({ userId: 111 })).toEqual(
          USER_STORE_SELECTORS.birthPlace({ id: 111 }),
        );
      });
    });
  });
});
