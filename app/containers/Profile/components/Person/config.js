import { COGNITO_STORE_SELECTOR } from 'datastore/stormPathStore/selectors.resaga';
import { PERSON_DETAIL_API, GET_PERSON_DETAIL } from 'apis/constants';
import { USER_STORE_SELECTORS } from 'datastore/userStore/selectors';

export const CONFIG = {
  value: {
    orgUserIds: USER_STORE_SELECTORS.orgUserId,
  },
  setValue: {},
  isLoading: {
    getPersonDetailsLoading: [PERSON_DETAIL_API, GET_PERSON_DETAIL],
  },
};

export const CONTAINER_CONFIG = {
  value: {
    userId: COGNITO_STORE_SELECTOR.userId.value,
  },
};
