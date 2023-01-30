import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { CONFIG, TOTAL_RATING_CONFIG } from '../config';

describe('CONFIG', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG).toBe('object');
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof CONFIG.value).toBe('object');
    });
  });
});

describe('TOTAL_RATING_CONFIG', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof TOTAL_RATING_CONFIG).toBe('object');
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof TOTAL_RATING_CONFIG.value).toBe('object');
    });

    describe('avg', () => {
      describe('keyPath', () => {
        it('should return array of selectors', () => {
          const ratings = [1, 2];
          const result = TOTAL_RATING_CONFIG.value.avg.keyPath({ ratings });

          expect(result).toEqual(
            ratings.map(rating => NODE_STORE_SELECTORS.rating({ id: rating })),
          );
        });

        it('should not crash if rating is undefined', () => {
          const result = TOTAL_RATING_CONFIG.value.avg.keyPath({});

          expect(result).toEqual([]);
        });
      });

      describe('cacheKey', () => {
        it('should return a particular cacheKey string', () => {
          const ratings = [1];
          const result = TOTAL_RATING_CONFIG.value.avg.cacheKey({ ratings });

          expect(result).toBe('node.totalRating.1.avgRating');
        });

        it('should not crash if ratings is not defined', () => {
          const result = TOTAL_RATING_CONFIG.value.avg.cacheKey({});

          expect(result).toBe('node.totalRating..avgRating');
        });
      });

      describe('props', () => {
        it('should return null', () => {
          expect(TOTAL_RATING_CONFIG.value.avg.props()).toEqual(null);
        });
      });

      describe('getter', () => {
        it('should return average of all rates taken', () => {
          const args = [1, 2, 3];
          const result = TOTAL_RATING_CONFIG.value.avg.getter(...args);

          expect(result).toBe(2);
        });

        it('should return 0 if result is NaN', () => {
          const args = [undefined, 1, 2];
          const result = TOTAL_RATING_CONFIG.value.avg.getter(...args);

          expect(result).toBe(0);
        });
      });
    });
  });
});
