import { COGNITO_ACCOUNTSTORE } from 'appConstants';
import { DASHBOARD_CURRENT_PAGE } from 'containers/Dashboard/config';

export const drawerKeepOpen = [
  COGNITO_ACCOUNTSTORE,
  'userSettings',
  'navigationDrawer',
  'drawerKeepOpen',
];

export const CONFIG = {
  value: {
    userId: [COGNITO_ACCOUNTSTORE, 'account', 'id'],
    drawerKeepOpen,
    page: DASHBOARD_CURRENT_PAGE,
  },
};
