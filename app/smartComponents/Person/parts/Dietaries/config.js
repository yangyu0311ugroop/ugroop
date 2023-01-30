import { PERSON_DATA_STORE, USER_DATA_STORE } from 'appConstants';
import { PERSON_STORE_HELPERS } from 'datastore/personDataStore/helpers';
import { PERSON_STORE_SELECTORS } from 'datastore/personDataStore/selectors';
import { USER_STORE_SELECTORS } from 'datastore/userStore/selectors';

export const CONFIG = {
  value: {
    value: PERSON_STORE_HELPERS.selectPersonProperty(
      {
        [PERSON_DATA_STORE]: PERSON_STORE_SELECTORS.dietaries,
        [USER_DATA_STORE]: USER_STORE_SELECTORS.dietaries,
      },
      'value',
    ),
    personDietaries: ({ id }) => [PERSON_DATA_STORE, 'people', id, 'dietaries'],
    userDietaries: ({ id }) => [USER_DATA_STORE, 'people', id, 'dietaries'],
    noDietary: PERSON_STORE_SELECTORS.noDietary,
  },
};
