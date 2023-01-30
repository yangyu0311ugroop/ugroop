import { RESAGA_HELPERS } from 'utils/helpers/resaga';
import { getOrganisationWebsite } from 'datastore/orgStore/selectors';

export const CONFIG = {
  value: {
    website: RESAGA_HELPERS.subscribeIfNotGiven(
      getOrganisationWebsite,
      'website',
    ),
  },
  setValue: {},
};
