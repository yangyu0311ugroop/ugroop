import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

export const CONFIG = {
  value: {
    startTimeMoment: NODE_STORE_SELECTORS.calculatedStartTimeMoment(),
    startTimeValue: NODE_STORE_SELECTORS.calculatedStartTimeValue,
    startTimeMode: NODE_STORE_SELECTORS.calculatedStartTimeMode,
    endTimeMoment: NODE_STORE_SELECTORS.calculatedEndTimeMoment(),
    endTimeMode: NODE_STORE_SELECTORS.calculatedEndTimeMode,
    endTimeValue: NODE_STORE_SELECTORS.calculatedEndTimeValue,
  },
  setValue: {},
};
