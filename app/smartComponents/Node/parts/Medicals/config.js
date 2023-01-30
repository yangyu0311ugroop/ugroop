import { ARRAY_HELPERS } from 'utils/helpers/arrays';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { PERSON_STORE_SELECTORS } from 'datastore/personDataStore/selectors';
import { USER_STORE_SELECTORS } from 'datastore/userStore/selectors';

export const CONFIG_1 = {
  value: {
    children: NODE_STORE_SELECTORS.children,
    calculatedSeverity: NODE_STORE_SELECTORS.calculatedMedicalSeverity,
    nodeValues: {
      keyPath: ({ personId: id }) => PERSON_STORE_SELECTORS.medicals({ id }),
      cacheKey: ({ personId: id }) => `Node.parts.Medicals.${id}.nodeValues`,
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
        PERSON_STORE_SELECTORS.medicals({ id }),
      cacheKey: ({ userPersonId: id }) =>
        `Node.parts.Medicals.${id}.userValues`,
      props: null,
      getter: ARRAY_HELPERS.uniq,
    },
  },
};
