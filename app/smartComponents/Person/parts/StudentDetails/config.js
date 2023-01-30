import { PERSON_DATA_STORE, USER_DATA_STORE } from 'appConstants';
import { PERSON_STORE_HELPERS } from 'datastore/personDataStore/helpers';
import { PERSON_STORE_SELECTORS } from 'datastore/personDataStore/selectors';
import { USER_STORE_SELECTORS } from 'datastore/userStore/selectors';

export const CONFIG = {
  value: {
    value: PERSON_STORE_HELPERS.selectPersonProperty(
      {
        [USER_DATA_STORE]: USER_STORE_SELECTORS.studentDetails,
        [PERSON_DATA_STORE]: PERSON_STORE_SELECTORS.studentDetails,
      },
      'value',
    ),
  },
};
