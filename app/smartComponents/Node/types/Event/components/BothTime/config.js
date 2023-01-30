import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

export const CONFIG = {
  value: {
    startTimeMoment: NODE_STORE_SELECTORS.calculatedStartTimeMoment(),
    startTimeMode: NODE_STORE_SELECTORS.calculatedStartTimeMode,
    endTimeMoment: NODE_STORE_SELECTORS.calculatedEndTimeMoment(),
    endTimeMode: NODE_STORE_SELECTORS.calculatedEndTimeMode,
  },
  setValue: {},
};
