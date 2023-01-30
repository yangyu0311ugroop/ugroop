import { NODE_STORE } from 'appConstants';
import { FILE_STORE_SELECTORS } from 'datastore/fileStore/selectors';
import dotProp from 'dot-prop-immutable';

export const CONFIG = {
  value: {
    title: {
      keyPath: [NODE_STORE, 'nodes'],
      getter: (templates, props) =>
        dotProp.get(templates, `${props.templateId}.content`),
    },

    description: {
      keyPath: [NODE_STORE, 'nodes'],
      getter: (templates, props) =>
        dotProp.get(templates, `${props.templateId}.customData.description`),
    },
    templatePhotoUrl: props => [
      NODE_STORE,
      'nodes',
      props.templateId,
      'photos',
      0,
    ],
  },
};

export const METAINFO_CONFIG = {
  value: {
    photoMetaInfo: props =>
      FILE_STORE_SELECTORS.templateMetaInfo({ id: props.templatePhotoUrl }),
  },
};
