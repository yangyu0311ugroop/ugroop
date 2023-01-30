import { USER_DATA_STORE, PERSON_DATA_STORE } from 'appConstants';
import createCachedSelector from 're-reselect';
import get from 'lodash/get';
import dotProp from 'dot-prop';

const getUserPhones = createCachedSelector(
  state => state.get(USER_DATA_STORE).get('people'),
  (_, id) => id,
  (people, id) => get(people, `${id}.phones`, []),
)((_, id) => `getUserPhones.${id}`);

const getPersonNoMedical = createCachedSelector(
  state => state.get(PERSON_DATA_STORE).get('people'),
  (_, id) => id,
  (people, id) => get(people, `${id}.noMedical`, false),
)((_, id) => `getPersonNoMeical.${id}`);

const getPersonNoDietary = createCachedSelector(
  state => state.get(PERSON_DATA_STORE).get('people'),
  (_, id) => id,
  (people, id) => get(people, `${id}.noDietary`, false),
)((_, id) => `getPersonNoDietary.${id}`);

const selectInsurancePolicyStore = state =>
  state.get(PERSON_DATA_STORE).get('insurancePolicies');

const selectInsurancePolicyAttribute = (state, props) => {
  const insurancePolicyStore = selectInsurancePolicyStore(state);
  return dotProp.get(insurancePolicyStore, `${props.id}.${props.attribute}`);
};

export const PERSON_STORE_RESELECTORS = {
  getUserPhones,
  getPersonNoMedical,
  getPersonNoDietary,
  selectInsurancePolicyAttribute,
};
