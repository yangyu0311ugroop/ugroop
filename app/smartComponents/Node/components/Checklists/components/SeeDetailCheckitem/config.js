import { TEMPLATE_MANAGEMENT_VIEWSTORE } from 'appConstants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

export const PARENT_CONFIG = {
  value: {
    createdBy: NODE_STORE_SELECTORS.createdBy,
    parentParentNodeId: NODE_STORE_SELECTORS.parentParentNodeId,
  },
};

export const CONFIG = {
  value: {
    createdBy: NODE_STORE_SELECTORS.createdBy,
    parentType: ({ parentParentNodeId }) =>
      NODE_STORE_SELECTORS.type({ id: parentParentNodeId }),
  },
  setValue: {
    seeCheckItemDetail: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'seeCheckItemDetail'],
  },
};
