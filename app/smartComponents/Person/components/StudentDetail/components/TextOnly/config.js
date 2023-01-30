import { PERSON_STORE_SELECTORS } from 'datastore/personDataStore/selectors';

export const CONFIG = {
  value: {
    year: PERSON_STORE_SELECTORS.studentDetailYear,
    className: PERSON_STORE_SELECTORS.studentDetailClass,
    number: PERSON_STORE_SELECTORS.studentDetailNumber,
  },
};
