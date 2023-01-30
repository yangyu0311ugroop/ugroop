import { COGNITO_ACCOUNTSTORE } from 'appConstants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

export const CONFIG = {
  value: {
    sharedWith: NODE_STORE_SELECTORS.sharedWith,
    type: NODE_STORE_SELECTORS.type,
    createdBy: NODE_STORE_SELECTORS.createdBy,
    printMode: NODE_STORE_SELECTORS.printMode,

    me: [COGNITO_ACCOUNTSTORE, 'account', 'id'],
  },
  setValue: {},
};
