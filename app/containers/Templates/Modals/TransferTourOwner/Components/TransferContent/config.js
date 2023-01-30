import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { COGNITO_ACCOUNTSTORE } from 'appConstants';

export const CONFIG = {
  value: {
    createdBy: NODE_STORE_SELECTORS.createdBy,
    me: [COGNITO_ACCOUNTSTORE, 'account', 'id'],
  },
  setValue: {},
};
