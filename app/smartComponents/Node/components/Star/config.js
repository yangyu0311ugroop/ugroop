import { STARS_SELECTOR } from 'smartComponents/Node/hoc/withStars/config';

export const CONFIG = {
  value: {
    starred: {
      cacheKey: ({ userId, id }) => `starred${userId}${id}`,
      keyPath: STARS_SELECTOR,
      props: ({ id }) => id,
      getter: (stars = [], id) => stars.indexOf(id) !== -1,
    },
  },
  setValue: {
    stars: STARS_SELECTOR,
  },
};
