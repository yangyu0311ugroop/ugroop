import { INSERT_AFTER, INSERT_BEFORE, NODE_API } from 'apis/constants';

export const CONFIG = {
  value: {},
  setValue: {},
  isLoading: {
    isInsertBeforeLoading: [NODE_API, INSERT_BEFORE],
    isInsertAfterLoading: [NODE_API, INSERT_AFTER],
  },
};
