import { CONFIG, CONFIG2 } from '../config';

describe('AboutCard/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG).toBe('object');
    });
  });

  describe('setValue', () => {
    it('should exists', () => {
      expect(typeof CONFIG2.setValue).toBe('object');
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof CONFIG.value).toBe('object');
    });
  });
  describe('value', () => {
    it('should exists', () => {
      expect(typeof CONFIG2.value).toBe('object');
    });
  });
  describe('value.orgUserIds', () => {
    it('should exists', () => {
      expect(typeof CONFIG2.value.orgUserIds({ me: 1 })).toBe('object');
    });
  });
});
