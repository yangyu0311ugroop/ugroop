import { NODE_STORE } from 'appConstants';
import { FILE_STORE_SELECTORS } from 'datastore/fileStore/selectors';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { USER_STORE_SELECTORS } from 'datastore/userStore/selectors';

export const CONFIG = {
  value: {
    title: ({ templateId }) => NODE_STORE_SELECTORS.content({ id: templateId }),
    description: ({ templateId }) =>
      NODE_STORE_SELECTORS.description({ id: templateId }),
    templatePhotoUrl: ({ templateId }) => [
      NODE_STORE,
      'nodes',
      templateId,
      'photos',
      0,
    ],
    knownAs: props => USER_STORE_SELECTORS.knownAs({ id: props.createdById }),
  },
};

export const METAINFO_CONFIG = {
  value: {
    templateMetaInfo: ({ templatePhotoUrl }) =>
      FILE_STORE_SELECTORS.templateMetaInfo({ id: templatePhotoUrl }),
  },
};
