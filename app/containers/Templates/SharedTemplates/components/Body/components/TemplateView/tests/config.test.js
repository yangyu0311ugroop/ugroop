import { CONFIG } from '../config';

describe('TemplateView/config.js', () => {
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
      describe('getter', () => {
        it('should return array of objects if id exist', () => {
          const sampleFolder = {
            1: {
              children: [2, 3],
            },
          };
          const sampleChildren = {
            2: { id: 2 },
            3: { id: 3 },
          };
          const sampleId = 1;
          const expected = [2, 3];
          const actual = CONFIG.value.folderChildrenArray.getter(
            sampleId,
            sampleFolder,
            sampleChildren,
          );
          expect(actual).toEqual(expected);
        });
        it('should return empty array if id did not exist', () => {
          const sampleFolder = {
            1: {
              children: [2, 3],
            },
          };
          const sampleChildren = {
            2: { id: 2 },
            3: { id: 3 },
          };
          const sampleId = null;
          const expected = [];
          const actual = CONFIG.value.folderChildrenArray.getter(
            sampleId,
            sampleFolder,
            sampleChildren,
          );
          expect(actual).toEqual(expected);
        });
      });
    });

    describe('search', () => {
      describe('getter', () => {
        it('should call get of the passed param to it', () => {
          const actual = CONFIG.value.search.getter({ get: jest.fn(() => 4) });
          expect(actual).toBe(4);
        });
      });
    });

    describe('pathname', () => {
      describe('getter', () => {
        it('should call get of the passed param to it', () => {
          const actual = CONFIG.value.pathname.getter({
            get: jest.fn(() => 4),
          });
          expect(actual).toBe(4);
        });
      });
    });
  });
});
