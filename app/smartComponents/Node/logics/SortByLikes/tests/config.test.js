import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { CONFIG } from '../config';

describe('SortByLikes/config.js', () => {
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

    describe('sortedChildren', () => {
      describe('keyPath', () => {
        const result = CONFIG.value.sortedChildren.keyPath({ ids: [1, 2, 3] });

        expect(result).toEqual([
          NODE_STORE_SELECTORS.reactions({ id: 1 }),
          NODE_STORE_SELECTORS.reactions({ id: 2 }),
          NODE_STORE_SELECTORS.reactions({ id: 3 }),
        ]);
      });

      describe('cacheKey', () => {
        it('should return a particular cacheKey shape', () => {
          const result = CONFIG.value.sortedChildren.cacheKey({ ids: [1, 2] });

          expect(result).toEqual(`Node.sortByLikes.${[1, 2].toString()}`);
        });

        it('should return a particular cacheKey shape if ids is empty', () => {
          const result = CONFIG.value.sortedChildren.cacheKey({ ids: null });

          expect(result).toEqual(`Node.sortByLikes.null`);
        });
      });

      describe('props', () => {
        it('should return ids', () => {
          const ids = [1, 2];
          const result = CONFIG.value.sortedChildren.props({ ids });

          expect(result).toEqual(ids);
        });
      });

      describe('getter', () => {
        it('should return most reacted photo', () => {
          const args = [[], [1], null, [1, 2, 3]];
          const result = CONFIG.value.sortedChildren.getter(...args);

          expect(result).toEqual([2, 1, 3]);
        });
      });
    });
  });
});
