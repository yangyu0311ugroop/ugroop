/**
 * Created by stephenkarpinskyj on 25/10/18.
 */

import { dateDisplay } from 'utils/constant';
import { FIRST_DATE } from 'utils/constants/dateTime';
import { NODE_CONSTANTS } from 'utils/constants/nodes';
import { MOMENT_HELPERS } from 'utils/helpers/moment';
import timeUtils from '../utils';

describe('smartComponents/Event/Time/utils', () => {
  describe('#getClosestDayId()', () => {
    const date = '2018-01-01T12:00:00.000Z';
    const parentNodeId = 1;
    const matchingDayDate = {
      id: parentNodeId,
      value: '2018-01-01T00:00:00.000Z',
    };
    const matchingDayDate2 = {
      id: parentNodeId + 1,
      value: '2018-01-01T03:00:00.000Z',
    };
    const unmatchingDayDate = {
      id: parentNodeId + 2,
      value: '2018-01-02T00:00:00.000Z',
    };

    it('returns parentNodeId if no dayDates', () => {
      const dayDates = null;
      expect(timeUtils.getClosestDayId(date, parentNodeId, dayDates)).toEqual(
        parentNodeId,
      );
    });

    it('returns parentNodeId if none found', () => {
      const dayDates = [unmatchingDayDate];
      expect(timeUtils.getClosestDayId(date, parentNodeId, dayDates)).toEqual(
        parentNodeId,
      );
    });

    it('returns found parentNodeId', () => {
      const dayDates = [matchingDayDate];
      expect(timeUtils.getClosestDayId(date, parentNodeId, dayDates)).toEqual(
        matchingDayDate.id,
      );
    });

    it('returns first id if none found', () => {
      const dayDates = [matchingDayDate2];
      expect(timeUtils.getClosestDayId(date, parentNodeId, dayDates)).toEqual(
        matchingDayDate2.id,
      );
    });
  });

  describe('#getDate()', () => {
    const id = 1;
    const dayDate = { id, value: '2018-01-01T00:00:00.000Z' };

    it('returns default date', () => {
      const dayId = null;
      const dayDates = [];
      expect(timeUtils.getDate(dayId, dayDates)).toEqual(FIRST_DATE);
    });

    it('returns found date', () => {
      const dayId = id;
      const dayDates = [dayDate];
      expect(timeUtils.getDate(dayId, dayDates)).toEqual(dayDate.value);
    });
  });

  describe('#renderDayOptions()', () => {
    const renderDate = (...args) => args;
    const otherValue = '2018-01-02T00:00:00.000Z';
    const dayDateBefore = { id: 1, value: '2018-01-01T00:00:00.000Z' };
    const dayDateAfter = { id: 2, value: '2018-01-03T00:00:00.000Z' };

    it('renders options after otherValue', () => {
      const dayDates = [dayDateBefore, dayDateAfter];
      const showEmpty = false;
      expect(
        timeUtils.renderDayOptions(renderDate, dayDates, otherValue, showEmpty),
      ).toEqual([
        {
          children: [dayDateAfter.value, 1, { alwaysShowIndex: true }],
          value: dayDateAfter.id,
        },
      ]);
    });

    it('renders empty option', () => {
      const dayDates = [];
      const showEmpty = true;
      const tabId = 'tabId';
      expect(
        timeUtils.renderDayOptions(
          renderDate,
          dayDates,
          otherValue,
          showEmpty,
          tabId,
        ),
      ).toEqual([{ children: 'No day', value: tabId }]);
    });
  });

  describe('#renderDayDateOptions()', () => {
    const renderDate = (...args) => args;
    const dayDate = { value: '2018-01-01T00:00:00.000Z' };

    it('renders options', () => {
      const dayDates = [dayDate];
      expect(timeUtils.renderDayDateOptions(renderDate, dayDates)).toEqual([
        {
          children: [
            dayDate.value,
            0,
            { startDateRenderFunc: MOMENT_HELPERS.renderDayDate },
          ],
          value: dayDate.value,
        },
      ]);
    });
  });

  describe('#renderDayDurationOptions()', () => {
    const relativeDate = '2018-01-02T00:00:00.000Z';
    const renderDuration = (...args) => args;
    const renderNoDuration = () => null;
    const renderDate = (...args) => args;
    const dayDateBefore = { value: '2018-01-01T00:00:00.000Z' };
    const dayDateAfter = { value: '2018-01-03T00:00:00.000Z' };

    it('renders empty array', () => {
      expect(timeUtils.renderDayDurationOptions()).toEqual([]);
    });

    it('renders options with only duration', () => {
      const dayDates = [dayDateBefore, dayDateAfter];
      expect(
        timeUtils.renderDayDurationOptions(
          relativeDate,
          dayDates,
          renderDuration,
          renderDate,
        ),
      ).toEqual([
        { children: [MOMENT_HELPERS.createDuration('-P1D')], value: '-P1D' },
        { children: [MOMENT_HELPERS.createDuration('P1D')], value: 'P1D' },
      ]);
    });

    it('renders options without duration', () => {
      const dayDates = [dayDateBefore, dayDateAfter];
      expect(
        timeUtils.renderDayDurationOptions(
          relativeDate,
          dayDates,
          renderNoDuration,
          renderDate,
        ),
      ).toEqual([]);
    });

    it('renders options with duration and date', () => {
      const dayDates = [dayDateBefore, dayDateAfter];
      const includeDate = true;
      expect(
        timeUtils.renderDayDurationOptions(
          relativeDate,
          dayDates,
          renderDuration,
          renderDate,
          includeDate,
        ),
      ).toEqual([
        { children: '-P1D (2018-01-01T00:00:00.000Z,0)', value: '-P1D' },
        { children: 'P1D (2018-01-03T00:00:00.000Z,1)', value: 'P1D' },
      ]);
    });
  });

  describe('#renderDayCount()', () => {
    it('renders null if negative days', () => {
      expect(timeUtils.renderDayCount()).toBeNull();
    });

    it('renders dayCount', () => {
      const duration = MOMENT_HELPERS.createDuration(1, 'd');
      expect(timeUtils.renderDayCount(duration)).toEqual('1 day later');
    });

    it('renders same day', () => {
      const duration = MOMENT_HELPERS.createDuration(0, 'd');
      expect(timeUtils.renderDayCount(duration)).toEqual('Same day');
    });
  });

  describe('#renderNightCount()', () => {
    it('renders null if negative days', () => {
      expect(timeUtils.renderNightCount()).toBeNull();
    });

    it('renders dayCount', () => {
      const duration = MOMENT_HELPERS.createDuration(1, 'd');
      expect(timeUtils.renderNightCount(duration)).toEqual('After 1 night');
    });

    it('renders same day', () => {
      const duration = MOMENT_HELPERS.createDuration(0, 'd');
      expect(timeUtils.renderNightCount(duration)).toEqual('Same day');
    });
  });

  describe('#renderDate()', () => {
    const value = '2018-01-01T00:00:00.000Z';
    const index = 0;

    it('renders with mode=startDate', () => {
      const outerOpts = { displayDate: dateDisplay.startDate };
      expect(timeUtils.renderDate(outerOpts)(value, index)).toEqual(
        'Mon, 1 Jan 2018',
      );
    });

    it('renders with mode=startDate and alwaysShowIndex', () => {
      const outerOpts = { displayDate: dateDisplay.startDate };
      const opts = { alwaysShowIndex: true };
      expect(timeUtils.renderDate(outerOpts)(value, index, opts)).toEqual(
        'Day 1, Mon, 1 Jan 2018',
      );
    });

    it('renders with mode=weekDay', () => {
      const outerOpts = { displayDate: dateDisplay.weekDay };
      expect(timeUtils.renderDate(outerOpts)(value, index)).toEqual(
        'Day 1, Monday',
      );
    });

    it('renders with default mode', () => {
      expect(timeUtils.renderDate()(value, index)).toEqual('Day 1');
    });
  });

  describe('#calculateDateTime()', () => {
    const parentNodeId = 1;
    const dayDate = { id: parentNodeId, value: '2018-01-01T00:00:00.000Z' };

    it('renders date with added duration', () => {
      const mode = NODE_CONSTANTS.TIME_MODES.relativeStart;
      const position = NODE_CONSTANTS.POSITIONS.end;
      const duration = 'P1D';
      const startDuration = 'PT1H';
      const dayDates = [dayDate];
      const result = timeUtils.calculateDateTime(
        mode,
        position,
        duration,
        startDuration,
        parentNodeId,
        dayDates,
      );
      expect(result.toISOString()).toEqual('2018-01-02T01:00:00.000Z');
    });

    it('renders null value', () => {
      const dayDates = [{ id: parentNodeId, value: null }];
      expect(
        timeUtils.calculateDateTime(
          null,
          null,
          null,
          null,
          parentNodeId,
          dayDates,
        ),
      ).toBeNull();
    });

    it('renders default date', () => {
      expect(timeUtils.calculateDateTime().toISOString()).toEqual(
        '0001-01-01T00:00:00.000Z',
      );
    });
  });
});
