import { ADMIN_TOUR_SETTINGS, URL_HELPERS } from 'appConstants';
import { EVENT_PATHS } from 'datastore/eventStore/constants';
import { NODE_PATHS } from 'datastore/nodeStore/constants';
import get from 'lodash/get';
import set from 'lodash/set';
import moment from 'moment';
import { EVENT_DATA_HELPERS } from 'smartComponents/Node/types/Event/dataHelpers';
import {
  EVENT_CONSTANTS,
  UNKNOWN_EVENT_SUBTYPE,
  UNKNOWN_EVENT_TYPE,
} from 'utils/constants/events';
import { EVENT_HELPERS } from 'utils/helpers/events';
import { LOGIC_HELPERS } from 'utils/helpers/logic';

// TODO: will update tests

const isFlight = event =>
  EVENT_VIEW_HELPERS.subtype(event) ===
  EVENT_CONSTANTS.TRANSPORTATIONS.FLIGHT.type;

const isFood = event =>
  EVENT_VIEW_HELPERS.subtype(event) === EVENT_CONSTANTS.ACTIVITIES.FOOD.type;

const isWalking = event =>
  EVENT_VIEW_HELPERS.subtype(event) ===
  EVENT_CONSTANTS.TRANSPORTATIONS.WALK.type;

const isCycling = event =>
  EVENT_VIEW_HELPERS.subtype(event) ===
  EVENT_CONSTANTS.TRANSPORTATIONS.BICYCLE.type;

const isTransit = event =>
  [
    EVENT_CONSTANTS.TRANSPORTATIONS.BUS.type,
    EVENT_CONSTANTS.TRANSPORTATIONS.TRAIN.type,
    EVENT_CONSTANTS.TRANSPORTATIONS.TRAM.type,
  ].indexOf(EVENT_VIEW_HELPERS.subtype(event)) !== -1;

const travelMode = event => {
  if (EVENT_VIEW_HELPERS.isWalking(event)) return 'WALKING';
  if (EVENT_VIEW_HELPERS.isCycling(event)) return 'BICYCLING';
  if (EVENT_VIEW_HELPERS.isTransit(event)) return 'TRANSIT';

  return 'DRIVING';
};

const isCarHire = event =>
  EVENT_VIEW_HELPERS.subtype(event) ===
  EVENT_CONSTANTS.TRANSPORTATIONS.VEHICLE_HIRE.type;

const isCoach = event =>
  EVENT_VIEW_HELPERS.subtype(event) ===
  EVENT_CONSTANTS.TRANSPORTATIONS.COACH.type;

const isBus = event =>
  EVENT_VIEW_HELPERS.subtype(event) ===
  EVENT_CONSTANTS.TRANSPORTATIONS.BUS.type;

const isTransportation = event =>
  EVENT_VIEW_HELPERS.type(event) === EVENT_CONSTANTS.EVENTS.TRANSPORTATION.type;

const isAccommodation = event =>
  EVENT_VIEW_HELPERS.type(event) === EVENT_CONSTANTS.EVENTS.ACCOMMODATION.type;

const isActivity = event =>
  EVENT_VIEW_HELPERS.type(event) === EVENT_CONSTANTS.EVENTS.ACTIVITY.type;

const iconOverride = event => get(event, 'detail.iconOverride');

const isPositionStart = event => EVENT_VIEW_HELPERS.position(event) === 'start';
const isPositionMiddle = event =>
  EVENT_VIEW_HELPERS.position(event) === 'middle';
const isPositionEnd = event => EVENT_VIEW_HELPERS.position(event) === 'end';

const position = event => get(event, 'position');
const description = event => get(event, 'description');
const url = event => get(event, 'url');

const type = (event, defaultValue = UNKNOWN_EVENT_TYPE.type) =>
  get(event, 'type', defaultValue);
const nodeType = (node, notSetValue) => get(node, 'type', notSetValue);

const subtype = (event, defaultValue = UNKNOWN_EVENT_SUBTYPE.type) =>
  get(event, 'detail.type', defaultValue);
const subDetailType = (event, defaultValue) =>
  get(event, 'detail.detail.type', defaultValue);

