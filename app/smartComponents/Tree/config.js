import union from 'lodash/union';

export const CONFIG = {
  value: {
    childIds: {
      keyPath: ({ selectors, id }) => {
        const tempSelectors = selectors || [];
        if (typeof tempSelectors === 'function') return selectors({ id });
        return tempSelectors.map(selector => {
          if (typeof selector === 'function') {
            return selector({ id });
          }

          return selector;
        });
      },
      cacheKey: ({ viewStore, selectors, id }) =>
        `${viewStore}.${selectors ? selectors.toString() : null}.${id}.tree`,
      props: () => null,
      getter: (...args) => union(...args),
    },
  },
  setValue: {
    array: ({ viewStore, viewPath }) => [viewStore, viewPath || 'tree'],
  },
};
