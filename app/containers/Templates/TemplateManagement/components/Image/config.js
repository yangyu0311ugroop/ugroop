import { FILE_STORE_SELECTORS } from 'datastore/fileStore/selectors';

export const CONFIG = {
  value: {
    content: props => FILE_STORE_SELECTORS.templatePhoto({ id: props.photoId }),
    metaInfo: props =>
      FILE_STORE_SELECTORS.templateMetaInfo({ id: props.photoId }),
  },
  setValue: {},
};
