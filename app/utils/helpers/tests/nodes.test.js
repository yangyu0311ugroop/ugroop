/**
 * Created by stephenkarpinskyj on 27/3/18.
 */

import { NODE_CONSTANTS } from 'utils/constants/nodes';
import { NODE_HELPERS } from 'utils/helpers/nodes';
import { MOMENT_HELPERS } from 'utils/helpers/moment';
import { dateDisplay } from '../../constant';

describe('utils/helpers/nodes', () => {
  describe('#calculateDuration', () => {
    it('calculates correctly', () => {
      const a = '2018-01-01T12:00:00.000Z';
      const b = '2018-01-01T13:00:00.000Z';
      expect(NODE_HELPERS.calculateDuration(a, b).toISOString()).toEqual(
        'PT1H',
      );
    });

    it('calculates correctly when dates have no diff', () => {
      const a = '2018-01-01T12:00:00.000Z';
      const b = '2018-01-01T12:00:00.000Z';
      expect(NODE_HELPERS.calculateDuration(a, b).toISOString()).toEqual('P0D');
    });
  });

  describe('#calculateDayDuration', () => {
    it('calculates correctly', () => {
      const a = '2018-01-01T12:00:00.000Z';
      const b = '2018-01-01T13:00:00.000Z';
      expect(NODE_HELPERS.calculateDayDuration(a, b).toISOString()).toBe('P0D');
    });
  });

  describe('#calculateDayCount', () => {
    it('calculates correctly', () => {
      const startTime = { value: '2018-01-01T12:00:00.000Z' };
      const endTime = { value: '2018-01-01T13:00:00.000Z' };
      expect(NODE_HELPERS.calculateDayCount(startTime, endTime)).toBe(1);
    });
  });

  describe('#checkDayCount', () => {
    it('checks singleDay correctly', () => {
      const dayCountType = NODE_CONSTANTS.DAY_COUNT_TYPES.singleDay;
      const dayCount = 0;
      expect(NODE_HELPERS.checkDayCount(dayCountType, dayCount)).toBe(true);
    });

    it('checks multiDay correctly', () => {
      const dayCountType = NODE_CONSTANTS.DAY_COUNT_TYPES.multiDay;
      const dayCount = 1;
      expect(NODE_HELPERS.checkDayCount(dayCountType, dayCount)).toBe(true);
    });

    it('checks multiDay correctly', () => {
      const dayCountType = NODE_CONSTANTS.DAY_COUNT_TYPES.any;
      expect(NODE_HELPERS.checkDayCount(dayCountType)).toBe(true);
    });
  });

  describe('#hasTimeComponent', () => {
    it('checks fixedDate correctly', () => {
      const mode = NODE_CONSTANTS.TIME_MODES.fixedDate;
      expect(NODE_HELPERS.hasTimeComponent(mode)).toBe(false);
    });

    it('checks relativeAtTime correctly', () => {
      const mode = NODE_CONSTANTS.TIME_MODES.relativeAtTime;
      expect(NODE_HELPERS.hasTimeComponent(mode)).toBe(true);
    });
  });

  describe('#hasDateComponent', () => {
    it('checks unanchored correctly', () => {
      const mode = NODE_CONSTANTS.TIME_MODES.unanchored;
      expect(NODE_HELPERS.hasDateComponent(mode)).toBe(false);
    });

    it('checks relative correctly', () => {
      const mode = NODE_CONSTANTS.TIME_MODES.relative;
      expect(NODE_HELPERS.hasDateComponent(mode)).toBe(true);
    });
  });

  describe('#isAnchored', () => {
    it('checks unanchored correctly', () => {
      const mode = NODE_CONSTANTS.TIME_MODES.unanchored;
      expect(NODE_HELPERS.isAnchored(mode)).toBe(false);
    });

    it('checks relative correctly', () => {
      const mode = NODE_CONSTANTS.TIME_MODES.relative;
      expect(NODE_HELPERS.isAnchored(mode)).toBe(true);
    });
  });

  describe('#isFixed', () => {
    it('checks relative correctly', () => {
      const mode = NODE_CONSTANTS.TIME_MODES.relative;
      expect(NODE_HELPERS.isFixed(mode)).toBe(false);
    });

    it('checks fixedDateTime correctly', () => {
      const mode = NODE_CONSTANTS.TIME_MODES.fixedDateTime;
      expect(NODE_HELPERS.isFixed(mode)).toBe(true);
    });
  });

  describe('#isRelative', () => {
    it('checks fixedDateTime correctly', () => {
      const mode = NODE_CONSTANTS.TIME_MODES.fixedDateTime;
      expect(NODE_HELPERS.isRelative(mode)).toBe(false);
    });

    it('checks relative correctly', () => {
      const mode = NODE_CONSTANTS.TIME_MODES.relative;
      expect(NODE_HELPERS.isRelative(mode)).toBe(true);
    });
  });

  describe('#hasDuration', () => {
    it('checks start and end modes correctly', () => {
      const startMode = NODE_CONSTANTS.TIME_MODES.fixedDateTime;
      const endMode = NODE_CONSTANTS.TIME_MODES.fixedDateTime;
      expect(NODE_HELPERS.hasDuration(startMode, endMode)).toBe(true);
    });
  });
  describe('#checkHasTime', () => {
    it('checks start and end modes correctly', () => {
      const withoutTime = NODE_CONSTANTS.HAS_TIMES.withoutTime;
      expect(NODE_HELPERS.checkHasTime(withoutTime, null)).toBe(false);
    });
    it('checks start and end modes correctly', () => {
      const withTime = NODE_CONSTANTS.HAS_TIMES.withTime;
      expect(NODE_HELPERS.checkHasTime(withTime, null)).toBe(true);
    });
    it('checks start and end modes correctly', () => {
      const withTime = NODE_CONSTANTS.HAS_TIMES.withTime;
      const mode = NODE_CONSTANTS.TIME_MODES.fixedDate;
      expect(NODE_HELPERS.checkHasTime(withTime, mode)).toBe(false);
    });
    it('checks start and end modes correctly', () => {
      const all = NODE_CONSTANTS.HAS_TIMES.all;
      expect(NODE_HELPERS.checkHasTime(all, null)).toBe(true);
    });
  });

  describe('#renderTime', () => {
    const time = MOMENT_HELPERS.setTimeZone(
      '2018-01-01T12:00:00.000Z',
      'Europe/Paris',
    );
    const ancientTime = MOMENT_HELPERS.setTimeZone(
      '1899-01-01T12:00:00.000Z',
      'Europe/Paris',
    );

    it('renders displayMode=startDate by default', () => {
      const mode = NODE_CONSTANTS.TIME_MODES.fixedDateTime;
      expect(NODE_HELPERS.renderTime(time, mode)).toEqual(
        'Mon, 1 Jan 2018 at 12:00 CET',
      );
    });

    it('renders undisplayable year + displayMode=startDate', () => {
      const mode = NODE_CONSTANTS.TIME_MODES.fixedDateTime;
      expect(NODE_HELPERS.renderTime(ancientTime, mode)).toEqual(
        '??? at 12:00 PMT',
      );
    });

    it('renders fixed date + displayMode=startDate', () => {
      const mode = NODE_CONSTANTS.TIME_MODES.fixedDate;
      expect(NODE_HELPERS.renderTime(time, mode)).toEqual('Mon, 1 Jan 2018');
    });

    it('renders fixed date + undisplayable year + displayMode=startDate', () => {
      const mode = NODE_CONSTANTS.TIME_MODES.fixedDate;
      expect(NODE_HELPERS.renderTime(ancientTime, mode)).toEqual('Day ???');
    });

    it('renders displayMode=weekDay', () => {
      const mode = NODE_CONSTANTS.TIME_MODES.fixedDateTime;
      const opts = { displayDate: dateDisplay.weekDay };
      expect(NODE_HELPERS.renderTime(time, mode, opts)).toEqual(
        'Monday at 12:00 CET',
      );
    });

    it('renders displayMode=weekDay + no time', () => {
      const mode = NODE_CONSTANTS.TIME_MODES.fixedDate;
      const opts = { displayDate: dateDisplay.weekDay };
      expect(NODE_HELPERS.renderTime(time, mode, opts)).toEqual('Monday');
    });

    it('renders displayMode=none', () => {
      const mode = NODE_CONSTANTS.TIME_MODES.fixedDateTime;
      const opts = { displayDate: dateDisplay.none };
      expect(NODE_HELPERS.renderTime(time, mode, opts)).toEqual('12:00 CET');
    });

    it('renders displayMode=none + no time', () => {
      const mode = NODE_CONSTANTS.TIME_MODES.fixedDate;
      const opts = { displayDate: dateDisplay.none };
      expect(NODE_HELPERS.renderTime(time, mode, opts)).toEqual('');
    });

    it('renders time only', () => {
      const mode = NODE_CONSTANTS.TIME_MODES.unanchoredAtTime;
      expect(NODE_HELPERS.renderTime(time, mode)).toEqual('12:00 CET');
    });

    it('renders time only with no time', () => {
      const mode = NODE_CONSTANTS.TIME_MODES.unanchored;
      expect(NODE_HELPERS.renderTime(time, mode)).toBeNull();
    });
  });

  describe('#renderDayIndex', () => {
    it('renders correctly', () => {
      expect(NODE_HELPERS.renderDayIndex(1)).toEqual('Day 2');
    });
  });

  describe('#renderDate', () => {
    it('renders displayDate=startDate', () => {
      const date = MOMENT_HELPERS.setTimeZone(
        '2018-01-01T12:00:00.000Z',
        'Europe/Paris',
      );
      const displayDate = dateDisplay.startDate;
      expect(NODE_HELPERS.renderDate(date, displayDate)).toEqual(
        'Monday, 1 January 2018',
      );
    });

    it('renders displayDate=weekDay', () => {
      const date = MOMENT_HELPERS.setTimeZone(
        '2018-01-01T12:00:00.000Z',
        'Europe/Paris',
      );
      const displayDate = dateDisplay.weekDay;
      expect(NODE_HELPERS.renderDate(date, displayDate)).toEqual('Monday');
    });

    it('renders with no date', () => {
      expect(NODE_HELPERS.renderDate()).toEqual('');
    });
  });

  describe('#renderDayIndexDate', () => {
    const date = 'Date';

    it('renders', () => {
      expect(NODE_HELPERS.renderDayIndexDate(1, date)).toEqual('Day 2, Date');
    });

    it('renders large index', () => {
      expect(NODE_HELPERS.renderDayIndexDate(101, date)).toEqual(
        'Day ???, Date',
      );
    });

    it('renders with no date', () => {
      const opts = { hasDate: false };
      expect(NODE_HELPERS.renderDayIndexDate(1, date, opts)).toEqual(
        'Day 2 at Date',
      );
    });

    it('renders with no index', () => {
      expect(NODE_HELPERS.renderDayIndexDate()).toEqual('undefined');
    });
  });
});
