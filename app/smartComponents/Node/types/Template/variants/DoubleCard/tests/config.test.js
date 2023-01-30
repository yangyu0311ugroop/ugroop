import { CONFIG, IS_FEATURE_TOUR } from '../config';

describe('Card/config.js', () => {
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
  });

  describe('IS_FEATURE_TOUR()', () => {
    it('should IS_FEATURE_TOUR', () => {
      expect(IS_FEATURE_TOUR.cacheKey({ id: 2233 })).toMatchSnapshot();
      expect(IS_FEATURE_TOUR.props({ id: 2233 })).toBe(2233);
      expect(IS_FEATURE_TOUR.getter()).toBe(undefined);
      expect(IS_FEATURE_TOUR.getter({ 1: 1, 2233: 2233 }, 2233)).toBe(true);
    });
  });
});
