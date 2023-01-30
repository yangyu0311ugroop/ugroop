import { COGNITO_STORE_SELECTOR } from 'datastore/stormPathStore/selectors.resaga';

export const CONFIG = {
  value: {
    userId: COGNITO_STORE_SELECTOR.userId.value,
  },
};
