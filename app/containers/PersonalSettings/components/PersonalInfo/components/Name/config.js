import { USER_STORE_SELECTORS } from 'datastore/userStore/selectors';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';
import { GET_PERSON_DETAIL, PERSON_DETAIL_API } from 'apis/constants';

export const CONFIG = {
  value: {
    firstName: ({ userId }) => USER_STORE_SELECTORS.firstName({ id: userId }),
    lastName: ({ userId }) => USER_STORE_SELECTORS.lastName({ id: userId }),
    knownAs: ({ userId }) => USER_STORE_SELECTORS.knownAs({ id: userId }),
    middleName: RESAGA_HELPERS.mapToId(
      USER_STORE_SELECTORS.middleName,
      'userId',
    ),
  },
  isLoading: {
    loading: [PERSON_DETAIL_API, GET_PERSON_DETAIL],
  },
  setValue: {},
};
