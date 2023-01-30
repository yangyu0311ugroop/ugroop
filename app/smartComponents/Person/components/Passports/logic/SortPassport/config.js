import {
  USER_PASSPORTS_FIELDS,
  USER_PASSPORTS_SELECTOR_CREATOR,
} from 'datastore/userStore/selectors';
import { SORT_HELPERS } from 'utils/sorter';

export const CONFIG = {
  value: {
    sortedIds: SORT_HELPERS.sorterConfig(
      USER_PASSPORTS_FIELDS.isDefault,
      SORT_HELPERS.sortBool,
      {
        selectorCreator: USER_PASSPORTS_SELECTOR_CREATOR,
        sortFieldKey: 'isDefault',
        sortFunctionKey: 'sortBool',
        cacheKey: 'userStore.passports',
      },
    ),
  },
  setValue: {},
};
