import { CONFIG } from '../config';

describe('config.js', () => {
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
    it('should exists', () => {
      expect(typeof CONFIG.value.content({ targetTourId: 1 })).toBe('object');
    });
    it('should exists', () => {
      expect(typeof CONFIG.value.sectionIds({ tabId: 1 })).toBe('object');
    });
    it('should exists', () => {
      expect(typeof CONFIG.value.targetTabIds({ templateId: 1 })).toBe(
        'object',
      );
    });
    it('should exists', () => {
      expect(typeof CONFIG.value.sourceTabIds({ templateId: 1 })).toBe(
        'object',
      );
    });
    it('should exists', () => {
      expect(typeof CONFIG.value.visibleTabIds({ targetTourId: 1 })).toBe(
        'object',
      );
    });
  });
});
