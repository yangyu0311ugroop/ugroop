import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { CONFIG, GET_EVENT_RATINGS, GET_EVENT_USER_RATINGS } from '../config';

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

describe('GET_EVENT_RATINGS', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof GET_EVENT_RATINGS).toBe('object');
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof GET_EVENT_RATINGS.value).toBe('object');
    });
  });
});

describe('GET_EVENT_USER_RATINGS', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof GET_EVENT_USER_RATINGS).toBe('object');
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof GET_EVENT_USER_RATINGS.value).toBe('object');
    });

    describe('userRatingIds', () => {
      describe('keyPath', () => {
        it('should return array of selectors', () => {
          const result = GET_EVENT_USER_RATINGS.value.userRatingIds.keyPath({
            ratings: [1],
          });

          expect(result).toEqual([NODE_STORE_SELECTORS.createdBy({ id: 1 })]);
        });

        it('should not break if ratings is undefined', () => {
          const result = GET_EVENT_USER_RATINGS.value.userRatingIds.keyPath({});

          expect(result).toEqual([]);
        });
      });

      describe('cacheKey', () => {
        it('should return a particular cacheKey', () => {
          const result = GET_EVENT_USER_RATINGS.value.userRatingIds.cacheKey({
            ratings: [1],
            userId: 1,
          });

          expect(result).toBe('nodes.1.hasRatings.1');
        });

        it('should not break if ratings and userId were undefined', () => {
          const result = GET_EVENT_USER_RATINGS.value.userRatingIds.cacheKey(
            {},
          );

          expect(result).toBe('nodes..hasRatings.0');
        });
      });

      describe('props', () => {
        it('should return ratings and userId props', () => {
          const props = {
            ratings: [1],
            userId: 1,
          };
          const result = GET_EVENT_USER_RATINGS.value.userRatingIds.props.map(
            func => func(props),
          );

          expect(result).toEqual([props.ratings, props.userId]);
        });
      });

      describe('getter', () => {
        it('should return all ratings by a particular user', () => {
          const args = [1, 2, 3, 4, [1, 2, 2, 2], 1];
          const result = GET_EVENT_USER_RATINGS.value.userRatingIds.getter(
            ...args,
          );

          expect(result).toEqual([[1, 1]]);
        });
      });
    });
  });
});
