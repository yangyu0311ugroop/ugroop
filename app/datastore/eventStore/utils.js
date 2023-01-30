const filterEventsByFlightBookingDataIdReducer = (dataId, allFlights) => (
  acc,
  [startTime, currentDataId],
) => {
  if (startTime) {
    const includeEvent =
      allFlights || dataId === Number.parseInt(currentDataId, 10);

    if (includeEvent) {
      return [...acc, startTime];
    }
  }
  return acc;
};

const filterFlightBookingByTemplateIdReducer = templateId => (
  acc,
  [id, currentTemplateId],
) => {
  if (templateId === currentTemplateId) {
    return [...acc, id];
  }
  return acc;
};

export const EVENT_STORE_UTILS = {
  filterEventsByFlightBookingDataIdReducer,

  filterFlightBookingByTemplateIdReducer,
};
