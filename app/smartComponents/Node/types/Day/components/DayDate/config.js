import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

export const CONFIG = {
  value: {
    displayDate: ({ templateId }) =>
      NODE_STORE_SELECTORS.displayDate({ id: templateId }),
    startDate: ({ templateId }) =>
      NODE_STORE_SELECTORS.startDate({ id: templateId }),
    weekDay: ({ templateId }) =>
      NODE_STORE_SELECTORS.weekDay({ id: templateId }),
  },
  setValue: {},
};
