import { ACTIVE, PAST, UPCOMING } from 'appConstants';
import moment from 'moment';
import momentTimezone from 'moment-timezone';
import { dateDisplay } from 'utils/constant';
import { FIRST_DATE, FORMATS_DATE_TIME } from 'utils/constants/dateTime';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { isEmptyString, pluralizeText } from 'utils/stringAdditions';
import ARRAY_HELPERS from './arrays';

const getTourStatusWithStartAndDuration = (
  startDate,
  duration,
  now = moment(),
) => {
  const start = moment(startDate)
    .hour(0)
    .minute(0)
    .second(0);

  const end = moment(start)
    .add(duration - 1, 'day')
    .hour(23)
    .minute(59)
    .second(59);

  const past = now.isAfter(end);

  if (past) return PAST;
  const active = now.isBetween(start, end);
  if (active) return ACTIVE;
  return UPCOMING;
};

const getStartDate = customData => {
  switch (customData.displayDate) {
    case dateDisplay.startDate:
      return moment.utc(customData.startDate);
    case dateDisplay.weekDay:
      return moment.utc(FIRST_DATE).day(customData.weekDay);
    default:
      return moment.utc(FIRST_DATE);
  }
};

const getNow = () => moment().toISOString();

const formatDate = (startDate, displayDate, dateFormat, showFromNow) => {
  let dateString = '';
  if (displayDate === dateDisplay.startDate) {
    // show from now. i.e. (in 19 days)
    const fromNow = showFromNow ? ` (${startDate.fromNow()})` : '';
    const dformat = dateFormat || 'ddd, DD MMM';
    dateString = `${startDate.format(dformat)}${fromNow}`;
  }
  if (displayDate === dateDisplay.weekDay) {
    const dformat = dateFormat || 'ddd';
    dateString = `${startDate.format(`${dformat}`)}`; // only show Weekday
  }
  return dateString;
};

const isYearDisplayable = value => moment(value).year() >= 1900;

const isYearThisYear = value => !(moment(value).year() > moment().year());

const addDayThenGetDate = (
  addDay,
  date,
  format = 'MMMM D, YYYY',
  addTo = 'days',
) =>
  moment(date)
    .add(addDay, addTo)
    .format(format)
    .toString();

const getDate = startDate =>
  moment(startDate)
    .format('Do MMMM YYYY')
    .toString();

const getDateWithFormat = (date, format) =>
  moment(date)
    .format(format)
    .toString();

const getDateFromUnixFormat = (unix, format) =>
  moment.unix(unix).format(format);

const getDay = (day, format = 'dddd') =>
  moment(
    moment()
      .day(day)
      .toISOString(),
  ).format(format);

/**
 * Calculate the month difference between two dates
 * @param {string} startDate
 * @param {string} endDate
 * @param {string} unit
 * @return {number}
 */
const getDifference = (
  startDate,
  endDate,
  unit = 'M',
  additionToStartDate = 0,
) => {
  const startDateMonth = parseInt(getDateWithFormat(startDate, unit), 10);
  const addedDateMonth = parseInt(getDateWithFormat(endDate, unit), 10);

  return addedDateMonth + additionToStartDate - startDateMonth;
};

/**
 * Get the number of days per month up to the target month based on the added days
 * @param {string} startDate
 * @param {number} addedDays
 * @param {Object} opts
 * @return {Array}
 */
