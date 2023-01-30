import first from 'lodash/first';
import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

export const CONFIG = {
  value: {
    personId: {
      keyPath: ({ id }) =>
        NODE_STORE_SELECTORS.nodeProp({
          id,
          path: NODE_PATHS.calculatedPeople,
        }),
      props: ({ personId }) => personId,
      getter: (people, personId) => personId || first(people),
    },
    firstName: ({ id }) =>
      NODE_STORE_SELECTORS.nodeProp({ id, path: NODE_PATHS.firstName }),
    lastName: ({ id }) =>
      NODE_STORE_SELECTORS.nodeProp({ id, path: NODE_PATHS.lastName }),
  },
};
