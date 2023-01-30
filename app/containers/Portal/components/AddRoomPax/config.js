import { TEMPLATE_MANAGEMENT_VIEWSTORE } from 'appConstants';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';
import dropRight from 'lodash/dropRight';
import { PARTICIPANT_STATUSES } from 'utils/constants/nodes';
import { flatten } from 'lodash';

export const TEMPLATE_CONFIG = {
  // value: { id: [TEMPLATE_MANAGEMENT_DATASTORE, 'id'] },
  value: {},
};
export const CONFIG = {
  value: {
    participantIds: RESAGA_HELPERS.mapToId(
      NODE_STORE_SELECTORS.calculatedParticipants,
      'parentNodeId',
    ),
    occupantIds: NODE_STORE_SELECTORS.participants,
    rooms: RESAGA_HELPERS.mapToId(NODE_STORE_SELECTORS.rooms, 'parentNodeId'),
    guestCount: NODE_STORE_SELECTORS.guestCount,
  },
  setValue: {},
};

export const CONFIG2 = {
  value: {
    confirmedParticipantIds: NODE_STORE_SELECTORS.filterByStatuses({
      ids: 'participantIds',
      statuses: [PARTICIPANT_STATUSES.confirmed],
    }),
    allRoomPaxIds: {
      keyPath: ({ rooms = [] }) =>
        rooms.map(id => NODE_STORE_SELECTORS.participants({ id })),
      props: ({ rooms }) => rooms,
      getter: (...args) => {
        const relatedIds = dropRight(args, 1);
        const allIds = flatten(relatedIds);
        return allIds;
      },
    },
  },
  setValue: {
    selectedRoomId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'selectedRoomId'],
    layout: RESAGA_HELPERS.mapToId(
      NODE_STORE_SELECTORS.calculatedLayout,
      'parentNodeId',
    ),
    ...PORTAL_HELPERS.setValue,
  },
};
