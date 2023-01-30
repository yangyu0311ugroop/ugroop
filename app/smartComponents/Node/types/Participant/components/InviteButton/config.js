import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { PERSON_STORE_SELECTORS } from 'datastore/personDataStore/selectors';
import { TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS } from 'datastore/templateManagementStore/selectors';
import first from 'lodash/first';
import { TEMPLATE_API, GET_PERSON } from 'apis/constants';

export const CONFIG = {
  value: {
    personId: {
      keyPath: ({ id }) =>
        NODE_STORE_SELECTORS.nodeProp({
          id,
          path: NODE_PATHS.calculatedPeople,
        }),
      getter: people => first(people),
    },
    firstName: ({ id }) =>
      NODE_STORE_SELECTORS.nodeProp({ id, path: NODE_PATHS.firstName }),
    lastName: ({ id }) =>
      NODE_STORE_SELECTORS.nodeProp({ id, path: NODE_PATHS.lastName }),
    personEmail: ({ id }) =>
      NODE_STORE_SELECTORS.nodeProp({ id, path: NODE_PATHS.email }),
    dateOfBirth: ({ id }) =>
      NODE_STORE_SELECTORS.nodeProp({ id, path: NODE_PATHS.dateOfBirth }),
    personType: ({ id }) =>
      NODE_STORE_SELECTORS.nodeProp({ id, path: NODE_PATHS.personType }),
    parentNodeId: NODE_STORE_SELECTORS.parentNodeId,
    linkedUserId: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.LINKED_USER.id,
  },
  isLoading: {
    isFetchPersonLoading: [TEMPLATE_API, GET_PERSON],
  },
};

export const CONFIG_2 = {
  value: {
    participantEmail: ({ personId }) =>
      PERSON_STORE_SELECTORS.email({ id: personId }),
  },
  setValue: {
    calculatedPeople: ({ id }) =>
      NODE_STORE_SELECTORS.nodeProp({ id, path: NODE_PATHS.calculatedPeople }),
    linkedUserEmail: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.LINKED_USER.email,
    linkedUserId: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.LINKED_USER.id,
    linkedUserToken: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.LINKED_USER.token,
  },
};
