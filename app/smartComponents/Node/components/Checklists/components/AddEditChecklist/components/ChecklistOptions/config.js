import { FOLDER_API, GET_CHECKLISTS } from 'apis/constants';
import { COGNITO_ACCOUNTSTORE } from 'appConstants';

export const CONFIG = {
  value: {
    accountParentNodeId: [COGNITO_ACCOUNTSTORE, 'account', 'rootnodeid'],
  },
  setValue: {},
  isLoading: {
    isLoading: {
      keyPath: [[FOLDER_API, GET_CHECKLISTS]],
      getter: fetchChecklist => fetchChecklist,
    },
  },
};
