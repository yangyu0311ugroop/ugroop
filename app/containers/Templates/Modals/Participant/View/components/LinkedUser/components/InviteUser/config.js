import { NODE_PATHS } from 'datastore/nodeStore/constants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { INVITATION_STORE_SELECTORS } from 'datastore/invitationStore/selectors';
import { TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS } from 'datastore/templateManagementStore/selectors';
import { TEMPLATE_MANAGEMENT_VIEWSTORE } from '../../../../../../../../../appConstants';
export const CONFIG = {
  value: {
    firstName: ({ id }) =>
      NODE_STORE_SELECTORS.nodeProp({ id, path: NODE_PATHS.firstName }),
    lastName: ({ id }) =>
      NODE_STORE_SELECTORS.nodeProp({ id, path: NODE_PATHS.lastName }),
    email: ({ id }) =>
      NODE_STORE_SELECTORS.nodeProp({ id, path: NODE_PATHS.email }),
    ownerId: ({ templateId: id }) => NODE_STORE_SELECTORS.createdBy({ id }),
    shareStatus: ({ linkedUserToken: id }) =>
      INVITATION_STORE_SELECTORS.shareStatus({ id }),
    linkedUserMessage:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.LINKED_USER.message,
    invitationDetailOpen:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.INVITATION_DETAIL.open,
  },
  setValue: {
    linkedUserMessage:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.LINKED_USER.message,
    invitationDetailOpen:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.INVITATION_DETAIL.open,
    linkedUserEmail: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.LINKED_USER.email,
    nodeShareSuccess: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'nodeShareSuccessData'],
  },
};
