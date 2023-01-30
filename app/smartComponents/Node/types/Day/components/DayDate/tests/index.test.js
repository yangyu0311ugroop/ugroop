import { shallow } from 'enzyme';
import React from 'react';
import { EVENT_DATA_HELPERS } from 'smartComponents/Node/types/Event/dataHelpers';
import MOMENT_HELPERS from 'utils/helpers/moment';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { DayDate } from '../index';

describe('<DayDate />', () => {
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

    rendered = shallow(<DayDate {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(DayDate).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });
  describe('baseStartDate()', () => {
    it('should baseStartDate startDate', () => {
      rendered.setProps({ displayDate: 'startDate' });

      expect(instance.baseStartDate()).toBeDefined();
    });

    it('should baseStartDate other', () => {
      rendered.setProps({ displayDate: 'weekDay', weekDay: 0 });

      expect(instance.baseStartDate()).toBeDefined();
    });

    it('should baseStartDate other weekDay', () => {
      rendered.setProps({ displayDate: 'weekDay', weekDay: 2 });

      expect(instance.baseStartDate()).toBeDefined();
    });
  });

  describe('startDate()', () => {
    it('should startDate', () => {
      TEST_HELPERS.expectDefined(instance.startDate);
    });
  });

  describe('dayIndex()', () => {
    it('should return dayIndex', () => {
      rendered.setProps({ dayIds: [0, 1, 2, 3], offset: 'P1D' });

      expect(instance.dayIndex(2)).toBe(3);
    });
  });

  describe('renderNoDay()', () => {
    it('should return null', () => {
      EVENT_DATA_HELPERS.durationToDays = jest.fn(() => 0);

      TEST_HELPERS.expectMatchSnapshot(instance.renderNoDay);
    });

    it('should renderNoDay', () => {
      EVENT_DATA_HELPERS.durationToDays = jest.fn(() => 2);

      TEST_HELPERS.expectMatchSnapshot(instance.renderNoDay);
    });
  });

  describe('calcDayId()', () => {
    it('should return string', () => {
      expect(instance.calcDayId('11')).toBe(11);
    });

    it('should return number', () => {
      expect(instance.calcDayId(11)).toBe(11);
    });
  });

  describe('renderDayDate()', () => {
    it('should return null', () => {
      instance.calcDayId = jest.fn(() => 0);

      expect(instance.renderDayDate()).toBe('');
    });

    it('should renderDayDate', () => {
      rendered.setProps({ dayIds: [1, 2] });
      instance.calcDayId = jest.fn(() => 11);
      instance.renderNoDay = jest.fn(() => 'renderNoDay');

      expect(instance.renderDayDate()).toBe('renderNoDay');
    });

    it('should renderDayDate startDate', () => {
      rendered.setProps({ dayIds: [1, 2], displayDate: 'startDate' });
      instance.calcDayId = jest.fn(() => 1);

      TEST_HELPERS.expectDefined(instance.renderDayDate);
    });

    it('should renderDayDate weekDay', () => {
      rendered.setProps({ dayIds: [1, 2], displayDate: 'weekDay' });
      instance.calcDayId = jest.fn(() => 1);
      instance.startDate = jest.fn(() => MOMENT_HELPERS.testInstance);

      TEST_HELPERS.expectMatchSnapshot(instance.renderDayDate);
    });

    it('should renderDayDate none', () => {
      rendered.setProps({ dayIds: [1, 2], displayDate: 'none' });
      instance.calcDayId = jest.fn(() => 1);

      TEST_HELPERS.expectMatchSnapshot(instance.renderDayDate);
    });
  });

  describe('dayDate()', () => {
    it('should return array', () => {
      rendered.setProps({ id: [1, 2] });
      instance.renderDayDate = jest.fn(() => 'renderDayDate');

      TEST_HELPERS.expectMatchSnapshot(instance.dayDate);
    });

    it('should dayDate', () => {
      rendered.setProps({ id: 11 });
      instance.renderDayDate = jest.fn(() => 'renderDayDate');

      TEST_HELPERS.expectMatchSnapshot(instance.dayDate);
    });
  });

  describe('renderButton()', () => {
    it('should return null', () => {
      rendered.setProps({ button: null });

      expect(instance.renderButton()).toBe(null);
    });

    it('should renderButton', () => {
      rendered.setProps({ button: 1123 });

      TEST_HELPERS.expectMatchSnapshot(instance.renderButton);
    });
  });

  describe('renderUnanchored()', () => {
    it('should return null', () => {
      EVENT_DATA_HELPERS.durationToDays = jest.fn(() => 0);

      expect(instance.renderUnanchored()).toBeDefined();
    });

    it('should renderUnanchored', () => {
      EVENT_DATA_HELPERS.durationToDays = jest.fn(() => 11);

      TEST_HELPERS.expectMatchSnapshot(instance.renderUnanchored);
    });
  });

  describe('renderEventSchedule()', () => {
    it('should return !isAnchored', () => {
      rendered.setProps({ dayIds: [1, 2, 3], id: 44 });
      instance.renderUnanchored = jest.fn(() => 'renderUnanchored');

      expect(instance.renderEventSchedule()).toBe('renderUnanchored');
    });

    it('should renderEventSchedule startDate', () => {
      rendered.setProps({
        dayIds: [1, 2, 3],
        id: 2,
        displayDate: 'startDate',
        fullDate: true,
      });
      instance.startDate = jest.fn(() => MOMENT_HELPERS.testInstance);
      instance.renderButton = jest.fn(() => 'renderButton');

      TEST_HELPERS.expectMatchSnapshot(instance.renderEventSchedule);
    });

    it('should renderEventSchedule weekDay', () => {
      rendered.setProps({ dayIds: [1, 2, 3], id: 2, displayDate: 'weekDay' });
      instance.startDate = jest.fn(() => MOMENT_HELPERS.testInstance);
      instance.renderButton = jest.fn(() => 'renderButton');

      TEST_HELPERS.expectMatchSnapshot(instance.renderEventSchedule);
    });

    it('should renderEventSchedule none', () => {
      rendered.setProps({ dayIds: [1, 2, 3], id: 2, displayDate: 'none' });
      instance.startDate = jest.fn(() => MOMENT_HELPERS.testInstance);
      instance.renderButton = jest.fn(() => 'renderButton');

      TEST_HELPERS.expectMatchSnapshot(instance.renderEventSchedule);
    });
  });

  describe('renderEventHeader()', () => {
    it('should return null', () => {
      rendered.setProps({ dayIds: [1, 2, 3], id: 44 });

      expect(instance.renderEventHeader()).toBe(null);
    });

    it('should renderEventHeader startDate', () => {
      rendered.setProps({ dayIds: [1, 2, 3], id: 2, displayDate: 'startDate' });
      instance.startDate = jest.fn(() => MOMENT_HELPERS.testInstance);

      TEST_HELPERS.expectMatchSnapshot(instance.renderEventHeader);
    });

    it('should renderEventHeader weekDay', () => {
      rendered.setProps({ dayIds: [1, 2, 3], id: 2, displayDate: 'weekDay' });
      instance.startDate = jest.fn(() => MOMENT_HELPERS.testInstance);

      expect(instance.renderEventHeader()).toBe(null);
    });
  });

  describe('render()', () => {
    it('should render renderEventHeader', () => {
      rendered.setProps({ eventHeader: true });
      instance.renderEventHeader = jest.fn(() => 'renderEventHeader');

      expect(instance.render()).toBe('renderEventHeader');
    });

    it('should render eventSchedule', () => {
      rendered.setProps({ eventSchedule: true });
      instance.renderEventSchedule = jest.fn(() => 'renderEventSchedule');

      expect(instance.render()).toBe('renderEventSchedule');
    });

    it('should render renderEventHeader', () => {
      instance.dayDate = jest.fn(() => 'dayDate');

      expect(instance.render()).toBe('dayDate');
    });
  });
});
