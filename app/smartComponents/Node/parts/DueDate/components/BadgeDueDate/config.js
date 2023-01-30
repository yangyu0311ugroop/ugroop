import { NODE_STORE_HELPERS } from 'datastore/nodeStore/helpers';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { DUE_DATE_HELPERS } from 'smartComponents/Node/parts/DueDate/components/ChangeDueDate/helpers';

export const CONFIG = {
  value: {
    parentType: NODE_STORE_SELECTORS.parentType,
    translateType: {
      keyPath: NODE_STORE_SELECTORS.parentType,
      getter: NODE_STORE_HELPERS.translateType,
    },
    dueDate: NODE_STORE_SELECTORS.dueDate,
    status: NODE_STORE_SELECTORS.status,
    calculatedDate: {
      getter: DUE_DATE_HELPERS.calculateDate,
    },
  },
  setValue: {
    calculatedStartTimeValue: NODE_STORE_SELECTORS.calculatedStartTimeValue,
  },
};
