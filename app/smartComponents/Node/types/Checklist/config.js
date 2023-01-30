import {
  TEMPLATE_MANAGEMENT_VIEWSTORE,
  COGNITO_ACCOUNTSTORE,
} from 'appConstants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import {
  USER_USERS_FIELDS,
  USER_USERS_SELECTOR_CREATOR,
} from 'datastore/userStore/selectors';

export const CONFIG = {
  value: {
    checklists: NODE_STORE_SELECTORS.checklists, // do not remove, use in renderBody
    content: NODE_STORE_SELECTORS.content,
    completedAt: NODE_STORE_SELECTORS.completedAt,
    status: NODE_STORE_SELECTORS.status,
    parentType: ({ parentNodeId }) =>
      NODE_STORE_SELECTORS.type({ id: parentNodeId }),
    userId: NODE_STORE_SELECTORS.lastModifiedBy,
    createdBy: NODE_STORE_SELECTORS.createdBy,
    me: [COGNITO_ACCOUNTSTORE, 'account', 'id'],
  },
};

export const USER_USERS_CONFIG = {
  value: {
    orgId: ({ userId }) =>
      USER_USERS_SELECTOR_CREATOR(USER_USERS_FIELDS.orgId)({ id: userId }),
  },
};

export const SETTER_CONFIG = {
  setValue: {
    checklists: NODE_STORE_SELECTORS.parentChecklists,
    editChecklistId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'editChecklistId'],
    addChecklistParentId: [
      TEMPLATE_MANAGEMENT_VIEWSTORE,
      'addChecklistParentId',
    ],
    seeChecklistDetail: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'seeChecklistDetail'],
    expandedChecklistId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'expandedChecklistId'],
  },
};
