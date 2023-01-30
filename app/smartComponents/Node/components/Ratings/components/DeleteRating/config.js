import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

export const CONFIG = {
  value: {
    parentNodeId: NODE_STORE_SELECTORS.parentNodeId,
    participantId: NODE_STORE_SELECTORS.firstParticipant,
  },
  setValue: {},
};
