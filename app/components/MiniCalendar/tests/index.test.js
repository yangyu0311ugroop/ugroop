import { DO_NOTHING } from 'appConstants';
import { shallow } from 'enzyme';
import moment from 'moment';
import React from 'react';
import { MOMENT_HELPERS } from 'utils/helpers/moment';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { MiniCalendar } from '../index';

describe('<MiniCalendar />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    rendered = shallow(<MiniCalendar {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(MiniCalendar).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('render()', () => {
    it('should render', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });

  describe('componentDidUpdate()', () => {
    it('should componentDidUpdate() startDate', () => {
      rendered.setProps({
        startDate: '1',
      });
      instance.setState = jest.fn();

      instance.componentDidUpdate({
        startDate: '2',
      });

      TEST_HELPERS.expectCalled(instance.setState);
    });

    it('should componentDidUpdate() duration', () => {
      rendered.setProps({
        duration: 1,
      });
      instance.setState = jest.fn();

      instance.componentDidUpdate({
        duration: 2,
      });

      TEST_HELPERS.expectCalled(instance.setState);
    });

    it('should componentDidUpdate() firstDayOfWeek', () => {
      rendered.setProps({
        firstDayOfWeek: 1,
      });
      instance.setState = jest.fn();

      instance.componentDidUpdate({
        firstDayOfWeek: 2,
      });

      TEST_HELPERS.expectCalled(instance.setState);
    });

    it('should componentDidUpdate() NOT changed', () => {
      rendered.setProps({
        startDate: '1',
        duration: 2,
        firstDayOfWeek: 3,
      });

      expect(
        instance.componentDidUpdate({
          startDate: '1',
          duration: 2,
          firstDayOfWeek: 3,
        }),
      ).toBe(DO_NOTHING);
    });
  });

  describe('getFirstDayOfWeek()', () => {
    it('should getFirstDayOfWeek()', () => {
      rendered.setProps({ firstDayOfWeek: 1 });

      expect(instance.getFirstDayOfWeek()).toBe(1);
    });

    it('should getFirstDayOfWeek() return default', () => {
      moment.localeData = jest.fn(() => ({ firstDayOfWeek: () => 2 }));

      expect(instance.getFirstDayOfWeek()).toBe(2);
    });
  });

  describe('getWeekHeaders()', () => {
    it('should getWeekHeaders()', () => {
      instance.getFirstDayOfWeek = jest.fn(() => 1);

      expect(instance.getWeekHeaders().length).toBe(7);
    });
  });

  describe('renderWeekHeaders', () => {
    it('should match snapshot', () => {
      instance.getWeekHeaders = jest.fn(() => [1]);
      TEST_HELPERS.expectMatchSnapshot(instance.renderWeekHeaders);
    });
  });

  describe('renderMonthHeader', () => {
    it('should return different year render both month and year', () => {
      MOMENT_HELPERS.getMoment = jest.fn(() => ({
        year() {
          return 1;
        },
        format() {
          return '1';
        },
      }));
      MOMENT_HELPERS.getStartBasedOnDuration = jest.fn(() => ({
        year() {
          return 2;
        },
        format() {
          return '2';
        },
      }));

      TEST_HELPERS.expectMatchSnapshot(instance.renderMonthHeader);
    });
    it('should return different month, render year once', () => {
      MOMENT_HELPERS.getMoment = jest.fn(() => ({
        year() {
          return 1;
        },
        format() {
          return '1';
        },
        month() {
          return 4;
        },
      }));
      MOMENT_HELPERS.getStartBasedOnDuration = jest.fn(() => ({
        year() {
          return 1;
        },
        month() {
          return 3;
        },
        format() {
          return '2';
        },
      }));

      TEST_HELPERS.expectMatchSnapshot(instance.renderMonthHeader);
    });
    it('should return same month, render month and year once', () => {
      MOMENT_HELPERS.getMoment = jest.fn(() => ({
        year() {
          return 1;
        },
        month() {
          return 4;
        },
        format() {
          return '1';
        },
      }));
      MOMENT_HELPERS.getStartBasedOnDuration = jest.fn(() => ({
        year() {
          return 1;
        },
        month() {
          return 4;
        },
        format() {
          return '2';
        },
      }));

      TEST_HELPERS.expectMatchSnapshot(instance.renderMonthHeader);
    });
  });

  describe('renderDate()', () => {
    it('should return null !day', () => {
      rendered.setProps({ day: null });

      expect(instance.renderDate()).toBe(null);
    });

    it('should return null', () => {
      rendered.setProps({ displayDate: 'weekDay', day: 1 });

      expect(instance.renderDate()).toBe(null);
    });

    it('should renderDate 1', () => {
      rendered.setProps({ displayDate: 'startDate' });

      TEST_HELPERS.expectMatchSnapshot(instance.renderDate, [
        { date: () => 1, format: () => '1 Sep' },
      ]);
    });

    it('should renderDate 2', () => {
      rendered.setProps({ displayDate: 'startDate' });

      TEST_HELPERS.expectMatchSnapshot(instance.renderDate, [
        { date: () => 2, format: () => '2' },
      ]);
    });
  });

  describe('renderDayContent()', () => {
    it('should renderDayContent()', () => {
      rendered.setProps({
        renderDayContent: jest.fn(() => 'renderDayContent'),
      });

      TEST_HELPERS.expectDefined(instance.renderDayContent);
    });
  });

  describe('renderDay()', () => {
    it('should renderDay', () => {
      rendered.setProps({ selectedDay: MOMENT_HELPERS.testInstance });
      instance.renderDayContent = jest.fn(() => 'renderDayContent');
      MOMENT_HELPERS.isOutsideRange = jest.fn(() => () => false);

      TEST_HELPERS.expectMatchSnapshot(instance.renderDay);
    });
  });

  describe('renderWeek', () => {
    it('should show isStartDateInThisWeek is false', () => {
      const renderDay = jest.fn(() => 'renderDayProp');
      rendered.setProps({ renderDay });

      const week = [1, 2];
      MOMENT_HELPERS.isOutsideRange = jest.fn(() => i => i % 2);
      TEST_HELPERS.expectMatchSnapshot(instance.renderWeek(week, 1));
    });

    it('should show isStartDateInThisWeek true', () => {
      instance.renderDay = jest.fn(() => 'renderDayProp');
      MOMENT_HELPERS.isOutsideRange = jest.fn(() => () => false);

      const week = [1];
      TEST_HELPERS.expectMatchSnapshot(instance.renderWeek(week, 1));
    });
  });

  describe('render', () => {
    it('should match snapshot startDate', () => {
      rendered.setProps({
        displayDate: 'startDate',
        startDate: '1998-03-20',
        dayIds: [1],
      });
      rendered.setState({ weeks: [1] });
      instance.renderMonthHeader = jest.fn(() => 'renderMonthHeader');
      instance.renderWeekHeaders = jest.fn(() => 'renderWeekHeaders');
      instance.renderWeek = jest.fn(() => 'renderWeek');

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });

    it('should match snapshot weekDay', () => {
      rendered.setProps({
        displayDate: 'weekDay',
        dayIds: [1],
      });
      rendered.setState({ weeks: [1] });
      instance.renderWeekHeaders = jest.fn(() => 'renderWeekHeaders');
      instance.renderWeek = jest.fn(() => 'renderWeek');

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });

    it('should match snapshot none', () => {
      rendered.setProps({
        displayDate: 'none',
        dayIds: [1],
      });
      rendered.setState({ weeks: [1] });
      instance.renderWeekHeaders = jest.fn(() => 'renderWeekHeaders');
      instance.renderWeek = jest.fn(() => 'renderWeek');

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
