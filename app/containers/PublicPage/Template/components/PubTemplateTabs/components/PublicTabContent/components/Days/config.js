import { NODE_STORE } from 'appConstants';

export const CONFIG = {
  value: {
    days: ({ tabId }) => [NODE_STORE, 'nodes', tabId, 'children'],
    sections: ({ currentQueryDayId }) => [
      NODE_STORE,
      'nodes',
      currentQueryDayId,
      'children',
    ],
  },
};
