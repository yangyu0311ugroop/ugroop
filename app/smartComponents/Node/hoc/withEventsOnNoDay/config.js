import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

export const CONFIG_1 = {
  value: {
    dayIds: ({ tabId: id }) => NODE_STORE_SELECTORS.children({ id }),
    events: NODE_STORE_SELECTORS.cachedCalculatedNodesEventIds({
      idProp: 'templateId',
    }),
  },
};

export const CONFIG_2 = {
  value: {
    events: NODE_STORE_SELECTORS.calculatedStartEndTimes({
      idsProp: 'events',
    }),
  },
};

export const CONFIG_3 = {
  value: {
    events: NODE_STORE_SELECTORS.filterByNotMatchingTime({
      idsProp: 'dayIds',
      nodesProp: 'events',
    }),
  },
};
