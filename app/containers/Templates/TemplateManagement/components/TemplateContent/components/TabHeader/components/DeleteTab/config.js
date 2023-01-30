import { NODE_STORE } from 'appConstants';

export const CONFIG = {
  value: {
    content: ({ tabId }) => [NODE_STORE, 'nodes', tabId, 'content'],
  },
  setValue: {},
};
