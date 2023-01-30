import { INVITATION_STORE_SELECTORS } from 'datastore/invitationStore/selectors';
import { TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS } from 'datastore/templateManagementStore/selectors';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

export const CONFIG = {
  value: {
    userId: {
      keyPath: [
        INVITATION_STORE_SELECTORS.userNodeUserId,
        TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.TOUR_CONNECTION.userId,
      ],
      getter: (invitation, tourConnection) => invitation || tourConnection,
    },
    ownerUserId: NODE_STORE_SELECTORS.createdBy,
  },
};
