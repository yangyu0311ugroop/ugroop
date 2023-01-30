import { ABILITY_DATA_STORE } from 'appConstants';
import { FILE_STORE_SELECTORS } from 'datastore/fileStore/selectors';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { COGNITO_STORE_SELECTOR } from 'datastore/stormPathStore/selectors.resaga';
import { SET_VALUE } from 'ugcomponents/SnackBar/config';

export const GET_USER_ID_CONFIG = {
  value: {
    id: COGNITO_STORE_SELECTOR.userId.value,
    parentId: ({ folderId }) =>
      NODE_STORE_SELECTORS.parentNodeId({ id: folderId }),
  },
};

export const CONFIG = {
  value: {
    tourOwnerAbilities: [
      ABILITY_DATA_STORE,
      'definitions',
      'tour',
      'tour_owner',
    ],
  },
};

export const PHOTO_METAINFO_CONFIG = {
  value: {
    userMetaInfo: {
      keyPath: ({ userProfilePhotoUrl }) =>
        FILE_STORE_SELECTORS.noSpreadMetaInfo({ id: userProfilePhotoUrl }),
      spreadObject: true,
    },
  },
  setValue: {
    nodes: NODE_STORE_SELECTORS.nodes,
    ...SET_VALUE,
  },
};
