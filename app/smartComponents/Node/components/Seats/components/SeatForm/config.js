import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';

export const CONFIG = {
  value: {
    seatNumber: RESAGA_HELPERS.mapToId(
      NODE_STORE_SELECTORS.content,
      'seatNodeId',
    ),
    participantId: RESAGA_HELPERS.mapToId(
      NODE_STORE_SELECTORS.firstParticipant,
      'seatNodeId',
    ),
  },
  setValue: {},
};
