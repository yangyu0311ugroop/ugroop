import { FILE_STORE_SELECTORS } from 'datastore/fileStore/selectors';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';

export const CONFIG = {
  value: {
    photo: RESAGA_HELPERS.subscribeIfNotGiven(
      FILE_STORE_SELECTORS.selectFileUrl,
      'photo',
    ),
    metaInfo: RESAGA_HELPERS.subscribeSelectorIfNotGiven(
      FILE_STORE_SELECTORS.selectMetaInfo(),
      'metaInfo',
    ),
  },
  setValue: {},
};
