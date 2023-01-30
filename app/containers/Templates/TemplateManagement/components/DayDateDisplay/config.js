import { TEMPLATE_MANAGEMENT_STORE_SELECTORS } from 'datastore/templateManagementStore/selectors';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

// TODO: Select templateId via dayId's trail instead
export const CONFIG_IDS = {
  value: {
    templateId: TEMPLATE_MANAGEMENT_STORE_SELECTORS.templateId,
  },
};

export const CONFIG = {
  value: {
    displayDate: ({ templateId }) =>
      NODE_STORE_SELECTORS.displayDate({ id: templateId }),
    startTime: ({ id }) =>
      NODE_STORE_SELECTORS.calculatedStartTimeValue({ id }),
  },
};
