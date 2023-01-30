const filterFlightBookingsByTemplateId = ({ idsProp, templateIdProp }) => ({
  [idsProp]: ids,
  [templateIdProp]: templateId,
}) =>
  `event.events.flightBookings.${
    ids ? ids.toString() : null
  }.${templateId}.filterFlightBookingsByTemplateId`;

const filterEventsByFlightBookingDataId = ({
  eventStartTimesProp,
  eventFlightBookingDataIdsProp,
  flightBookingDataIdProp,
  allFlightsProp,
}) => ({
  [eventStartTimesProp]: eventStartTimes,
  [eventFlightBookingDataIdsProp]: eventDataIds,
  [flightBookingDataIdProp]: flightBookingDataId,
  [allFlightsProp]: allFlights,
}) =>
  `event.events.flightBookings.${
    eventStartTimes ? eventStartTimes.toString() : null
  }.${eventDataIds ? eventDataIds.toString() : null}.${
    flightBookingDataId ? flightBookingDataId.toString() : null
  }.${allFlights}.filterEventsByFlightBookingDataId`;

export const EVENT_STORE_CACHE_KEYS = {
  filterFlightBookingsByTemplateId,
  filterEventsByFlightBookingDataId,
};
