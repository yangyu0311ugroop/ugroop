import { EVENT_FLIGHT } from 'utils/modelConstants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { EVENT_STORE_DATA_SELECTORS } from 'datastore/eventStore/selectors';

// TODO: Separate into 2 steps?
// 1) Write template.calculated.flights to store when normalizing relevant api responses
// 2) Component that selects a list of flight node id's, optionally filtering by flight booking

export const CONFIG_1 = {
  value: {
    templateId: ({ flightBookingDataId: id }) =>
      EVENT_STORE_DATA_SELECTORS.flightBookingTemplateId({ id }),
  },
};

export const CONFIG_2 = {
  value: {
    eventIds: NODE_STORE_SELECTORS.cachedCalculatedNodesEventIds({
      idProp: 'templateId',
    }),
  },
};

export const CONFIG_3 = {
  value: {
    flightIds: NODE_STORE_SELECTORS.filterByTypes({
      ids: 'eventIds',
      types: [EVENT_FLIGHT],
    }),
  },
};

export const CONFIG_4 = {
  value: {
    flightStartTimes: NODE_STORE_SELECTORS.calculatedStartTimeValues({
      idsProp: 'flightIds',
      sort: false,
    }),
    flightIds: NODE_STORE_SELECTORS.eventDataIds({
      idsProp: 'flightIds',
    }),
  },
};

export const CONFIG_5 = {
  value: {
    flightIds: EVENT_STORE_DATA_SELECTORS.filterEventsByFlightBookingDataId({
      eventStartTimesProp: 'flightStartTimes',
      eventFlightBookingDataIdsProp: 'flightIds',
      flightBookingDataIdProp: 'flightBookingDataId',
      allFlightsProp: 'allFlights',
    }),
  },
};

export default {
  CONFIG_1,
  CONFIG_2,
  CONFIG_3,
  CONFIG_4,
  CONFIG_5,
};
