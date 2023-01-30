import {
  PHONE_STORE_FIELDS,
  PHONE_STORE_SELECTOR_CREATOR,
} from 'datastore/phoneStore/selectors';
import { SORT_HELPERS } from 'utils/sorter';

export const CONFIG = {
  value: {
    sortedIds: SORT_HELPERS.sorterConfig(
      PHONE_STORE_FIELDS.isDefault,
      SORT_HELPERS.sortBool,
      {
        sortFieldKey: 'isDefault',
        sortFunctionKey: 'sortBool',
        cacheKey: 'userStore.phones',
        selectorCreator: PHONE_STORE_SELECTOR_CREATOR,
      },
    ),
  },
  setValue: {},
};
