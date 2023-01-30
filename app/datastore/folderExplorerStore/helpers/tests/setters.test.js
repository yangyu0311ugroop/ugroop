import FolderExplorerSetter from '../setters';

describe('FolderExplorerSetter', () => {
  describe('moveChildren', () => {
    it('should return store if destination does not exist', () => {
      expect(FolderExplorerSetter.moveChildren(1, 2)()).toEqual({});
    });
    it('should return new store if destination exist', () => {
      expect(
        FolderExplorerSetter.moveChildren(1, 2)({
          1: {
            id: 1,
          },
          2: {
            children: [],
          },
        }),
      ).toEqual({
        1: {
          id: 1,
        },
        2: {
          children: [
            {
              id: 1,
            },
          ],
        },
      });
    });
  });

  describe('copyChildren', () => {
    it('should return store if destination does not exist', () => {
      expect(FolderExplorerSetter.copyChildren({ id: 1 }, 2)()).toEqual({});
    });
    it('should return new store if destination exist', () => {
      expect(
        FolderExplorerSetter.copyChildren({ id: 1 }, 2)({
          2: {
            children: [],
          },
        }),
      ).toEqual({
        2: {
          children: [{ id: 1 }],
        },
      });
    });
  });
});
