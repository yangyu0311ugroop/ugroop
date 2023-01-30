import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS } from 'datastore/templateManagementStore/selectors';

export const CONFIG = {
  value: {
    firstName: ({ id }) =>
      NODE_STORE_SELECTORS.nodeProp({ id, path: NODE_PATHS.firstName }),
    email: ({ id }) =>
      NODE_STORE_SELECTORS.nodeProp({ id, path: NODE_PATHS.email }),
    linkedUserEmail: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.LINKED_USER.email,
  },
  setValue: {
    linkedUserEmail: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.LINKED_USER.email,
    linkedUserId: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.LINKED_USER.id,
    linkedUserToken: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.LINKED_USER.token,
  },
};
