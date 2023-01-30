import { NODE_STORE, FILE_DATA_STORE } from 'appConstants';
import { get } from 'lodash';

export const CONFIG = {
  value: {
    // data store
    description: ({ id }) => [
      NODE_STORE,
      'nodes',
      id,
      'customData',
      'description',
    ],
    attachmentId: ({ id }) => [NODE_STORE, 'nodes', id, 'attachment'],
    attachmentExist: {
      keyPath: [
        ({ id }) => [NODE_STORE, 'nodes', id, 'attachment'],
        [FILE_DATA_STORE, 'files'],
      ],
      getter: (id, attachments) => {
        if (!id) return false;

        const { fileSize, description } = get(attachments, `${id}`, {});
        return !!(fileSize || description);
      },
    },
    photo: {
      keyPath: [
        ({ id }) => [NODE_STORE, 'nodes', id, 'photos', 0],
        [FILE_DATA_STORE, 'files'],
      ],
      getter: (photoId, photos = {}) => {
        const { content, metaInfo } = get(photos, `${photoId}`, {});
        return { photoId, content, ...metaInfo };
      },
      spreadObject: true,
    },
  },
};
