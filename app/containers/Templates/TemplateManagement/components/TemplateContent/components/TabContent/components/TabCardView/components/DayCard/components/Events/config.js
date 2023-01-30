import { EVENT_STORE_VIEW_SELECTORS } from 'datastore/eventStore/selectors';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

export const CONFIG = {
  value: {},
  setValue: {
    eventCreate: EVENT_STORE_VIEW_SELECTORS.eventCreate,
  },
};

export const CONFIG1 = {
  value: {
    eventIds: NODE_STORE_SELECTORS.calculatedEventIds,
  },
};
