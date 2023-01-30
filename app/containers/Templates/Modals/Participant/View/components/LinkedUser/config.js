import { INVITATION_STORE_SELECTORS } from 'datastore/invitationStore/selectors';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS } from 'datastore/templateManagementStore/selectors';

export const CONFIG = {
  value: {
    linkedUserPage: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.LINKED_USER.page,
    linkedUserId: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.LINKED_USER.id,
    linkedUserToken: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.LINKED_USER.token,
    userNodeUserId: ({ userNodeId: id }) =>
      INVITATION_STORE_SELECTORS.userNodeUserId({ id }),
    userNodeUserNodeId: ({ userNodeId: id }) =>
      INVITATION_STORE_SELECTORS.userNodeUserNodeId({ id }),
    ownerId: ({ templateId: id }) => NODE_STORE_SELECTORS.createdBy({ id }),
  },
  setValue: {
    linkedUser: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.LINKED_USER.all,
    linkedUserPage: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.LINKED_USER.page,
    invitationDetailOpen:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.INVITATION_DETAIL.open,
    tourConnectionOpen:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.TOUR_CONNECTION.open,
    tourConnectionId:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.TOUR_CONNECTION.id,
    tourConnectionMode:
      TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.TOUR_CONNECTION.mode,
  },
};
