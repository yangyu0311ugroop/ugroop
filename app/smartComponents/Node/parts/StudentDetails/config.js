import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { ARRAY_HELPERS } from 'utils/helpers/arrays';
import { PERSON_STORE_SELECTORS } from 'datastore/personDataStore/selectors';
import { USER_STORE_SELECTORS } from 'datastore/userStore/selectors';

export const CONFIG_1 = {
  value: {
    nodeValues: {
      keyPath: ({ personId: id }) =>
        PERSON_STORE_SELECTORS.studentDetails({ id }),
      cacheKey: ({ personId: id }) =>
        `Node.parts.StudentDetails.${id}.nodeValues`,
      props: null,
      getter: ARRAY_HELPERS.uniq,
    },
    userPersonId: USER_STORE_SELECTORS.id,
    personType: ({ id }) =>
      NODE_STORE_SELECTORS.nodeProp({ id, path: NODE_PATHS.personType }),
  },
};

export const CONFIG_2 = {
  value: {
    userValues: {
      keyPath: ({ userPersonId: id }) =>
        PERSON_STORE_SELECTORS.studentDetails({ id }),
      cacheKey: ({ userPersonId: id }) =>
        `Node.parts.StudentDetails.${id}.userValues`,
      props: null,
      getter: ARRAY_HELPERS.uniq,
    },
  },
};
