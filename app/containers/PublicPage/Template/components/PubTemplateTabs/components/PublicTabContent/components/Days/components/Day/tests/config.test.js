import { NODE_STORE } from 'appConstants';
import { CONFIG } from '../config';
describe('Day/config.js', () => {
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
    it('content', () => {
      expect(CONFIG.value.content({ dayId: 1 })).toEqual([
        NODE_STORE,
        'nodes',
        1,
        'content',
      ]);
    });
    it('description', () => {
      expect(CONFIG.value.description({ dayId: 1 })).toEqual([
        NODE_STORE,
        'nodes',
        1,
        'customData',
        'description',
      ]);
    });
    it('icon', () => {
      expect(CONFIG.value.icon({ dayId: 1 })).toEqual([
        NODE_STORE,
        'nodes',
        1,
        'customData',
        'icon',
      ]);
    });
    it('placeId', () => {
      expect(CONFIG.value.placeId({ dayId: 1 })).toEqual([
        NODE_STORE,
        'nodes',
        1,
        'customData',
        'placeId',
      ]);
    });
    it('location', () => {
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
