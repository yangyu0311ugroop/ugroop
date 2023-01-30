import { CONFIG, CONFIG2 } from '../config';

describe('Dashboard/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG).toBe('object');
    });
  });
  describe('Smoke Test CONFIG2', () => {
    it('should exists', () => {
      expect(typeof CONFIG2).toBe('object');
    });
  });
  describe('value', () => {
    it('should exists', () => {
      expect(typeof CONFIG2.value).toBe('object');
    });
    it('should call disableRYI', () => {
      expect(CONFIG2.value.disableRYI({ templateId: 1 })).toEqual([
        'nodeStore',
        'nodes',
        1,
        'disableRYI',
      ]);
    });
  });
});
