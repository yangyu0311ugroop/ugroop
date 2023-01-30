import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { ORGANISATION_STORE_SELECTORS } from 'datastore/orgStore/selectors';

export const CONFIG_ORGANISATION_ID = {
  value: {
    myOrganisationId: ORGANISATION_STORE_SELECTORS.organisationId,
  },
};

export const CONFIG = {
  setValue: {},

  value: {
    myOrganisationName: ({ orgId, myOrganisationId }) => {
      const id = LOGIC_HELPERS.ifElse(orgId, orgId, myOrganisationId);
      return ORGANISATION_STORE_SELECTORS.getOrganisationName({ id });
    },
    theirOrganisationName: ({ id }) => {
      if (id) {
        return ORGANISATION_STORE_SELECTORS.getOrganisationName({ id });
      }
      return '';
    },
  },
};
