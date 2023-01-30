import { EVENT_STORE_DATA_SELECTORS } from 'datastore/eventStore/selectors';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

export const DATA_ID_CONFIG = {
  value: {
    dataId: NODE_STORE_SELECTORS.eventDataId,
  },
  setValue: {},
};

export const CONFIG = {
  value: {
    data: ({ dataId: id }) => EVENT_STORE_DATA_SELECTORS.event({ id }),
    node: NODE_STORE_SELECTORS.node,
    parentNodeId: NODE_STORE_SELECTORS.parentNodeId,
  },
  setValue: {},
};
