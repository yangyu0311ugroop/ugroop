import { CONFIG } from '../config';

describe('LayoutControl/config.js', () => {
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
        it('should return value of get method returned by the param sent', () => {
          const actual = CONFIG.value.search.getter({ get: jest.fn(() => 4) });
          expect(actual).toBe(4);
        });
      });
    });

    describe('pathname', () => {
      describe('getter', () => {
        it('should return value of get method returned by the param sent', () => {
          const actual = CONFIG.value.pathname.getter({
            get: jest.fn(() => 4),
          });
          expect(actual).toBe(4);
        });
      });
    });
  });
});
