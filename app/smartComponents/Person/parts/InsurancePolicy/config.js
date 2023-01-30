import { PERSON_DATA_STORE, USER_DATA_STORE } from 'appConstants';
import { PERSON_STORE_SELECTORS } from 'datastore/personDataStore/selectors';
import { PERSON_STORE_HELPERS } from 'datastore/personDataStore/helpers';
import { USER_STORE_SELECTORS } from 'datastore/userStore/selectors';
import { ORGANISATION_STORE_SELECTORS } from 'datastore/orgStore/selectors';

export const CONFIG = {
  value: {
    insurancePolicy: PERSON_STORE_HELPERS.selectPersonProperty({
      [USER_DATA_STORE]: USER_STORE_SELECTORS.insurancePolicy,
      [PERSON_DATA_STORE]: PERSON_STORE_SELECTORS.insurancePolicy,
    }),
    hasPersonDetail: ORGANISATION_STORE_SELECTORS.hasPersonDetail,
  },
  setValue: {},
};