const eventAttachments = event => get(event, 'eventAttachments', []);

const typeName = event => {
  const { name: eventSubtype } = EVENT_HELPERS.getEventTypeConstants(
    EVENT_VIEW_HELPERS.type(event),
  );

  return eventSubtype;
};

const subTypeName = event => {
  const { name: eventSubtype } = EVENT_HELPERS.getEventSubtypeConstants(
    EVENT_VIEW_HELPERS.type(event),
    EVENT_VIEW_HELPERS.subtype(event),
  );

  return eventSubtype;
};

const airportStart = event => get(event, 'detail.detail.start.airport.name');
const airportEnd = event => get(event, 'detail.detail.end.airport.name');
const cityNameStart = event =>
  get(event, 'detail.detail.start.airport.cityName');
const cityNameEnd = event => get(event, 'detail.detail.end.airport.cityName');
const airportIATAStart = (event, notSetValue) =>
  get(event, 'detail.detail.start.airport.iataCode', notSetValue);
const airportIATAEnd = (event, notSetValue) =>
  get(event, 'detail.detail.end.airport.iataCode', notSetValue);
const flightNumber = (event, notSetValue) =>
  get(event, 'detail.detail.flightNumber', notSetValue);
const flightBookingId = (event, notSetValue) =>
  get(event, 'detail.detail.flightBookingId', notSetValue);
const airline = (event, notSetValue) =>
  get(event, 'detail.detail.airline', notSetValue);
const gate = (event, notSetValue) =>
  get(event, 'detail.detail.gate', notSetValue);
const terminal = (event, notSetValue) =>
  get(event, 'detail.detail.terminal', notSetValue);
const travelClass = (event, notSetValue) =>
  get(event, 'detail.detail.travelClass', notSetValue);

const airportName = event => {
  if (EVENT_VIEW_HELPERS.isPositionEnd(event)) {
    const endCity = get(event, 'detail.detail.end.airport.cityName');

    return LOGIC_HELPERS.ifElse(endCity, `Arrive ${endCity}`);
  }

  const startCity = get(event, 'detail.detail.start.airport.cityName');

  return LOGIC_HELPERS.ifElse(startCity, `Depart ${startCity}`);
};

const eventName = (
  event,
  defaultValue = EVENT_VIEW_HELPERS.subTypeName(event),
) => {
  if (EVENT_VIEW_HELPERS.isFlight(event)) {
    return EVENT_VIEW_HELPERS.airportName(event) || defaultValue;
  }

  const name = get(event, 'name');
  if (name) return name;

  if (EVENT_VIEW_HELPERS.isFood(event)) {
    return EVENT_VIEW_HELPERS.iconOverride(event) || defaultValue;
  }

  return defaultValue;
};

const eventFullName = (event, defaultValue) => {
  if (EVENT_VIEW_HELPERS.isFlight(event)) {
    return `${EVENT_VIEW_HELPERS.cityNameStart(event) ||
      'Departure'} to ${EVENT_VIEW_HELPERS.cityNameEnd(event) || 'Arrival'}`;
  }

  return EVENT_VIEW_HELPERS.name(event, defaultValue);
};

const locationPlaceId = event => get(event, 'location.placeId');
const locationName = event => get(event, 'location.name');
const locationPlaceName = event => get(event, 'location.placeName');

const location = event => {
  if (EVENT_VIEW_HELPERS.isFlight(event)) {
    if (EVENT_VIEW_HELPERS.isPositionEnd(event))
      return EVENT_VIEW_HELPERS.airportEnd(event);

    return `${EVENT_VIEW_HELPERS.airportStart(event) ||
      '???'} to ${EVENT_VIEW_HELPERS.airportEnd(event) || '???'}`;
  }

  if (EVENT_VIEW_HELPERS.isTransportation(event)) {
    if (EVENT_VIEW_HELPERS.isPositionEnd(event))
      return EVENT_VIEW_HELPERS.locationEnd(event);

    return `${EVENT_VIEW_HELPERS.locationStart(event) ||
      '???'} to ${EVENT_VIEW_HELPERS.locationEnd(event) || '???'}`;
  }

  return (
    EVENT_VIEW_HELPERS.locationPlaceName(event) ||
    EVENT_VIEW_HELPERS.locationName(event)
  );
};

