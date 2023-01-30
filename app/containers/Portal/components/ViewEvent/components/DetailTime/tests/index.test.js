import { shallow } from 'enzyme';
import React from 'react';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import MOMENT_HELPERS from 'utils/helpers/moment';
import { NODE_HELPERS } from 'utils/helpers/nodes';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { DetailTime } from '../index';

describe('<DetailTime />', () => {
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

    rendered = shallow(<DetailTime {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(DetailTime).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('formatTime()', () => {
    it('should return null', () => {
      expect(instance.formatTime(null)).toBe(null);
    });

    it('should formatTime', () => {
      LOGIC_HELPERS.ifElse = jest.fn();

      instance.formatTime(MOMENT_HELPERS.testInstance);

      TEST_HELPERS.expectCalled(LOGIC_HELPERS.ifElse);
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

  describe('renderDayCount()', () => {
    it('should return null', () => {
      MOMENT_HELPERS.dayCount = jest.fn(() => 0);

      expect(instance.renderDayCount()).toBe(false);
    });

    it('should renderDayCount', () => {
      MOMENT_HELPERS.dayCount = jest.fn(() => 2);

      TEST_HELPERS.expectMatchSnapshot(instance.renderDayCount);
    });
  });

  describe('render()', () => {
    it('should render', () => {
      instance.renderTime = jest.fn(() => 'renderTime');
      instance.renderDayCount = jest.fn(() => 'renderDayCount');

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });

    it('should render', () => {
      instance.renderTime = jest.fn(() => 'renderTime');
      instance.renderDayCount = jest.fn(() => 'renderDayCount');
      rendered.setProps({ hideEndDate: true });

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
