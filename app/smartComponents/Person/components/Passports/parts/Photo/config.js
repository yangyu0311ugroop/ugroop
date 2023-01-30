import { FILE_STORE_SELECTORS } from 'datastore/fileStore/selectors';
import {
  USER_PASSPORTS_FIELDS,
  USER_PASSPORTS_SELECTOR_CREATOR,
} from 'datastore/userStore/selectors';

export const CONFIG = {
  value: {
    photo: USER_PASSPORTS_SELECTOR_CREATOR(USER_PASSPORTS_FIELDS.photo),
  },
  setValue: {},
};

export const FILE_CONFIG = {
  value: {
    photo: ({ photo }) => FILE_STORE_SELECTORS.selectFileUrl({ id: photo }),
    metaInfo: {
      keyPath: ({ photo }) =>
        FILE_STORE_SELECTORS.noSpreadMetaInfo({ id: photo }),
      spreadObject: true,
    },
  },
  setValue: {},
};
