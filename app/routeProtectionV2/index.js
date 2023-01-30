import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import auth from './helpers/auth';
import setup from './helpers/setup';

// For every page that required Authenticated
export const Authenticated = connectedRouterRedirect({
  redirectPath: '/login',
  authenticatedSelector: auth.isAuthenticated,
  wrapperDisplayName: 'Authenticated',
});

// Read more: https://mjrussell.github.io/redux-auth-wrapper/docs/Getting-Started/ReactRouter4.html#redirecting-from-login
export const NotAuthenticated = connectedRouterRedirect({
  // tell `auth-wrapper` where to redirect if user is logged in
  redirectPath: auth.authenticatedRedirect,
  allowRedirectBack: false,
  authenticatedSelector: auth.isNotAuthenticated,
  wrapperDisplayName: 'NotAuthenticated',
});

// For Authenticated Layout
export const SetupDone = connectedRouterRedirect({
  redirectPath: '/admin/setup',
  allowRedirectBack: false,
  authenticatedSelector: setup.isSetupDone,
  wrapperDisplayName: 'SetupDone',
});

// For First Time Setup Layout
export const FirstTime = connectedRouterRedirect({
  redirectPath: setup.finishSetupRedirect,
  allowRedirectBack: false,
  authenticatedSelector: setup.isSetupRequired,
  wrapperDisplayName: 'FirstTime',
});

// For Setup Organisation, if already set, redirect to setup Person
export const FirstStep = connectedRouterRedirect({
  redirectPath: '/admin/setup/person',
  allowRedirectBack: false,
  authenticatedSelector: setup.isFirstStep,
  wrapperDisplayName: 'FirstStep',
});

// For Setup Person, if organisation not set, redirect back there
export const LastStep = connectedRouterRedirect({
  redirectPath: '/admin/setup/organisation',
  allowRedirectBack: false,
  authenticatedSelector: setup.isLastStep,
  wrapperDisplayName: 'LastStep',
});

export const DonePersonSubscriptionOwner = connectedRouterRedirect({
  redirectPath: '/my-tours/personal',
  allowRedirectBack: false,
  authenticatedSelector: setup.donePersonSubscriptionOwner,
  wrapperDisplayName: 'PersonSubscription',
});

export const DoneOrgSubscriptionOwner = connectedRouterRedirect({
  redirectPath: setup.doneOrgSubscriptionRedirect,
  allowRedirectBack: false,
  authenticatedSelector: setup.doneOrgSubscriptionOwner,
  wrapperDisplayName: 'OrgSubscription',
});
