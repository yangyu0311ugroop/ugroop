import { CONFIG } from '../config';

describe('ShowMore/config.js', () => {
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

    describe('folderChildrenArray', () => {
      it('should have keyPath', () => {
        expect(
          CONFIG.value.folderChildrenArrayLength.keyPath({ folderId: 1 }),
        ).toEqual(['nodeStore', 'nodes', 1, 'calculated', 'sortedIds']);
      });
      it('should have getter that return sortedIds length if it is array', () => {
        const sortedIds = [1, 2];
        expect(
          CONFIG.value.folderChildrenArrayLength.getter(sortedIds),
        ).toEqual(2);
      });
      it('should have getter that return 0 if sorted ids is not array', () => {
        const sortedIds = 'bacon and eggs';
        expect(
          CONFIG.value.folderChildrenArrayLength.getter(sortedIds),
        ).toEqual(0);
      });
      it('should return 0 if id is null', () => {
        const mockFolder = {
          1: { children: [1, 2] },
        };
        const expected = 0;
        const actual = CONFIG.value.folderChildrenArrayLength.getter(
          null,
          mockFolder,
        );
        expect(actual).toEqual(expected);
      });
    });

    describe('currResultCount', () => {
      describe('getter', () => {
        it('should return 0 if currResultCount is null', () => {
          const actual = CONFIG.value.currResultCount.getter();
          expect(actual).toBe(0);
        });
        it('should return 9 if currResultCount is divisible by 9', () => {
          const actual = CONFIG.value.currResultCount.getter(18);
          expect(actual).toBe(9);
        });
      });
    });
  });
});
