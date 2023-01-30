import {
  getOrganisationName,
  ORGANISATION_STORE_SELECTORS,
} from 'datastore/orgStore/selectors';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';

export const CONFIG = {
  value: {
    childrenArray: ({ id }) => ORGANISATION_STORE_SELECTORS.children({ id }),
    name: RESAGA_HELPERS.subscribeIfNotGiven(getOrganisationName, 'name'),
  },
};
