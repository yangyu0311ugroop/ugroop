import { NODE_STORE } from 'appConstants';

export const CONFIG = {
  value: {
    exist: ({ id }) => [NODE_STORE, 'nodes', id, 'id'],
    content: ({ id }) => [NODE_STORE, 'nodes', id, 'content'],
    attachmentId: ({ id }) => [NODE_STORE, 'nodes', id, 'attachment'],
    icon: ({ id }) => [NODE_STORE, 'nodes', id, 'customData', 'icon'],
    placeId: ({ id }) => [NODE_STORE, 'nodes', id, 'customData', 'placeId'],
    location: ({ id }) => [NODE_STORE, 'nodes', id, 'customData', 'location'],
    description: ({ id }) => [
      NODE_STORE,
      'nodes',
      id,
      'customData',
      'description',
    ],
    photo: ({ id }) => [NODE_STORE, 'nodes', id, 'photos', 0],
    attachment: ({ id }) => [
      NODE_STORE,
      'nodes',
      id,
      'customData',
      'attachment',
    ],
  },
};
