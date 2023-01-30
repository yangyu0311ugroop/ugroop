import { CONFIG } from '../config';

describe('ChecklistOptions/config.js', () => {
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
  });
  describe('isLoading', () => {
    it('isLoading should return true when all fetching are true', () => {
      expect(CONFIG.isLoading.isLoading.getter(true)).toEqual(true);
    });
  });
});
