import { PERSON_PATHS } from 'datastore/personDataStore/constants';
import { PERSON_STORE_SELECTORS } from 'datastore/personDataStore/selectors';
import {
  USER_PASSPORTS_FIELDS,
  USER_PASSPORTS_SELECTOR_CREATOR,
} from 'datastore/userStore/selectors';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';

export const CONFIG_1 = {
  value: {
    personId: RESAGA_HELPERS.subscribeIfNotGiven(
      USER_PASSPORTS_SELECTOR_CREATOR(USER_PASSPORTS_FIELDS.personId),
      'personId',
    ),
  },
};

export const CONFIG_2 = {
  value: {
    personUserId: ({ personId: id }) =>
      PERSON_STORE_SELECTORS.personProp({ id, path: PERSON_PATHS.userId }),
    personNodeId: ({ personId: id }) =>
      PERSON_STORE_SELECTORS.personProp({ id, path: PERSON_PATHS.nodeId }),
  },
};
