import { NODE_API, UPDATE_NODE } from 'apis/constants';
import {
  NODE_STORE_SELECTORS,
  NODE_VIEW_STORE_SELECTORS,
} from 'datastore/nodeStore/selectors';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';

export const CONFIG = {
  value: {
    location: RESAGA_HELPERS.subscribeIfNotGiven(
      NODE_STORE_SELECTORS.location,
      'location',
    ),
    icon: RESAGA_HELPERS.subscribeIfNotGiven(NODE_STORE_SELECTORS.icon, 'icon'),
    placeId: RESAGA_HELPERS.subscribeIfNotGiven(
      NODE_STORE_SELECTORS.placeId,
      'placeId',
    ),
    timeZoneId: RESAGA_HELPERS.subscribeIfNotGiven(
      NODE_STORE_SELECTORS.timeZoneId,
      'timeZoneId',
    ),
    type: NODE_STORE_SELECTORS.type,
    status: NODE_STORE_SELECTORS.status,
    editable: RESAGA_HELPERS.subscribeIfNotGiven(
      NODE_VIEW_STORE_SELECTORS.editable,
      'editable',
    ),
  },
  setValue: {
    nodes: NODE_STORE_SELECTORS.nodes,
  },
  isLoading: {
    updatingNode: [NODE_API, UPDATE_NODE],
  },
};
