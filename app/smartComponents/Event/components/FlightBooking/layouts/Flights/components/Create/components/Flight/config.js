import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { EVENT_STORE_DATA_SELECTORS } from 'datastore/eventStore/selectors';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

export const CONFIG_1 = {
  value: {
    dataId: NODE_STORE_SELECTORS.eventDataId,
  },
};

export const CONFIG_2 = {
  value: {
    type: ({ dataId: id }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({
        id,
        path: EVENT_PATHS.type,
      }),
    subtype: ({ dataId: id }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({
        id,
        path: EVENT_PATHS.subtype,
      }),
    bookingId: ({ dataId: id }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({
        id,
        path: EVENT_PATHS.flightBooking,
      }),
  },
};