const trackStartDateUpToAddedDay = (
  startDate,
  addedDays,
  opts = { yearFormat: 'YYYY', monthFormat: 'MMMM' },
) => {
  const endDate = moment(startDate).add(addedDays, 'days');
  const yearDifference = getDifference(startDate, endDate, 'YYYY');

  let monthDifference = getDifference(startDate, endDate);

  if (yearDifference > 0) {
    monthDifference = getDifference(
      startDate,
      endDate,
      'M',
      12 * yearDifference,
    );
  }

  if (monthDifference > 0) {
    let dates = [];
    let initDifference = 0;
    let days = addedDays;
    for (let i = 0; i <= monthDifference; i += 1) {
      if (i === 0) {
        const initDay = parseInt(
          moment(startDate)
            .format('D')
            .toString(),
          10,
        );
        const monthEndDay = parseInt(
          moment(startDate)
            .endOf('month')
            .format('D')
            .toString(),
          10,
        );
        initDifference = monthEndDay - initDay + 1;
        days -= initDifference;
        dates = [
          ...dates,
          {
            month: getDateWithFormat(startDate, opts.monthFormat),
            year: getDateWithFormat(startDate, opts.yearFormat),
            count: initDifference,
          },
        ];
      } else if (i === monthDifference) {
        const lastMonth = moment(startDate).add(i, 'month');
        dates = [
          ...dates,
          {
            month: lastMonth.format(opts.monthFormat),
            year: lastMonth.format(opts.yearFormat),
            count: days,
          },
        ];
      } else {
        const nextMonth = moment(startDate).add(i, 'months');
        const nextMonthDays = parseInt(
          nextMonth
            .endOf('month')
            .format('D')
            .toString(),
          10,
        );
        days -= nextMonthDays;
        dates = [
          ...dates,
          {
            month: nextMonth.format(opts.monthFormat),
            year: nextMonth.format(opts.yearFormat),
            count: nextMonthDays,
          },
        ];
      }
    }
    return dates;
  }

  return [
    {
      month: getDateWithFormat(startDate, opts.monthFormat),
      year: getDateWithFormat(startDate, opts.yearFormat),
      count: addedDays,
    },
  ];
};

const setDate = (time, date = moment.utc()) =>
  time
    ? time.clone().set({ y: date.get('y'), M: date.get('M'), d: date.get('d') })
    : time;

const setTime = (date, time) =>
  date
    ? date
        .clone()
        .set({ h: time ? time.get('h') : 0, m: time ? time.get('m') : 0 })
    : date;

/**
 * Creates new moment with timeZone set
 * @param date Source moment
 * @param timeZoneId Temporarily defaults to browser timeZone
 * @param keepLocalTime Recalculates utc time instead of local time
 */
const setTimeZone = (date, timeZoneId = null, keepLocalTime = true) => {
  if (date) {
    const tz =
      !!timeZoneId && moment.tz.zone(timeZoneId)
        ? timeZoneId
        : MOMENT_HELPERS.guessTimeZone();
    return moment.utc(date).tz(tz, keepLocalTime);
  }
  return date;
};

const guessTimeZone = momentTimezone.tz.guess;

const isBefore = (a, b, unit = 'ms') =>
  (!a && !b) || (!!a && moment.utc(a).isBefore(b, unit));

const isSame = (a, b, unit = 'd') =>
  (!a && !b) || (!!a && moment.utc(a).isSame(b, unit));

const isAfter = (a, b, unit = 'ms') =>
  (!a && !b) || (!!a && moment.utc(a).isAfter(b, unit));

const startOf = (date, unit = 'd') => moment.utc(date).startOf(unit);

const isBetween = (date, start, end, unit = 'd', inclusivity) =>
  date && start && end
    ? moment.utc(date).isBetween(start, end, unit, inclusivity)
    : false;

const minDate = (dateA, dateB) => moment.min(moment(dateA), moment(dateB));

const diff = (a, b, unit = 'ms') => moment.utc(b).diff(moment.utc(a), unit);

const diffInUnit = (a, b, unit = 'd') =>
  moment
    .utc(b)
    .startOf(unit)
    .diff(moment.utc(a).startOf(unit), unit);

const create = moment;

const createUtc = moment.utc;

const createDuration = moment.duration;

const addDuration = (date, duration) =>
  moment.utc(date).add(moment.duration(duration));

const addDurations = (date, durations) =>
  ARRAY_HELPERS.arrayIfNot(durations).reduce(
    MOMENT_HELPERS.addDuration,
    moment.utc(date),
  );

/**
 * Convert seconds to readable duration
 * @param {Object} duration
 * @param {Object} [format]
 * @param {string} format.y
 * @param {string} format.M
 * @param {string} format.d
 * @param {string} format.h
 * @param {string} format.m
 * @param {string} format.s
 * @param {string} format.ms
 * @param {{ [isPlural]: boolean, [withSpaceBetweenAmountAndUnit]: boolean }} [opts]
 * @return {string}
 */
