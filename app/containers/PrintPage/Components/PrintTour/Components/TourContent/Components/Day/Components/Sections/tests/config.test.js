import { NODE_STORE } from 'appConstants';
import { CONFIG } from '../config';

describe('Sections/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG).toBe('object');
    });
  });
  describe('value', () => {
    it('should exists', () => {
      expect(typeof CONFIG.value).toBe('object');
    });
    it('sections', () => {
      expect(CONFIG.value.sectionIds({ dayId: 1 })).toEqual([
        NODE_STORE,
        'nodes',
        1,
        'children',
      ]);
    });
  });
});
