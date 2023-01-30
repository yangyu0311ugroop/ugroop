import { NODE_STORE, NODE_STORE_ITEM } from 'appConstants';

export const CONFIG = {
  value: {
    featuredTour: ({ id }) => [NODE_STORE, NODE_STORE_ITEM.FEATURED_TOURS, id],
  },
};
