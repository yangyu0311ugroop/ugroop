import { getOrganisationName } from 'datastore/orgStore/selectors';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';
import { USER_STORE_SELECTORS } from 'datastore/userStore/selectors';

export const CONFIG = {
  value: {
    orgName: RESAGA_HELPERS.subscribeIfNotGiven(
      ({ orgId }) => getOrganisationName({ id: orgId }),
      'orgName',
    ),
    knownAs: RESAGA_HELPERS.subscribeIfNotGiven(
      ({ userId }) => USER_STORE_SELECTORS.knownAs({ id: userId }),
      'knownAs',
    ),
  },
};
