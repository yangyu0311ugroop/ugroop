import { MEDICAL_PATHS } from 'datastore/personDataStore/constants';
import head from 'lodash/head';
import { PERSON_STORE_SELECTORS } from 'datastore/personDataStore/selectors';

export const CONFIG = {
  value: {
    severity: ({ value }) =>
      PERSON_STORE_SELECTORS.medicalSeverity({ id: head(value) }),
  },
  setValue: {
    calculatedSeverity: ({ id, keyPath }) => [
      ...(keyPath.length ? keyPath : PERSON_STORE_SELECTORS.person({ id })),
      ...MEDICAL_PATHS.calculatedSeverity,
    ],
    calculatedCount: ({ id, keyPath }) => [
      ...(keyPath.length ? keyPath : PERSON_STORE_SELECTORS.person({ id })),
      ...MEDICAL_PATHS.calculatedCount,
    ],
  },
};
