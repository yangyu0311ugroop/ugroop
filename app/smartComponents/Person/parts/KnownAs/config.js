import { PERSON_DATA_STORE, USER_DATA_STORE } from 'appConstants';
import { ORGANISATION_STORE_SELECTORS } from 'datastore/orgStore/selectors';
import { PERSON_STORE_SELECTORS } from 'datastore/personDataStore/selectors';
import { PERSON_STORE_HELPERS } from 'datastore/personDataStore/helpers';
import { USER_STORE_SELECTORS } from 'datastore/userStore/selectors';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';

export const CONFIG = {
  value: {
    knownAs: PERSON_STORE_HELPERS.selectPersonProperty({
      [USER_DATA_STORE]: USER_STORE_SELECTORS.knownAs,
      [PERSON_DATA_STORE]: PERSON_STORE_SELECTORS.knownAs,
    }),
    firstName: PERSON_STORE_HELPERS.selectPersonProperty({
      [USER_DATA_STORE]: USER_STORE_SELECTORS.firstName,
      [PERSON_DATA_STORE]: PERSON_STORE_SELECTORS.firstName,
    }),
    lastName: PERSON_STORE_HELPERS.selectPersonProperty({
      [USER_DATA_STORE]: USER_STORE_SELECTORS.lastName,
      [PERSON_DATA_STORE]: PERSON_STORE_SELECTORS.lastName,
    }),
    hasPersonDetail: ORGANISATION_STORE_SELECTORS.hasPersonDetail,
  },
  setValue: {
    person: RESAGA_HELPERS.mapToId(
      ORGANISATION_STORE_SELECTORS.getRoleMembersIds,
      'organisationId',
    ),
  },
};
