import { ORGANISATION_STORE_SELECTORS } from 'datastore/orgStore/selectors';
import { USER_STORE_SELECTORS } from 'datastore/userStore/selectors';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';
import get from 'lodash/get';

export const GET_ORG_NAME = {
  value: {
    orgId: {
      getter: ({ location }) => get(location, 'state.orgId', 0),
    },
    createdBy: {
      getter: ({ location }) => get(location, 'state.createdBy', 0),
    },
  },
};

export const CONFIG = {
  value: {
    organisationName: RESAGA_HELPERS.mapToId(
      ORGANISATION_STORE_SELECTORS.getOrganisationName,
      'orgId',
    ),
    organisationOwnerId: RESAGA_HELPERS.mapToId(
      ORGANISATION_STORE_SELECTORS.getOrganisationOwnerId,
      'orgId',
    ),
  },
};

export const GET_OWNER_ORG_NAME = {
  value: {
    ownerName: RESAGA_HELPERS.mapToId(
      USER_STORE_SELECTORS.knownAs,
      'organisationOwnerId',
    ),
    createdByName: RESAGA_HELPERS.mapToId(
      USER_STORE_SELECTORS.knownAs,
      'createdBy',
    ),
  },
};
