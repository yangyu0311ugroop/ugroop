import momentjs from 'moment';
import moment from 'utils/helpers/moment';
import { ACTIVITY, DAY, EVENT, TEMPLATE } from 'utils/modelConstants';
import {
  CUSTOM,
  DEFAULT_DURATION,
  DEFAULT_DURATION_TIME,
  DUE_DATE_HELPERS,
  FIXED,
  FIXED_NO_TIME,
  RELATIVE,
  UNSET,
} from '../helpers';

describe('DUE_DATE_HELPERS', () => {
  const mockDate = momentjs.utc('0001-01-01 12:35:56.789');
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(DUE_DATE_HELPERS).toBeDefined();
  });

  describe('isUnset()', () => {
    it('should exists', () => {
      expect(DUE_DATE_HELPERS.isUnset(FIXED)).toBe(false);
      expect(DUE_DATE_HELPERS.isUnset(UNSET)).toBe(true);
    });
  });

  describe('isCustom()', () => {
    it('should exists', () => {
      expect(DUE_DATE_HELPERS.isCustom(FIXED)).toBe(false);
      expect(DUE_DATE_HELPERS.isCustom(CUSTOM)).toBe(true);
    });
  });

  describe('isFixed()', () => {
    it('should exists', () => {
      expect(DUE_DATE_HELPERS.isFixed(CUSTOM)).toBe(false);
      expect(DUE_DATE_HELPERS.isFixed(FIXED)).toBe(true);
      expect(DUE_DATE_HELPERS.isFixed(FIXED_NO_TIME)).toBe(true);
    });
  });

  describe('isFixedWithTime()', () => {
    it('should exists', () => {
      expect(DUE_DATE_HELPERS.isFixedWithTime(FIXED_NO_TIME)).toBe(false);
      expect(DUE_DATE_HELPERS.isFixedWithTime(FIXED)).toBe(true);
    });
  });

  describe('isFixedNoTime()', () => {
    it('should exists', () => {
      expect(DUE_DATE_HELPERS.isFixedNoTime(FIXED)).toBe(false);
      expect(DUE_DATE_HELPERS.isFixedNoTime(FIXED_NO_TIME)).toBe(true);
    });
  });

  describe('isRelative()', () => {
    it('should exists', () => {
      expect(DUE_DATE_HELPERS.isRelative(FIXED)).toBe(false);
      expect(DUE_DATE_HELPERS.isRelative(RELATIVE)).toBe(true);
    });
  });

  describe('isDefault()', () => {
    it('should exists', () => {
      expect(DUE_DATE_HELPERS.isDefault(DEFAULT_DURATION_TIME)).toBe(false);
      expect(DUE_DATE_HELPERS.isDefault(DEFAULT_DURATION)).toBe(true);
    });
  });

  describe('isDefaultTime()', () => {
    it('should exists', () => {
      expect(DUE_DATE_HELPERS.isDefaultTime(DEFAULT_DURATION)).toBe(false);
      expect(DUE_DATE_HELPERS.isDefaultTime(DEFAULT_DURATION_TIME)).toBe(true);
    });
  });

  describe('inADay()', () => {
    it('should exists', () => {
      expect(DUE_DATE_HELPERS.inADay(0)).toBe(false);
      expect(DUE_DATE_HELPERS.inADay(0.5)).toBe(true);
      expect(DUE_DATE_HELPERS.inADay(1)).toBe(false);
    });
  });

  describe('aDayAgo()', () => {
    it('should exists', () => {
      expect(DUE_DATE_HELPERS.aDayAgo(0)).toBe(false);
      expect(DUE_DATE_HELPERS.aDayAgo(-0.5)).toBe(true);
      expect(DUE_DATE_HELPERS.aDayAgo(-1)).toBe(false);
    });
  });

  describe('withinADay()', () => {
    it('should exists', () => {
      expect(DUE_DATE_HELPERS.withinADay(0)).toBe(true);
      expect(DUE_DATE_HELPERS.withinADay(-0.5)).toBe(true);
      expect(DUE_DATE_HELPERS.withinADay(0.5)).toBe(true);
      expect(DUE_DATE_HELPERS.withinADay(-1)).toBe(false);
      expect(DUE_DATE_HELPERS.withinADay(1)).toBe(false);
    });
  });

  describe('isOneDayMinimum()', () => {
    it('should exists', () => {
      expect(DUE_DATE_HELPERS.isOneDayMinimum()).toBe(true);
      expect(DUE_DATE_HELPERS.isOneDayMinimum(TEMPLATE)).toBe(true);
      expect(DUE_DATE_HELPERS.isOneDayMinimum(DAY)).toBe(true);
      expect(DUE_DATE_HELPERS.isOneDayMinimum(ACTIVITY)).toBe(false);
      expect(DUE_DATE_HELPERS.isOneDayMinimum(EVENT)).toBe(false);
    });
  });

  describe('renderOffset()', () => {
    it('should renderOffset', () => {
      expect(
        DUE_DATE_HELPERS.renderOffset({
          value: 'P2D',
          parentType: TEMPLATE,
          translateType: 'tour',
        }),
      ).toMatchSnapshot();
      expect(
        DUE_DATE_HELPERS.renderOffset({
          value: 'PT30M',
          parentType: TEMPLATE,
          translateType: 'tour',
        }),
      ).toMatchSnapshot();
      expect(
        DUE_DATE_HELPERS.renderOffset({ value: 'PT30M', parentType: EVENT }),
      ).toMatchSnapshot();
      expect(
        DUE_DATE_HELPERS.renderOffset({
          value: 'PT96H',
          parentType: EVENT,
          useActual: true,
        }),
      ).toMatchSnapshot();
    });
  });

  describe('renderNoOffset()', () => {
    it('should renderNoOffset', () => {
      expect(DUE_DATE_HELPERS.renderNoOffset(TEMPLATE)).toMatchSnapshot();
      expect(DUE_DATE_HELPERS.renderNoOffset(DAY)).toMatchSnapshot();
      expect(DUE_DATE_HELPERS.renderNoOffset(ACTIVITY)).toMatchSnapshot();
      expect(DUE_DATE_HELPERS.renderNoOffset(EVENT)).toMatchSnapshot();
    });
  });

  describe('humaniseDuration()', () => {
    it('should humaniseDuration', () => {
      DUE_DATE_HELPERS.renderNoOffset = jest.fn(() => 'renderNoOffset');
      DUE_DATE_HELPERS.renderOffset = jest.fn(() => 'renderOffset');

      expect(DUE_DATE_HELPERS.humaniseDuration({ value: '' })).toBe(null);
      expect(
        DUE_DATE_HELPERS.humaniseDuration({ value: DEFAULT_DURATION }),
      ).toMatchSnapshot();
      expect(
        DUE_DATE_HELPERS.humaniseDuration({ value: DEFAULT_DURATION_TIME }),
      ).toMatchSnapshot();
      expect(
        DUE_DATE_HELPERS.humaniseDuration({ value: 'P2D' }),
      ).toMatchSnapshot();
    });
  });

  describe('makeCustomDurationOption()', () => {
    it('should makeCustomDurationOption', () => {
      DUE_DATE_HELPERS.humaniseDuration = jest.fn(
        () => 'DUE_DATE_HELPERS.humaniseDuration',
      );

      expect(DUE_DATE_HELPERS.makeCustomDurationOption()).toBe(null);
      expect(
        DUE_DATE_HELPERS.makeCustomDurationOption('P2D', TEMPLATE),
      ).toMatchSnapshot();
    });
  });

  describe('makeRelativeOption()', () => {
    it('should makeRelativeOption', () => {
      DUE_DATE_HELPERS.makeCustomDurationOption = jest.fn(
        () => 'makeCustomDurationOption',
      );

      expect(DUE_DATE_HELPERS.makeRelativeOption()).toBe(null);
      expect(DUE_DATE_HELPERS.makeRelativeOption('P3D')).toMatchSnapshot();
      expect(
        DUE_DATE_HELPERS.makeRelativeOption('P3D', '3 days after'),
      ).toMatchSnapshot();
    });
  });

  describe('makeRelativeOptions()', () => {
    it('should makeRelativeOptions', () => {
      DUE_DATE_HELPERS.makeRelativeOption = jest.fn(() => 'makeRelativeOption');

      expect(DUE_DATE_HELPERS.makeRelativeOptions()).toEqual([]);
      expect(
        DUE_DATE_HELPERS.makeRelativeOptions(['P2D', 'P3D']),
      ).toMatchSnapshot();
    });
  });

  describe('modeEventOptions()', () => {
    it('should modeEventOptions', () => {
      DUE_DATE_HELPERS.makeRelativeOption = jest.fn(() => 'makeRelativeOption');
      DUE_DATE_HELPERS.makeRelativeOptions = jest.fn(() => [
        'makeRelativeOptions',
      ]);

      expect(DUE_DATE_HELPERS.modeEventOptions()).toMatchSnapshot();
    });
  });

  describe('makeOptionsByType()', () => {
    it('should makeOptionsByType', () => {
      DUE_DATE_HELPERS.makeRelativeOptions = jest.fn(() => [
        'makeRelativeOptions',
      ]);
      DUE_DATE_HELPERS.modeEventOptions = jest.fn(() => ['modeEventOptions']);

      expect(DUE_DATE_HELPERS.makeOptionsByType(TEMPLATE)).toMatchSnapshot();
      expect(DUE_DATE_HELPERS.makeOptionsByType(DAY)).toMatchSnapshot();
      expect(DUE_DATE_HELPERS.makeOptionsByType(ACTIVITY)).toMatchSnapshot();
      expect(DUE_DATE_HELPERS.makeOptionsByType(EVENT)).toMatchSnapshot();
    });
  });

  describe('makeSelectedFixedDateOption()', () => {
    it('should makeSelectedFixedDateOption', () => {
      moment.renderDayDate = jest.fn(() => 'renderDayDate');
      moment.renderTime = jest.fn(() => 'renderTime');

      expect(DUE_DATE_HELPERS.makeSelectedFixedDateOption()).toBe(null);
      expect(
        DUE_DATE_HELPERS.makeSelectedFixedDateOption({ mode: RELATIVE }),
      ).toBe(null);
      expect(
        DUE_DATE_HELPERS.makeSelectedFixedDateOption({
          mode: FIXED,
          value: new Date(mockDate).toISOString(),
        }),
      ).toMatchSnapshot();
      expect(
        DUE_DATE_HELPERS.makeSelectedFixedDateOption({
          mode: FIXED_NO_TIME,
          value: new Date(mockDate).toISOString(),
        }),
      ).toMatchSnapshot();
    });
  });

  describe('makeSelectedRelativeDateOption()', () => {
    it('should makeSelectedRelativeDateOption', () => {
      DUE_DATE_HELPERS.makeCustomDurationOption = jest.fn(
        () => 'makeCustomDurationOption',
      );

      expect(DUE_DATE_HELPERS.makeSelectedRelativeDateOption()).toBe(null);
      expect(
        DUE_DATE_HELPERS.makeSelectedRelativeDateOption({
          value: DEFAULT_DURATION,
        }),
      ).toBe(null);
      expect(
        DUE_DATE_HELPERS.makeSelectedRelativeDateOption({
          value: DEFAULT_DURATION_TIME,
        }),
      ).toBe(null);
      expect(
        DUE_DATE_HELPERS.makeSelectedRelativeDateOption({ mode: FIXED }),
      ).toBe(null);
      expect(
        DUE_DATE_HELPERS.makeSelectedRelativeDateOption({ mode: RELATIVE }),
      ).toBe('makeCustomDurationOption');
    });
  });

  describe('makeSelectedFixedDateOptionState()', () => {
    it('should makeSelectedFixedDateOptionState', () => {
      DUE_DATE_HELPERS.makeCustomDurationOption = jest.fn(
        () => 'makeCustomDurationOption',
      );

      expect(DUE_DATE_HELPERS.makeSelectedFixedDateOptionState({})).toBe(null);
      expect(
        DUE_DATE_HELPERS.makeSelectedFixedDateOptionState({
          fixedDate: mockDate,
          fixedTime: '9:00',
        }),
      ).toMatchSnapshot();
    });
  });

  describe('makeNoOffsetOption()', () => {
    it('should makeNoOffsetOption', () => {
      DUE_DATE_HELPERS.renderNoOffset = jest.fn(() => 'renderNoOffset');

      expect(DUE_DATE_HELPERS.makeNoOffsetOption(TEMPLATE)).toMatchSnapshot();
    });
  });

  describe('makeHeadingOption()', () => {
    it('should makeHeadingOption', () => {
      expect(
        DUE_DATE_HELPERS.makeHeadingOption('Relative date:'),
      ).toMatchSnapshot();
    });
  });

  describe('renderCalculatedDate()', () => {
    it('should renderCalculatedDate', () => {
      moment.renderCalendarDueDate = jest.fn(() => 'renderCalendarDueDate');
      moment.renderTime = jest.fn(() => 'renderTime');

      expect(
        DUE_DATE_HELPERS.renderCalculatedDate({
          value: 'PT30M',
          parentType: EVENT,
        }),
      ).toMatchSnapshot();
      expect(
        DUE_DATE_HELPERS.renderCalculatedDate({
          value: 'PT30M',
          parentType: TEMPLATE,
        }),
      ).toMatchSnapshot();
    });
  });

  describe('calculateDate()', () => {
    it('should calculateDate', () => {
      const anchorDate = mockDate;

      expect(DUE_DATE_HELPERS.calculateDate({})).toBe(null);
      expect(DUE_DATE_HELPERS.calculateDate({ startTime: 'startTime' })).toBe(
        'startTime',
      );
      expect(
        DUE_DATE_HELPERS.calculateDate({ dueDate: { mode: CUSTOM } }),
      ).toBe(null);
      expect(
        DUE_DATE_HELPERS.calculateDate({
          dueDate: { mode: RELATIVE, value: 'P2D' },
        }),
      ).toBe(null);
      expect(
        DUE_DATE_HELPERS.calculateDate({
          dueDate: { mode: FIXED, value: anchorDate },
        }),
      ).toMatchSnapshot();
      expect(
        DUE_DATE_HELPERS.calculateDate({
          dueDate: { mode: RELATIVE, value: 'PT30M' },
          anchorDate,
          parentType: EVENT,
        }),
      ).toMatchSnapshot();
      expect(
        DUE_DATE_HELPERS.calculateDate({
          dueDate: { mode: RELATIVE, value: 'PT30M' },
          anchorDate,
          parentType: TEMPLATE,
        }),
      ).toMatchSnapshot();
      expect(
        DUE_DATE_HELPERS.calculateDate({
          dueDate: { mode: RELATIVE, value: '-PT30M' },
          anchorDate,
          parentType: TEMPLATE,
        }),
      ).toMatchSnapshot();
      expect(
        DUE_DATE_HELPERS.calculateDate({
          dueDate: { mode: RELATIVE, value: 'P2D' },
          anchorDate,
          parentType: TEMPLATE,
        }),
      ).toMatchSnapshot();
      expect(
        DUE_DATE_HELPERS.calculateDate({
          dueDate: { mode: RELATIVE, value: '-P2D' },
          anchorDate,
          parentType: TEMPLATE,
        }),
      ).toMatchSnapshot();
    });
  });
});
