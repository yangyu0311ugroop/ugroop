// import { ORG_STORE_SELECTORS } from 'datastore/orgStore/selectors';
import { getOrganisationType, getOrgTypes } from 'datastore/orgStore/selectors';

export const CONFIG = {
  value: {
    type: getOrganisationType,
    orgTypes: getOrgTypes,
  },
  setValue: {},
};
