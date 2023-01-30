import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { TEMPLATE_MANAGEMENT_VIEWSTORE as TEMPLATE_VIEW } from 'appConstants';
import {
  USER_USERS_FIELDS,
  USER_USERS_SELECTOR_CREATOR,
} from 'datastore/userStore/selectors';

export const CONFIG = {
  value: {
    parentType: ({ parentNodeId }) =>
      NODE_STORE_SELECTORS.type({ id: parentNodeId }),
    parentIndex: ({ parentNodeId }) =>
      NODE_STORE_SELECTORS.index({ id: parentNodeId }),
    userId: NODE_STORE_SELECTORS.lastModifiedBy,
    description: NODE_STORE_SELECTORS.description,
  },
};

export const USER_USERS_CONFIG = {
  value: {
    orgId: ({ userId }) =>
      USER_USERS_SELECTOR_CREATOR(USER_USERS_FIELDS.orgId)({ id: userId }),
  },
  setValue: {
    selectDayId: [TEMPLATE_VIEW, 'selectedId'],
  },
};
