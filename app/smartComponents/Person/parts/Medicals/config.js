import { PERSON_DATA_STORE, USER_DATA_STORE } from 'appConstants';
import { PERSON_STORE_HELPERS } from 'datastore/personDataStore/helpers';
import { PERSON_STORE_SELECTORS } from 'datastore/personDataStore/selectors';
import { USER_STORE_SELECTORS } from 'datastore/userStore/selectors';

export const CONFIG_1 = {
  value: {
    value: PERSON_STORE_HELPERS.selectPersonProperty(
      {
        [PERSON_DATA_STORE]: PERSON_STORE_SELECTORS.medicals,
        [USER_DATA_STORE]: USER_STORE_SELECTORS.medicals,
      },
      'value',
    ),
    personMedicals: ({ id }) => [PERSON_DATA_STORE, 'people', id, 'medicals'],
    userMedicals: ({ id }) => [USER_DATA_STORE, 'people', id, 'medicals'],
    noMedical: PERSON_STORE_SELECTORS.noMedical,
  },
};

export const CONFIG_2 = {
  value: {
    value: PERSON_STORE_SELECTORS.sortMedicalsBySeverity({ idsProp: 'value' }),
    personMedicalsValue: PERSON_STORE_SELECTORS.sortMedicalsBySeverity({
      idsProp: 'personMedicals',
    }),
    userMedicalsValue: PERSON_STORE_SELECTORS.sortMedicalsBySeverity({
      idsProp: 'userMedicals',
    }),
  },
};
