import { getOrganisationName } from 'datastore/orgStore/selectors';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';

export const CONFIG = {
  value: {
    name: RESAGA_HELPERS.subscribeIfNotGiven(getOrganisationName, 'name'),
  },
  setValue: {},
};
