import { URL_HELPERS } from 'appConstants';
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';
import utils from './utils';
import setup from './setup';

export const locationHelper = locationHelperBuilder({});

const isAuthenticated = state => !!utils.selectAccount(state);
const isNotAuthenticated = state => !utils.selectAccount(state);

const authenticatedRedirect = (state, ownProps) => {
  const query = locationHelper.getRedirectQueryParam(ownProps);
  if (query) return query;

  // otherwise, need to decide whether redirect user to FirstTimeSetup or Admin
  return setup.isSetupDone(state) ? URL_HELPERS.myTours() : '/admin/setup';
};

export default {
  isNotAuthenticated,
  isAuthenticated,
  authenticatedRedirect,
};
