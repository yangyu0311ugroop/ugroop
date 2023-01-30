import { NODE_STORE } from 'appConstants';
import { CONFIG } from '../config';
describe('Days/config.js', () => {
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
    it('days', () => {
      expect(CONFIG.value.days({ tabId: 1 })).toEqual([
        NODE_STORE,
        'nodes',
        1,
        'children',
      ]);
    });

    describe('sections getter', () => {
      it('should return sections', () => {
        expect(CONFIG.value.sections({ currentQueryDayId: 1 })).toEqual([
          NODE_STORE,
          'nodes',
          1,
          'children',
        ]);
      });
    });
  });
});
