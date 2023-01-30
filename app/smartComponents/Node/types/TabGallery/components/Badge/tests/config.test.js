import { CONFIG } from '../config';

describe('Card/config.js', () => {
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
      expect(CONFIG.value.isDateSet({ dayId: 1 })).toEqual([
        'nodeStore',
        'nodes',
        1,
        'calculated',
        'time',
        'start',
        'real',
      ]);
    });
  });
});
