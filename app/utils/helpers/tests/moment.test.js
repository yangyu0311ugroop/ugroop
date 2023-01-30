/**
 * Created by quando on 6/4/17.
 */
import { ACTIVE, PAST, UPCOMING } from 'appConstants';
import moment from 'moment';
import momentTimezone from 'moment-timezone';
import { FORMATS_DATE_TIME } from 'utils/constants/dateTime';
import { TEST_HELPERS } from '../testHelpers';
import momentHelper, { MOMENT_HELPERS } from '../moment';

describe('utils/helpers/moment', () => {
  // TODO it's simpler to test with fix date, however, the test will fail when 2019 comes, mock values must be updated by then
  const startDate = moment.utc('2017-08-15');
  const startDate500Years = moment.utc('2517-08-15');
  const unixDate = moment.unix('1583996892');
  const customDataNone = { displayDate: 'none', description: 'hi ho' };
  const customDataStartDate = { displayDate: 'startDate', startDate };
  const customDataNextYear = {
    displayDate: 'startDate',
    startDate: startDate500Years,
  };
  const customDataWeekDay = { displayDate: 'weekDay', weekDay: '5' };

  describe('testInstance()', () => {
    it('testInstance', () => {
      expect(momentHelper.testInstance.format()).toBe(undefined);
      expect(momentHelper.testInstance.unix()).toBe(undefined);
      expect(momentHelper.testInstance.diff()).toBe(undefined);
      expect(momentHelper.testInstance.isBefore()).toBe(true);
      expect(momentHelper.testInstance.isSame()).toBe(true);
      expect(momentHelper.testInstance.date()).toBe(true);
    });
  });

  describe('getStartDate()', () => {
    it('displayDate=none', () => {
      const result = momentHelper.getStartDate(customDataNone);
      expect(result.toISOString()).toBe('0001-01-01T00:00:00.000Z');
    });
    it('displayDate=startDate', () => {
      const result = momentHelper.getStartDate(customDataStartDate);
      expect(result.toISOString()).toBe('2017-08-15T00:00:00.000Z');
    });
    it('displayDate=weekDay', () => {
      const result = momentHelper.getStartDate(customDataWeekDay);
      expect(result.format('dddd')).toBe('Friday');
    });
  });

  describe('getNow', () => {
    it('should be defined', () => {
      const now = moment()
        .toISOString()
        .split('T')[0];
      expect(MOMENT_HELPERS.getNow().split('T')[0]).toEqual(now);
    });
  });

  describe('formatDate()', () => {
    it('displayDate=none', () => {
      const result = momentHelper.formatDate(
        moment,
        customDataNone.displayDate,
      );
      expect(result).toBe('');
    });

    it('displayDate=startDate', () => {
      const result = momentHelper.formatDate(
        startDate,
        customDataStartDate.displayDate,
      );
      expect(result).toBe('Tue, 15 Aug');
    });
    it('displayDate=startDate different year', () => {
      const result = momentHelper.formatDate(
        startDate500Years,
        customDataNextYear.displayDate,
      );
      expect(result).toBe('Sun, 15 Aug');
    });
    it('displayDate=startDate; fromNow=true', () => {
      startDate500Years.fromNow = jest.fn(() => 'in 500 years');
      const result = momentHelper.formatDate(
        startDate500Years,
        customDataStartDate.displayDate,
        undefined,
        true,
      );
      expect(result).toBe('Sun, 15 Aug (in 500 years)');
    });
    it('displayDate=weekDay', () => {
      const result = momentHelper.formatDate(
        startDate500Years,
        customDataWeekDay.displayDate,
      );
      expect(result).toBe('Sun');
    });
  });

  describe('isYearDisplayable()', () => {
    it('checks year correctly', () => {
      expect(
        momentHelper.isYearDisplayable(
          momentHelper.createUtc('1900-01-01T00:00:00.000Z'),
        ),
      ).toBe(true);
      expect(
        momentHelper.isYearDisplayable(
          momentHelper.createUtc('1899-12-31T23:59:59.999Z'),
        ),
      ).toBe(false);
    });
  });

  describe('isYearThisYear', () => {
    it('should return true if the year passed is same with the year today', () => {
      const dateVal = moment().toISOString();
      const result = momentHelper.isYearThisYear(dateVal);

      expect(result).toBe(true);
    });

    it('should return false if the year passed is greater than the year today', () => {
      const result = momentHelper.isYearThisYear(startDate500Years);

      expect(result).toBe(false);
    });
  });

  describe('getDate', () => {
    it('should expected format for getDate', () => {
      const result = momentHelper.getDate(startDate500Years);
      const expected = moment('2517-08-15').format('Do MMMM YYYY');
      expect(result).toBe(expected);
    });
  });

  describe('getDay', () => {
    it('should render Sunday when 0 is passed', () => {
      const result = momentHelper.getDay(0);
      const expected = 'Sunday';
      expect(result).toBe(expected);
    });
    it('should render Sun when 0 is passed and format is ddd', () => {
      const result = momentHelper.getDay(0, 'ddd');
      const expected = 'Sun';
      expect(result).toBe(expected);
    });
  });

  describe('getDateWithFormat', () => {
    it('should return a date based on date given and format given', () => {
      const format = 'D MMM YYYY';
      const expected = moment(startDate500Years)
        .format(format)
        .toString();
      const actual = momentHelper.getDateWithFormat(startDate500Years, format);

      expect(actual).toBe(expected);
    });
  });

  describe('getDateFromUnixFormat', () => {
    it('should return a date based on unix date given and format given', () => {
      const format = 'MMMM DD, YYYY';
      const expected = unixDate.format(format);
      const actual = momentHelper.getDateFromUnixFormat('1583996892', format);

      expect(actual).toBe(expected);
    });
  });

  describe('addDayThenGetDate()', () => {
    it('should return using the default format', () => {
      const format = 'MMMM D, YYYY';
      const expected = moment(startDate500Years)
        .add(1, 'days')
        .format(format)
        .toString();
      const actual = momentHelper.addDayThenGetDate(1, startDate500Years);
      expect(actual).toEqual(expected);
    });
    it('should use the passed format', () => {
      const format = 'MMM Do, YYYY';
      const expected = moment(startDate500Years)
        .add(1, 'days')
        .format(format)
        .toString();
      const actual = momentHelper.addDayThenGetDate(
        1,
        startDate500Years,
        format,
      );
      expect(actual).toEqual(expected);
    });
  });

  describe('setTimeZone()', () => {
    it('sets correctly with AEDT', () => {
      const input = '2001-01-02T01:00:00';
      const timeZone = 'Australia/Melbourne';
      const m = momentHelper.setTimeZone(moment.utc(input), timeZone); // date is in daylight savings
      expect(m.tz()).toBe(timeZone);
      expect(m.toISOString()).toEqual('2001-01-01T14:00:00.000Z'); // UTC-11
      expect(m.format()).toEqual(`${input}+11:00`); // local=input
    });

    it('sets correctly with AEST', () => {
      const input = '2001-07-02T01:00:00';
      const timeZone = 'Australia/Melbourne';
      const m = momentHelper.setTimeZone(moment.utc(input), timeZone); // date is not in daylight savings
      expect(m.tz()).toBe(timeZone);
      expect(m.toISOString()).toEqual('2001-07-01T15:00:00.000Z'); // UTC-10
      expect(m.format()).toEqual(`${input}+10:00`); // local=input
    });

    it('sets correctly with missing timeZone', () => {
      const input = '2001-01-02T01:00:00';
      const m = momentHelper.setTimeZone(moment.utc(input));
      expect(m).toBeDefined();
      expect(m.tz()).toBeTruthy();
    });

    it('sets correctly with invalid timeZone', () => {
      const input = '2001-01-02T01:00:00';
      const timeZone = 'Invalid/Timezone';
      const m = momentHelper.setTimeZone(moment.utc(input), timeZone);
      expect(m).toBeDefined();
      expect(m.tz()).toBeTruthy();
    });
  });

  describe('stringifyDuration()', () => {
    it('returns correct duration', () => {
      expect(
        momentHelper.stringifyDuration(moment.duration(1, 'w').add(1, 's')),
      ).toEqual('7d 1s');
      expect(momentHelper.stringifyDuration(moment.duration(1, 's'))).toEqual(
        '1s',
      );
      expect(
        momentHelper.stringifyDuration(
          moment
            .duration(5, 'd')
            .add(9, 'h')
            .add(16, 's'),
        ),
      ).toEqual('5d 9h 16s');
      expect(
        momentHelper.stringifyDuration(
          moment.duration(46465645647986, 'seconds'),
        ),
      ).toEqual('1472437y 8mth 9d 15h 6m 26s');
    });
    it('handles missing/null duration', () => {
      expect(momentHelper.stringifyDuration()).toEqual('');
      expect(momentHelper.stringifyDuration(null)).toEqual('');
    });
    it('should render different unit when format was given or overridden and options', () => {
      const format = {
        y: 'year',
        M: 'month',
        d: 'day',
        h: 'hour',
        m: 'minute',
        s: 'second',
        ms: 'millisecond',
      };
      expect(
        momentHelper.stringifyDuration(
          moment.duration(1, 'w').add(1, 's'),
          format,
          { isPlural: true, withSpaceBetweenAmountAndUnit: true },
        ),
      ).toEqual('7 days 1 second');
      expect(
        momentHelper.stringifyDuration(moment.duration(7, 's'), format, {
          withSpaceBetweenAmountAndUnit: true,
        }),
      ).toEqual('7 second');
      expect(
        momentHelper.stringifyDuration(
          moment
            .duration(5, 'd')
            .add(9, 'h')
            .add(16, 's'),
          format,
          { isPlural: true },
        ),
      ).toEqual('5days 9hours 16seconds');
    });
  });

  describe('renderDurationHoursMinutes()', () => {
    it('renders small hours', () => {
      const duration = momentHelper.createDuration('PT1H');
      expect(momentHelper.renderDurationHoursMinutes(duration)).toEqual('1h');
    });

    it('renders small hours and minutes', () => {
      const duration = momentHelper.createDuration('PT1H30M');
      expect(momentHelper.renderDurationHoursMinutes(duration)).toEqual(
        '1h 30m',
      );
    });

    it('renders very negative duration', () => {
      const duration = momentHelper.createDuration('P-7DT1H30M');
      expect(momentHelper.renderDurationHoursMinutes(duration)).toEqual(
        'Less than -100h',
      );
    });

    it('renders very large duration', () => {
      const duration = momentHelper.createDuration('P7DT1H30M');
      expect(momentHelper.renderDurationHoursMinutes(duration)).toEqual(
        'More than 100h',
      );
    });

    it('renders empty string if no duration', () => {
      expect(momentHelper.renderDurationHoursMinutes()).toEqual('');
    });
  });

  describe('createDuration()', () => {
    it('should create duration using moment with minutes as unit', () => {
      expect(momentHelper.createDuration(1, 'minutes').get('minutes')).toBe(1);
    });
  });

  describe('getDifference()', () => {
    it('should get the difference between the dates based on the unit to be considered', () => {
      const start = moment('2017-08-15');
      const end = moment('2017-09-15');

      const result = momentHelper.getDifference(start, end, 'M');
      expect(result).toBe(1);
    });
  });

  describe('trackStartDateUpToAddedDay()', () => {
    it('should return a particular array if the difference is two months', () => {
      const start = moment('2017-08-15');

      const result = momentHelper.trackStartDateUpToAddedDay(start, 30);
      expect(result.length).toBe(2);
      expect(result).toMatchSnapshot();
    });

    it('should return a particular array if the difference is three months', () => {
      const start = moment('2017-08-15');

      const result = momentHelper.trackStartDateUpToAddedDay(start, 50);
      expect(result.length).toBe(3);
      expect(result).toMatchSnapshot();
    });

    it('should return a particular array if the difference is two months but different year', () => {
      const start = moment('2017-12-15');

      const result = momentHelper.trackStartDateUpToAddedDay(start, 30);
      expect(result.length).toBe(2);
      expect(result).toMatchSnapshot();
    });

    it('should return a particular array if days are in the same month', () => {
      const start = moment('2017-12-15');

      const result = momentHelper.trackStartDateUpToAddedDay(start, 1);
      expect(result.length).toBe(1);
      expect(result).toMatchSnapshot();
    });
  });

  describe('setDate', () => {
    it('sets date correctly', () => {
      const time = momentHelper.createUtc('2018-01-01T12:00:00.000Z');
      expect(
        momentHelper
          .setDate(time)
          .toISOString()
          .endsWith('T12:00:00.000Z'),
      ).toBe(true);
    });

    it('returns time if missing', () => {
      expect(momentHelper.setDate()).toBeUndefined();
    });
  });

  describe('setTime', () => {
    it('sets time correctly', () => {
      const date = momentHelper.createUtc('2018-01-01T00:00:00.000Z');
      const time = momentHelper.createUtc('2018-01-02T12:00:00.000Z');
      expect(momentHelper.setTime(date, time).toISOString()).toEqual(
        '2018-01-01T12:00:00.000Z',
      );
    });

    it('returns date if missing', () => {
      expect(momentHelper.setTime()).toBeUndefined();
    });

    it('returns midnight time if missing', () => {
      const date = momentHelper.createUtc('2018-01-01T00:00:00.000Z');
      expect(momentHelper.setTime(date).toISOString()).toEqual(
        '2018-01-01T00:00:00.000Z',
      );
    });
  });

  describe('setTimeZone', () => {
    it('sets guessed timeZoneId', () => {
      const date = momentHelper.createUtc('2018-01-01T00:00:00.000Z');
      const timeZoneId = 'Europe/Paris';
      const guess = momentHelper.guessTimeZone;
      momentHelper.guessTimeZone = jest.fn(() => timeZoneId);
      expect(momentHelper.setTimeZone(date).format()).toEqual(
        '2018-01-01T00:00:00+01:00',
      );
      momentHelper.guessTimeZone = guess;
    });

    it('sets timeZoneId and changes time', () => {
      const date = momentHelper.createUtc('2018-01-01T00:00:00.000Z');
      const timeZoneId = 'Europe/Paris';
      expect(
        momentHelper.setTimeZone(date, timeZoneId, false).format(),
      ).toEqual('2018-01-01T01:00:00+01:00');
    });

    it('returns date if missing', () => {
      expect(momentHelper.setTimeZone()).toBeUndefined();
    });
  });

  describe('guessTimeZone', () => {
    it('returns momentTimezone.guess', () => {
      expect(momentHelper.guessTimeZone).toBe(momentTimezone.tz.guess);
    });
  });

  describe('isBefore', () => {
    it('returns true if both missing', () => {
      expect(momentHelper.isBefore()).toBe(true);
    });

    it('returns true if a before b', () => {
      const a = '2018-01-01T23:59:59.999Z';
      const b = '2018-01-02T00:00:00.000Z';
      expect(momentHelper.isBefore(a, b)).toBe(true);
    });

    it('returns false if a after b', () => {
      const a = '2018-01-01T12:00:00.001Z';
      const b = '2018-01-01T12:00:00.000Z';
      expect(momentHelper.isBefore(a, b)).toBe(false);
    });
  });

  describe('isSame', () => {
    it('returns true if both missing', () => {
      expect(momentHelper.isSame()).toBe(true);
    });

    it('returns true if a on same day as b', () => {
      const a = '2018-01-01T00:00:00.000Z';
      const b = '2018-01-01T00:00:00.000Z';
      expect(momentHelper.isSame(a, b)).toBe(true);
    });

    it('returns false if a on different day as b', () => {
      const a = '2018-01-01T23:59:59.999Z';
      const b = '2018-01-02T00:00:00.000Z';
      expect(momentHelper.isSame(a, b)).toBe(false);
    });
  });

  describe('isAfter', () => {
    it('returns true if both missing', () => {
      expect(momentHelper.isAfter()).toBe(true);
    });

    it('returns false if a before b', () => {
      const a = '2018-01-01T23:59:59.999Z';
      const b = '2018-01-02T00:00:00.000Z';
      expect(momentHelper.isAfter(a, b)).toBe(false);
    });

    it('returns true if a after b', () => {
      const a = '2018-01-01T12:00:00.001Z';
      const b = '2018-01-01T12:00:00.000Z';
      expect(momentHelper.isAfter(a, b)).toBe(true);
    });
  });

  describe('startOf', () => {
    it('returns start of day', () => {
      const date = '2018-01-01T23:59:59.999Z';
      expect(momentHelper.startOf(date).toISOString()).toEqual(
        '2018-01-01T00:00:00.000Z',
      );
    });
  });

  describe('isBetween', () => {
    it('returns true if date between start and end', () => {
      const start = '2018-01-01T00:00:00.000Z';
      const date = '2018-01-02T00:00:00.000Z';
      const end = '2018-01-03T00:00:00.000Z';
      expect(momentHelper.isBetween(date, start, end)).toBe(true);
    });

    it('returns false if date missing', () => {
      expect(momentHelper.isBetween()).toBe(false);
    });
  });

  describe('diff', () => {
    it('returns diff in ms by default', () => {
      const a = '2018-01-01T00:00:00.000Z';
      const b = '2018-01-02T00:00:00.000Z';
      expect(momentHelper.diff(a, b)).toEqual(60 * 60 * 24 * 1000);
    });
  });

  describe('diffInUnit', () => {
    it('returns diff in days from start of day by default', () => {
      const a = '2018-01-01T00:00:00.000Z';
      const b = '2018-01-02T00:00:00.000Z';
      expect(momentHelper.diffInUnit(a, b)).toEqual(1);
    });
  });

  describe('addDuration', () => {
    it('returns date with added duration', () => {
      const date = '2018-01-01T00:00:00.000Z';
      const duration = 'PT1H';
      expect(momentHelper.addDuration(date, duration).toISOString()).toEqual(
        '2018-01-01T01:00:00.000Z',
      );
    });
  });

  describe('renderTimeUtc', () => {
    it('returns date with added duration', () => {
      const date = '2018-01-01T00:00:00.000Z';
      expect(momentHelper.renderTimeUtc(date)).toBe('00:00');
    });
  });

  describe('normaliseDate', () => {
    it('returns date with added normaliseDate', () => {
      const date = '2020-05-28T16:23:45.6789';
      expect(momentHelper.normaliseDate(date)).toBe('2020-05-28');
    });
  });

  describe('addDurations', () => {
    it('returns date with added durations', () => {
      const date = '2018-01-01T00:00:00.000Z';
      const durations = ['PT1H', 'P1D'];
      expect(momentHelper.addDurations(date, durations).toISOString()).toEqual(
        '2018-01-02T01:00:00.000Z',
      );
    });
  });

  describe('isWeekend', () => {
    it('should return false if date was not weekend', () => {
      expect(momentHelper.isWeekend('2018-05-28T16:00:00.000Z')).toBe(false);
    });
  });

  describe('isPrehistoric', () => {
    it('checks year correctly', () => {
      expect(
        momentHelper.isPrehistoric(
          momentHelper.createUtc('1900-01-01T00:00:00.000Z'),
        ),
      ).toBe(false);
      expect(
        momentHelper.isPrehistoric(
          momentHelper.createUtc('1899-12-31T23:59:59.999Z'),
        ),
      ).toBe(true);
    });
  });

  describe('renderCalendarDate', () => {
    it('should return calendar date', () => {
      expect(
        momentHelper.renderCalendarDate(new Date()).indexOf('Today') !== -1,
      ).toBe(true);
      expect(momentHelper.renderCalendarDate('2018-05-28T16:00:00.000')).toBe(
        'Monday, 28 May 2018',
      );
    });
  });

  describe('renderCalendarDateShort', () => {
    it('should return calendar date short', () => {
      expect(
        momentHelper.renderCalendarDateShort(new Date()).indexOf('Today') !==
          -1,
      ).toBe(true);
      expect(
        momentHelper.renderCalendarDateShort(`${moment().year()}`),
      ).toBeDefined();
      expect(
        momentHelper.renderCalendarDateShort(
          `${moment().year()}-04-13T16:00:00.000`,
        ),
      ).toBeDefined();

      expect(
        momentHelper.renderCalendarDateShort(
          `${moment().year() + 1}-05-13T16:00:00.000`,
        ),
      ).toBeDefined();
    });
  });

  describe('renderTimeSinceCalendar', () => {
    const now = moment('2019-05-02T16:00:00.000');

    it('should return lastWeek', () => {
      expect(
        momentHelper.renderTimeSinceCalendar('2019-04-26T16:00:00.000', now),
      ).toMatchSnapshot();
    });

    it('should renderTimeSinceCalendar', () => {
      expect(
        momentHelper.renderTimeSinceCalendar(
          `${moment().year()}-04-13T16:00:00.000`,
        ),
      ).toBeDefined();

      expect(
        momentHelper.renderTimeSinceCalendar(`${moment().year()}`),
      ).toBeDefined();

      expect(
        momentHelper.renderTimeSinceCalendar(
          `${moment().year() + 1}-05-13T16:00:00.000`,
        ),
      ).toBeDefined();
    });
  });

  describe('renderCalendar', () => {
    const now = moment('2019-05-02T16:00:00.000');

    it('should return yesterday', () => {
      expect(
        momentHelper.renderCalendar('2019-05-01T16:00:00.000', now),
      ).toMatchSnapshot();
    });

    it('should return sameElse same year', () => {
      expect(
        momentHelper.renderCalendar('2019-02-02T16:00:00.000', now),
      ).toMatchSnapshot();
    });

    it('should return sameElse diff year', () => {
      expect(
        momentHelper.renderCalendar('2017-02-02T16:00:00.000', now),
      ).toMatchSnapshot();
    });

    it('should return lastWeek same week', () => {
      expect(
        momentHelper.renderCalendar('2019-04-28T16:00:00.000', now),
      ).toMatchSnapshot();
    });

    it('should return lastWeek diff week', () => {
      expect(
        momentHelper.renderCalendar('2019-04-26T16:00:00.000', now),
      ).toMatchSnapshot();
    });

    it('should return today', () => {
      expect(momentHelper.renderCalendar(moment())).toMatchSnapshot();
    });
  });

  describe('renderCalendarWithTime', () => {
    const now = moment('2019-05-02T16:00:00.000');

    it('should return yesterday', () => {
      expect(
        MOMENT_HELPERS.renderCalendarWithTime('2019-05-01T16:00:00.000', now),
      ).toBeDefined();
    });

    it('should return sameElse same year', () => {
      expect(
        MOMENT_HELPERS.renderCalendarWithTime('2019-02-02T16:00:00.000', now),
      ).toBeDefined();
    });

    it('should return sameElse diff year', () => {
      expect(
        MOMENT_HELPERS.renderCalendarWithTime('2017-02-02T16:00:00.000', now),
      ).toBeDefined();
    });

    it('should return lastWeek same week', () => {
      expect(
        MOMENT_HELPERS.renderCalendarWithTime('2019-04-28T16:00:00.000', now),
      ).toBeDefined();
    });

    it('should return lastWeek diff week', () => {
      expect(
        MOMENT_HELPERS.renderCalendarWithTime('2019-04-26T16:00:00.000', now),
      ).toBeDefined();
    });

    it('should return today', () => {
      expect(MOMENT_HELPERS.renderCalendarWithTime(moment())).toBeDefined();
    });
  });

  describe('timeSinceAtLeast', () => {
    const date = moment('2019-05-02T16:00:00.000');

    it('should return 1m', () => {
      expect(momentHelper.timeSinceAtLeast(date, false, date)).toBe('1m');
    });

    it('should showHour', () => {
      expect(momentHelper.timeSinceAtLeast(date, true)).toBe('16:00');
    });

    it('should renderCalendar', () => {
      expect(momentHelper.timeSinceAtLeast(date)).toMatchSnapshot();
    });
  });

  describe('renderCalendarDueDate', () => {
    it('should renderCalendarDueDate', () => {
      expect(
        momentHelper.renderCalendarDueDate(
          `${moment().year()}-05-13T16:00:00.000`,
        ),
      ).toMatchSnapshot();

      expect(
        momentHelper.renderCalendarDueDate(
          `${moment().year() + 1}-05-13T16:00:00.000`,
        ),
      ).toMatchSnapshot();
    });
  });

  describe('renderCalendarDateTimeShort', () => {
    it('should return calendar date short', () => {
      expect(
        momentHelper
          .renderCalendarDateTimeShort(new Date())
          .indexOf('Today') !== -1,
      ).toBe(true);
      expect(
        momentHelper.renderCalendarDateTimeShort(
          `${moment().year()}-04-13T16:00:00.000`,
        ),
      ).toBeDefined();

      // TODO: this test will fail in 2099
      expect(
        momentHelper.renderCalendarDateTimeShort(
          `${moment().year() + 1}-05-13T16:00:00.000`,
        ),
      ).toBeDefined();
    });
  });

  describe('renderDayDateTimeSeconds', () => {
    it('should return day date time seconds', () => {
      expect(
        momentHelper.renderDayDateTimeSeconds('2018-05-28T16:23:45.6789'),
      ).toBe('Monday, 28 May 2018 at 16:23:45');
    });
  });

  describe('renderCurrentDayDateTimeZone', () => {
    it('should return current day date time seconds', () => {
      expect(
        momentHelper.renderCurrentDayDateTimeZone('2018-05-28T16:23:45.6789'),
      ).toBe('Monday, 28 May 2018 at 16:23 ');
    });
  });

  describe('renderDayDate', () => {
    it('should return day date', () => {
      expect(momentHelper.renderDayDate('2018-05-28T16:23:45.6789')).toBe(
        'Monday, 28 May 2018',
      );
    });
  });

  describe('renderDay', () => {
    it('should return day', () => {
      expect(momentHelper.renderDay('2018-05-28T16:23:45.6789')).toBe('Monday');
    });
  });

  describe('renderDate', () => {
    it('should return date', () => {
      expect(momentHelper.renderDate('2018-05-28T16:23:45.6789')).toBe(
        '28 May 2018',
      );
    });

    it('should return null if date is empty string', () => {
      expect(momentHelper.renderDate('')).toBe(null);
    });
  });

  describe('renderDateUtc', () => {
    it('should return date', () => {
      expect(momentHelper.renderDateUtc('2018-05-28T16:23:45.6789')).toBe(
        '28 May 2018',
      );
    });

    it('should return null if date is empty string', () => {
      expect(momentHelper.renderDateUtc('')).toBe(null);
    });
  });

  describe('renderDayDateShort', () => {
    it('should return day date short', () => {
      expect(momentHelper.renderDayDateShort('2018-05-28T16:23:45.6789')).toBe(
        'Mon, 28 May 2018',
      );
    });
  });

  describe('renderDateShorter', () => {
    it('should return date shorter', () => {
      expect(
        momentHelper.renderDateShorter('2018-05-28T16:23:45.6789'),
      ).toMatchSnapshot();
    });
  });

  describe('renderTimeAgo', () => {
    it('should return time ago', () => {
      expect(momentHelper.renderTimeAgo(new Date())).toBe('a few seconds ago');
    });
  });

  describe('renderAge', () => {
    it('renders age in years and months', () => {
      const time = moment()
        .subtract(1, 'y')
        .subtract(1, 'M');
      expect(momentHelper.renderAge(time)).toBeDefined();
    });

    it('renders age in years', () => {
      const time = moment().subtract(1, 'y');
      expect(momentHelper.renderAge(time)).toBeDefined();
    });

    it('renders age in months', () => {
      const time = moment().subtract(1, 'M');
      expect(momentHelper.renderAge(time)).toBeDefined();
    });
  });

  describe('renderTime', () => {
    it('should return time', () => {
      expect(momentHelper.renderTime('2018-05-28T16:23:45.6789')).toBe('16:23');
    });
  });

  describe('renderZone', () => {
    const s = '2018-05-28T16:23:45.6789';

    it('should return zone', () => {
      const date = moment.tz(s, 'Europe/Paris');
      const result = momentHelper.renderZone(date);
      const zones = ['CEST', 'CET'];
      expect(zones.includes(result)).toBe(true);
      // expect(momentHelper.renderZone(date)).toBe('CEST');
    });

    it('should return GMT+XX for timeZones without short name', () => {
      const date = moment.tz(s, 'Asia/Singapore');
      expect(momentHelper.renderZone(date)).toBe('GMT+08');
    });

    it('should return GMT-XX for timeZones without short name', () => {
      const date = moment.tz(s, 'Pacific/Rarotonga');
      expect(momentHelper.renderZone(date)).toBe('GMT-10');
    });

    it('should return GMT for timeZones without short name', () => {
      const date = moment.tz(s, 'Atlantic/Reykjavik');
      expect(momentHelper.renderZone(date)).toBe('GMT');
    });
  });

  describe('renderZoneFromId', () => {
    it('should return zone', () => {
      expect(momentHelper.renderZoneFromId('Europe/Paris')).toBeDefined();
    });

    it('should return GMT+XX for timeZones without short name', () => {
      expect(momentHelper.renderZoneFromId('Asia/Singapore')).toBe('GMT+08');
    });

    it('should return GMT-XX for timeZones without short name', () => {
      expect(momentHelper.renderZoneFromId('Pacific/Rarotonga')).toBe('GMT-10');
    });

    it('should return GMT for timeZones without short name', () => {
      expect(momentHelper.renderZoneFromId('Atlantic/Reykjavik')).toBe('GMT');
    });
  });

  describe('renderOffset', () => {
    it('should return offset', () => {
      const input = '2018-05-28T16:23:45.6789';
      const timeZone = 'Australia/Melbourne';
      const m = momentHelper.setTimeZone(moment.utc(input), timeZone);
      expect(momentHelper.renderOffset(m)).toBe('+10:00');
    });
  });

  describe('renderZoneOffset', () => {
    it('should return zone offset', () => {
      const input = '2018-05-28T16:23:45.6789';
      const timeZone = 'Australia/Melbourne';
      const m = momentHelper.setTimeZone(moment.utc(input), timeZone);
      expect(momentHelper.renderZoneOffset(m)).toBe('AEST +10:00');
    });
  });

  describe('renderTimeZone', () => {
    it('should return time with time zone', () => {
      const input = '2018-05-28T16:23:45.6789';
      const timeZone = 'Australia/Melbourne';
      const m = momentHelper.setTimeZone(moment.utc(input), timeZone);
      expect(momentHelper.renderTimeZone(m)).toBe('16:23 AEST');
    });
  });

  describe('renderDayDateTime', () => {
    it('should return day + date + time', () => {
      expect(momentHelper.renderDayDateTime('2018-05-28T16:23:45.6789')).toBe(
        'Monday, 28 May 2018 at 16:23',
      );
    });
  });

  describe('renderDayTimeZone', () => {
    it('should return day + time + zone', () => {
      const input = '2018-05-28T16:23:45.6789';
      const timeZone = 'Asia/Tokyo';
      const m = momentHelper.setTimeZone(moment.utc(input), timeZone);
      expect(momentHelper.renderDayTimeZone(m)).toBe('Monday at 16:23 JST');
    });
  });

  describe('renderDayDateTimeZone', () => {
    it('should return time with time zone', () => {
      const input = '2018-05-28T16:23:45.6789';
      const timeZone = 'Australia/Melbourne';
      const m = momentHelper.setTimeZone(moment.utc(input), timeZone);
      expect(momentHelper.renderDayDateTimeZone(m)).toBe(
        'Monday, 28 May 2018 at 16:23 AEST',
      );
    });
  });

  describe('renderDayDateShortTimeZone', () => {
    it('should return day + time + zone', () => {
      const input = '2018-05-28T16:23:45.6789';
      const timeZone = 'Asia/Tokyo';
      const m = momentHelper.setTimeZone(moment.utc(input), timeZone);
      expect(momentHelper.renderDayDateShortTimeZone(m)).toBe(
        'Mon, 28 May 2018 at 16:23 JST',
      );
    });
  });

  describe('renderFromNow', () => {
    it('should return from now', () => {
      expect(momentHelper.renderFromNow(new Date())).toBe('a few seconds ago');
    });
  });

  describe('renderFromNowAtLeastDays', () => {
    it('should render today', () => {
      const today = moment().add(1, 's');
      expect(momentHelper.renderFromNowAtLeastDays(today)).toBe('today');
    });

    it('should render yesterday', () => {
      const yesterday = moment().subtract(1, 's');
      expect(momentHelper.renderFromNowAtLeastDays(yesterday)).toBe(
        'yesterday',
      );
    });

    it('should render tomorrow', () => {
      const tomorrow = moment()
        .add(1, 'd')
        .add(1, 's');
      expect(momentHelper.renderFromNowAtLeastDays(tomorrow)).toBe('tomorrow');
    });

    it('should render a day ago', () => {
      const twoDaysAgo = moment().subtract(1, 'd');
      expect(momentHelper.renderFromNowAtLeastDays(twoDaysAgo)).toBe(
        'a day ago',
      );
    });

    it('today should render yesterday with maxTime=yesterday', () => {
      const today = moment().add(1, 's');
      const maxTimeYesterday = moment().subtract(1, 's');
      expect(
        momentHelper.renderFromNowAtLeastDays(today, maxTimeYesterday),
      ).toBe('yesterday');
    });
  });

  describe('isSameDay', () => {
    it('should compare day', () => {
      const today = moment().add(1, 's');
      const otherDay = new Date('2018-05-28T16:23:45.6789');
      expect(momentHelper.isSameDay(today, today)).toBe(true);
      expect(momentHelper.isSameDay(today, otherDay)).toBe(false);
    });
  });
  describe('getDateToday', () => {
    it('should compare day', () => {
      expect(momentHelper.getDateToday()).toBeDefined();
    });
    it('should not convertToDate if param passed to it is false', () => {
      expect(momentHelper.getDateToday(false)).toBeDefined();
    });
  });

  describe('getDateLastYear', () => {
    it('should return date last year', () => {
      const date = moment().toISOString();
      expect(momentHelper.getDateLastYear(date)).toEqual(
        moment
          .utc(date)
          .subtract(1, 'y')
          .endOf('y'),
      );
    });
  });

  describe('getDateMiddleLastYear', () => {
    it('should return date last year', () => {
      const date = moment().toISOString();
      expect(momentHelper.getDateMiddleLastYear(date)).toEqual(
        moment
          .utc(date)
          .subtract(1, 'y')
          .startOf('y')
          .month(5),
      );
    });
  });

  describe('parseDate', () => {
    it('should return moment date', () => {
      expect(momentHelper.parseDate('23 Nov 2018')).toEqual(
        moment('23 Nov 2018', FORMATS_DATE_TIME.DATE),
      );
    });
  });

  describe('timeToGo()', () => {
    const now = moment('1899-12-21T12:59:59.999Z');

    it('should return null #1', () => {
      expect(MOMENT_HELPERS.timeToGo()).toBe(null);
    });

    it('should return null #2', () => {
      const start = '1899-12-19T00:00:00.000Z';

      expect(MOMENT_HELPERS.timeToGo(start, now)).toBe(null);
    });

    it('should return a day', () => {
      const start = '1899-12-22T12:59:59.999Z';

      expect(MOMENT_HELPERS.timeToGo(start, now)).toBe('a day');
    });
  });

  describe('isOngoing()', () => {
    const now = moment('1899-12-21T12:59:59.999Z');

    it('should return undefined #1', () => {
      expect(MOMENT_HELPERS.isOngoing()).toBe(false);
    });

    it('should return undefined #2', () => {
      expect(MOMENT_HELPERS.isOngoing(now)).toBe(false);
    });

    it('should return false', () => {
      const start = '1899-12-19T00:00:00.000Z';
      const end = '1899-12-20T00:00:00.000Z';

      expect(MOMENT_HELPERS.isOngoing(start, end, now)).toBe(false);
    });

    it('should return true', () => {
      const start = '1899-12-21T00:00:00.000Z';

      expect(MOMENT_HELPERS.isOngoing(start, 1, now)).toBe(true);
    });
  });

  describe('getTourStatusWithStartAndDuration', () => {
    it('should return PAST', () => {
      const start = '1899-12-20T00:00:00.000Z';
      expect(
        MOMENT_HELPERS.getTourStatusWithStartAndDuration(start, 1),
      ).toEqual(PAST);
    });
    it('should return UPCOMING', () => {
      const start = '2055-12-20T00:00:00.000Z';
      expect(
        MOMENT_HELPERS.getTourStatusWithStartAndDuration(start, 1),
      ).toEqual(UPCOMING);
    });
    it('should return ACTIVE', () => {
      const now = moment('2019-12-21T00:00:00.000Z');
      const start = '2019-12-20T00:00:00.000Z';
      expect(
        MOMENT_HELPERS.getTourStatusWithStartAndDuration(start, 100, now),
      ).toEqual(ACTIVE);
    });
  });

  describe('tourStatus()', () => {
    const now = '1899-12-21T12:59:59.999Z';

    it('should return undefined #1', () => {
      expect(MOMENT_HELPERS.tourStatus()).toBe(undefined);
    });

    it('should return UPCOMING', () => {
      const start = '1899-12-22T00:00:00.000Z';
      expect(MOMENT_HELPERS.tourStatus(start, '', moment(now))).toBe(UPCOMING);
    });

    it('should return endSameDay ACTIVE', () => {
      const start = moment.utc('1899-12-21T00:00:00.000Z');

      expect(MOMENT_HELPERS.tourStatus(start, '', moment.utc(now))).toBe(
        ACTIVE,
      );
    });

    it('should return endSameDay UPCOMING', () => {
      const start = '1899-12-20T00:00:00.000Z';

      expect(MOMENT_HELPERS.tourStatus(start, '', moment(now))).toBe(PAST);
    });

    it('should return ACTIVE', () => {
      const start = '1899-12-20T00:00:00.000Z';
      const end = '1899-12-22T00:00:00.000Z';

      expect(MOMENT_HELPERS.tourStatus(start, end, moment(now))).toBe(ACTIVE);
    });

    it('should return PAST', () => {
      const start = '1899-12-19T00:00:00.000Z';
      const end = '1899-12-20T00:00:00.000Z';

      expect(MOMENT_HELPERS.tourStatus(start, end, moment(now))).toBe(PAST);
    });
  });

  describe('timeSince()', () => {
    const now = moment.utc('2018-12-21T12:59:59.999Z');

    it('should handle d not object, return yr', () => {
      const d = '2015-12-21T12:59:59.999Z';

      expect(MOMENT_HELPERS.timeSince(d)).toBeDefined();
    });

    it('should return mo', () => {
      const time = moment.utc('2018-09-21T12:59:59.999Z');

      expect(MOMENT_HELPERS.timeSince(time, now)).toBe('3mo');
    });

    it('should return d', () => {
      const time = moment.utc('2018-12-18T12:59:59.999Z');

      expect(MOMENT_HELPERS.timeSince(time, now)).toBe('3d');
    });

    it('should return h', () => {
      const time = moment.utc('2018-12-21T09:59:59.999Z');

      expect(MOMENT_HELPERS.timeSince(time, now)).toBe('3h');
    });

    it('should return m', () => {
      const time = moment.utc('2018-12-21T12:56:59.999Z');

      expect(MOMENT_HELPERS.timeSince(time, now)).toBe('3m');
    });

    it('should return 1m', () => {
      const time = moment.utc('2018-12-21T12:59:39.999Z');

      expect(MOMENT_HELPERS.timeSince(time, now)).toBe('1m');
    });
  });

  describe('isBeforeDay', () => {
    it('should return false', () => {
      expect(MOMENT_HELPERS.isBeforeDay('not', 'moment')).toBe(false);
    });
    it('should return isSameYear only', () => {
      const a = moment('1998-03-20');
      const b = moment('1998-04-20');
      expect(MOMENT_HELPERS.isBeforeDay(a, b)).toBe(true);
    });
    it('should return no same year no same month', () => {
      const a = moment('1998-03-20');
      const b = moment('1999-04-20');
      expect(MOMENT_HELPERS.isBeforeDay(a, b)).toBe(true);
    });
  });

  describe('getDateBasedOnIndex', () => {
    it('should return null', () => {
      expect(MOMENT_HELPERS.getDateBasedOnIndex(1, null)).toEqual(null);
    });
    it('should return date', () => {
      TEST_HELPERS.expectMatchSnapshot(
        MOMENT_HELPERS.getDateBasedOnIndex(1, startDate),
      );
    });
  });

  describe('getMoment', () => {
    it('should return something', () => {
      const date = '1998-03-20';
      TEST_HELPERS.expectMatchSnapshot(MOMENT_HELPERS.getMoment(date));
    });
  });

  describe('isInclusivelyAfterDay', () => {
    it('should return something', () => {
      expect(
        MOMENT_HELPERS.isInclusivelyAfterDay(
          moment('1998-03-20'),
          moment('1998-03-20'),
        ),
      ).toBe(true);
    });
    it('should return false', () => {
      expect(MOMENT_HELPERS.isInclusivelyAfterDay('not', 'moment')).toBe(false);
    });
  });

  describe('isOutsideRange', () => {
    it('should return something', () => {
      const date = '1999-03-20';
      const day = moment('1998-02-21');
      MOMENT_HELPERS.isInclusivelyAfterDay = jest.fn(() => true);
      TEST_HELPERS.expectMatchSnapshot(
        MOMENT_HELPERS.isOutsideRange(date, 1)(day),
      );
    });
  });

  describe('getStartBasedOnDuration', () => {
    it('should return something', () => {
      const date = '1998-03-20';
      TEST_HELPERS.expectMatchSnapshot(
        MOMENT_HELPERS.getStartBasedOnDuration(date, 1),
      );
    });
  });

  describe('isRecent', () => {
    it('should return true if date passed is recent', () => {
      const now = moment();
      const result = MOMENT_HELPERS.isRecent(now.format(), 1);

      expect(result).toBe(true);
    });

    it('should return true if date passed is recent and dateOffset is 0', () => {
      const now = moment().add(1);
      const result = MOMENT_HELPERS.isRecent(now.format(), 1, 0);

      expect(result).toBe(true);
    });

    it('should return false if no date or duration passsed', () => {
      const result = MOMENT_HELPERS.isRecent(null, null);

      expect(result).toBe(false);
    });
  });

  describe('isDayBetween', () => {
    it('should return false if no date', () => {
      const result = MOMENT_HELPERS.isDayBetween();

      expect(result).toBe(false);
    });
    it('should return true if date pass is within min and max day', () => {
      const aDayAfterToday = moment().add(1, 'day');
      const result = MOMENT_HELPERS.isDayBetween(aDayAfterToday);

      expect(result).toBe(true);
    });

    it('should return true if date pass is within min and max day specified', () => {
      const aDayAfterToday = moment().add(7, 'day');
      const result = MOMENT_HELPERS.isDayBetween(aDayAfterToday, 8);

      expect(result).toBe(true);
    });
  });
});
