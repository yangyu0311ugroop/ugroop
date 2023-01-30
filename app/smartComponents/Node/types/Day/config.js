import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import {
  USER_USERS_FIELDS,
  USER_USERS_SELECTOR_CREATOR,
} from 'datastore/userStore/selectors';

export const CONFIG = {
  value: {
    parentType: ({ parentNodeId }) =>
      NODE_STORE_SELECTORS.type({ id: parentNodeId }),
    userId: NODE_STORE_SELECTORS.lastModifiedBy,
    description: NODE_STORE_SELECTORS.description,
    trail: NODE_STORE_SELECTORS.trail,
    photo: NODE_STORE_SELECTORS.photoId,
    startTime: NODE_STORE_SELECTORS.calculatedStartTime,
    eids: NODE_STORE_SELECTORS.calculatedEventIds,
    dayDate: NODE_STORE_SELECTORS.calculatedStartTimeValue,
  },
};

export const USER_USERS_CONFIG = {
  value: {
    orgId: ({ userId }) =>
      USER_USERS_SELECTOR_CREATOR(USER_USERS_FIELDS.orgId)({ id: userId }),
  },
};
