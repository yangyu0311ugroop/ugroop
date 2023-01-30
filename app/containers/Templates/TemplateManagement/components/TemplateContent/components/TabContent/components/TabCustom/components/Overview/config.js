import { NODE_STORE, TEMPLATE_MANAGEMENT_VIEWSTORE } from 'appConstants';
import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { EVENT_STORE_VIEW_SELECTORS } from 'datastore/eventStore/selectors';
import {
  NODE_STORE_SELECTORS,
  NODE_VIEW_STORE_SELECTORS,
} from 'datastore/nodeStore/selectors';

export const CONFIG = {
  value: {
    selectedId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'selectedId'],
    editable: NODE_VIEW_STORE_SELECTORS.editable,
    layout: ({ templateId }) =>
      NODE_STORE_SELECTORS.calculatedLayout({ id: templateId }),
    timelineId: ({ templateId }) =>
      NODE_STORE_SELECTORS.calculatedTimelineId({ id: templateId }),
    headerValue: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'selectedOverviewType'],
  },
  setValue: {
    selectedId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'selectedId'],
    nodes: [NODE_STORE, 'nodes'],
    eventCreate: EVENT_STORE_VIEW_SELECTORS.eventCreate,
    formType: EVENT_STORE_VIEW_SELECTORS.eventFormProp({
      path: EVENT_PATHS.type,
    }),
    formSubtype: EVENT_STORE_VIEW_SELECTORS.eventFormProp({
      path: EVENT_PATHS.subtype,
    }),
    iconOverride: EVENT_STORE_VIEW_SELECTORS.eventFormProp({
      path: EVENT_PATHS.iconOverride,
    }),
    layout: ({ templateId }) =>
      NODE_STORE_SELECTORS.calculatedLayout({ id: templateId }),
    headerValue: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'selectedOverviewType'],
  },
};
