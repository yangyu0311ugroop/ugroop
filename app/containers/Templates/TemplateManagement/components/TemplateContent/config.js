import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { TEMPLATE_MANAGEMENT_VIEWSTORE } from 'appConstants';

export const CONFIG = {
  value: {
    visibleChildren: NODE_STORE_SELECTORS.calculatedVisibleChildren,
    timelineId: NODE_STORE_SELECTORS.calculatedTimelineId,
    hiddenIds: NODE_STORE_SELECTORS.calculatedHiddenIds,
    privateIds: NODE_STORE_SELECTORS.calculatedPrivateIds,
    peopleTabId: NODE_STORE_SELECTORS.calculatedPeopleTabId,
  },
};

export const FIRST_LAST_IDS_CONFIG = {
  value: {},
  setValue: {
    subscriptionSeats: ({ id }) => [
      TEMPLATE_MANAGEMENT_VIEWSTORE,
      'tourSeats',
      id,
    ],
  },
};
