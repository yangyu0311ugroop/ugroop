import { NODE_API, UPDATE_NODE } from 'apis/constants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

export const CONFIG = {
  value: {
    duration: ({ templateId }) =>
      NODE_STORE_SELECTORS.duration({ id: templateId }),
    childrenCount: ({ tabId }) =>
      NODE_STORE_SELECTORS.childrenCount({ id: tabId }),
  },
  setValue: {},

  isLoading: {
    updatingNode: [NODE_API, UPDATE_NODE],
  },
};
