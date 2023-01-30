import {
  CREATE_PASSPORT_FACADE,
  PATCH_PASSPORT_FACADE,
  PERSON_DETAIL_API,
} from 'apis/constants';
import {
  USER_PASSPORTS_SELECTOR_CREATOR,
  USER_PASSPORTS_FIELDS,
  USER_STORE_SELECTORS,
} from 'datastore/userStore/selectors';

export const CONFIG = {
  value: {
    editable: USER_PASSPORTS_SELECTOR_CREATOR(USER_PASSPORTS_FIELDS.editable),
    isDefault: USER_PASSPORTS_SELECTOR_CREATOR(USER_PASSPORTS_FIELDS.isDefault),
    countryCode: USER_PASSPORTS_SELECTOR_CREATOR(
      USER_PASSPORTS_FIELDS.countryCode,
    ),
    passports: ({ userId }) => USER_STORE_SELECTORS.passports({ id: userId }),
  },
  setValue: {},
  isLoading: {
    isUpdateCreateLoading: {
      props: null,
      keyPath: [
        [PERSON_DETAIL_API, PATCH_PASSPORT_FACADE],
        [PERSON_DETAIL_API, CREATE_PASSPORT_FACADE],
      ],
      getter: (patchLoading, createLoading) => patchLoading || createLoading,
    },
  },
};
