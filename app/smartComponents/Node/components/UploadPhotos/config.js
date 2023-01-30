import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

export const TAB_GALLERY_ID_CONFIG = {
  value: {
    id: NODE_STORE_SELECTORS.calculatedGalleryId,
  },
};

export const CONFIG = {
  value: {
    uploadPhotoDialogId: NODE_STORE_SELECTORS.calculatedUploadPhotoDialogId,
  },
  setValue: {
    uploadPhotoDialogId: NODE_STORE_SELECTORS.calculatedUploadPhotoDialogId,

    ...PORTAL_HELPERS.setValue,
  },
};
