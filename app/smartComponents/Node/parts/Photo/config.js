import { FILE_DATA_STORE, NODE_STORE } from 'appConstants';
import { FILE_STORE_SELECTORS } from 'datastore/fileStore/selectors';
import {
  NODE_STORE_SELECTORS,
  NODE_VIEW_STORE_SELECTORS,
} from 'datastore/nodeStore/selectors';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';
import takeRight from 'lodash/takeRight';
import dropRight from 'lodash/dropRight';
import zip from 'lodash/zip';

export const PHOTOS_CONFIG = {
  value: {
    photos: NODE_STORE_SELECTORS.photos,
  },
};

export const PHOTO_ID_CONFIG = {
  value: {
    photoId: {
      keyPath: ({ photos = [] }) =>
        photos.map(photo => FILE_STORE_SELECTORS.type({ id: photo })),
      cacheKey: ({ photos = [] }) =>
        `node.parts.photo_id_config.${photos.toString()}`,
      props: ({ photos }) => photos,
      getter: (...args) => {
        const types = dropRight(args);
        const [photos] = takeRight(args);
        const photosWithType = zip(photos, types);
        const filtered = photosWithType.filter(
          photoWithType => !photoWithType[1],
        );

        if (filtered.length === 0) return null;

        return filtered[0][0];
      },
    },
  },
};

export const CONFIG = {
  value: {
    editable: RESAGA_HELPERS.subscribeIfNotGiven(
      NODE_VIEW_STORE_SELECTORS.editable,
      'editable',
    ),
    templatePhotoId: {
      getter: ({ photoId }) => photoId,
    },
    templatePhotoUrl: {
      getter: ({ photoId }) => photoId,
    },
    photoContent: ({ photoId }) => [
      FILE_DATA_STORE,
      'files',
      photoId,
      'content',
    ],
    templatePhotoForeignKey: ({ photoId }) => [
      FILE_DATA_STORE,
      'files',
      photoId,
      'id',
    ],
    templateMetaInfo: ({ photoId }) => [
      FILE_DATA_STORE,
      'files',
      photoId,
      'metaInfo',
    ],
  },
  setValue: {
    photos: [FILE_DATA_STORE, 'files'],
    templates: [NODE_STORE, 'nodes'],
    templatePhoto: NODE_STORE_SELECTORS.photos,
  },
};
