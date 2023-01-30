import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import takeRight from 'lodash/takeRight';
import dropRight from 'lodash/dropRight';
import zip from 'lodash/zip';

export const CONFIG = {
  value: {
    ratings: NODE_STORE_SELECTORS.ratings,
  },
};

export const FILTER_RATE_COUNT = {
  value: {
    count: {
      keyPath: ({ ratings = [] }) =>
        ratings.map(rating => NODE_STORE_SELECTORS.rating({ id: rating })),
      cacheKey: ({ ratings = [], rate }) =>
        `node.filterRateCount.${ratings.toString()}.${rate}.filter`,
      props: [({ ratings }) => ratings, ({ rate }) => rate],
      getter: (...args) => {
        const ratingValues = dropRight(args, 2);
        const [ratingNodes, targetRate] = takeRight(args, 2);
        const ratingValuesNodes = zip(ratingNodes, ratingValues);

        const targetRatings = ratingValuesNodes.filter(
          ratingValueNode => ratingValueNode[1] === targetRate,
        );

        return targetRatings.length;
      },
    },
  },
};
