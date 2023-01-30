import { NODE_STORE } from 'appConstants';
import { CONFIG, DAY_CONFIG, NORMALISED_DAYS_CONFIG } from '../config';

describe('TourContent/config', () => {
  describe('CONFIG', () => {
    it('exists', () => {
      expect(CONFIG).toBeDefined();
    });
  });
  describe('DAY_CONFIG', () => {
    it('should have keyPath if there are dayIds', () => {
      const dayIds = [1, 2];
      const mapped = [['nodeStore', 'nodes', 1], ['nodeStore', 'nodes', 2]];
      expect(DAY_CONFIG.value.days.keyPath({ dayIds })).toEqual(mapped);
    });
    it('should return empty array if there are no dayIds', () => {
      const dayIds = null;
      const mapped = [];
      expect(DAY_CONFIG.value.days.keyPath({ dayIds })).toEqual(mapped);
    });
    it('should have cacheKey if there are dayIds', () => {
      const dayIds = [1, 2];
      expect(DAY_CONFIG.value.days.cacheKey({ dayIds })).toEqual(
        `PrintTour.TourContent.days.${dayIds.toString()}.days`,
      );
    });
    it('should have cacheKey if there are no dayIds', () => {
      const dayIds = null;
      expect(DAY_CONFIG.value.days.cacheKey({ dayIds })).toEqual(
        `PrintTour.TourContent.days.${null}.days`,
      );
    });
    it('should have props that are null', () => {
      expect(DAY_CONFIG.value.days.props()).toEqual(null);
    });
    it('should have args', () => {
      const args = [{ val: 1 }];
      expect(DAY_CONFIG.value.days.getter(...args)).toEqual([{ val: 1 }]);
    });
  });
  describe('NORMALISED_DAYS_CONFIG', () => {
    it('should return normalised days if there are days', () => {
      const days = [
        { content: '1', id: 1 },
        { content: '2', id: 2 },
        { content: '3', id: 3 },
      ];
      const returned = {
        1: { content: '1', id: 1 },
        2: { content: '2', id: 2 },
        3: { content: '3', id: 3 },
      };

      expect(
        NORMALISED_DAYS_CONFIG.value.normalisedDays.getter({ days }),
      ).toEqual(returned);
    });
    it('should return normalised days if there are no days', () => {
      const days = [];

      expect(
        NORMALISED_DAYS_CONFIG.value.normalisedDays.getter({ days }),
      ).toEqual(undefined);
    });
  });
  describe('value', () => {
    it('value.dayIds.keyPath', () => {
      expect(CONFIG.value.dayIds({ tabId: 123 })).toEqual([
        NODE_STORE,
        'nodes',
        123,
        'children',
      ]);
    });
  });
});
