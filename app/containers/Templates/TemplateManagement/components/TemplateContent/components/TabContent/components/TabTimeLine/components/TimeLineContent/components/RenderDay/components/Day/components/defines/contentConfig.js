import { TEMPLATE_MANAGEMENT_VIEWSTORE } from 'appConstants';
import {
  NODE_STORE_SELECTORS,
  NODE_VIEW_STORE_SELECTORS,
} from 'datastore/nodeStore/selectors';
export const DAYS = 'days';
export const PHOTOS = 'photos';

export const CONFIG = {
  value: {
    content: ({ dayId }) => NODE_STORE_SELECTORS.content({ id: dayId }),
    url: ({ dayId }) => NODE_STORE_SELECTORS.url({ id: dayId }),
    editing: ({ dayId }) => NODE_STORE_SELECTORS.editing({ id: dayId }),
    description: ({ dayId }) => NODE_STORE_SELECTORS.description({ id: dayId }),

    location: ({ dayId }) => NODE_STORE_SELECTORS.location({ id: dayId }),
    icon: ({ dayId }) => NODE_STORE_SELECTORS.icon({ id: dayId }),
    placeId: ({ dayId }) => NODE_STORE_SELECTORS.placeId({ id: dayId }),
    timeZoneId: ({ dayId }) => NODE_STORE_SELECTORS.timeZoneId({ id: dayId }),
  },
};

export const PHOTO_ID_CONFIG = {
  value: {
    editable: NODE_VIEW_STORE_SELECTORS.editable,
    layout: ({ templateId }) =>
      NODE_STORE_SELECTORS.calculatedLayout({ id: templateId }),
  },

  setValue: {
    editDays: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'editDays'],
    selectedId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'selectedId'],
    layout: ({ templateId }) =>
      NODE_STORE_SELECTORS.calculatedLayout({ id: templateId }),
  },
};
