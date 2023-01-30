import { NODE_STORE } from 'appConstants';
import { COGNITO_STORE_SELECTORS } from 'datastore/stormPathStore/selectors';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { ORGANISATION_STORE_SELECTORS } from 'datastore/orgStore/selectors';
import { USER_STORE_SELECTORS } from 'datastore/userStore/selectors';

export const CONFIG = {
  value: {
    userId: USER_STORE_SELECTORS.userId,
    accountId: COGNITO_STORE_SELECTORS.myId,
    content: ({ tabId }) => [NODE_STORE, 'nodes', tabId, 'content'],
    createdBy: ({ tabId }) => NODE_STORE_SELECTORS.createdBy({ id: tabId }),
  },
};

export const MEMBER_CONFIG = {
  value: {
    role: ({ accountId }) =>
      ORGANISATION_STORE_SELECTORS.getMemberRole({ id: accountId }),
    isPrivate: ({ tabId }) => [
      NODE_STORE,
      'nodes',
      tabId,
      'customData',
      'private',
    ],
  },
  setValue: {
    templates: [NODE_STORE, 'nodes'],
    tabs: [NODE_STORE, 'nodes'],
  },
};
