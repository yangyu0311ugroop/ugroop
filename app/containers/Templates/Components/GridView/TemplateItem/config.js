import { APP_DATA_CACHE } from 'appConstants';

export const TEMPLATE_ITEM_PAGE = 'templateItemPage';

export const CONFIG = {
  value: {
    cardImageUrl: ({ id }) => [APP_DATA_CACHE, 'cardImageList', id],
  },
  setValue: {
    cardImageList: [APP_DATA_CACHE, 'cardImageList'],
  },
};