const stringifyDuration = (duration, format = {}, opts = {}) => {
  let str = '';
  const fmt = {
    y: 'y',
    M: 'mth',
    d: 'd',
    h: 'h',
    m: 'm',
    s: 's',
    ms: 'ms',
    ...format,
  };
  const options = {
    isPlural: false,
    withSpaceBetweenAmountAndUnit: false,
    ...opts,
  };

  if (duration) {
    const momentDuration = moment.duration(duration);
    Object.entries(fmt).forEach(([key, unit]) => {
      const amount = momentDuration.get(key);
      if (amount) {
        const plural = options.isPlural && amount > 1 ? 's' : '';
        const space = str ? ' ' : '';
        const spaceBetweenUnitAndAmount = options.withSpaceBetweenAmountAndUnit
          ? ' '
          : '';
        str = `${str}${space}${amount}${spaceBetweenUnitAndAmount}${unit}${plural}`;
      }
    });
  }

  return str;
};

const renderDurationHoursMinutes = (duration, { hourLimit = 100 } = {}) => {
  if (duration) {
    const momentDuration = moment.duration(duration);
    const h = momentDuration.as('h');

    if (h < -hourLimit) {
      return `Less than -${hourLimit}h`;
    }

    if (h > hourLimit) {
      return `More than ${hourLimit}h`;
    }

    const values = {
      h: Math.floor(h),
      m: momentDuration.get('m'),
    };

    return Object.entries(values).reduce((acc, [unit, amount]) => {
      if (amount) {
        const space = acc ? ' ' : '';
        return `${acc}${space}${amount}${unit}`;
      }
      return acc;
    }, '');
  }
  return '';
};

/**
 * Check whether the date is weekend or not
 * @param {string} date
 * @return {boolean}
 */
const isWeekend = date => {
  const weekends = ['sat', 'sun'];
  return weekends.includes(getDateWithFormat(date, 'ddd').toLowerCase());
};

const isPrehistoric = date => moment(date).get('y') < 1900;

const appendZone = (date, format) =>
  moment(date).format(
    `${format}[${FORMATS_DATE_TIME.SEPARATORS.TIME_ZONE}${renderZone(date)}]`,
  );

const renderCalendarDueDate = (date, now = moment()) => {
  const due = moment(date);

  const format = due.isSame(now, 'year')
    ? FORMATS_DATE_TIME.DATE_SHORTER
    : FORMATS_DATE_TIME.DATE_SHORTER_DIFF_YEAR;

  return due.format(format);
};

const renderCalendarDate = date =>
  moment(date).calendar(null, {
    sameDay: `[Today], dddd, ${FORMATS_DATE_TIME.DATE}`,
    nextDay: `[Tomorrow], dddd, ${FORMATS_DATE_TIME.DATE}`,
    nextWeek: `dddd, ${FORMATS_DATE_TIME.DATE}`,
    lastDay: `[Yesterday], dddd, ${FORMATS_DATE_TIME.DATE}`,
    lastWeek: `[Last] dddd, ${FORMATS_DATE_TIME.DATE}`,
    sameElse: `dddd, ${FORMATS_DATE_TIME.DATE}`,
  });

const renderCalendar = (date, now = moment()) =>
  moment(date).calendar(now, {
    sameDay: `[Today]`,
    nextDay: `[Tomorrow]`,
    nextWeek: `dddd, ${FORMATS_DATE_TIME.DATE}`,
    lastDay: `[Yesterday]`,
    lastWeek() {
      // not using arrow function because I need `this` context
      if (this.isSame(now, 'week')) {
        return 'dddd';
      }
      return '[Last] dddd';
    },
    sameElse() {
      // not using arrow function because I need `this` context
      return 'D MMM YYYY';
    },
  });

