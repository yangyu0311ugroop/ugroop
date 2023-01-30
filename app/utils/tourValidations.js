import dotProps from 'dot-prop-immutable';
import { TAB_TIMELINE } from 'utils/modelConstants';

export const excludePrivate = (
  userId,
  tab,
  exCludeAllPrivate = false,
  filterId,
) =>
  Object.keys(tab)
    .filter(key => {
      const values = tab[key];
      const isPrivate = dotProps.get(values, 'customData.private') || false;
      const createdBy = dotProps.get(values, 'createdBy') || 0;
      if (
        exCludeAllPrivate &&
        (isPrivate || (filterId && Number(key) !== filterId))
      )
        return !exCludeAllPrivate;
      return !isPrivate || createdBy === userId;
    })
    .reduce(
      (obj, key) => ({
        ...obj,
        [key]: tab[key],
      }),
      {},
    );

export const getTabTimeLine = tab =>
  Object.keys(tab)
    .filter(key => {
      const values = tab[key];
      const type = dotProps.get(values, 'type');
      return type === TAB_TIMELINE;
    })
    .reduce(
      (obj, key) => ({
        ...obj,
        [key]: tab[key],
      }),
      {},
    );

export const TourValidationsHelper = {
  getTabTimeLine,
  excludePrivate,
};