const transportationStartName = event =>
  get(event, 'detail.detail.common.start.name');
const transportationStartPlaceName = event =>
  get(event, 'detail.detail.common.start.placeName');

const transportationEndName = event =>
  get(event, 'detail.detail.common.end.name');
const transportationEndPlaceName = event =>
  get(event, 'detail.detail.common.end.placeName');

const locationStart = (
  event,
  defaultValue = EVENT_VIEW_HELPERS.locationPlaceName(event) ||
    EVENT_VIEW_HELPERS.locationName(event),
) => {
  if (EVENT_VIEW_HELPERS.isFlight(event)) {
    return EVENT_VIEW_HELPERS.airportStart(event);
  }

  if (EVENT_VIEW_HELPERS.isTransportation(event)) {
    return (
      EVENT_VIEW_HELPERS.transportationStartPlaceName(event) ||
      EVENT_VIEW_HELPERS.transportationStartName(event)
    );
  }

  return defaultValue;
};

const locationEnd = event => {
  if (EVENT_VIEW_HELPERS.isFlight(event)) {
    return EVENT_VIEW_HELPERS.airportEnd(event);
  }

  if (EVENT_VIEW_HELPERS.isTransportation(event)) {
    return (
      EVENT_VIEW_HELPERS.transportationEndPlaceName(event) ||
      EVENT_VIEW_HELPERS.transportationEndName(event)
    );
  }

  return null;
};

const eventType = event => {
  if (EVENT_VIEW_HELPERS.isFood(event)) {
    return EVENT_VIEW_HELPERS.iconOverride(event);
  }

  return EVENT_VIEW_HELPERS.subTypeName(event);
};

const placeId = event => {
  if (EVENT_VIEW_HELPERS.isTransportation(event)) {
    return get(event, 'detail.detail.common.end.placeId');
  }

  return get(event, `location.placeId`);
};

const placeIdStart = event => get(event, 'detail.detail.common.start.placeId');

const placeIdEnd = event => get(event, 'detail.detail.common.end.placeId');

const bookingNumber = event => {
  if (EVENT_VIEW_HELPERS.isTransportation(event)) {
    return get(event, `detail.detail.common.eventBooking.bookingNumber`);
  }

  return get(event, `detail.bookingNumber`);
};

const budgetAmount = (event, notSetValue) =>
  get(event, `eventAmounts.budgetAmount`, notSetValue);

const bookingAmountId = (data, notSetValue) =>
  get(data, `bookingAmounts.id`, notSetValue);

const bookingBudgetAmount = (data, notSetValue) =>
  get(data, `bookingAmounts.budgetAmount`, notSetValue);

const bookingActualAmount = (data, notSetValue) =>
  get(data, `bookingAmounts.actualAmount`, notSetValue);

const bookingCurrency = (data, notSetValue) =>
  get(data, `bookingAmounts.currency`, notSetValue);

const actualAmount = (event, notSetValue) =>
  get(event, `eventAmounts.actualAmount`, notSetValue);

const prettifyAmount = (amount, currency, options = {}) => {
  if (!currency) return '---';

  if (!amount && amount !== 0) return '---';

  const formatter = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency,
    ...options,
  });

  return formatter.format(amount);
};

const normaliseAmount = (amount = 0, currency, full) => {
  if (!currency) return '---';

  if (full) return EVENT_VIEW_HELPERS.prettifyAmount(amount, currency);

  let thousands = 0;
  let newAmount = amount;

  while (newAmount >= 10000) {
    newAmount /= 1000;
    thousands += 1;
  }

  const postfix = ['', 'k', 'M', 'B', 'T', 'Qd', 'Qn'][thousands];

  return `${EVENT_VIEW_HELPERS.prettifyAmount(newAmount, currency)}${postfix}`;
};

const renderDiff = (a, b) => {
  if (!a || !b || a === b) return null;

  return a < b
    ? `▼ ${Math.round((b / a) * 100 - 100)}%`
    : `▲ ${Math.round((a / b) * 100 - 100)}%`;
};

