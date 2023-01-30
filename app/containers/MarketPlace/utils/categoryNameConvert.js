import { Category } from '../../../appConstants';

export const convertCategoryName = category => {
  switch (category) {
    case Category.FeaturedTours:
      return 'Featured Tours and Trips';
    case Category.CheckList:
      return 'Checklists';
    default:
      return '';
  }
};
