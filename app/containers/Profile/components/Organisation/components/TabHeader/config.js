import { ORGANISATION_STORE_SELECTORS } from 'datastore/orgStore/selectors';
import { COGNITO_STORE_SELECTORS } from 'datastore/stormPathStore/selectors';

export const CONFIG = {
  value: {
    orgType: ORGANISATION_STORE_SELECTORS.getOrganisationType,
    userId: COGNITO_STORE_SELECTORS.myId,
    orgCreatedBy: ORGANISATION_STORE_SELECTORS.getOrganisationOwnerId,
    orgOwnerIdViaNode: ORGANISATION_STORE_SELECTORS.getOrgOwnerId,
  },
  setValue: {},
};