const renderCalendarWithTime = (date, now = moment()) =>
  moment(date).calendar(now, {
    sameDay: `[Today at] H:mm`,
    nextDay: `[Tomorrow at] H:mm`,
    nextWeek: `dddd, ${FORMATS_DATE_TIME.DATE}`,
    lastDay: `[Yesterday at] H:mm`,
    lastWeek() {
      // not using arrow function because I need `this` context
      if (this.isSame(now, 'week')) {
        return 'dddd [at] H:mm';
      }
      return '[Last] dddd [at] H:mm';
    },
    sameElse() {
      // not using arrow function because I need `this` context
      if (this.isSame(now, 'year')) {
        return 'D MMM [at] H:mm';
      }
      return "D MMM [']YY [at] H:mm";
    },
  });

const renderRelativeTime = (time, now = moment().tz(time.tz())) => {
  let format = '';

  const diffNow = MOMENT_HELPERS.diffInUnit(now, time);
  const diffNowWeek = MOMENT_HELPERS.diffInUnit(now, time, 'week');
  const isSunday = time.day() === 0;

  if (diffNow === 0) {
    format = '[Today]';
  } else if (diffNow === 1) {
    format = '[Tomorrow] ';
  } else if (diffNowWeek === 0) {
    if (isSunday) {
      format = 'ddd, D MMM';
    } else {
      format = '[This] dddd';
    }
  } else if (diffNowWeek === 1) {
    if (isSunday) {
      format = '[This] dddd';
    } else {
      format = '[Next] dddd';
    }
  } else if (diffNowWeek === 2 && isSunday) {
    format = '[Next] dddd';
  } else {
    format = MOMENT_HELPERS.isYearThisYear(time)
      ? `ddd, D MMM`
      : `ddd, D MMM [']YY`;
  }

  return time.format(format);
};

const renderTimeSinceCalendar = (date, now = moment()) =>
  moment(date).calendar(now, {
    sameDay: `[Updated today]`,
    nextDay: `[Updated tomorrow]`,
    nextWeek: `on dddd, ${FORMATS_DATE_TIME.DATE}`,
    lastDay: `[Updated yesterday]`,
    lastWeek() {
      // not using arrow function because I need `this` context
      // if (this.isSame(now, 'week')) {
      //   return '[Updated this] dddd';
      // }
      return '[Updated last] dddd';
    },
    sameElse() {
      // not using arrow function because I need `this` context
      if (this.isSame(now, 'year')) {
        return '[Updated on] D MMM';
      }
      return "[Updated on] D MMM [']YY";
    },
  });

const renderCalendarDateShort = date =>
  moment(date).calendar(null, {
    sameDay: `[Today], ${FORMATS_DATE_TIME.DATE_SHORTER}`,
    nextDay: `[Tomorrow], ${FORMATS_DATE_TIME.DATE_SHORTER}`,
    nextWeek: `${FORMATS_DATE_TIME.DATE_SHORTER}`,
    lastDay: `[Yesterday], ${FORMATS_DATE_TIME.DATE_SHORTER}`,
    lastWeek: `[Last] dddd, ${FORMATS_DATE_TIME.DATE_SHORTER}`,
    sameElse() {
      // not using arrow function because I need `this` context
      if (this.isSame(moment(), 'year')) {
        return FORMATS_DATE_TIME.DATE_SHORTER;
      }
      return FORMATS_DATE_TIME.DATE_SHORTER_DIFF_YEAR;
    },
  });

const renderCalendarDateTimeShort = date =>
  moment(date).calendar(null, {
    sameDay: `[Today], ${FORMATS_DATE_TIME.DATE_SHORTER} [at] ${
      FORMATS_DATE_TIME.TIME
    }`,
    nextDay: `[Tomorrow], ${FORMATS_DATE_TIME.DATE_SHORTER} [at] ${
      FORMATS_DATE_TIME.TIME
    }`,
    nextWeek: `${FORMATS_DATE_TIME.DATE_SHORTER} [at] ${
      FORMATS_DATE_TIME.TIME
    }`,
    lastDay: `[Yesterday], ${FORMATS_DATE_TIME.DATE_SHORTER} [at] ${
      FORMATS_DATE_TIME.TIME
    }`,
    lastWeek: `${FORMATS_DATE_TIME.DATE_SHORTER} [at] ${
      FORMATS_DATE_TIME.TIME
    }`,
    sameElse() {
      // not using arrow function because I need `this` context
      if (this.isSame(moment(), 'year')) {
        return `${FORMATS_DATE_TIME.DATE_SHORTER} [at] ${
          FORMATS_DATE_TIME.TIME
        }`;
      }
      return `${FORMATS_DATE_TIME.DATE_SHORTER_DIFF_YEAR} [at] ${
        FORMATS_DATE_TIME.TIME
      }`;
    },
  });

