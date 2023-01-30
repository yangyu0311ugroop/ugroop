import { ASC, DESC, SORT_FILTERS } from 'appConstants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import dropRight from 'lodash/dropRight';
import takeRight from 'lodash/takeRight';
import zip from 'lodash/zip';

export const GET_KEYPATH = {
  value: {
    ratingKeyPath: {
      getter: ({ filter }) => {
        switch (filter) {
          case SORT_FILTERS.LATEST:
          case SORT_FILTERS.OLDEST: {
            return NODE_STORE_SELECTORS.createdAt;
          }
          case SORT_FILTERS.HIGHEST:
          case SORT_FILTERS.LOWEST: {
            return NODE_STORE_SELECTORS.rating;
          }
          default: {
            return NODE_STORE_SELECTORS.createdAt;
          }
        }
      },
    },
    ratingOrder: {
      getter: ({ filter }) => {
        switch (filter) {
          case SORT_FILTERS.LATEST:
          case SORT_FILTERS.HIGHEST: {
            return ASC;
          }

          case SORT_FILTERS.OLDEST:
          case SORT_FILTERS.LOWEST: {
            return DESC;
          }
          default: {
            return ASC;
          }
        }
      },
    },
  },
};

export const CONFIG = {
  value: {
    filteredRatings: {
      keyPath: ({ ratingKeyPath, ratings }) =>
        ratings.map(ratingId => ratingKeyPath({ id: ratingId })),
      cacheKey: ({ filter, ratingOrder, ratings }) =>
        `node.filterRatings.${
          ratings ? ratings.toString() : 'null'
        }.${filter}.${ratingOrder}`,
      props: [({ ratings }) => ratings, ({ ratingOrder }) => ratingOrder],
      getter: (...args) => {
        const rates = dropRight(args, 2);
        const [ratings, ratingOrder] = takeRight(args, 2);
        const ratingsRate = zip(rates, ratings);
        const SORT_BASIS_INDEX = 0;

        if (ratingOrder === ASC) {
          const sorted = ratingsRate.sort((a, b) =>
            Number.isInteger(a[SORT_BASIS_INDEX]) &&
            Number.isInteger(b[SORT_BASIS_INDEX])
              ? b[SORT_BASIS_INDEX] - a[SORT_BASIS_INDEX]
              : b[SORT_BASIS_INDEX].localeCompare(a[SORT_BASIS_INDEX]),
          );

          return sorted.map(item => item[1]);
        }

        const sorted = ratingsRate.sort((a, b) =>
          Number.isInteger(a[SORT_BASIS_INDEX]) &&
          Number.isInteger(b[SORT_BASIS_INDEX])
            ? a[SORT_BASIS_INDEX] - b[SORT_BASIS_INDEX]
            : a[SORT_BASIS_INDEX].localeCompare(b[SORT_BASIS_INDEX]),
        );

        return sorted.map(item => item[1]);
      },
    },
  },
  setValue: {},
};
