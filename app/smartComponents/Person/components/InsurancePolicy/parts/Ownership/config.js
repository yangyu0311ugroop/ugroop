import { PERSON_PATHS } from 'datastore/personDataStore/constants';
import { PERSON_STORE_SELECTORS } from 'datastore/personDataStore/selectors';

export const CONFIG_1 = {
  value: {
    personNodeId: ({ personId: id }) =>
      PERSON_STORE_SELECTORS.personProp({ id, path: PERSON_PATHS.nodeId }),
  },
};
