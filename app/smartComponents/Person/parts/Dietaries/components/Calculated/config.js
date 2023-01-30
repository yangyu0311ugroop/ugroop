import { DIETARY_PATHS } from 'datastore/personDataStore/constants';
import { PERSON_STORE_SELECTORS } from 'datastore/personDataStore/selectors';

export const CONFIG = {
  setValue: {
    calculatedCount: ({ id, keyPath }) => [
      ...(keyPath.length ? keyPath : PERSON_STORE_SELECTORS.person({ id })),
      ...DIETARY_PATHS.calculatedCount,
    ],
  },
};
