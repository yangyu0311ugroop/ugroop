import { PERSON_STORE_SELECTORS } from 'datastore/personDataStore/selectors';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';

export const CONFIG = {
  value: {
    personId: RESAGA_HELPERS.subscribeIfNotGiven(
      PERSON_STORE_SELECTORS.studentDetailPersonId,
      'personId',
    ),
  },
};
