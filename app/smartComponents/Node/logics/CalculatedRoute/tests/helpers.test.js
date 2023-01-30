import { ROUTE_CACHE } from '../helpers';

describe('CalculatedPlaceIds/helpers.js', () => {
  ROUTE_CACHE.fetchedRoutes = {
    1: { raw: [1, 2, 3] },
  };
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof ROUTE_CACHE).toBe('object');
    });
  });

  describe('ROUTE_CACHE get', () => {
    it('should get', () => {
      expect(ROUTE_CACHE.get('test')).toEqual('test');
    });
  });

  describe('ROUTE_CACHE set get', () => {
    it('should set get', () => {
      ROUTE_CACHE.set('test', 'new test');

      expect(ROUTE_CACHE.get('test')).toEqual('new test');
    });
  });

  describe('ROUTE_CACHE merge', () => {
    it('should merge', () => {
      ROUTE_CACHE.merge('testMerge', { content: 'merge' });

      expect(ROUTE_CACHE.get('testMerge')).toEqual({
        id: 2233,
        content: 'merge',
      });
    });
  });

  describe('ROUTE_CACHE delete', () => {
    it('should delete', () => {
      ROUTE_CACHE.delete('testMerge');

      expect(ROUTE_CACHE.get('testMerge')).toBe(undefined);
    });
  });

  describe('ROUTE_CACHE isValid', () => {
    it('should isValid false', () => {
      expect(ROUTE_CACHE.isValid()).toBe(false);
      expect(ROUTE_CACHE.isValid(123)).toBe(false);
      expect(ROUTE_CACHE.isValid('wrong')).toBe(false);
      expect(ROUTE_CACHE.isValid([])).toBe(false);
      expect(ROUTE_CACHE.isValid([1, undefined, 3])).toBe(false);
    });
    it('should isValid true', () => {
      expect(ROUTE_CACHE.isValid([1, 2, 3])).toBe(true);
    });
  });
});
