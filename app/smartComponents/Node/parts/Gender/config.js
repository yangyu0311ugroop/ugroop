import { PERSON_PATHS } from 'datastore/personDataStore/constants';
import { PERSON_STORE_SELECTORS } from 'datastore/personDataStore/selectors';
import { USER_STORE_SELECTORS } from 'datastore/userStore/selectors';

export const CONFIG = {
  value: {
    value: ({ personId: id }) =>
      PERSON_STORE_SELECTORS.personProp({ id, path: PERSON_PATHS.gender }),
    userValue: ({ userId: id }) => USER_STORE_SELECTORS.gender({ id }),
  },
};
