import { COORDINATE_DATA_STORE_SELECTORS } from 'datastore/coordinateDataStore/selectors';
import { COGNITO_STORE_SELECTORS } from 'datastore/stormPathStore/selectors';

export const CONFIG = {
  value: {
    me: COGNITO_STORE_SELECTORS.myId,
    lastAccess: COORDINATE_DATA_STORE_SELECTORS.lastAccess,
  },
};
