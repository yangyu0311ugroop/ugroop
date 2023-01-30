import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { USER_STORE_SELECTORS } from 'datastore/userStore/selectors';
import dropRight from 'lodash/dropRight';
import takeRight from 'lodash/takeRight';
import zip from 'lodash/zip';

export const CONFIG = {
  value: {
    userId: USER_STORE_SELECTORS.userId(),
  },
};

export const GET_EVENT_RATINGS = {
  value: {
    ratings: NODE_STORE_SELECTORS.ratings,
  },
};

export const GET_EVENT_USER_RATINGS = {
  value: {
    userRatingIds: {
      keyPath: ({ ratings = [] }) =>
        ratings.map(ratingId =>
          NODE_STORE_SELECTORS.createdBy({ id: ratingId }),
        ),
      cacheKey: ({ ratings = [], userId = 0 }) =>
        `nodes.${ratings.toString()}.hasRatings.${userId.toString()}`,
      props: [({ ratings }) => ratings, ({ userId }) => userId],
      getter: (...args) => {
        const createdBys = dropRight(args, 2);
        const [ratings, userId] = takeRight(args, 2);
        const ratingsCreatedBy = zip(ratings, createdBys);

        return ratingsCreatedBy.filter(
          ratingCreatedBy => ratingCreatedBy[1] === userId,
        );
      },
    },
  },
};
