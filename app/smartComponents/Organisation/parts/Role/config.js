import { ORGANISATION_STORE_SELECTORS } from 'datastore/orgStore/selectors';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';

export const CONFIG = {
  value: {
    role: RESAGA_HELPERS.subscribeIfNotGiven(
      ORGANISATION_STORE_SELECTORS.role,
      'role',
    ),
  },
  setValue: {},
};
