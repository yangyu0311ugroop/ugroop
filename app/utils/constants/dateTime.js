/**
 * Created by stephenkarpinskyj on 13/6/18.
 */

const FORMAT_DAY_DATE_SEPARATOR = ', ';
const FORMAT_TIME_ZONE_SEPARATOR = ' ';
const FORMAT_TIME_DATE_SEPARATOR = ',';
const FORMAT_DATE_TIME_SEPARATOR = ' at ';
const FORMAT_ZONE_OFFSET_SEPARATOR = ' ';
const FORMAT_PERIOD_SEPARATOR = ' to ';
const FORMAT_DATE_TIME_PERIOD_SEPARATOR = ' from ';
const FORMAT_CURRENT_DATE_TIME_SEPARATOR = ' at ';

const FORMAT_DAY = 'dddd';
const FORMAT_DAY_SHORT = 'ddd';
const FORMAT_DATE = 'D MMMM YYYY';
const FORMAT_DATE_SHORT = 'D MMM YYYY';
const FORMAT_DATE_SHORTER = 'ddd, D MMM';
const FORMAT_DATE_SHORTER_DIFF_YEAR = "ddd, D MMM [']YY";
const FORMAT_DAY_DATE = `${FORMAT_DAY}[${FORMAT_DAY_DATE_SEPARATOR}]${FORMAT_DATE}`;
const FORMAT_DAY_DATE_SHORT = `${FORMAT_DAY_SHORT}[${FORMAT_DAY_DATE_SEPARATOR}]${FORMAT_DATE_SHORT}`;
const FORMAT_TIME = 'HH:mm';
const FORMAT_ZONE = 'z';
const FORMAT_OFFSET = 'Z';
const FORMAT_ZONE_OFFSET = `z[${FORMAT_ZONE_OFFSET_SEPARATOR}]Z`;
const FORMAT_TIME_SECONDS = `${FORMAT_TIME}:ss`;
const FORMAT_DAY_TIME = `${FORMAT_DAY}[${FORMAT_DATE_TIME_SEPARATOR}]${FORMAT_TIME}`;
const FORMAT_DATE_TIME = `${FORMAT_TIME}[${FORMAT_TIME_DATE_SEPARATOR}]${FORMAT_DATE}`;
const FORMAT_DAY_DATE_TIME = `${FORMAT_DAY_DATE}[${FORMAT_DATE_TIME_SEPARATOR}]${FORMAT_TIME}`;
const FORMAT_DAY_DATE_TIME_SECONDS = `${FORMAT_DAY_DATE}[${FORMAT_DATE_TIME_SEPARATOR}]${FORMAT_TIME_SECONDS}`;
const FORMAT_CURRENT_DAY_DATE_TIME = `${FORMAT_DAY_DATE}[${FORMAT_CURRENT_DATE_TIME_SEPARATOR}]${FORMAT_TIME}`;
const FORMAT_STANDARD_DATE = 'YYYY-MM-DD';

const FORMAT_DAY_DATE_SHORT_TIME = `${FORMAT_DAY_DATE_SHORT}[${FORMAT_DATE_TIME_SEPARATOR}]${FORMAT_TIME}`;

// TODO: Factor in user preference (eg. month-first date format, 24hr time format)
export const FORMATS_DATE_TIME = {
  DAY: FORMAT_DAY,
  DAY_SHORT: FORMAT_DAY_SHORT,
  DATE: FORMAT_DATE,
  DATE_SHORT: FORMAT_DATE_SHORT,
  DATE_SHORTER: FORMAT_DATE_SHORTER,
  DATE_SHORTER_DIFF_YEAR: FORMAT_DATE_SHORTER_DIFF_YEAR,
  DAY_DATE: FORMAT_DAY_DATE,
  DAY_DATE_SHORT: FORMAT_DAY_DATE_SHORT,
  TIME: FORMAT_TIME,
  ZONE: FORMAT_ZONE,
  OFFSET: FORMAT_OFFSET,
  ZONE_OFFSET: FORMAT_ZONE_OFFSET,
  TIME_SECONDS: FORMAT_TIME_SECONDS,
  DAY_TIME: FORMAT_DAY_TIME,
  DATE_TIME: FORMAT_DATE_TIME,
  DAY_DATE_TIME: FORMAT_DAY_DATE_TIME,
  DAY_DATE_SHORT_TIME: FORMAT_DAY_DATE_SHORT_TIME,
  DAY_DATE_TIME_SECONDS: FORMAT_DAY_DATE_TIME_SECONDS,
  FORMAT_STANDARD_DATE,

  CURRENT: {
    DAY_DATE_TIME: FORMAT_CURRENT_DAY_DATE_TIME,
  },

  SEPARATORS: {
    DAY_DATE: FORMAT_DAY_DATE_SEPARATOR,
    TIME_ZONE: FORMAT_TIME_ZONE_SEPARATOR,
    TIME_DATE: FORMAT_TIME_DATE_SEPARATOR,
    DATE_TIME: FORMAT_DATE_TIME_SEPARATOR,
    ZONE_OFFSET: FORMAT_ZONE_OFFSET_SEPARATOR,
    PERIOD: FORMAT_PERIOD_SEPARATOR,
    DATE_TIME_PERIOD: FORMAT_DATE_TIME_PERIOD_SEPARATOR,
    CURRENT_DATE_TIME: FORMAT_CURRENT_DATE_TIME_SEPARATOR,
  },
};

export const TIME_ZONE_IDS = {
  UTC: 'Etc/UTC',
};

export const FIRST_DATE = '0001-01-01';

export const DEFAULT_DURATION = 'P0D';
export const ONE_DAY_DURATION = 'P1D';
export const SHORTEST_ITINERARY_DURATION = 'PT30M';
