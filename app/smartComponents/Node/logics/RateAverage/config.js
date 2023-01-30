import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

export const CONFIG = {
  value: {
    ratings: NODE_STORE_SELECTORS.ratings,
  },
};

export const TOTAL_RATING_CONFIG = {
  value: {
    avg: {
      keyPath: ({ ratings = [] }) =>
        ratings.map(rating => NODE_STORE_SELECTORS.rating({ id: rating })),
      cacheKey: ({ ratings = [] }) =>
        `node.totalRating.${ratings.toString()}.avgRating`,
      props: () => null,
      getter: (...rates) => {
        const filteredRates = rates.filter(rate => rate !== null);
        const result =
          filteredRates.reduce((acc, value) => acc + value, 0) /
          filteredRates.length;

        if (Number.isNaN(result)) return 0;

        return result;
      },
    },
  },
};
