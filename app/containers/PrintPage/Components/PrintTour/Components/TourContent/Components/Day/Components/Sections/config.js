import { NODE_STORE } from 'appConstants';
export const PHOTOS = 'photos';
export const CONFIG = {
  value: {
    sectionIds: ({ dayId }) => [NODE_STORE, 'nodes', dayId, 'children'],
  },
};
