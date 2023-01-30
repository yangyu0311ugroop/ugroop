import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { APP_DATA_CACHE } from 'appConstants';

export const CONFIG = {
  value: {
    content: NODE_STORE_SELECTORS.content,
    description: NODE_STORE_SELECTORS.shortDescription,
    startDate: NODE_STORE_SELECTORS.startDate,
    weekDay: NODE_STORE_SELECTORS.weekDay,
    duration: NODE_STORE_SELECTORS.duration,
    type: NODE_STORE_SELECTORS.type,

    cardImageUrl: ({ id }) => [APP_DATA_CACHE, 'cardImageList', id],
  },
  setValue: {
    cardImageList: [APP_DATA_CACHE, 'cardImageList'],
  },
};
