import { INVITATION_STORE_SELECTORS } from 'datastore/invitationStore/selectors';
import { COGNITO_STORE_SELECTOR } from 'datastore/stormPathStore/selectors.resaga';

export const GET_MY_USER_ID = {
  value: {
    userId: COGNITO_STORE_SELECTOR.userId.value,
  },
};

export const GET_USER_NODES = {
  value: {
    linkedNodeId: ({ userNodeIds }) =>
      INVITATION_STORE_SELECTORS.userNodeUserNodes({ id: userNodeIds[0] }),
  },
};

export const GET_NODE_ID = {
  value: {
    participantId: ({ linkedNodeId }) =>
      INVITATION_STORE_SELECTORS.userNodeNodeId({ id: linkedNodeId }),
  },
};

export const CONFIG = {
  value: {},
};
