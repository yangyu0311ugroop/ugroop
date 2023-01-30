import { COGNITO_ACCOUNTSTORE } from 'appConstants';

export const DASHBOARD_CURRENT_PAGE = [
  COGNITO_ACCOUNTSTORE,
  'userSettings',
  'dashboard',
  'page',
];
export const DASHBOARD_CURRENT_HOME_PAGE = [
  COGNITO_ACCOUNTSTORE,
  'userSettings',
  'dashboard',
  'homepage',
];

export const CONFIG = {
  value: {
    page: DASHBOARD_CURRENT_PAGE,
    homepage: DASHBOARD_CURRENT_HOME_PAGE,
  },
  setValue: {
    page: DASHBOARD_CURRENT_PAGE,
    homepage: DASHBOARD_CURRENT_HOME_PAGE,
  },
};
