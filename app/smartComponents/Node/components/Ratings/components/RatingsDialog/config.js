import { EVENT_STORE_VIEW_SELECTORS } from 'datastore/eventStore/selectors';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { USER_STORE_SELECTORS } from 'datastore/userStore/selectors';

export const CONFIG = {
  value: {
    ratings: NODE_STORE_SELECTORS.ratings,
    filter: EVENT_STORE_VIEW_SELECTORS.ratingViewProp({ path: ['filter'] }),
    userRatingId: {
      getter: ({ userRatingIds }) =>
        Array.isArray(userRatingIds[0]) ? userRatingIds[0][0] : 0,
    },
    userId: USER_STORE_SELECTORS.userId(),
  },
};

export const FILTER_RATINGS_CONFIG = {
  value: {},
};
