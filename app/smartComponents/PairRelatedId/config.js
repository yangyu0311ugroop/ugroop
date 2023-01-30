import dropRight from 'lodash/dropRight';
import takeRight from 'lodash/takeRight';

export const CONFIG = {
  value: {
    relatedIds: {
      keyPath: ({ ids = [], sourcePath, index = 0 }) =>
        ids.map(id => sourcePath({ id: Array.isArray(id) ? id[index] : id })),
      cacheKey: ({ ids, cacheKey }) =>
        `pairRelatedId.${cacheKey}.${ids ? ids.toString() : null}`,
      props: ({ ids }) => ids,
      getter: (...args) => {
        const relatedIds = dropRight(args, 1);
        const [ids] = takeRight(args, 1);
        const withRelatedIds = ids.map((id, index) =>
          id instanceof Array
            ? [...id, relatedIds[index]]
            : [id, relatedIds[index]],
        );

        return withRelatedIds;
      },
    },
  },
};
