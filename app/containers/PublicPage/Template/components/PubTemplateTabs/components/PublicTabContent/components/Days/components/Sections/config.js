import { NODE_STORE } from 'appConstants';

export const CONFIG = {
  value: {
    sections: ({ dayId }) => [NODE_STORE, 'nodes', dayId, 'children'],
  },
};
