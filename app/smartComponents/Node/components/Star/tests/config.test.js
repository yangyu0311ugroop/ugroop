import { CONFIG } from '../config';

describe('Star/config.js', () => {
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

    describe('starred()', () => {
      it('should starred()', () => {
        expect(CONFIG.value.starred.cacheKey({ id: 1123 })).toMatchSnapshot();
        expect(CONFIG.value.starred.props({ id: 1123 })).toBe(1123);
        expect(CONFIG.value.starred.getter(undefined, 1123)).toBe(false);
        expect(CONFIG.value.starred.getter([1123], 1123)).toBe(true);
      });
    });
  });
});