const convertAmount = (amount, from, to, settings) => {
  if (!amount) return 0;

  if (from === to) return amount;

  const rates = parseFloat(
    get(settings, [ADMIN_TOUR_SETTINGS.EXCHANGE_RATES(from, to), 'value']),
  );

  if (!rates) return 0;

  return amount / rates;
};

const percentage = (a = 0, b = 0) => {
  const numA = parseFloat(a);
  const numB = parseFloat(b);

  // if !a then percentage is 0
  if (!numA) return 0;

  // if !b and a is defined then percentage is 1
  if (!numB) return 1;

  // if a > b then percentage is 1
  if (numA > numB) return 1;

  // otherwise divide a by b
  return numA / numB;
};

const currency = (event, notSetValue) =>
  get(event, `eventAmounts.currency`, notSetValue);

const setCurrency = (event, value) =>
  set(event, `eventAmounts.currency`, value);

const eventAmountId = event => get(event, `eventAmounts.id`);

const setBudgetAmount = (event, value) =>
  set(event, `eventAmounts.budgetAmount`, value);

const setActualAmount = (event, value) =>
  set(event, `eventAmounts.actualAmount`, value);

const bookingDate = event => {
  if (EVENT_VIEW_HELPERS.isTransportation(event)) {
    return get(event, `detail.detail.common.eventBooking.bookingDate`);
  }

  return get(event, `detail.bookingDate`);
};

const bookingName = event =>
  get(event, `detail.detail.common.eventBooking.name`);
const setBookingNumber = (event, value) => {
  if (EVENT_VIEW_HELPERS.isTransportation(event)) {
    return set(event, `detail.detail.common.eventBooking.bookingNumber`, value);
  }

  return set(event, `detail.bookingNumber`, value);
};

const bookedBy = event => {
  if (EVENT_VIEW_HELPERS.isTransportation(event)) {
    return get(event, `detail.detail.common.eventBooking.bookedBy`);
  }

  return get(event, `detail.bookedBy`);
};

const setBookedBy = (event, value) => {
  if (EVENT_VIEW_HELPERS.isTransportation(event)) {
    return set(event, `detail.detail.common.eventBooking.bookedBy`, value);
  }

  return set(event, `detail.bookedBy`, value);
};

const supplierName = event => {
  if (EVENT_VIEW_HELPERS.isTransportation(event)) {
    return get(event, `detail.detail.common.eventBooking.supplierName`);
  }

  return get(event, `detail.supplier`);
};

const setSupplierName = (event, value) => {
  if (EVENT_VIEW_HELPERS.isTransportation(event)) {
    return set(event, `detail.detail.common.eventBooking.supplierName`, value);
  }

  return set(event, `detail.supplier`, value);
};

const supplierPhoneNumber = event => {
  if (EVENT_VIEW_HELPERS.isTransportation(event)) {
    return get(event, `detail.detail.common.eventBooking.supplierNumber`);
  }

  return get(event, `detail.supplierPhoneNumber`);
};

const personCount = event => {
  if (EVENT_VIEW_HELPERS.isTransportation(event)) {
    return get(event, `detail.detail.common.eventBooking.personCount`);
  }

  return get(event, `detail.bookingPersonCount`);
};

const paidBy = event => {
  if (EVENT_VIEW_HELPERS.isTransportation(event)) {
    return get(event, `detail.detail.common.eventBooking.paidBy`);
  }

  return get(event, `detail.paidBy`);
};

const cancellationCancellationDate = (event, notSetValue) =>
  get(event, `cancellation.cancellationDate`, notSetValue);

const cancellationSupplierConfirmed = (event, notSetValue) =>
  get(event, `cancellation.supplierConfirmed`, notSetValue);

const cancellationCancellationReference = (event, notSetValue) =>
  get(event, `cancellation.cancellationReference`, notSetValue);

const cancellationRefundSituation = (event, notSetValue) =>
  get(event, `cancellation.refundSituation`, notSetValue);

const cancellationCancellationNotes = (event, notSetValue) =>
  get(event, `cancellation.cancellationNotes`, notSetValue);

// setter
const setCancellationDate = (event, notSetValue) =>
  set(event, `cancellation.cancellationDate`, notSetValue);

