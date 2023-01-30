import { NODE_STORE } from 'appConstants';
import dotProps from 'dot-prop-immutable';
import { FILE_STORE_SELECTORS } from 'datastore/fileStore/selectors';

export const CONFIG = {
  value: {
    templatePhotoId: {
      keyPath: [NODE_STORE, 'nodes'],
      getter: (templates, props) => {
        const photoList = dotProps.get(templates, `${props.id}.photos`, []);
        if (photoList.length === 0) return -1;
        return photoList[photoList.length - 1];
      },
    },
    templatePhotoUrl: props =>
      FILE_STORE_SELECTORS.templatePhoto({ id: props.photoId }),
    templateMetaInfo: props =>
      FILE_STORE_SELECTORS.noSpreadMetaInfo({ id: props.photoId }),
    photoMetaInfo: props =>
      FILE_STORE_SELECTORS.templateMetaInfo({ id: props.photoId }),
  },
};
