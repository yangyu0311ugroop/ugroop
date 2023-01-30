import {
  MOVE_NODE_AFTER,
  MOVE_NODE_BEFORE,
  NODE_API,
  UPDATE_NODE,
} from 'apis/constants';
import { NODE_STORE } from 'appConstants';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

export const CONFIG = {
  value: {
    children: NODE_STORE_SELECTORS.children,
    visibleChildren: NODE_STORE_SELECTORS.calculatedVisibleChildren,
    privateIds: NODE_STORE_SELECTORS.calculatedPrivateIds,
    hiddenIds: NODE_STORE_SELECTORS.calculatedHiddenIds,
    timelineId: NODE_STORE_SELECTORS.calculatedTimelineId,
    galleryId: NODE_STORE_SELECTORS.calculatedGalleryId,
  },
  setValue: {
    nodes: [NODE_STORE, 'nodes'],

    ...PORTAL_HELPERS.setValue,
  },
  isLoading: {
    movingNodeBefore: [NODE_API, MOVE_NODE_BEFORE],
    movingNodeAfter: [NODE_API, MOVE_NODE_AFTER],
    updatingNode: [NODE_API, UPDATE_NODE],
  },
};
