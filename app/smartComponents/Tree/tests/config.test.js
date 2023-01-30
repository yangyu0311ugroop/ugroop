import { CONFIG } from '../config';

describe('Tree/config.js', () => {
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

    describe('array', () => {
      it('should return a particular array shape if viewStore and viewPath exist', () => {
        expect(
          CONFIG.setValue.array({
            viewStore: 'viewStore',
            viewPath: 'viewPath',
          }),
        ).toEqual(['viewStore', 'viewPath']);
      });

      it('should return a particular array shape if viewStore and viewPath exist', () => {
        expect(
          CONFIG.setValue.array({
            viewStore: 'viewStore',
          }),
        ).toEqual(['viewStore', 'tree']);
      });
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof CONFIG.value).toBe('object');
    });

    describe('childIds', () => {
      describe('keyPath', () => {
        it('should return a particular selector path if selectors is function', () => {
          const mockSelector = ({ id }) => ['viewStore', id];
          const result = CONFIG.value.childIds.keyPath({
            selectors: mockSelector,
            id: 2,
          });
          expect(result).toEqual(mockSelector({ id: 2 }));
        });

        it('should return array of selectors if selectors are array function', () => {
          const mockSelector = ({ id }) => ['viewStore', id];
          const result = CONFIG.value.childIds.keyPath({
            selectors: [mockSelector, mockSelector],
            id: 2,
          });
          expect(result).toEqual([
            mockSelector({ id: 2 }),
            mockSelector({ id: 2 }),
          ]);
        });

        it('should return array of selectors if selectors are array of array', () => {
          const result = CONFIG.value.childIds.keyPath({
            selectors: [['viewStore', 1], ['viewStore', 2]],
            id: 2,
          });
          expect(result).toEqual([['viewStore', 1], ['viewStore', 2]]);
        });

        it('should return empty array if selectors are undefined', () => {
          const result = CONFIG.value.childIds.keyPath({
            id: 2,
          });
          expect(result).toEqual([]);
        });
      });
    });

    describe('cacheKey', () => {
      it('should return a particular cacheKey if selectors exist', () => {
        const result = CONFIG.value.childIds.cacheKey({
          viewStore: 'viewStore',
          selectors: [1, 2, 3],
          id: 5,
        });
        expect(result).toBe('viewStore.1,2,3.5.tree');
      });

      it('should return a particular cacheKey if selectors does not exist', () => {
        const result = CONFIG.value.childIds.cacheKey({
          viewStore: 'viewStore',
          id: 5,
        });
        expect(result).toBe('viewStore.null.5.tree');
      });
    });

    describe('props', () => {
      it('should only return null', () => {
        expect(CONFIG.value.childIds.props()).toEqual(null);
      });
    });

    describe('getter', () => {
      it('should union arguments passed to it', () => {
        const result = CONFIG.value.childIds.getter([1, 2], [2, 3]);
        expect(result).toEqual([1, 2, 3]);
      });
    });
  });
});
