import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import takeRight from 'lodash/takeRight';
import dropRight from 'lodash/dropRight';
import zip from 'lodash/zip';

export const CONFIG = {
  value: {
    sortedChildren: {
      keyPath: ({ ids }) =>
        ids.map(id => NODE_STORE_SELECTORS.reactions({ id })),
      cacheKey: ({ ids }) =>
        `Node.sortByLikes.${ids ? ids.toString() : 'null'}`,
      props: ({ ids }) => ids,
      getter: (...args) => {
        const reactions = dropRight(args);
        const [ids] = takeRight(args);
        const zipped = zip(ids, reactions);

        const withReactionCount = zipped.map(zipItem => [
          zipItem[0],
          Array.isArray(zipItem[1]) ? zipItem[1].length : 0,
        ]);

        return withReactionCount
          .sort((a, b) => b[1] - a[1])
          .map(withCount => withCount[0]);
      },
    },
  },
  setValue: {},
};
