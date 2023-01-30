import { PERSON_DATA_STORE, USER_DATA_STORE } from 'appConstants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { PERSON_STORE_HELPERS } from 'datastore/personDataStore/helpers';
import { PERSON_STORE_SELECTORS } from 'datastore/personDataStore/selectors';
import { USER_STORE_SELECTORS } from 'datastore/userStore/selectors';

export const CONFIG = {
  value: {
    email: PERSON_STORE_HELPERS.selectPersonProperty({
      [USER_DATA_STORE]: USER_STORE_SELECTORS.email,
      [PERSON_DATA_STORE]: PERSON_STORE_SELECTORS.email,
    }),
    type: ({ nodeId }) => NODE_STORE_SELECTORS.type({ id: nodeId }),
  },
  setValue: {},
};
