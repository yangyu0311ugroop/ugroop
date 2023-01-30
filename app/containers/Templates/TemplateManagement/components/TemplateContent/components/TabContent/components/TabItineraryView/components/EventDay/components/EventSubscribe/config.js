import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { EVENT_STORE_DATA_SELECTORS } from 'datastore/eventStore/selectors';

export const CONFIG = {
  value: {
    startTime: ({ id }) =>
      NODE_STORE_SELECTORS.calculatedStartTimeValue({ id }),
    endTime: ({ id }) => NODE_STORE_SELECTORS.calculatedEndTimeValue({ id }),
    dataId: NODE_STORE_SELECTORS.eventDataId,
  },
};

export const CONFIG_DATA = {
  value: {
    type: ({ dataId: id }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({ id, path: EVENT_PATHS.type }),
    subtype: ({ dataId: id }) =>
      EVENT_STORE_DATA_SELECTORS.eventProp({ id, path: EVENT_PATHS.subtype }),
  },
};