const setSupplierConfirmed = (event, notSetValue) =>
  set(event, `cancellation.supplierConfirmed`, notSetValue);

const setCancellationReference = (event, notSetValue) =>
  set(event, `cancellation.cancellationReference`, notSetValue);

const setRefundSituation = (event, notSetValue) =>
  set(event, `cancellation.refundSituation`, notSetValue);

const setCancellationNotes = (event, notSetValue) =>
  set(event, `cancellation.cancellationNotes`, notSetValue);

const cancellation = (event, notSetValue) =>
  get(event, `cancellation`, notSetValue);

const isCancelled = event => Boolean(EVENT_VIEW_HELPERS.cancellation(event));

const numberOfRooms = event =>
  get(
    event,
    `detail.numberOfRooms`,
    LOGIC_HELPERS.ifElse(EVENT_VIEW_HELPERS.isAccommodation(event), 1),
  );

const roomType = event =>
  get(
    event,
    `detail.roomType`,
    LOGIC_HELPERS.ifElse(EVENT_VIEW_HELPERS.isAccommodation(event), 'Standard'),
  );

const setPersonCount = (event, value) => {
  if (EVENT_VIEW_HELPERS.isTransportation(event)) {
    return set(event, `detail.detail.common.eventBooking.personCount`, value);
  }

  return set(event, `detail.bookingPersonCount`, value);
};

const setBookingDate = (event, value) => {
  if (EVENT_VIEW_HELPERS.isTransportation(event)) {
    return set(event, `detail.detail.common.eventBooking.bookingDate`, value);
  }

  return set(event, `detail.bookingDate`, value);
};

const setPaidBy = (event, value) => {
  if (EVENT_VIEW_HELPERS.isTransportation(event)) {
    return set(event, `detail.detail.common.eventBooking.paidBy`, value);
  }

  return set(event, `detail.paidBy`, value);
};

const hasReservation = event =>
  Boolean(
    EVENT_VIEW_HELPERS.bookingNumber(event) ||
      EVENT_VIEW_HELPERS.bookedBy(event) ||
      EVENT_VIEW_HELPERS.supplierName(event) ||
      EVENT_VIEW_HELPERS.personCount(event),
  );

const nameProp = event => get(event, EVENT_PATHS.name);
const tempDayRange = event => get(event, EVENT_PATHS.tempDayRange);
const batchCreate = event => get(event, EVENT_PATHS.batchCreate);

const parentNodeId = node => get(node, NODE_PATHS.parentNodeId);
const tempStartDay = node => get(node, NODE_PATHS.tempStartDay);
const tempEndDay = (node, notSetValue) =>
  get(node, NODE_PATHS.tempEndDay, notSetValue);
const tempStartTime = node => get(node, NODE_PATHS.tempStartTime);
const tempEndTime = node => get(node, NODE_PATHS.tempEndTime);
const startTimeMode = node => get(node, NODE_PATHS.startTimeMode);
const startTimeValue = node => get(node, NODE_PATHS.startTimeValue);
const startTimeZoneId = node => get(node, NODE_PATHS.startTimeZoneId);
const startTimeZoneName = node => get(node, NODE_PATHS.startTimeZoneName);
const startTimeZoneOffset = node => get(node, NODE_PATHS.startTimeZoneOffset);
const endTimeMode = node => get(node, NODE_PATHS.endTimeMode);
const endTimeValue = (node, notSetValue) =>
  get(node, NODE_PATHS.endTimeValue, notSetValue);
const endTimeZoneId = (node, notSetValue) =>
  get(node, NODE_PATHS.endTimeZoneId, notSetValue);
const endTimeZoneName = (node, notSetValue) =>
  get(node, NODE_PATHS.endTimeZoneName, notSetValue);
const endTimeZoneOffset = (node, notSetValue) =>
  get(node, NODE_PATHS.endTimeZoneOffset, notSetValue);

const startingLabel = event => {
  if (EVENT_VIEW_HELPERS.isAccommodation(event)) {
    return 'Check-in';
  }

  if (EVENT_VIEW_HELPERS.isTransportation(event)) {
    if (EVENT_VIEW_HELPERS.isCarHire(event)) {
      return 'Pick-up';
    }

    return 'Departing';
  }

  return 'Starting';
};

