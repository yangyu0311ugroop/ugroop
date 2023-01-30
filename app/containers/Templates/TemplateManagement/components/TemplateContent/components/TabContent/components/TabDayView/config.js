import { TEMPLATE_MANAGEMENT_VIEWSTORE } from 'appConstants';
import {
  NODE_STORE_SELECTORS,
  NODE_VIEW_STORE_SELECTORS,
} from 'datastore/nodeStore/selectors';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';

export const CONFIG = {
  value: {
    dayIds: NODE_STORE_SELECTORS.children,
    ongoing: ({ templateId }) =>
      NODE_STORE_SELECTORS.calculatedOngoing({ id: templateId }),
    selectedId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'selectedId'],
    editable: NODE_VIEW_STORE_SELECTORS.editable,
    secondChild: ({ templateId }) =>
      NODE_STORE_SELECTORS.calculatedGalleryId({ id: templateId }),
    startDate: RESAGA_HELPERS.mapToId(
      NODE_STORE_SELECTORS.startDate,
      'templateId',
    ),
  },
  setValue: {
    selectedId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'selectedId'],
    layout: ({ templateId }) =>
      NODE_STORE_SELECTORS.calculatedLayout({ id: templateId }),
  },
};
