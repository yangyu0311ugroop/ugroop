import { ORGANISATION_STORE_SELECTORS } from 'datastore/orgStore/selectors';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { TEMPLATE_MANAGEMENT_VIEWSTORE } from 'appConstants';
import { COGNITO_STORE_SELECTORS } from '../../../../datastore/stormPathStore/selectors';
export const CONFIG_ORGANISATION_ID = {
  value: {
    id: {
      getter: ORGANISATION_STORE_SELECTORS.organisationIdFromURL,
    },
    expandedParentChecklistId: [
      TEMPLATE_MANAGEMENT_VIEWSTORE,
      'expandedParentChecklistId',
    ],
    userId: COGNITO_STORE_SELECTORS.myId,
  },
};
export const CONFIG_ROOTNODE_ID = {
  value: {
    rootNodeId: ORGANISATION_STORE_SELECTORS.rootNodeId,
  },
};
export const CONFIG = {
  value: {
    parentChecklists: ({ rootNodeId }) =>
      NODE_STORE_SELECTORS.parentChecklists({ parentNodeId: rootNodeId }),
  },
  setValue: {},
  isLoading: {},
};
