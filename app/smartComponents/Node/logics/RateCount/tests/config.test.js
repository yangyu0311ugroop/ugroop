import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { CONFIG, FILTER_RATE_COUNT } from '../config';

describe('RateCount/config.js', () => {
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

describe('FILTER_RATE_COUNT', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof FILTER_RATE_COUNT).toBe('object');
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof FILTER_RATE_COUNT.value).toBe('object');
    });

    describe('count', () => {
      describe('keyPath', () => {
        it('should return array of selectors', () => {
          const ratings = [1, 2];
          const result = FILTER_RATE_COUNT.value.count.keyPath({ ratings });

          expect(result).toEqual(
            ratings.map(rating => NODE_STORE_SELECTORS.rating({ id: rating })),
          );
        });

        it('should not crash if rating is undefined', () => {
          const result = FILTER_RATE_COUNT.value.count.keyPath({});

          expect(result).toEqual([]);
        });
      });

      describe('cacheKey', () => {
        it('should return a particular cacheKey string', () => {
          const ratings = [1];
          const result = FILTER_RATE_COUNT.value.count.cacheKey({
            ratings,
            rate: 1,
          });

          expect(result).toBe('node.filterRateCount.1.1.filter');
        });

        it('should not crash if ratings is not defined', () => {
          const result = FILTER_RATE_COUNT.value.count.cacheKey({});

          expect(result).toBe('node.filterRateCount..undefined.filter');
        });
      });

      describe('props', () => {
        it('should return ratings and rate', () => {
          const props = { ratings: [1], rate: 1 };
          const result = FILTER_RATE_COUNT.value.count.props.map(func =>
            func(props),
          );

          expect(result).toEqual([props.ratings, props.rate]);
        });
      });

      describe('getter', () => {
        it('should return the number of ratings based on the rating filter', () => {
          const args = [1, 2, 3, 1, 1, [1, 2, 3, 4, 5], 1];
          const result = FILTER_RATE_COUNT.value.count.getter(...args);

          expect(result).toEqual(3);
        });
      });
    });
  });
});
