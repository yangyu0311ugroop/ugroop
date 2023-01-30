import { TEMPLATE_MANAGEMENT_VIEWSTORE } from 'appConstants';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { PARTICIPANT_STATUSES } from 'utils/constants/nodes';
import dropRight from 'lodash/dropRight';
import compact from 'lodash/compact';
import { flatten } from 'lodash';
import takeRight from 'lodash/takeRight';
import { TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS } from 'datastore/templateManagementStore/selectors';

export const CONFIG = {
  value: {
    rooms: NODE_STORE_SELECTORS.rooms,
    participantIds: NODE_STORE_SELECTORS.calculatedParticipants,
    selectedRiskId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'selectedRoomId'],
    selectedRoomType: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'selectedRoomType'],
    paxLabel: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.paxLabel,
  },
};

export const CONFIG1 = {
  value: {
    confirmedParticipantIds: NODE_STORE_SELECTORS.filterByStatuses({
      ids: 'participantIds',
      statuses: [PARTICIPANT_STATUSES.confirmed],
    }),
    roomValues: {
      keyPath: ({ rooms = [] }) =>
        rooms.map(id => NODE_STORE_SELECTORS.participants({ id })),
      cacheKey: ({ rooms }) =>
        `Rooms.RoomSummary.Summary${
          rooms ? rooms.toString() : null
        }.roomValues`,
      props: ({ rooms }) => rooms,
      getter: (...args) => {
        const relatedIds = dropRight(args, 1);
        const [ids] = takeRight(args, 1);
        const emptyRoomIds = ids.filter(
          (id, index) => !relatedIds[index] || !relatedIds[index].length,
        );
        const allIds = flatten(relatedIds || []);
        return {
          allRoomPaxIds: compact(allIds),
          emptyRoomIds: compact(emptyRoomIds),
        };
      },
      spreadObject: true,
    },
    roomTypes: {
      keyPath: ({ rooms = [] }) =>
        rooms.map(id => NODE_STORE_SELECTORS.roomType({ id })),
      props: ({ rooms }) => rooms,
      getter: (...args) => dropRight(args, 1),
    },
    selectedRoomId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'selectedRoomId'],
    showUnAllocatedRooms: [
      TEMPLATE_MANAGEMENT_VIEWSTORE,
      'showUnAllocatedRooms',
    ],
  },
  setValue: {
    selectedRoomId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'selectedRoomId'],
    layout: NODE_STORE_SELECTORS.calculatedLayout,
    selectedRoomType: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'selectedRoomType'],
    showUnAllocatedRooms: [
      TEMPLATE_MANAGEMENT_VIEWSTORE,
      'showUnAllocatedRooms',
    ],
    ...PORTAL_HELPERS.setValue,
  },
};
