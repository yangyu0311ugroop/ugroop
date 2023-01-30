import { EVENT_STORE_VIEW_SELECTORS } from 'datastore/eventStore/selectors';
import {
  NODE_STORE_SELECTORS,
  NODE_VIEW_STORE_SELECTORS,
} from 'datastore/nodeStore/selectors';

export const CONFIG = {
  value: {
    startTime: ({ id }) =>
      NODE_STORE_SELECTORS.calculatedStartTimeValue({ id }),
    editable: NODE_VIEW_STORE_SELECTORS.editable,
  },
  setValue: {
    eventCreate: EVENT_STORE_VIEW_SELECTORS.eventCreate,
  },
};
