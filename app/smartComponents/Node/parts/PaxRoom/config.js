import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { TEMPLATE_MANAGEMENT_DATASTORE } from 'appConstants';

export const CONFIG = {
  value: {
    templateId: [TEMPLATE_MANAGEMENT_DATASTORE, 'id'],
    currentParticipantRooms: NODE_STORE_SELECTORS.rooms,
  },
};

export const CONFIG2 = {
  value: {
    participantRooms: {
      keyPath: ({ templateId }) =>
        NODE_STORE_SELECTORS.rooms({ id: templateId }),
      getter: (rooms = [], { currentParticipantRooms = [] }) =>
        currentParticipantRooms.filter(item => rooms.includes(item)),
    },
  },
  setValue: {},
};
