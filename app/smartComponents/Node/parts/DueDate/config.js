import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';
import { DASHBOARD_VIEW_STORE, NODE_STORE } from 'appConstants';

export const CONFIG = {
  value: {
    type: NODE_STORE_SELECTORS.type,
    dueDate: RESAGA_HELPERS.subscribeIfNotGiven(
      NODE_STORE_SELECTORS.dueDate,
      'dueDate',
    ),
    startTime: {
      cacheKey: ({ id }) => `${id}.startTime`,
      keyPath: NODE_STORE_SELECTORS.calculatedStartTime,
      props: null,
      getter: start => {
        if (typeof start !== 'object') return null;

        if (!start.real) return null;

        return start.value;
      },
    },
  },
};

export const CONFIG2 = {
  value: {
    timeNodesCount: {
      keyPath: ({ startTime }) => [NODE_STORE, 'timeNodes', [startTime]],
      getter: (nodes = []) => nodes.length,
    },
  },
  setValue: {
    timeNodes: [NODE_STORE, 'timeNodes'],
    times: [DASHBOARD_VIEW_STORE, 'times'],
  },
};
