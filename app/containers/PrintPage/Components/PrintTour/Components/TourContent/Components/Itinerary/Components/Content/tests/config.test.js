import { NODE_STORE } from 'appConstants';
import { CONFIG } from '../config';

describe('PrintTour/Day/Intinerary/config', () => {
  describe('CONFIG', () => {
    it('exists', () => {
      expect(CONFIG).toBeDefined();
    });
  });

  describe('#value', () => {
    it('contains required properties', () => {
      expect(CONFIG.value.content({ dayId: 1 })).toEqual([
        NODE_STORE,
        'nodes',
        1,
        'content',
      ]);
      expect(CONFIG.value.location({ dayId: 1 })).toEqual([
        NODE_STORE,
        'nodes',
        1,
        'customData',
        'location',
      ]);
    });
  });
});
