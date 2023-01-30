/**
 * Created by stephenkarpinskyj on 29/5/18.
 */

import moment from 'moment';
import { FORMATS_DATE_TIME } from 'utils/constants/dateTime';

const TEXT_MIN_ERROR = minLength =>
  `Must be at least ${minLength} characters long`;
const TEXT_MAX_ERROR = maxLength =>
  `Must not be longer than ${maxLength} characters`;

const INT_ERROR = () => 'Must be integer';
const NUMBER_MIN_ERROR = min => `Must be ${min} or higher`;
const NUMBER_MAX_ERROR = max => `Must be ${max} or lower`;

const DURATION_PLACEHOLDER = 'eg. 4d 12h 30m';
const DURATION_ERROR = () =>
  `Please use valid format (${DURATION_PLACEHOLDER})`;
const DURATION_POSITIVE_ERROR = () => 'Must be positive (eg. 1h)';

const DATE_DISPLAY_FORMAT = FORMATS_DATE_TIME.DATE;
// TODO: Get a decent datetime parser...
const makeDayFirstDateFormats = (s, m) => [
  `D${s}${m}${s}YY`,
  `D${s}${m}${s}YYYY`,
  `DD${s}${m}${s}YY`,
  `DD${s}${m}${s}YYYY`,
];
const makeMonthFirstDateFormats = (s, m) => [
  `${m}${s}D${s}YY`,
  `${m}${s}D${s}YYYY`,
  `${m}${s}DD${s}YY`,
  `${m}${s}DD${s}YYYY`,
];
const makeDateFormats = func => [
  ...func('/', 'M'),
  ...func('-', 'M'),
  ...func('/', 'MM'),
  ...func('-', 'MM'),
  ...func('/', 'MMM'),
  ...func('-', 'MMM'),
  ...func(' ', 'MMM'),
  ...func('/', 'MMMM'),
  ...func('-', 'MMMM'),
  ...func(' ', 'MMMM'),
];
const DATE_INPUT_FORMATS = [
  ...makeDateFormats(makeDayFirstDateFormats),
  ...makeDateFormats(makeMonthFirstDateFormats),
];
const TIME_DISPLAY_FORMAT = FORMATS_DATE_TIME.TIME;
// TODO: Get a decent datetime parser...
const makeTimeFormats = (h, s, a) => [
  // Minutes
  `${h}${s}mm${a}`,
  `${h}${s}mm ${a}`,
  `${h}${h}${s}mm${a}`,
  `${h}${h}${s}mm ${a}`,
  // No minutes
  `${h}${a}`,
  `${h} ${a}`,
  `${h}${h}${a}`,
  `${h}${h} ${a}`,
];
const makeAllTimeFormats = h => [
  ...makeTimeFormats(h, ':', 'a'),
  ...makeTimeFormats(h, ':', 'A'),
  ...makeTimeFormats(h, '.', 'a'),
  ...makeTimeFormats(h, '.', 'A'),
];
const TIME_INPUT_FORMATS = [
  'H',
  'HH',
  'H:mm',
  'HH:mm',
  'H.mm',
  'HH.mm', // 24hr
  ...makeAllTimeFormats('h'), // AM/PM
  ...makeAllTimeFormats('H'), // Mixed
];
const DATE_ERROR = (displayFormat = DATE_DISPLAY_FORMAT) =>
  `Please use valid format (eg. ${moment
    .utc()
    .startOf('y')
    .year(2019)
    .add(3, 'M')
    .format(displayFormat)})`;
const DATE_MIN = '1900-01-01';
const DATE_MIN_ERROR = (minDate, displayFormat) =>
  minDate
    ? `Minimum date is ${moment.utc(minDate).format(displayFormat)}`
    : null;
const DATE_MAX_ERROR = (maxDate, displayFormat) =>
  maxDate
    ? `Maximum date is ${moment.utc(maxDate).format(displayFormat)}`
    : null;
const TIME_ERROR = (displayFormat = TIME_DISPLAY_FORMAT) =>
  `Please use valid format (eg. ${moment
    .utc()
    .startOf('d')
    .add(14, 'h')
    .format(displayFormat)})`;
const TIME_MIN_FIELD_ERROR = () => 'Time is before minimum time';
const TIME_MAX_FIELD_ERROR = () => 'Time is after maximum time';

const PHONE_IS_PHONE_NUMBER_ERROR = () => 'Please use valid format';

const EMAIL_IS_EMAIL_ERROR = () => 'Email address is not valid';
const EMAIL_MY_EMAIL_ERROR = () => "Hey, that's your email address";
const EMAIL_BLACKLIST_ERROR = () => 'Hey, that email is not allowed';

export default {
  // text
  TEXT_MIN_ERROR,
  TEXT_MAX_ERROR,

  // number
  INT_ERROR,
  NUMBER_MIN_ERROR,
  NUMBER_MAX_ERROR,

  // duration
  DURATION_PLACEHOLDER,
  DURATION_ERROR,
  DURATION_POSITIVE_ERROR,

  // datetime
  DATE_DISPLAY_FORMAT,
  DATE_INPUT_FORMATS,
  TIME_DISPLAY_FORMAT,
  TIME_INPUT_FORMATS,
  DATE_ERROR,
  DATE_MIN,
  DATE_MIN_ERROR,
  DATE_MAX_ERROR,
  TIME_ERROR,
  TIME_MIN_FIELD_ERROR,
  TIME_MAX_FIELD_ERROR,

  // phone number
  PHONE_IS_PHONE_NUMBER_ERROR,

  // email
  EMAIL_IS_EMAIL_ERROR,
  EMAIL_MY_EMAIL_ERROR,
  EMAIL_BLACKLIST_ERROR,
};
