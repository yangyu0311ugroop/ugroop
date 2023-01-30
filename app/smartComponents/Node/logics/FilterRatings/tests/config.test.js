import { ASC, DESC, SORT_FILTERS } from 'appConstants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { CONFIG, GET_KEYPATH } from '../config';

describe('GET_KEYPATH', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof GET_KEYPATH).toBe('object');
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof GET_KEYPATH.value).toBe('object');
    });

    describe('ratingKeyPath', () => {
      it('should return nodestore for created at if case is latest or oldest', () => {
        const result = GET_KEYPATH.value.ratingKeyPath.getter({
          filter: SORT_FILTERS.LATEST,
        });

        expect(NODE_STORE_SELECTORS.createdAt({ id: 1 })).toEqual(
          result({ id: 1 }),
        );
      });

      it('should return nodestore for created at as default', () => {
        const result = GET_KEYPATH.value.ratingKeyPath.getter({
          filter: 'qqqq',
        });

        expect(NODE_STORE_SELECTORS.createdAt({ id: 1 })).toEqual(
          result({ id: 1 }),
        );
      });

      it('should return nodestore for rating at if case is highest or lowest', () => {
        const result = GET_KEYPATH.value.ratingKeyPath.getter({
          filter: SORT_FILTERS.HIGHEST,
        });

        expect(NODE_STORE_SELECTORS.rating({ id: 1 })).toEqual(
          result({ id: 1 }),
        );
      });
    });

    describe('ratingOrder', () => {
      it('should return asc if filter is latest or highest', () => {
        const result = GET_KEYPATH.value.ratingOrder.getter({
          filter: SORT_FILTERS.LATEST,
        });

        expect(ASC).toEqual(result);
      });

      it('should return desc if filter is oldest or lowest', () => {
        const result = GET_KEYPATH.value.ratingOrder.getter({
          filter: SORT_FILTERS.OLDEST,
        });

        expect(DESC).toEqual(result);
      });

      it('should return asc as default', () => {
        const result = GET_KEYPATH.value.ratingOrder.getter({
          filter: 'qqqq',
        });

        expect(ASC).toEqual(result);
      });
    });
  });
});

describe('FilterRatings/config.js', () => {
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

    describe('filteredRatings', () => {
      describe('keyPath', () => {
        it('should return particular keypath shape', () => {
          const ratingKeyPath = NODE_STORE_SELECTORS.rating;
          const ratings = [1];

          const result = CONFIG.value.filteredRatings.keyPath({
            ratingKeyPath,
            ratings,
          });

          expect(result).toEqual([NODE_STORE_SELECTORS.rating({ id: 1 })]);
        });
      });

      describe('cacheKey', () => {
        it('should return a particular cacheKey if ratings is not null', () => {
          const props = {
            filter: SORT_FILTERS.LATEST,
            ratingOrder: ASC,
            ratings: [1, 2],
          };

          const result = CONFIG.value.filteredRatings.cacheKey(props);

          expect(result).toEqual(
            `node.filterRatings.1,2.${SORT_FILTERS.LATEST}.${ASC}`,
          );
        });

        it('should return a particular cacheKey if ratings is null', () => {
          const props = {
            filter: SORT_FILTERS.LATEST,
            ratingOrder: ASC,
            ratings: null,
          };

          const result = CONFIG.value.filteredRatings.cacheKey(props);

          expect(result).toEqual(
            `node.filterRatings.null.${SORT_FILTERS.LATEST}.${ASC}`,
          );
        });
      });
      describe('props', () => {
        it('should return array of functions that return specific attribute in props', () => {
          const props = {
            ratings: [1, 2],
            ratingOrder: ASC,
          };

          const result = CONFIG.value.filteredRatings.props[0](props);
          const result2 = CONFIG.value.filteredRatings.props[1](props);

          expect(result).toEqual([1, 2]);
          expect(result2).toEqual(ASC);
        });
      });
      describe('getter', () => {
        it('should return ratings by ascending order based on rating', () => {
          const ratings = [3, 1, 2];
          const ratingOrder = ASC;
          const rates = [5, 3, 4];
          const result = CONFIG.value.filteredRatings.getter(
            ...[...rates, ratings, ratingOrder],
          );

          expect(result).toEqual([3, 2, 1]);
        });

        it('should return ratings by ascending order based on rating and sort basis is not number', () => {
          const ratings = [3, 1, 2];
          const ratingOrder = ASC;
          const rates = ['a', 'b', 'c'];
          const result = CONFIG.value.filteredRatings.getter(
            ...[...rates, ratings, ratingOrder],
          );

          expect(result).toEqual([2, 1, 3]);
        });

        it('should return ratings by descending order based on rating and sort basis is not number', () => {
          const ratings = [3, 1, 2];
          const ratingOrder = DESC;
          const rates = ['a', 'b', 'c'];
          const result = CONFIG.value.filteredRatings.getter(
            ...[...rates, ratings, ratingOrder],
          );

          expect(result).toEqual([3, 1, 2]);
        });

        it('should return ratings by descending order based on rating', () => {
          const ratings = [3, 1, 2];
          const ratingOrder = DESC;
          const rates = [5, 3, 4];
          const result = CONFIG.value.filteredRatings.getter(
            ...[...rates, ratings, ratingOrder],
          );

          expect(result).toEqual([1, 2, 3]);
        });
      });
    });
  });
});