const endingLabel = event => {
  if (EVENT_VIEW_HELPERS.isAccommodation(event)) {
    return 'Checkout';
  }

  if (EVENT_VIEW_HELPERS.isTransportation(event)) {
    if (EVENT_VIEW_HELPERS.isCarHire(event)) {
      return 'Drop-off';
    }

    return 'Arriving';
  }

  return 'Ending';
};

const timeFromValue = value => {
  if (!value) return null;

  const duration = moment.duration(value);
  const durationMoment = moment
    .utc()
    .startOf('day')
    .add(duration);

  return durationMoment.format('HH:mm');
};

const startTime = node => {
  const temp = EVENT_VIEW_HELPERS.tempStartTime(node);

  if (temp) return temp;

  const value = EVENT_VIEW_HELPERS.startTimeValue(node);
  const mode = EVENT_VIEW_HELPERS.startTimeMode(node);

  return EVENT_DATA_HELPERS.renderTimeString(mode, value);
};

const endTime = node => {
  const temp = EVENT_VIEW_HELPERS.tempEndTime(node);

  if (temp) return temp;

  const value = EVENT_VIEW_HELPERS.endTimeValue(node);
  const mode = EVENT_VIEW_HELPERS.endTimeMode(node);

  return EVENT_DATA_HELPERS.renderTimeString(mode, value);
};

const locationHrefStart = data => {
  const locationValue = EVENT_VIEW_HELPERS.locationStart(data);
  const placeIdValue = EVENT_VIEW_HELPERS.placeIdStart(data);

  if (!locationValue) return null;

  return URL_HELPERS.googlePlace(locationValue, placeIdValue);
};

const locationHrefEnd = data => {
  const locationValue = EVENT_VIEW_HELPERS.locationEnd(data);
  const placeIdValue = EVENT_VIEW_HELPERS.placeIdEnd(data);

  if (!locationValue) return null;

  return URL_HELPERS.googlePlace(locationValue, placeIdValue);
};

const locationHrefFromTo = data => {
  const locationA = EVENT_VIEW_HELPERS.locationStart(data);
  const placeIdA = EVENT_VIEW_HELPERS.placeIdStart(data);
  const locationB = EVENT_VIEW_HELPERS.locationEnd(data);
  const placeIdB = EVENT_VIEW_HELPERS.placeIdEnd(data);

  if (!locationA || !locationB) return null;

  return URL_HELPERS.googleDirection({
    origin: locationA,
    originPlaceId: placeIdA,
    destination: locationB,
    destinationPlaceId: placeIdB,
  });
};

const locationHref = data => {
  if (EVENT_VIEW_HELPERS.isTransportation(data)) {
    const origin = LOGIC_HELPERS.ifElse(
      EVENT_VIEW_HELPERS.isFlight(data),
      EVENT_VIEW_HELPERS.airportStart(data),
      EVENT_VIEW_HELPERS.locationStart(data),
    );
    const destination = LOGIC_HELPERS.ifElse(
      EVENT_VIEW_HELPERS.isFlight(data),
      EVENT_VIEW_HELPERS.airportEnd(data),
      EVENT_VIEW_HELPERS.locationEnd(data),
    );

    const originPlaceId = EVENT_VIEW_HELPERS.placeIdStart(data);
    const destinationPlaceId = EVENT_VIEW_HELPERS.placeIdEnd(data);

    return LOGIC_HELPERS.ifElse(
      [origin, destination],
      URL_HELPERS.googleDirection({
        origin,
        originPlaceId,
        destination,
        destinationPlaceId,
      }),
    );
  }

  const lName = EVENT_VIEW_HELPERS.locationName(data);
  const lPlaceId = EVENT_VIEW_HELPERS.placeId(data);

  return LOGIC_HELPERS.ifElse(lName, URL_HELPERS.googlePlace(lName, lPlaceId));
};

const hasPendingEventAttachment = (values = [], fileLoading = false) =>
  fileLoading &&
  Array.isArray(values) &&
  !!values.filter(itm => typeof itm === 'object' && !itm.link).length;