const renderDayDateTimeSeconds = date =>
  moment(date).format(FORMATS_DATE_TIME.DAY_DATE_TIME_SECONDS);

const renderCurrentDayDateTimeZone = date =>
  appendZone(date, FORMATS_DATE_TIME.CURRENT.DAY_DATE_TIME);

const renderDay = date => moment(date).format(FORMATS_DATE_TIME.DAY);

const renderDate = date =>
  isEmptyString(date) ? null : moment(date).format(FORMATS_DATE_TIME.DATE);

const renderDateUtc = date =>
  isEmptyString(date) ? null : moment.utc(date).format(FORMATS_DATE_TIME.DATE);

const renderDayDate = date => moment(date).format(FORMATS_DATE_TIME.DAY_DATE);

const renderDayDateShort = date =>
  moment(date).format(FORMATS_DATE_TIME.DAY_DATE_SHORT);

const renderDateShorter = date => {
  const format = LOGIC_HELPERS.ifElse(
    moment(date).isSame(moment(), 'year'),
    FORMATS_DATE_TIME.DATE_SHORTER,
    FORMATS_DATE_TIME.DATE_SHORTER_DIFF_YEAR,
  );

  return moment(date).format(format);
};

const renderTime = date => moment(date).format(FORMATS_DATE_TIME.TIME);

const renderTimeUtc = date => moment.utc(date).format(FORMATS_DATE_TIME.TIME);

const renderZone = date => {
  let zone = moment(date).format(FORMATS_DATE_TIME.ZONE);
  const firstChar = zone.charAt(0);
  if (firstChar === '+' || firstChar === '-') zone = `GMT${zone}`;
  return zone;
};

const renderOffset = date => moment(date).format(FORMATS_DATE_TIME.OFFSET);

const renderZoneOffset = date =>
  moment(date).format(FORMATS_DATE_TIME.ZONE_OFFSET);

const renderTimeZone = date => appendZone(date, FORMATS_DATE_TIME.TIME);

const renderDayDateTime = date =>
  moment(date).format(FORMATS_DATE_TIME.DAY_DATE_TIME);

const renderDayTimeZone = date => appendZone(date, FORMATS_DATE_TIME.DAY_TIME);

const renderDayDateTimeZone = date =>
  appendZone(date, FORMATS_DATE_TIME.DAY_DATE_TIME);

const renderDayDateShortTimeZone = date =>
  appendZone(date, FORMATS_DATE_TIME.DAY_DATE_SHORT_TIME);

const renderFromNow = (time, maxTime) => {
  const dateTime = maxTime ? minDate(time, maxTime) : time;
  return moment(dateTime).fromNow();
};

/**
 * Returns fromNow but replaces near times with yesterday/today/tomorrow
 */
const renderFromNowAtLeastDays = (time, maxTime) => {
  const dateTime = maxTime ? minDate(time, maxTime) : time;
  switch (MOMENT_HELPERS.create().diff(dateTime, 'd')) {
    case -1:
      return 'tomorrow';
    case 0:
      return MOMENT_HELPERS.create().diff(dateTime) > 0 ? 'yesterday' : 'today';
    default:
      return moment(dateTime).fromNow();
  }
};

const renderTimeAgo = time => renderFromNow(time, moment());

const renderAge = birthDate => {
  const now = MOMENT_HELPERS.createUtc();
  const years = now.diff(birthDate, 'y');
  const months = now.diff(birthDate, 'M') % 12;
  const renderedYears = years ? `${years} ${pluralizeText('year', years)}` : '';
  const renderedMonths = months
    ? `${months} ${pluralizeText('month', months)}`
    : '';
  const separator = years && months ? ', ' : '';
  return `${renderedYears}${separator}${renderedMonths} old`;
};

const isSameDay = (a, b) => moment(a).isSame(b, 'day');

