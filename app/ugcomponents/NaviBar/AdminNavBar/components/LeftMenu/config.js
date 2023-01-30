import {
  COGNITO_ACCOUNTSTORE,
  TEMPLATE_MANAGEMENT_DATASTORE,
} from 'appConstants';
import { DASHBOARD_CURRENT_HOME_PAGE } from 'containers/Dashboard/config';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { ORGANISATION_STORE_SELECTORS } from 'datastore/orgStore/selectors';
import { COGNITO_STORE_SELECTORS } from 'datastore/stormPathStore/selectors';
import { USER_STORE_SELECTORS } from 'datastore/userStore/selectors';

export const CONFIG_ID = {
  value: {
    userId: COGNITO_STORE_SELECTORS.myId,
  },
  setValue: {},
};

export const drawerKeepOpen = [
  COGNITO_ACCOUNTSTORE,
  'userSettings',
  'navigationDrawer',
  'drawerKeepOpen',
];

export const chatDrawerKeepOpen = [
  COGNITO_ACCOUNTSTORE,
  'userSettings',
  'navigationDrawer',
  'chatDrawerKeepOpen',
];

export const CONFIG = {
  value: {
    organisations: ({ userId }) =>
      USER_STORE_SELECTORS.organisations({ id: userId }),
    organisationIdFromNode: NODE_STORE_SELECTORS.organisationId,
    organisationIdFromURL: {
      getter: ORGANISATION_STORE_SELECTORS.organisationIdFromURL,
    },
    drawerKeepOpen,
    chatDrawerKeepOpen,
    homepage: DASHBOARD_CURRENT_HOME_PAGE,
  },
  setValue: {
    drawerKeepOpen,
    chatDrawerKeepOpen,
    id: [TEMPLATE_MANAGEMENT_DATASTORE, 'id'],
  },
};
