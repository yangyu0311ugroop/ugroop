import { EVENT_STORE_DATA_SELECTORS } from 'datastore/eventStore/selectors';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

export const CONFIG_1 = {
  value: {
    startTimeValue: NODE_STORE_SELECTORS.calculatedStartTimeValue,
    events: NODE_STORE_SELECTORS.cachedCalculatedNodesEventIds({
      idProp: 'templateId',
    }),
  },
  setValue: {
    events: NODE_STORE_SELECTORS.calculatedEvents,
    eventIds: NODE_STORE_SELECTORS.calculatedEventIds,
    eventObjects: NODE_STORE_SELECTORS.calculatedEventObjs,
  },
};

export const CONFIG_2 = {
  value: {
    startValue: NODE_STORE_SELECTORS.calculatedStartTimeValue,
    startMode: NODE_STORE_SELECTORS.calculatedStartTimeMode,
    startTimeZone: NODE_STORE_SELECTORS.calculatedStartTimeZoneId,
    startTimeReal: NODE_STORE_SELECTORS.calculatedStartTimeReal,
    endValue: NODE_STORE_SELECTORS.calculatedEndTimeValue,
    endMode: NODE_STORE_SELECTORS.calculatedEndTimeMode,
    endTimeZone: NODE_STORE_SELECTORS.calculatedEndTimeZoneId,
    endTimeReal: NODE_STORE_SELECTORS.calculatedEndTimeReal,
    eventDataId: NODE_STORE_SELECTORS.eventDataId,
  },
};

export const CONFIG_3 = {
  value: {
    eventType: ({ eventDataId }) =>
      EVENT_STORE_DATA_SELECTORS.eventType({ id: eventDataId }),
    cancellation: ({ eventDataId }) =>
      EVENT_STORE_DATA_SELECTORS.cancellation({ id: eventDataId }),
    eventSubType: ({ eventDataId }) =>
      EVENT_STORE_DATA_SELECTORS.eventSubtype({ id: eventDataId }),
  },
};
