import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

export const CONFIG = {
  value: {
    participantIds: NODE_STORE_SELECTORS.calculatedParticipants,
  },
};
