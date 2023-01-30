import { RESAGA_HELPERS } from 'utils/helpers/resaga';
import { getOrganisationName } from 'datastore/orgStore/selectors';

export const CONFIG = {
  value: {
    orgName: RESAGA_HELPERS.subscribeIfNotGiven(getOrganisationName, 'orgName'),
  },
  setValue: {},
};
