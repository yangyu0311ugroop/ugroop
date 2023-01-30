import { NODE_STORE } from 'appConstants';

export const CONFIG = {
  value: {
    content: ({ dayId }) => [NODE_STORE, 'nodes', dayId, 'content'],
    location: ({ dayId }) => [
      NODE_STORE,
      'nodes',
      dayId,
      'customData',
      'location',
    ],
  },
};
