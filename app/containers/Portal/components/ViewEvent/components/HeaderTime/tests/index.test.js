import { HEADING } from 'appConstants';
import { shallow } from 'enzyme';
import React from 'react';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import MOMENT_HELPERS from 'utils/helpers/moment';
import { NODE_HELPERS } from 'utils/helpers/nodes';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { HeaderTime } from '../index';

describe('<HeaderTime />', () => {
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

    rendered = shallow(<HeaderTime {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(HeaderTime).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('formatTime()', () => {
    it('should return null', () => {
      expect(instance.formatTime(null)).toBe(null);
    });

    it('should formatTime HEADING', () => {
      rendered.setProps({ variant: HEADING });
      MOMENT_HELPERS.renderRelativeTime = jest.fn();

      instance.formatTime(MOMENT_HELPERS.testInstance);

      TEST_HELPERS.expectCalled(MOMENT_HELPERS.renderRelativeTime);
    });

    it('should formatTime', () => {
      LOGIC_HELPERS.ifElse = jest.fn();

      instance.formatTime(MOMENT_HELPERS.testInstance);

      TEST_HELPERS.expectCalled(LOGIC_HELPERS.ifElse);
    });
  });

  describe('duration()', () => {
    it('should return null', () => {
      NODE_HELPERS.hasDuration = jest.fn(() => false);

      expect(instance.duration()).toBe(null);
    });

    it('should duration', () => {
      NODE_HELPERS.hasDuration = jest.fn(() => true);
      NODE_HELPERS.calculateDuration = jest.fn(() => 'calculateDuration');
      MOMENT_HELPERS.renderDurationHoursMinutes = jest.fn(
        () => 'renderDurationHoursMinutes',
      );

      expect(instance.duration()).toBe('renderDurationHoursMinutes');
    });
  });

  describe('renderEndTime()', () => {
    it('should return null', () => {
      NODE_HELPERS.withTime = jest.fn(() => null);

      expect(instance.renderEndTime()).toBe(null);
    });

    it('should renderEndTime', () => {
      NODE_HELPERS.withTime = jest.fn(() => true);
      MOMENT_HELPERS.appendZone = jest.fn(() => 'MOMENT_HELPERS.appendZone');

      TEST_HELPERS.expectMatchSnapshot(instance.renderEndTime, [
        MOMENT_HELPERS.testInstance,
      ]);
    });
  });

  describe('renderTime()', () => {
    it('should return null', () => {
      expect(instance.renderTime(null)).toBe(null);
    });

    it('should renderTime', () => {
      instance.renderEndTime = jest.fn(() => 'renderEndTime');
      instance.formatTime = jest.fn(() => 'formatTime');

      TEST_HELPERS.expectDefined(instance.renderTime, [
        MOMENT_HELPERS.testInstance,
      ]);
    });
  });

  describe('renderDateTime()', () => {
    it('should return null', () => {
      rendered.setProps({ startTimeMoment: null });

      expect(instance.renderDateTime()).toBe(null);
    });

    it('should return null 2', () => {
      rendered.setProps({ startTimeMoment: MOMENT_HELPERS.testInstance });
      NODE_HELPERS.withTime = jest.fn(() => false);

      expect(instance.renderDateTime()).toBe(null);
    });

    it('should renderDateTime no end', () => {
      rendered.setProps({ startTimeMoment: MOMENT_HELPERS.testInstance });
      NODE_HELPERS.withTime = jest.fn(() => true);
      NODE_HELPERS.calculateDayDuration = jest.fn(() => ({ asDays: () => 2 }));

      TEST_HELPERS.expectMatchSnapshot(instance.renderDateTime);
    });

    it('should renderDateTime', () => {
      rendered.setProps({
        startTimeMoment: MOMENT_HELPERS.testInstance,
        endTimeMoment: MOMENT_HELPERS.testInstance,
      });
      NODE_HELPERS.withTime = jest.fn(() => true);
      NODE_HELPERS.calculateDayDuration = jest.fn(() => ({ asDays: () => 2 }));

      TEST_HELPERS.expectMatchSnapshot(instance.renderDateTime);
    });
  });

  describe('renderHeading()', () => {
    it('should renderHeading', () => {
      instance.renderDateTime = jest.fn(() => 'renderDateTime');
      instance.formatTime = jest.fn(() => 'formatTime');

      TEST_HELPERS.expectMatchSnapshot(instance.renderHeading);
    });
  });

  describe('render()', () => {
    it('should render HEADING', () => {
      rendered.setProps({ variant: HEADING });

      instance.renderDateTime = jest.fn(() => 'renderDateTime');
      instance.formatTime = jest.fn(() => 'formatTime');

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
