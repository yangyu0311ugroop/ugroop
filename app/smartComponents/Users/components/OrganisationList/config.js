import { ORGANISATION_DATA_STORE } from 'appConstants';
import { NODE_VIEW_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { ORGANISATION_STORE_SELECTORS } from 'datastore/orgStore/selectors';
import { USER_STORE_SELECTORS } from 'datastore/userStore/selectors';

export const CONFIG_ID = {
  value: {
    userId: USER_STORE_SELECTORS.userId,
  },
  setValue: {},
};

export const CONFIG = {
  value: {
    organisations: ({ userId }) =>
      USER_STORE_SELECTORS.organisations({ id: userId }),
    organisationIdFromNode: ORGANISATION_STORE_SELECTORS.organisationIdFromNode,
    orgUsers: [ORGANISATION_DATA_STORE, 'orgUsers'],
    showAllOrganisations: NODE_VIEW_STORE_SELECTORS.showAllOrganisations,
  },
  setValue: {
    showAllOrganisations: NODE_VIEW_STORE_SELECTORS.showAllOrganisations,
  },
};
