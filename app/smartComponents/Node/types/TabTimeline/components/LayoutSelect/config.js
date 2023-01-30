import { TEMPLATE_MANAGEMENT_DATASTORE } from 'appConstants';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

export const TEMPLATE_ID_CONFIG = {
  value: {
    id: [TEMPLATE_MANAGEMENT_DATASTORE, 'id'],
  },
};

export const CONFIG = {
  value: {
    layout: NODE_STORE_SELECTORS.calculatedLayout,
    timelineId: NODE_STORE_SELECTORS.calculatedTimelineId,
    visibleChildren: NODE_STORE_SELECTORS.calculatedVisibleChildren,
  },
  setValue: {
    layout: NODE_STORE_SELECTORS.calculatedLayout,
    ...PORTAL_HELPERS.setValue,
  },
};
