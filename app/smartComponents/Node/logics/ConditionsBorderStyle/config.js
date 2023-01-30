import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

export const CONFIG = {
  value: {
    calculatedMedicalSeverity: NODE_STORE_SELECTORS.calculatedMedicalSeverity,
    calculatedMedicalCount: NODE_STORE_SELECTORS.calculatedMedicalCount,
    calculatedDietaryCount: NODE_STORE_SELECTORS.calculatedDietaryCount,
  },
};
