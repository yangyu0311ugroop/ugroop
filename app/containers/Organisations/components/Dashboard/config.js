import { ORGANISATION_STORE_SELECTORS } from 'datastore/orgStore/selectors';

export const CONFIG = {
  value: {
    organisationIdFromURL: {
      getter: ORGANISATION_STORE_SELECTORS.organisationIdFromURL,
    },
  },
  setValue: {},
};
