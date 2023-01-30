import { APP_DATA_CACHE } from 'appConstants';

export const TEMPLATE_FOLDER_PAGE = 'templateFolderPage';

export const CONFIG = {
  value: {
    cardImageUrl: ({ id }) => [APP_DATA_CACHE, 'cardImageList', id],
  },
  setValue: {
    cardImageList: [APP_DATA_CACHE, 'cardImageList'],
  },
};
