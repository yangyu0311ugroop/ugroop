import { DASHBOARD_VIEW_STORE, NODE_STORE } from 'appConstants';
import { COGNITO_STORE_SELECTORS } from 'datastore/stormPathStore/selectors';

export const USER_ID_CONFIG = {
  value: {
    userId: COGNITO_STORE_SELECTORS.myId,
  },
};

export const CONFIG = {
  value: {},
  setValue: {
    timeNodes: [NODE_STORE, 'timeNodes'],
    times: [DASHBOARD_VIEW_STORE, 'times'],
  },
};
