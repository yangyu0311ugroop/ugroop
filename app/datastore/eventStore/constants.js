/**
 * Created by stephenkarpinskyj on 15/8/18.
 */

import { ARRAY_HELPERS } from 'utils/helpers/arrays';

// region Paths
const EVENT_START = 'start';
const EVENT_END = 'end';

const makeFlightBookingPath = path => ARRAY_HELPERS.arrayIfNot(path);

/**
 * Paths to each property of a flight booking object.
 */
export const FLIGHT_BOOKING_PATHS = {
  name: makeFlightBookingPath('name'),
  bookingAmounts: makeFlightBookingPath('bookingAmounts'),
  number: makeFlightBookingPath('bookingNumber'),
  supplierName: makeFlightBookingPath('supplier'),
  passengerCount: makeFlightBookingPath('passengerCount'),
  createdBy: makeFlightBookingPath('createdBy'),
};

const makeEventPath = path => ARRAY_HELPERS.arrayIfNot(path);
const makeLocationPath = path => [
  'location',
  ...ARRAY_HELPERS.arrayIfNot(path),
];
const makeEventAmountsPath = path => [
  'eventAmounts',
  ...ARRAY_HELPERS.arrayIfNot(path),
];

const makeActivityDetailPath = path => ARRAY_HELPERS.arrayIfNot(path);

const makeDetailPath = path => ['detail', ...ARRAY_HELPERS.arrayIfNot(path)];
const makeAttendancePath = path => [
  'attendance',
  ...ARRAY_HELPERS.arrayIfNot(path),
];
const makeCommonTransportationPath = path => [
  'detail',
  'detail',
  'common',
  ...ARRAY_HELPERS.arrayIfNot(path),
];
const makeSubdetailPath = path => [
  'detail',
  'detail',
  ...ARRAY_HELPERS.arrayIfNot(path),
];
const makeStartAirportPath = path => [
  'detail',
  'detail',
  EVENT_START,
  'airport',
  ...ARRAY_HELPERS.arrayIfNot(path),
];
const makeEndAirportPath = path => [
  'detail',
  'detail',
  EVENT_END,
  'airport',
  ...ARRAY_HELPERS.arrayIfNot(path),
];
const makeAttachmentPath = path => ARRAY_HELPERS.arrayIfNot(path);

export const EVENT_ATTACHMENT_PATHS = {
  name: makeAttachmentPath('name'),
  description: makeAttachmentPath('description'),
  isDeleted: makeAttachmentPath('isDeleted'),
  link: makeAttachmentPath('link'),
  type: makeAttachmentPath('type'),
  size: makeAttachmentPath('size'),
};

/**
 * Paths to each property of an event object.
 */
