import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { COGNITO_STORE_SELECTORS } from 'datastore/stormPathStore/selectors';

export const CONFIG = {
  value: {
    organisationId: NODE_STORE_SELECTORS.organisationId,
    createdBy: NODE_STORE_SELECTORS.createdBy,
    me: COGNITO_STORE_SELECTORS.myId,
  },
  setValue: {},
};