const eventDuration = node => {
  const startTime1 = EVENT_VIEW_HELPERS.startTime(node);
  const endTime1 = EVENT_VIEW_HELPERS.endTime(node);
  const startTimeZoneId1 = EVENT_VIEW_HELPERS.startTimeZoneId(node);
  const endTimeZoneId1 = EVENT_VIEW_HELPERS.endTimeZoneId(
    node,
    startTimeZoneId1,
  );
  const endTimeValue1 = EVENT_VIEW_HELPERS.endTimeValue(node);
  const days = EVENT_DATA_HELPERS.durationToDays(endTimeValue1);

  const startMoment = EVENT_DATA_HELPERS.toLocalTime(
    startTime1,
    startTimeZoneId1,
  );
  const endMoment = EVENT_DATA_HELPERS.toLocalTime(
    endTime1,
    endTimeZoneId1,
  ).add(days, 'day');

  return moment.duration(endMoment.diff(startMoment));
};

const costsByCurrencyReducer = (costs, key = 'actualAmount') =>
  costs.reduce((accu, { node: { currency: cur, [key]: amount } }) => {
    if (!accu[cur])
      return {
        ...accu,
        [cur]: amount,
      };

    return {
      ...accu,
      [cur]: accu[cur] + amount,
    };
  }, {});

export const EVENT_VIEW_HELPERS = {
  costsByCurrencyReducer,
  eventDuration,
  nameProp,
  tempStartDay,
  batchCreate,
  tempDayRange,
  tempEndDay,
  tempStartTime,
  tempEndTime,
  startTimeMode,
  startTimeValue,
  startTimeZoneId,
  startTimeZoneName,
  startTimeZoneOffset,
  endTimeMode,
  endTimeValue,
  endTimeZoneId,
  endTimeZoneName,
  endTimeZoneOffset,
  parentNodeId,
  timeFromValue,
  startTime,
  endTime,

  isAccommodation,
  isCarHire,
  isCoach,
  isBus,
  isFlight,
  isFood,
  isActivity,
  isWalking,
  isCycling,
  isTransit,
  travelMode,
  isTransportation,
  isPositionStart,
  isPositionMiddle,
  isPositionEnd,
  hasReservation,
  locationHref,
  locationHrefStart,
  locationHrefEnd,
  locationHrefFromTo,

  name: eventName,
  eventFullName,
  eventType,
  airportName,
  airportStart,
  airportEnd,
  cityNameStart,
  cityNameEnd,
  airportIATAStart,
  airportIATAEnd,
  iconOverride,
  nodeType,
  type,
  subtype,
  typeName,
  subTypeName,
  location,
  locationPlaceId,
  locationPlaceName,
  locationStart,
  locationEnd,
  placeId,
  placeIdStart,
  placeIdEnd,
  position,
  description,
  url,
  supplierPhoneNumber,
  eventAttachments,
  eventAmountId,
  bookingName,
  bookingNumber,
  budgetAmount,
  actualAmount,
  currency,
  bookingAmountId,
  bookingBudgetAmount,
  bookingActualAmount,
  bookingCurrency,
  prettifyAmount,
  normaliseAmount,
  renderDiff,
  convertAmount,
  percentage,
  bookingDate,
  setBookingNumber,
  personCount,
  paidBy,
  cancellationCancellationDate,
  cancellationSupplierConfirmed,
  cancellationCancellationReference,
  cancellationRefundSituation,
  cancellationCancellationNotes,
  setCancellationDate,
  setSupplierConfirmed,
  setCancellationReference,
  setRefundSituation,
  setCancellationNotes,
  numberOfRooms,
  subDetailType,
  roomType,
  setPersonCount,
  setBookingDate,
  setPaidBy,
  setCurrency,
  setBudgetAmount,
  setActualAmount,
  bookedBy,
  setBookedBy,
  supplierName,
  setSupplierName,
  flightNumber,
  flightBookingId,
  airline,
  gate,
  terminal,
  travelClass,
  locationName,
  startingLabel,
  endingLabel,
  transportationStartName,
  transportationStartPlaceName,
  transportationEndName,
  transportationEndPlaceName,
  hasPendingEventAttachment,
  isCancelled,
  cancellation,
};
