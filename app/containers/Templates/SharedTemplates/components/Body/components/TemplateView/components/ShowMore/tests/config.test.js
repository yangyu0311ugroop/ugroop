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

    describe('search', () => {
      describe('getter', () => {
        it('should return the search string', () => {
          const actual = CONFIG.value.search.getter({ get: jest.fn(() => 4) });
          expect(actual).toBe(4);
        });
      });
    });

    describe('pathname', () => {
      describe('getter', () => {
        it('should return the pathname string', () => {
          const actual = CONFIG.value.pathname.getter({
            get: jest.fn(() => 4),
          });
          expect(actual).toBe(4);
        });
      });
    });

    describe('currResultCount', () => {
      describe('getter', () => {
        it('should return 9 if currResultCount is divisible by 9', () => {
          const actual = CONFIG.value.currResultCount.getter(18);
          expect(actual).toBe(9);
        });
        it('should return 0 if currResultCount is not divisible by 9', () => {
          const actual = CONFIG.value.currResultCount.getter(7);
          expect(actual).toBe(0);
        });
      });
    });
  });
});
