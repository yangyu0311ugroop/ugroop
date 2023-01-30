import { EVENT_STORE_VIEW_SELECTORS } from 'datastore/eventStore/selectors';

export const CONFIG = {
  value: {
    filter: EVENT_STORE_VIEW_SELECTORS.ratingViewProp({ path: ['filter'] }),
  },
  setValue: {
    filter: EVENT_STORE_VIEW_SELECTORS.ratingViewProp({ path: ['filter'] }),
  },
};
