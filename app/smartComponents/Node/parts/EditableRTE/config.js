import { NODE_API, UPDATE_NODE } from 'apis/constants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { TEMPLATE_MANAGEMENT_DATASTORE } from 'appConstants';

export const TEMPLATE_ID = {
  value: {
    templateId: [TEMPLATE_MANAGEMENT_DATASTORE, 'id'],
  },
};

export const CONFIG = {
  value: {
    content: ({ templateId, hashKeyDesc, ...rest }) =>
      hashKeyDesc
        ? NODE_STORE_SELECTORS.hashkeyDescription({ id: templateId })
        : NODE_STORE_SELECTORS.viaNodePath(rest),
    type: NODE_STORE_SELECTORS.type,
  },
  setValue: {},
  isLoading: {
    updatingNode: [NODE_API, UPDATE_NODE],
  },
};
