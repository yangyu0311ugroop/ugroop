import { FILE_HELPERS } from '..';

describe('FILE_HELPERS', () => {
  it('exists', () => {
    expect(FILE_HELPERS).toBeDefined();
  });

  describe('FILE_HELPERS.genId()', () => {
    it('generate number', () => {
      expect(typeof FILE_HELPERS.genId()).toBe('number');
    });
  });

  describe('FILE_HELPERS.reduceDrop()', () => {
    it('should reduce', () => {
      FILE_HELPERS.genId = jest.fn(() => 1123);

      expect(
        FILE_HELPERS.reduceDrop(
          {
            droppedFiles: {},
            droppedIds: [],
          },
          'file',
        ),
      ).toMatchSnapshot();
    });
  });

  describe('FILE_HELPERS.normaliseDrop()', () => {
    it('should reduce', () => {
      FILE_HELPERS.reduceDrop = jest.fn(() => 1123);

      expect(FILE_HELPERS.normaliseDrop([1])).toBe(1123);
    });
  });
});
