import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

export const CONFIG = {
  value: {
    content: NODE_STORE_SELECTORS.content,
    children: NODE_STORE_SELECTORS.children,
    // status: NODE_STORE_SELECTORS.status,
    sharedWith: NODE_STORE_SELECTORS.sharedWith,
    index: {
      cacheKey: ({ id }) => `${id}.index`,
      keyPath: ({ templateId }) =>
        NODE_STORE_SELECTORS.calculatedVisibleChildren({ id: templateId }),
      props: ({ id }) => id,
      getter: (ids = [], id) => ids.indexOf(id),
    },
  },
  setValue: {},
};
