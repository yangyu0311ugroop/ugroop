import { URL_HELPERS } from '../../../appConstants';
import { convertCategoryName } from '../utils/categoryNameConvert';

export function useMarketBreadCrumbs(category) {
  return [
    {
      label: 'Templates',
      url: URL_HELPERS.marketPlace(),
    },
    {
      label: convertCategoryName(category),
      url: `${URL_HELPERS.marketPlace()}?category=${category}`,
    },
  ];
}
