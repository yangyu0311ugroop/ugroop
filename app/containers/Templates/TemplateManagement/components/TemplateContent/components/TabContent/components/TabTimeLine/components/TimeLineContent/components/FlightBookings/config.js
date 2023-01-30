import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { EVENT_FLIGHT } from 'utils/modelConstants';
import {
  EVENT_STORE_DATA_SELECTORS,
  EVENT_STORE_VIEW_SELECTORS,
} from 'datastore/eventStore/selectors';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

// TODO: Start selecting from a well-maintained id array in template.calculated.flightBookingIds

export const CONFIG_1 = () => ({
  value: {
    flightBookingIds: EVENT_STORE_DATA_SELECTORS.flightBookingIds,
    eventIds: ({ templateId: id }) =>
      NODE_STORE_SELECTORS.calculatedNodesEvents({ id }),
  },
});

export const CONFIG_2 = () => ({
  value: {
    flightBookingIds: EVENT_STORE_DATA_SELECTORS.filterFlightBookingsByTemplateId(
      { idsProp: 'flightBookingIds' },
    ),
    flightIds: NODE_STORE_SELECTORS.filterByTypes({
      ids: 'eventIds',
      types: [EVENT_FLIGHT],
    }),
  },
  setValue: {
    flightBookingCreate: EVENT_STORE_VIEW_SELECTORS.flightBookingCreate,
    flightBookingView: EVENT_STORE_VIEW_SELECTORS.flightBookingView,
    ...PORTAL_HELPERS.setValue,
  },
});
