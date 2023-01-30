import { COGNITO_STORE_SELECTOR } from 'datastore/stormPathStore/selectors.resaga';
import { ORGANISATION_STORE_SELECTORS } from 'datastore/orgStore/selectors';

export const CONFIG = {
  value: {
    rootNodeId: COGNITO_STORE_SELECTOR.rootNodeId.value,
    orgId: ORGANISATION_STORE_SELECTORS.organisationId,
  },
  setValue: {},
};
