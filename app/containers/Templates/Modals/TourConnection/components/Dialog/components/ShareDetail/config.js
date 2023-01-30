import { INVITATION_STORE_SELECTORS } from 'datastore/invitationStore/selectors';

export const CONFIG = {
  value: {
    userId: INVITATION_STORE_SELECTORS.userNodeUserId,
    nodeId: INVITATION_STORE_SELECTORS.userNodeNodeId,
  },
};
