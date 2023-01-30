import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

export const CONFIG = {
  value: {
    startTime: ({ templateId }) =>
      NODE_STORE_SELECTORS.calculatedStartTimeValue({ id: templateId }),
    ongoing: ({ templateId }) =>
      NODE_STORE_SELECTORS.calculatedOngoing({ id: templateId }),
    status: ({ templateId }) =>
      NODE_STORE_SELECTORS.calculatedStatus({ id: templateId }),
    layout: ({ templateId }) =>
      NODE_STORE_SELECTORS.calculatedLayout({ id: templateId }),
    children: NODE_STORE_SELECTORS.children,
    layoutRecheck: ({ templateId }) =>
      NODE_STORE_SELECTORS.calculatedLayoutRecheck({ id: templateId }),
  },

  setValue: {
    ongoing: ({ templateId }) =>
      NODE_STORE_SELECTORS.calculatedOngoing({ id: templateId }),
    status: ({ templateId }) =>
      NODE_STORE_SELECTORS.calculatedStatus({ id: templateId }),
    layout: ({ templateId }) =>
      NODE_STORE_SELECTORS.calculatedLayout({ id: templateId }),
  },
};
