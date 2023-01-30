import {
  ORGANISATION_API,
  GET_OWN_ORG_INFO,
  GET_ORG_TYPES,
  GET_ORGANISATION,
} from 'apis/constants';
import { ORG_PROFILE_VIEW_STORE } from 'containers/Profile/constants';
import { ORGANISATION_STORE_SELECTORS } from 'datastore/orgStore/selectors';
import { USER_STORE_SELECTORS } from 'datastore/userStore/selectors';
import { COGNITO_STORE_SELECTOR } from '../../../../datastore/stormPathStore/selectors.resaga';
import { COGNITO_STORE_SELECTORS } from '../../../../datastore/stormPathStore/selectors';

export const CONFIG = {
  value: {
    organisationIdFromURL: {
      getter: ORGANISATION_STORE_SELECTORS.organisationIdFromURL,
    },
    userId: USER_STORE_SELECTORS.userId,
  },
  setValue: {
    orgTypes: [ORG_PROFILE_VIEW_STORE, 'orgTypes'],
  },
  isLoading: {
    isLoading: {
      keyPath: [
        [ORGANISATION_API, GET_OWN_ORG_INFO],
        [ORGANISATION_API, GET_ORGANISATION],
        [ORGANISATION_API, GET_ORG_TYPES],
      ],
      getter: (fetchInfo, fetchOrg, fetchOrgTypes) =>
        fetchInfo && fetchOrg && fetchOrgTypes,
    },
  },
};

export const SUBSCRIPTION_CONFIG = {
  value: {
    userId: COGNITO_STORE_SELECTOR.userId.value,
    knownAs: COGNITO_STORE_SELECTORS.knownAs,
    email: COGNITO_STORE_SELECTORS.myEmail,
    firstName: COGNITO_STORE_SELECTORS.firstName,
    lastName: COGNITO_STORE_SELECTORS.lastName,
  },
};

export const CONFIG2 = {
  value: {
    orgType: ({ organisationIdFromURL }) =>
      ORGANISATION_STORE_SELECTORS.getOrganisationType({
        id: organisationIdFromURL,
      }),
  },
};
