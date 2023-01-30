import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

export const CONFIG2 = {
  value: {
    eventIds: NODE_STORE_SELECTORS.calculatedEventIds,
  },
};

export const CONFIG1 = {
  value: {
    type: NODE_STORE_SELECTORS.calculatedEventType,
    subType: NODE_STORE_SELECTORS.calculatedEventSubType,
    mode: NODE_STORE_SELECTORS.calculatedEventMode,
    timeZoneId: NODE_STORE_SELECTORS.calculatedEventTimeZone,
    value: NODE_STORE_SELECTORS.calculatedEventValue,
    position: NODE_STORE_SELECTORS.calculatedEventPosition,
    real: NODE_STORE_SELECTORS.calculatedEventReal,
    dayCount: NODE_STORE_SELECTORS.calculatedEventDayCount,
    id: NODE_STORE_SELECTORS.calculatedEventId,
    cancellation: NODE_STORE_SELECTORS.calculatedEventCancellation,
  },
};
