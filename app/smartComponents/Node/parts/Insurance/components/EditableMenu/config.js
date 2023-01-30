import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { USER_STORE_SELECTORS } from 'datastore/userStore/selectors';
import { PERSON_STORE_SELECTORS } from 'datastore/personDataStore/selectors';
import { PORTAL_HELPERS } from '../../../../../../containers/Portal/helpers';

export const CONFIG = {
  value: {
    userInsurancePolicy: ({ userId }) =>
      USER_STORE_SELECTORS.insurancePolicy({ id: userId }),
    value: ({ id }) =>
      NODE_STORE_SELECTORS.nodeProp({ id, path: NODE_PATHS.insuranceValue }),
    personInsurancePolicies: ({ personId }) =>
      PERSON_STORE_SELECTORS.personInsurancePolicies({ id: personId }),
    userInsurancePolicies: ({ userPersonId }) =>
      PERSON_STORE_SELECTORS.personInsurancePolicies({ id: userPersonId }),
    mode: ({ id }) =>
      NODE_STORE_SELECTORS.nodeProp({ id, path: NODE_PATHS.insuranceMode }),
  },
  setValue: {
    ...PORTAL_HELPERS.setValue,
  },
};
