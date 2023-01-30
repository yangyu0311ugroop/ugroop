import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import {
  TEMPLATE_MANAGEMENT_VIEWSTORE,
  DEFAULT_ROOM_FILTER,
} from 'appConstants';
import _ from 'lodash';
import { RESAGA_HELPERS } from '../../../../utils/helpers/resaga';
import { NODE_STORE_SELECTORS } from '../../../../datastore/nodeStore/selectors';
import { TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS } from '../../../../datastore/templateManagementStore/selectors';
export const CONFIG = {
  value: {
    sortMode: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'roomSortMode'],
    rooms: RESAGA_HELPERS.subscribeIfNotGiven(
      RESAGA_HELPERS.mapToId(NODE_STORE_SELECTORS.rooms, 'id'),
      'rooms',
    ),
    paxLabel: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.paxLabel,
    selectedRoomType: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'selectedRoomType'],
  },
};
export const CONFIG_2 = {
  value: {
    filteredRooms: {
      keyPath: ({ rooms = [] }) =>
        rooms.map(id => NODE_STORE_SELECTORS.roomType({ id })),
      cacheKey: ({ rooms, selectedRoomType, cacheKey = 'roomsByType' }) =>
        `filteredRooms.${cacheKey}.${selectedRoomType}.${
          rooms ? rooms.toString() : null
        }`,
      props: ({ rooms, selectedRoomType }) => ({ rooms, selectedRoomType }),
      getter: (...values) => {
        const props = values.pop();
        const { rooms = [], selectedRoomType = [DEFAULT_ROOM_FILTER] } = props;
        const filtered = _.compact(rooms)
          .map((id, index) => ({ id, romType: values[index] }))
          .filter(
            room =>
              selectedRoomType.includes(room.romType) ||
              (!selectedRoomType.length ||
                selectedRoomType.includes(DEFAULT_ROOM_FILTER)),
          );
        return _.sortBy(filtered, ['romType']).map(({ id }) => id);
      },
    },
  },
  setValue: {
    sortMode: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'roomSortMode'],
    ...PORTAL_HELPERS.setValue,
  },
};
