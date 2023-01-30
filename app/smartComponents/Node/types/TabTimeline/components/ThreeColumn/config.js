import {
  NODE_STORE_SELECTORS,
  NODE_VIEW_STORE_SELECTORS,
} from 'datastore/nodeStore/selectors';
import { TEMPLATE_MANAGEMENT_VIEWSTORE } from 'appConstants';

export const CONFIG = {
  value: {
    dayIds: ({ tabId }) => NODE_STORE_SELECTORS.children({ id: tabId }),
    startDate: ({ templateId }) =>
      NODE_STORE_SELECTORS.startDate({ id: templateId }),
    galleryId: ({ templateId }) =>
      NODE_STORE_SELECTORS.calculatedGalleryId({ id: templateId }),
    editable: NODE_VIEW_STORE_SELECTORS.editable,
    selectedOverviewType: [
      TEMPLATE_MANAGEMENT_VIEWSTORE,
      'selectedOverviewType',
    ],
  },
  setValue: {},
};
