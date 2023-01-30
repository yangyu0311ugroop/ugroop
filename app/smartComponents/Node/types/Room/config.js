import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { sorter } from 'containers/Templates/Modals/ParticipantList/utils';
import dropRight from 'lodash/dropRight';
import { RESAGA_HELPERS } from '../../../../utils/helpers/resaga';
import { TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS } from '../../../../datastore/templateManagementStore/selectors';
import { TEMPLATE_MANAGEMENT_VIEWSTORE } from '../../../../appConstants';

export const CONFIG = {
  value: {
    createdBy: NODE_STORE_SELECTORS.createdBy,
    occupantIds: NODE_STORE_SELECTORS.participants,
    parentNodeId: RESAGA_HELPERS.subscribeIfNotGiven(
      RESAGA_HELPERS.mapToId(NODE_STORE_SELECTORS.parentNodeId, 'id'),
      'parentNodeId',
    ),
    guestCount: NODE_STORE_SELECTORS.guestCount,
    bedCount: NODE_STORE_SELECTORS.bedCount,
    roomType: NODE_STORE_SELECTORS.roomType,
    paxLabel: TEMPLATE_MANAGEMENT_VIEWSTORE_SELECTORS.paxLabel,
    selectedRoomType: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'selectedRoomType'],
  },
};

export const CONFIG2 = {
  value: {
    occupantIds: sorter('occupantIds', 'all participants'),
    roomTypes: {
      keyPath: ({ rooms = [] }) =>
        rooms.map(id => NODE_STORE_SELECTORS.roomType({ id })),
      cacheKey: ({ rooms }) =>
        `Types.Room.room${rooms ? rooms.toString() : null}.rooms`,
      props: ({ rooms }) => rooms,
      getter: (...args) => dropRight(args, 1),
    },
  },
};

export const CONFIG3 = {
  value: {
    ageTypeValues: {
      keyPath: ({ occupantIds = [] }) =>
        occupantIds.map(id => NODE_STORE_SELECTORS.ageType({ id })),
      cacheKey: ({ occupantIds }) =>
        `Types.Room.ageType${
          occupantIds ? occupantIds.toString() : null
        }.ageTypeValues`,
      props: ({ occupantIds }) => occupantIds,
      getter: (...args) => dropRight(args, 1),
    },
  },
  setValue: {
    selectedRoomType: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'selectedRoomType'],
    ...PORTAL_HELPERS.setValue,
  },
};
