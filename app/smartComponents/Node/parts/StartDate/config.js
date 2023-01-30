import { TEMPLATE_MANAGEMENT_VIEWSTORE } from 'appConstants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';
import { PORTAL_HELPERS } from '../../../../containers/Portal/helpers';

export const CONFIG = {
  value: {
    duration: NODE_STORE_SELECTORS.duration,
    timelineId: NODE_STORE_SELECTORS.calculatedTimelineId,
    startDate: RESAGA_HELPERS.subscribeIfNotGiven(
      NODE_STORE_SELECTORS.startDate,
      'startDate',
    ),
    weekDay: RESAGA_HELPERS.subscribeIfNotGiven(
      NODE_STORE_SELECTORS.weekDay,
      'weekDay',
    ),
    displayDate: RESAGA_HELPERS.subscribeIfNotGiven(
      NODE_STORE_SELECTORS.displayDate,
      'displayDate',
    ),

    firstEventId: NODE_STORE_SELECTORS.calculatedFirstEventId,
    status: NODE_STORE_SELECTORS.calculatedStatus,
  },
  setValue: {
    selectedId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'selectedId'],
    layout: NODE_STORE_SELECTORS.calculatedLayout,
    ...PORTAL_HELPERS.setValue,
  },
};