const getDateToday = (convertToDate = true) =>
  convertToDate ? moment().toDate() : moment();

const getDateLastYear = date =>
  moment
    .utc(date)
    .subtract(1, 'y')
    .endOf('y');

const getDateMiddleLastYear = date =>
  moment
    .utc(date)
    .subtract(1, 'y')
    .startOf('y')
    .month(5);

const parseDate = date => moment(date, FORMATS_DATE_TIME.DATE);

const timeToGo = (startTime, now = moment()) => {
  if (!startTime) return null;

  if (now.isAfter(startTime)) return null;

  return moment(startTime).from(now, true);
};

const isRecent = (startDate, duration, dateOffset = 2, now = moment()) => {
  if (!startDate || !duration) return false;

  const date = moment.utc(startDate).add(duration, 'day');

  const past = now.utc().subtract(dateOffset, 'day');

  return date.utc().isAfter(past);
};

const isDayBetween = (date, numberOfDaysFromCurrentDate = 7) => {
  if (!date) return false;

  const DEFAULT_DAY_OFFSET = 1;
  const currentDay = moment.utc().subtract(DEFAULT_DAY_OFFSET);
  const day7 = moment.utc().add(numberOfDaysFromCurrentDate, 'day');

  return date.utc().isBetween(currentDay, day7);
};

const isOngoing = (startTime, duration, now = moment()) => {
  if (!startTime || !duration) return false;

  const endTime = moment(startTime)
    .add(duration, 'day')
    .hour(23)
    .minute(59)
    .second(59);

  return now.isBetween(startTime, endTime);
};

const tourStatus = (start, endTime, now = moment()) => {
  if (!start) return undefined;

  const startTime = moment(start);

  if (now.isBefore(startTime)) {
    return UPCOMING;
  }

  if (!endTime) {
    // default to last 1 day if not given
    const endSameDay = moment(startTime)
      .hour(23)
      .minute(59)
      .second(59);

    return now.isAfter(endSameDay) ? PAST : ACTIVE;
  }

  if (now.isBetween(startTime, endTime)) {
    return ACTIVE;
  }

  return PAST;
};

// https://github.com/moment/moment/issues/2781#issuecomment-416499369
const timeSince = (d, now = moment()) => {
  let date = d;

  if (typeof date !== 'object') {
    date = new Date(d);
  }

  const seconds = Math.floor((now - date) / 1000);
  let intervalType;

  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    intervalType = 'yr';
  } else {
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      intervalType = 'mo';
    } else {
      interval = Math.floor(seconds / 86400);
      if (interval >= 1) {
        intervalType = 'd';
      } else {
        interval = Math.floor(seconds / 3600);
        if (interval >= 1) {
          intervalType = 'h';
        } else {
          interval = Math.floor(seconds / 60);
          if (interval < 1) {
            interval = `1`;
          }

          intervalType = 'm';
        }
      }
    }
  }

  return `${interval}${intervalType}`;
};

const timeSinceAtLeast = (
  d,
  showHour,
  now = moment(),
  { prefix = '', postfix = '', hour = 3, renderFn = renderCalendar } = {},
) => {
  const date = moment(d);

  if (now.diff(date, 'hour') < hour) {
    return `${prefix}${timeSince(d, now)}${postfix}`;
  }

  if (showHour) {
    return moment(date).format('H:mm');
  }

  return renderFn(date, now);
};

const dateFromTimeStamp = (seconds, dateFormat) =>
  moment.unix(seconds).format(dateFormat);

const createFromTimeStamp = seconds => moment.unix(seconds);

const isBeforeDay = (a, b) => {
  if (!moment.isMoment(a) || !moment.isMoment(b)) return false;

  const aYear = a.year();
  const aMonth = a.month();

  const bYear = b.year();
  const bMonth = b.month();

  const isSameYear = aYear === bYear;
  const isSameMonth = aMonth === bMonth;

  if (isSameYear && isSameMonth) return a.date() < b.date();
  if (isSameYear) return aMonth < bMonth;
  return aYear < bYear;
};

