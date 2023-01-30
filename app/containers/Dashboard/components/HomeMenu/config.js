import {
  GET_RECENT_ACTIVITY,
  GET_TEMPLATE_FEATURED_LIST,
  TEMPLATE_API,
  USER_API,
} from 'apis/constants';
import { NODE_STORE, NODE_STORE_ITEM } from 'appConstants';

export const CONFIG = {
  value: {
    featuredTours: [NODE_STORE, NODE_STORE_ITEM.FEATURED_TOURS],
  },
  setValue: {},
  isLoading: {
    fetchRecent: [USER_API, GET_RECENT_ACTIVITY],
    fetchFeatured: [TEMPLATE_API, GET_TEMPLATE_FEATURED_LIST],
  },
};
