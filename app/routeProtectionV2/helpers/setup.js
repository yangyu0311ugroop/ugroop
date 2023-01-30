import { URL_HELPERS } from 'appConstants';
import lodash from 'lodash';
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';
import utils from './utils';

export const locationHelper = locationHelperBuilder({});

const isOrgDone = state => {
  const accountRelatedOrg = utils.selectAccountRelatedOrg(state);
  if (!accountRelatedOrg) return false;
  return utils.hasOrgSetup(accountRelatedOrg);
};

const isPersonDone = state => {
  const account = utils.selectAccount(state);
  if (!account) return false;

  return lodash.has(account, 'personSync');
};

const isSetupDone = state => setupUtils.isPersonDone(state);

const isSetupRequired = state => !isSetupDone(state);
const isFirstStep = state => !setupUtils.isOrgDone(state);

const isLastStep = state =>
  setupUtils.isOrgDone(state) && !setupUtils.isPersonDone(state);

const finishSetupRedirect = (_, ownProps) =>
  locationHelper.getRedirectQueryParam(ownProps) || URL_HELPERS.index();

const requireOrgSubscriptionOwner = (state, { id }) =>
  utils.hasOrgSubscriptionOwner(id, state);

const doneOrgSubscriptionOwner = (state, { match, id }) =>
  !requireOrgSubscriptionOwner(state, { match, id });

const requirePersonSubscriptionOwner = (state, { userId }) =>
  utils.hasPersonSubscriptionOwner(userId, state);

const donePersonSubscriptionOwner = (state, { userId }) =>
  !utils.hasPersonSubscriptionOwner(userId, state);

const doneOrgSubscriptionRedirect = (_, { id }) => `/orgs/${id}/tours`;

export const setupUtils = { isOrgDone, isPersonDone };

export default {
  isSetupDone,
  isSetupRequired,
  isFirstStep,
  isLastStep,
  finishSetupRedirect,
  requireOrgSubscriptionOwner,
  requirePersonSubscriptionOwner,
  doneOrgSubscriptionRedirect,
  donePersonSubscriptionOwner,
  doneOrgSubscriptionOwner,
};