const isInclusivelyAfterDay = (a, b) => {
  if (!moment.isMoment(a) || !moment.isMoment(b)) return false;
  return !MOMENT_HELPERS.isBeforeDay(a, b);
};

const isOutsideRange = (startDate, duration) => day => {
  const start = moment(startDate);
  const end = moment(startDate).add(duration, 'day');

  return (
    !MOMENT_HELPERS.isInclusivelyAfterDay(day, start) ||
    MOMENT_HELPERS.isInclusivelyAfterDay(day, end)
  );
};

const getDateBasedOnIndex = (index, startDate) => {
  if (!startDate) return null;

  const date = moment(startDate).add(index, 'days');

  return date;
};

const getMoment = date => moment(date);

const getStartBasedOnDuration = (startDate, duration) =>
  moment(startDate).add(duration, 'day');

const testInstance = {
  format: () => undefined,
  unix: () => undefined,
  diff: () => undefined,
  isBefore: () => true,
  isSame: () => true,
  date: () => true,
  add: () => testInstance,
};

const normaliseDate = day => moment(day).format('YYYY-MM-DD');

const dayCount = (start, end, unit = 'days') => {
  if (!start || !end) return null;

  const format = 'DD.MM.YYYY';

  const startMoment = moment.utc(start.format(format), format).startOf(unit);
  const endMoment = moment.utc(end.format(format), format);

  return endMoment.diff(startMoment, unit);
};

const renderZoneFromId = startTimeZoneId => {
  let zone = moment()
    .tz(startTimeZoneId)
    .format(FORMATS_DATE_TIME.ZONE);
  const firstChar = zone.charAt(0);
  if (firstChar === '+' || firstChar === '-') zone = `GMT${zone}`;
  return zone;
};

const getStartOf = (date, start = 'month') =>
  moment(date)
    .startOf(start)
    .add(1, 'day');

const getEndOf = (date, end = 'month') => moment(date).endOf(end);

export const MOMENT_HELPERS = {
  getStartOf,
  getEndOf,
  renderZoneFromId,
  renderRelativeTime,
  testInstance,
  getStartBasedOnDuration,
  getMoment,
  getDateBasedOnIndex,
  isBeforeDay,
  isInclusivelyAfterDay,
  isOutsideRange,
  timeSince,
  timeSinceAtLeast,
  renderCalendarDueDate,
  renderCalendarDate,
  renderCalendar,
  renderTimeSinceCalendar,
  renderCalendarDateShort,
  renderCalendarDateTimeShort,
  renderDayDateTimeSeconds,
  renderCurrentDayDateTimeZone,
  renderDay,
  renderDate,
  renderDateUtc,
  renderDayDate,
  renderDayDateShort,
  renderDateShorter,
  renderZone,
  renderOffset,
  renderZoneOffset,
  renderTime,
  renderTimeZone,
  renderDayTimeZone,
  renderDayDateTime,
  renderDayDateTimeZone,
  renderDayDateShortTimeZone,
  renderFromNow,
  renderFromNowAtLeastDays,
  renderTimeAgo,
  renderAge,
  isSameDay,
  getStartDate,
  formatDate,
  isYearDisplayable,
  isYearThisYear,
  getDate,
  getDay,
  getDateWithFormat,
  addDayThenGetDate,
  setDate,
  setTime,
  setTimeZone,
  guessTimeZone,
  isBefore,
  isSame,
  isAfter,
  startOf,
  isBetween,
  diff,
  diffInUnit,
  addDuration,
  addDurations,
  stringifyDuration,
  renderDurationHoursMinutes,
  trackStartDateUpToAddedDay,
  getDifference,
  create,
  createUtc,
  createDuration,
  createFromTimeStamp,
  isWeekend,
  renderTimeUtc,
  isPrehistoric,
  getDateToday,
  getDateLastYear,
  getDateMiddleLastYear,
  parseDate,
  timeToGo,
  isOngoing,
  tourStatus,
  isRecent,
  isDayBetween,
  dateFromTimeStamp,
  getNow,
  getDateFromUnixFormat,
  getTourStatusWithStartAndDuration,
  normaliseDate,
  appendZone,
  dayCount,
  renderCalendarWithTime,
};

export default MOMENT_HELPERS;
