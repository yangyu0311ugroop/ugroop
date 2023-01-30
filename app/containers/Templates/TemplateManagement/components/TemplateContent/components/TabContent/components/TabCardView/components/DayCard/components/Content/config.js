import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { TEMPLATE_MANAGEMENT_VIEWSTORE } from 'appConstants';
export const DAYS = 'days';
export const CONFIG = {
  value: {
    placeId: ({ dayId }) => NODE_STORE_SELECTORS.placeId({ id: dayId }),
  },
  setValue: {
    layout: ({ templateId }) =>
      NODE_STORE_SELECTORS.calculatedLayout({ id: templateId }),
    selectedId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'selectedId'],
  },
};
