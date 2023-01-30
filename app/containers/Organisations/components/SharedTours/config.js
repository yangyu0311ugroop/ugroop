import { ORGANISATION_STORE_SELECTORS } from 'datastore/orgStore/selectors';

export const CONFIG_ORGANISATION_ID = {
  value: {
    id: {
      getter: ORGANISATION_STORE_SELECTORS.organisationIdFromURL,
    },
  },
};
export const CONFIG = {
  value: {
    rootNodeId: ORGANISATION_STORE_SELECTORS.rootNodeId,
  },
  setValue: {},
};
