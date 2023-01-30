import { ARRAY_HELPERS } from 'utils/helpers/arrays';

export const NODE_BATCH_ACTIONS = {
  MOVE_INSIDE: 'MOVE_INSIDE',
  UPDATE_EVENT: 'UPDATE_EVENT',
};

// region Paths
const makePath = path => ARRAY_HELPERS.arrayIfNot(path);
const makeDataPath = path => ['customData', ...ARRAY_HELPERS.arrayIfNot(path)];
const makeCalculatedPath = path => [
  'calculated',
  ...ARRAY_HELPERS.arrayIfNot(path),
];
const makeCalculatedTimePath = path => [
  'calculated',
  'time',
  ...ARRAY_HELPERS.arrayIfNot(path),
];
const makeStartPath = path => [
  'customData',
  'start',
  ...ARRAY_HELPERS.arrayIfNot(path),
];
const makeEndPath = path => [
  'customData',
  'end',
  ...ARRAY_HELPERS.arrayIfNot(path),
];

/**
 * Paths to each property of any node store object.
 */
export const NODE_PATHS = {
  id: makePath('id'),
  type: makePath('type'),
  content: makePath('content'),
  parentNodeId: makePath('parentNodeId'),
  children: makePath('children'),
  status: makePath('status'),
  participantLinks: makePath('participantLinks'),
  createdAt: makePath('createdAt'),
  createdBy: makePath('createdBy'),
  forms: makePath('forms'),
  attachment: makePath('attachment'),
  seats: makePath('seats'),

  firstName: makeDataPath('firstName'),
  lastName: makeDataPath('lastName'),
  dateOfBirth: makeDataPath('dob'),
  dateOfBirthMode: makeDataPath('dobMode'),
  email: makeDataPath('email'),
  phone: makeDataPath('phone'),
  userPhoneId: makeDataPath('phoneId'),
  passportId: makeDataPath('passportId'),
  namePersonId: makeDataPath('namePersonId'),

  comment: makeDataPath('comment'),
  note: makeDataPath('note'),
  honorificTitle: makeDataPath('honorificTitle'),
  ageType: makeDataPath('ageType'),
  roomType: makeDataPath('roomType'),
  bedCount: makeDataPath('bedCount'),
  guestCount: makeDataPath('guestCount'),

  participants: makePath('participants'),
  personType: makeDataPath('personType'),
  interestLevel: makeDataPath('interestLevel'),
  requiresConsent: makeDataPath('requiresConsent'),
  consentedBy: makeDataPath('consentedBy'),
  insuranceMode: makeDataPath('insuranceMode'),
  insuranceValue: makeDataPath('insuranceValue'),

  // Start customData
  startTimeMode: makeStartPath('mode'),
  startTimeValue: makeStartPath('value'),
  startTimeZoneId: makeStartPath('timeZoneId'),
  startTimeZoneName: makeStartPath('timeZoneName'),
  startTimeZoneOffset: makeStartPath('timeZoneOffset'),
  tempStartDay: makeStartPath('tempDay'),
  tempStartTime: makeStartPath('tempTime'),
  tempStartMode: makeStartPath('tempMode'),

  // End customData
  endTimeMode: makeEndPath('mode'),
  endTimeValue: makeEndPath('value'),
  endTimeZoneId: makeEndPath('timeZoneId'),
  endTimeZoneName: makeEndPath('timeZoneName'),
  endTimeZoneOffset: makeEndPath('timeZoneOffset'),
  tempEndDay: makeEndPath('tempDay'),
  tempEndTime: makeEndPath('tempTime'),
  tempEndMode: makeEndPath('tempMode'),

  // Calculated
  calculatedPeople: makeCalculatedPath('people'),
  calculatedStartTimeValue: makeCalculatedTimePath(['start', 'value']),
  calculatedStartTimeMode: makeCalculatedTimePath(['start', 'mode']),
  calculatedEndTimeValue: makeCalculatedTimePath(['end', 'value']),
  calculatedEndTimeMode: makeCalculatedTimePath(['end', 'mode']),
};
// endregion
