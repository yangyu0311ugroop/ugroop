import { shallow } from 'enzyme';
import React from 'react';
import { scroller } from 'react-scroll';
import MOMENT_HELPERS from 'utils/helpers/moment';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import moment from 'moment';
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
    dayIds: [1],
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

  describe('onClickCell', () => {
    it('should call onClick', () => {
      const onClick = jest.fn();
      rendered.setProps({ onClick });

      instance.onClickCell(1)();

      expect(onClick).toHaveBeenCalled();
    });

    it('should call setValue', () => {
      scroller.scrollTo = jest.fn();
      instance.onClickCell(1)();
      expect(resaga.setValue).toHaveBeenCalledWith({ selectedId: 1 });
      expect(scroller.scrollTo).toHaveBeenCalled();
    });
  });

  describe('renderDayDate()', () => {
    it('should return startDate', () => {
      rendered.setProps({ displayDate: 'startDate' });

      expect(instance.renderDayDate(moment())).toBeDefined();
    });

    it('should renderDayDate', () => {
      rendered.setProps({ displayDate: 'weekDay' });

      expect(instance.renderDayDate(MOMENT_HELPERS.testInstance)).toBeDefined();
    });
  });

  describe('renderDayContent()', () => {
    it('should return null', () => {
      expect(instance.renderDayContent()).toBe(null);
    });

    it('should renderDayContent', () => {
      rendered.setProps({ selectedDay: { isSame: jest.fn() } });

      expect(
        instance.renderDayContent(MOMENT_HELPERS.testInstance, 2),
      ).toBeDefined();
    });
  });

  describe('renderDay()', () => {
    it('should renderDay', () => {
      instance.renderDayContent = jest.fn(() => 'renderDayContent');

      expect(instance.renderDay()).toBe('renderDayContent');
    });

    it('should renderDay with day', () => {
      instance.renderDayContent = jest.fn(() => 'renderDayContent');

      expect(instance.renderDay(MOMENT_HELPERS.testInstance)).toBe(
        'renderDayContent',
      );
    });
  });

  describe('startDate()', () => {
    it('should return weekDay', () => {
      rendered.setProps({ displayDate: 'weekDay' });

      expect(instance.startDate()).toBeDefined();
    });

    it('should return startDate', () => {
      rendered.setProps({ displayDate: 'startDate' });

      expect(instance.startDate()).toBeDefined();
    });

    it('should return none', () => {
      rendered.setProps({ displayDate: 'none' });

      expect(instance.startDate()).toBeDefined();
    });
  });

  describe('render', () => {
    it('should return !card', () => {
      rendered.setProps({
        displayDate: 'startDate',
        startDate: null,
        card: false,
      });
      expect(instance.render()).toBeDefined();
    });

    it('should return card', () => {
      rendered.setProps({
        displayDate: 'startDate',
        startDate: '1',
        card: true,
        selectedId: 11,
      });
      expect(instance.render()).toBeDefined();
    });
    it('should match snapshot', () => {
      rendered.setProps({
        dayIds: [1],
        selectedId: 1,
      });

      instance.startDate = jest.fn(() => '1998-03-20');
      rendered.setState({ weeks: [1] });
      instance.renderMonthHeader = jest.fn(() => 'renderMonthHeader');
      instance.renderWeekHeaders = jest.fn(() => 'renderWeekHeaders');
      instance.renderWeek = jest.fn(() => 'renderWeek');
      instance.renderDay = jest.fn(() => 'renderDay');
      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
