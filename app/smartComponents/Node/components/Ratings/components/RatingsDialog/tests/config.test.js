import { CONFIG, FILTER_RATINGS_CONFIG } from '../config';

describe('RatingsDialog/config.js', () => {
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

    describe('userRatingId', () => {
      describe('getter', () => {
        it('should return first item in tuple if userRatingIds is array', () => {
          const result = CONFIG.value.userRatingId.getter({
            userRatingIds: [[1, 2]],
          });

          expect(result).toBe(1);
        });

        it('should return 0 if userRatingIds is not array', () => {
          const result = CONFIG.value.userRatingId.getter({
            userRatingIds: [null],
          });

          expect(result).toBe(0);
        });
      });
    });
  });
});

describe('FILTER_RATINGS_CONFIG', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof FILTER_RATINGS_CONFIG).toBe('object');
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof FILTER_RATINGS_CONFIG.value).toBe('object');
    });
  });
});
