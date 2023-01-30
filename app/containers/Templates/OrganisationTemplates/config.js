import { GET_ORGANISATION, ORGANISATION_API } from 'apis/constants';
import { ORGANISATION_STORE_SELECTORS } from 'datastore/orgStore/selectors';
import { COGNITO_STORE_SELECTORS } from 'datastore/stormPathStore/selectors';
export const CONFIG_ORGANISATION_ID = {
  value: {
    id: {
      getter: ORGANISATION_STORE_SELECTORS.organisationIdFromURL,
    },
    userId: COGNITO_STORE_SELECTORS.myId,
  },
};
export const CONFIG_ORGANISATION_ROOT_NODE_ID = {
  value: {
    rootNodeId: ORGANISATION_STORE_SELECTORS.rootNodeId,
  },
  setValue: {},
  isLoading: {
    loading: [ORGANISATION_API, GET_ORGANISATION],
  },
};