export const EVENT_PATHS = {
  url: makeEventPath('url'),
  type: makeEventPath('type'),
  cancellation: makeEventPath('cancellation'),
  subtype: makeDetailPath('type'),
  iconOverride: makeDetailPath('iconOverride'),
  name: makeEventPath('name'),
  description: makeEventPath('description'),
  eventAmountId: makeEventAmountsPath('id'),
  actualAmount: makeEventAmountsPath('actualAmount'),
  budgetAmount: makeEventAmountsPath('budgetAmount'),
  currency: makeEventAmountsPath('currency'),
  locationName: makeLocationPath('name'),
  locationPlaceName: makeLocationPath('placeName'),
  locationIcon: makeLocationPath('icon'),
  placeId: makeLocationPath('placeId'),

  numberOfRooms: makeDetailPath('numberOfRooms'),
  roomType: makeDetailPath('roomType'),
  bookerName: makeDetailPath('bookedBy'),
  bookedBy: makeDetailPath('bookedBy'),
  bookingNumber: makeDetailPath('bookingNumber'),
  bookingDate: makeDetailPath('bookingDate'),
  bookingPersonCount: makeDetailPath('bookingPersonCount'),
  paidBy: makeDetailPath('paidBy'),
  supplierName: makeDetailPath('supplier'),
  supplierPhone: makeDetailPath('supplierPhoneNumber'),

  activityDetails: makeDetailPath(['activityDetails']),

  activityDetailStart: makeDetailPath(['activityDetails', 'start']),
  activityDetailStartName: makeDetailPath(['activityDetails', 'start', 'name']),
  activityDetailStartPlaceId: makeDetailPath([
    'activityDetails',
    'start',
    'placeId',
  ]),
  activityDetailStartIcon: makeDetailPath(['activityDetails', 'start', 'icon']),

  activityDetailEnd: makeDetailPath(['activityDetails', 'end']),
  activityDetailEndName: makeDetailPath(['activityDetails', 'end', 'name']),
  activityDetailEndPlaceId: makeDetailPath([
    'activityDetails',
    'end',
    'placeId',
  ]),
  activityDetailEndIcon: makeDetailPath(['activityDetails', 'end', 'icon']),

  attendance: makeAttendancePath(),
  startAttendance: makeAttendancePath('recordEventStart'),
  endAttendance: makeAttendancePath('recordEventEnd'),
  dailyAttendance: makeAttendancePath('recordEachDay'),

  startAirportName: makeStartAirportPath('name'),
  startCityName: makeStartAirportPath('cityName'),
  startIataCode: makeStartAirportPath('iataCode'),
  endAirportName: makeEndAirportPath('name'),
  endCityName: makeEndAirportPath('cityName'),
  endIataCode: makeEndAirportPath('iataCode'),
  airline: makeSubdetailPath('airline'),
  flightNumber: makeSubdetailPath('flightNumber'),
  flightBooking: makeSubdetailPath('flightBookingId'),
  flightTravelClass: makeSubdetailPath('travelClass'),
  terminal: makeSubdetailPath('terminal'),
  gate: makeSubdetailPath('gate'),

  // TODO: Remove all subDetail once every transportation event was been migrated to using transportation paths
  subDetailBookerName: makeCommonTransportationPath([
    'eventBooking',
    'bookedBy',
  ]),
  subDetailBookingNumber: makeCommonTransportationPath([
    'eventBooking',
    'bookingNumber',
  ]),
  subDetailBookingPersonCount: makeCommonTransportationPath([
    'eventBooking',
    'personCount',
  ]),
  subDetailSupplierName: makeCommonTransportationPath([
    'eventBooking',
    'supplierName',
  ]),
  subDetailSupplierPhone: makeCommonTransportationPath([
    'eventBooking',
    'supplierNumber',
  ]),

  subDetailPickup: makeCommonTransportationPath('start'),
  subDetailPickupName: makeCommonTransportationPath(['start', 'name']),
  subDetailPickupIcon: makeCommonTransportationPath(['start', 'icon']),
  subDetailPickupPlaceId: makeCommonTransportationPath(['start', 'placeId']),

  subDetailDropoff: makeCommonTransportationPath('end'),
  subDetailDropoffName: makeCommonTransportationPath(['end', 'name']),
  subDetailDropoffIcon: makeCommonTransportationPath(['end', 'icon']),
  subDetailDropoffPlaceId: makeCommonTransportationPath(['end', 'placeId']),

  sameAsOrigin: makeCommonTransportationPath('sameAsOrigin'),

  batchCreate: makeEventPath('batchCreate'),
  tempDayRange: makeEventPath('tempDayRange'),

  eventAttachments: makeEventPath('eventAttachments'),

  subSubType: makeSubdetailPath('type'),

  transportationType: makeSubdetailPath('type'),
  transportationDetailBookerName: makeCommonTransportationPath([
    'eventBooking',
    'bookedBy',
  ]),
  transportationDetailBookingNumber: makeCommonTransportationPath([
    'eventBooking',
    'bookingNumber',
  ]),
  transportationDetailBookingDate: makeCommonTransportationPath([
    'eventBooking',
    'bookingDate',
  ]),
  transportationDetailBookingPersonCount: makeCommonTransportationPath([
    'eventBooking',
    'personCount',
  ]),
  transportationDetailPaidBy: makeCommonTransportationPath([
    'eventBooking',
    'paidBy',
  ]),
  transportationDetailSupplierName: makeCommonTransportationPath([
    'eventBooking',
    'supplierName',
  ]),
  transportationDetailSupplierPhone: makeCommonTransportationPath([
    'eventBooking',
    'supplierNumber',
  ]),

  transportationDetailStart: makeCommonTransportationPath('start'),
  transportationDetailStartName: makeCommonTransportationPath([
    'start',
    'name',
  ]),
  transportationDetailStartPlaceName: makeCommonTransportationPath([
    'start',
    'placeName',
  ]),
  transportationDetailStartIcon: makeCommonTransportationPath([
    'start',
    'icon',
  ]),
  transportationDetailStartPlaceId: makeCommonTransportationPath([
    'start',
    'placeId',
  ]),

  transportationDetailEnd: makeCommonTransportationPath('end'),
  transportationDetailEndName: makeCommonTransportationPath(['end', 'name']),
  transportationDetailEndPlaceName: makeCommonTransportationPath([
    'end',
    'placeName',
  ]),
  transportationDetailEndIcon: makeCommonTransportationPath(['end', 'icon']),
  transportationDetailEndPlaceId: makeCommonTransportationPath([
    'end',
    'placeId',
  ]),

  activityDetailKey: makeActivityDetailPath('key'),
  activityDetailValue: makeActivityDetailPath('value'),
};
// endregion
