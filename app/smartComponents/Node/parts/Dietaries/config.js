import { ARRAY_HELPERS } from 'utils/helpers/arrays';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { PERSON_STORE_SELECTORS } from 'datastore/personDataStore/selectors';
import { USER_STORE_SELECTORS } from 'datastore/userStore/selectors';

export const CONFIG_1 = {
  value: {
    children: NODE_STORE_SELECTORS.children,
    nodeValues: {
      keyPath: ({ personId: id }) => PERSON_STORE_SELECTORS.dietaries({ id }),
      cacheKey: ({ personId: id }) => `Node.parts.Dietaries.${id}.nodeValues`,
      props: null,
      getter: ARRAY_HELPERS.uniq,
    },
    userPersonId: USER_STORE_SELECTORS.id,
  },
};

export const CONFIG_2 = {
  value: {
    userValues: {
      keyPath: ({ userPersonId: id }) =>
        PERSON_STORE_SELECTORS.dietaries({ id }),
      cacheKey: ({ userPersonId: id }) =>
        `Node.parts.Dietaries.${id}.userValues`,
      props: null,
      getter: ARRAY_HELPERS.uniq,
    },
  },
};
