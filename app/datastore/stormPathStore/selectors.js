/**
 * Created by Yang on 2/2/17.
 */

import { createSelector } from 'reselect';
import { COGNITO_ACCOUNTSTORE } from 'appConstants';
import createCachedSelector from 're-reselect';
import _ from 'lodash';
import dotProp from 'dot-prop';

const selectCognitoPathDataStore = () => state =>
  state.get(COGNITO_ACCOUNTSTORE);

const selectCurrentUserAccount = () =>
  createSelector(
    selectCognitoPathDataStore(),
    cognitoDataState => cognitoDataState.get('account'),
  );

const selectCurrentUserOrgs = () =>
  createSelector(
    selectCognitoPathDataStore(),
    cognitoDataState => cognitoDataState.get('accountRelatedOrgs'),
  );

const selectOrgs = () =>
  createSelector(
    selectCognitoPathDataStore(),
    cognitoDataStore => cognitoDataStore.get('orgs'),
  );

const selectCachedAvatar = () =>
  createSelector(
    selectCognitoPathDataStore(),
    cognitoDataState => cognitoDataState.get('avatar'),
  );

const selectCurrentLoginPerson = () =>
  createSelector(
    selectCognitoPathDataStore(),
    cognitoDataState => cognitoDataState.get('person'),
  );

const selectAccountAttribute = (state, props) => {
  const account = state.get(COGNITO_ACCOUNTSTORE).get('account');
  return dotProp.get(account, `${props.attribute}`);
};

const selectCognitoPersonAttribute = (state, props) => {
  const person = state.get(COGNITO_ACCOUNTSTORE).get('person');
  return dotProp.get(person, `${props.attribute}`);
};

const selectCognitoAvatar = state => {
  const avatar = state.get(COGNITO_ACCOUNTSTORE).get('avatar');
  return avatar;
};

const selectAccRelatedOrgs = state => {
  const avatar = state.get(COGNITO_ACCOUNTSTORE).get('accountRelatedOrgs');
  return avatar;
};
const account = [COGNITO_ACCOUNTSTORE, 'account'];
const myId = [COGNITO_ACCOUNTSTORE, 'account', 'id'];
const myEmail = [COGNITO_ACCOUNTSTORE, 'account', 'email'];
const knownAs = [COGNITO_ACCOUNTSTORE, 'person', 'knownAs'];
const firstName = [COGNITO_ACCOUNTSTORE, 'person', 'firstName'];
const lastName = [COGNITO_ACCOUNTSTORE, 'person', 'lastName'];

export const COGNITO_STORE_SELECTORS = {
  account,
  myId,
  myEmail,
  knownAs,
  firstName,
  lastName,
};

const cognitoPathDataStore = state => state.get(COGNITO_ACCOUNTSTORE);

const selectAllOrgs = state => cognitoPathDataStore(state).get('orgs');

const selectAccount = state => cognitoPathDataStore(state).get('account');

const selectPerson = state => cognitoPathDataStore(state).get('person');

const selectAccountRelatedOrgs = state =>
  cognitoPathDataStore(state).get('accountRelatedOrgs');

function makeSelectOrgListsCacheKey({ inputSelectors = [] } = {}) {
  const keySelectors = inputSelectors;
  return (...args) => {
    const orgs = keySelectors[0](...args);
    const data = orgs && orgs.map(o => o.id);
    if (data && data.length > 0) {
      const idString = data.reduce((a, c) => `${a},${c}`);
      return `makeSelectOrgListsCacheKey.${idString}`;
    }
    return '';
  };
}

const makeSelectOrgLists = createCachedSelector(
  [selectAllOrgs, selectAccountRelatedOrgs],
  (orgs, userOrgs) => {
    const acceptedRoles = ['owner', 'admin', 'member'];
    const newlist =
      userOrgs && userOrgs.filter(o => acceptedRoles.includes(o.role));
    return _.compact(
      orgs &&
        orgs.map(o => {
          const data = newlist.find(n => n.orgId === o.id);
          if (data) {
            const { orgId, ...rest } = newlist.find(n => n.orgId === o.id);
            return {
              ...o,
              ...rest,
            };
          }
          return null;
        }),
    );
  },
)({
  keySelectorCreator: makeSelectOrgListsCacheKey,
});

const makeSelectUserPersonAccount = createCachedSelector(
  [selectAccount, selectPerson],
  (accountRes, person) => ({
    ...accountRes,
    ...person,
  }),
)(() => 'makeSelectUserPersonAccount');
export const COGNITO_ACCOUNT_ATTRIBUTES = {
  id: 'id',
};

export {
  selectCurrentUserAccount,
  selectCognitoPathDataStore,
  selectCachedAvatar,
  selectCurrentUserOrgs,
  selectOrgs,
  selectCurrentLoginPerson,
  selectAccountAttribute,
  selectCognitoPersonAttribute,
  selectCognitoAvatar,
  selectAccRelatedOrgs,
  makeSelectOrgLists,
  makeSelectUserPersonAccount,
};
