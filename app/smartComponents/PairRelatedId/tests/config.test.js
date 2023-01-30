import { CONFIG } from '../config';

describe('PairRelatedId/config.js', () => {
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

    describe('relatedIds', () => {
      describe('keyPath', () => {
        it('should return array of keyPath if all params are present', () => {
          const sourcePath = jest.fn(() => 1);
          const result = CONFIG.value.relatedIds.keyPath({
            ids: [[1], [2], [3]],
            sourcePath,
          });
          expect(result).toEqual([1, 1, 1]);
        });
        it('should return array of keyPath if all ids are not array of array are present', () => {
          const sourcePath = jest.fn(() => 1);
          const result = CONFIG.value.relatedIds.keyPath({
            ids: [1, 2, 3],
            sourcePath,
          });
          expect(result).toEqual([1, 1, 1]);
        });

        it('should return empty array if ids is undefined', () => {
          const sourcePath = jest.fn(() => 1);
          const result = CONFIG.value.relatedIds.keyPath({
            sourcePath,
          });
          expect(result).toEqual([]);
        });
      });

      describe('cacheKey', () => {
        it('should return a specific cacheKey if all props are available', () => {
          const result = CONFIG.value.relatedIds.cacheKey({
            ids: [1, 2, 3],
            cacheKey: 'caching',
          });
          expect(result).toBe('pairRelatedId.caching.1,2,3');
        });

        it('should return a specific cacheKey if ids are undefined', () => {
          const result = CONFIG.value.relatedIds.cacheKey({
            cacheKey: 'caching',
          });
          expect(result).toBe('pairRelatedId.caching.null');
        });
      });

      describe('props', () => {
        it('should return the ids prop', () => {
          expect(CONFIG.value.relatedIds.props({ ids: [] })).toEqual([]);
        });
      });

      describe('getter', () => {
        it('should return array of ids with its related id', () => {
          const result = CONFIG.value.relatedIds.getter(1, 2, 3, 4, [
            [1],
            [2],
            [3],
            [4],
          ]);
          expect(result).toEqual([[1, 1], [2, 2], [3, 3], [4, 4]]);
        });

        it('should pair if ids are just primitive value', () => {
          const result = CONFIG.value.relatedIds.getter(1, 2, [1, 2]);
          const expected = [[1, 1], [2, 2]];
          expect(result).toEqual(expected);
        });
      });
    });
  });
});
