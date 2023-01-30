import {
  COGNITO_ACCOUNTSTORE,
  OWNER,
  CUSTOMER_STORE_IMMER,
} from 'appConstants';
import { getDataStoreState } from 'utils/reduxStoreHelper';
import lodash from 'lodash';

const selectAccount = state => {
  const cognitoAcct = getDataStoreState(state, COGNITO_ACCOUNTSTORE);
  return cognitoAcct && cognitoAcct.get('account');
};

const selectAccountRelatedOrg = state => {
  const cognitoAcct = getDataStoreState(state, COGNITO_ACCOUNTSTORE);
  return cognitoAcct && cognitoAcct.get('accountRelatedOrgs');
};

const hasOrgSetup = accountRelatedOrg =>
  !Array.isArray(accountRelatedOrg) ||
  !accountRelatedOrg.length ||
  lodash.has(lodash.first(accountRelatedOrg), 'firstTimeSetup') ||
  lodash.get(lodash.first(accountRelatedOrg), 'role') !== OWNER;

const hasOrgSubscriptionOwner = (id, state) => {
  const customStore = getDataStoreState(state, CUSTOMER_STORE_IMMER);
  const data = customStore && customStore.orgs;
  return lodash.has(data, id) && lodash.get(data, id) !== undefined;
};

const hasPersonSubscriptionOwner = (id, state) => {
  const customStore = getDataStoreState(state, CUSTOMER_STORE_IMMER);
  const data = customStore && customStore.users;
  return lodash.has(data, id) && lodash.get(data, id) !== undefined;
};

export default {
  selectAccount,
  selectAccountRelatedOrg,
  hasOrgSetup,
  hasOrgSubscriptionOwner,
  hasPersonSubscriptionOwner,
};
