import {
  SUBSCRIPTION_API,
  CREATE_SUBSCRIPTION_FIRSTTIME,
} from 'apis/constants';
import { COGNITO_STORE_SELECTOR } from '../../../../datastore/stormPathStore/selectors.resaga';
import { COGNITO_STORE_SELECTORS } from '../../../../datastore/stormPathStore/selectors';
import { getOrganisationName } from '../../../../datastore/orgStore/selectors';

export const SUBSCRIPTION_CONFIG = {
  value: {
    userId: COGNITO_STORE_SELECTOR.userId.value,
    knownAs: COGNITO_STORE_SELECTORS.knownAs,
    email: COGNITO_STORE_SELECTORS.myEmail,
    firstName: COGNITO_STORE_SELECTORS.firstName,
    lastName: COGNITO_STORE_SELECTORS.lastName,
    orgName: getOrganisationName,
  },
  isLoading: {
    creatingSubscription: [SUBSCRIPTION_API, CREATE_SUBSCRIPTION_FIRSTTIME],
  },
};
