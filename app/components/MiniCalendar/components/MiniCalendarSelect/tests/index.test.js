import { shallow } from 'enzyme';
import React from 'react';
import MOMENT_HELPERS from 'utils/helpers/moment';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { MiniCalendarSelect } from '../index';

describe('<MiniCalendarSelect />', () => {
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

  const moment = {
    format: jest.fn(() => 'format'),
    diff: jest.fn(),
    isBefore: () => true,
    isSame: () => true,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    rendered = shallow(<MiniCalendarSelect {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(MiniCalendarSelect).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('handleClick()', () => {
    it('should handleClick() range endDate', () => {
      rendered.setProps({ range: undefined });
      rendered.setProps({ multiple: true });
      rendered.setState({ dates: [undefined] });
      rendered.setState({ startDate: moment, endDate: moment });
      instance.formatDay = jest.fn();
      instance.handleDatesChange = jest.fn();
      instance.handleClick(moment)();

      TEST_HELPERS.expectCalled(instance.handleDatesChange);
    });

    it('should handleClick() range startDate', () => {
      rendered.setProps({ range: undefined });
      rendered.setProps({ multiple: true });
      rendered.setState({ dates: [] });
      rendered.setState({ startDate: moment, endDate: moment });
      instance.formatDay = jest.fn();
      instance.handleDatesChange = jest.fn();

      instance.handleClick(moment)();

      TEST_HELPERS.expectCalled(instance.handleDatesChange);
    });

    it('should handleClick() range startDate and endDate', () => {
      rendered.setProps({ range: false });
      rendered.setProps({ multiple: false });
      rendered.setState({ dates: [] });
      rendered.setState({ startDate: '', endDate: moment });

      instance.handleDatesChange = jest.fn();
      instance.handleClick(moment)();

      TEST_HELPERS.expectCalled(instance.handleDatesChange);
    });

    it('should handleClick() !range', () => {
      rendered.setProps({ range: undefined });
      rendered.setState({ startDate: moment });
      rendered.setState({ dates: [] });
      instance.handleDatesChange = jest.fn();
      instance.formatDay = jest.fn();
      instance.handleClick(moment)();

      TEST_HELPERS.expectCalled(instance.handleDatesChange);
    });
  });

  describe('handleDatesChange()', () => {
    it('should handleDatesChange()', () => {
      const onDatesChange = jest.fn();
      rendered.setProps({ onDatesChange });

      instance.handleDatesChange();

      TEST_HELPERS.expectCalled(onDatesChange);
    });
  });

  describe('isInSelectedRange()', () => {
    it('should isInSelectedRange()', () => {
      MOMENT_HELPERS.isOutsideRange = jest.fn(() => () => false);

      expect(
        instance.isInSelectedRange({ startDate: moment, endDate: moment }),
      ).toBe(true);
    });

    it('should NOT isInSelectedRange() 1', () => {
      MOMENT_HELPERS.isOutsideRange = jest.fn(() => () => true);

      expect(
        instance.isInSelectedRange({ startDate: null, endDate: '2' }),
      ).not.toBe(true);
    });

    it('should NOT isInSelectedRange() 2', () => {
      MOMENT_HELPERS.isOutsideRange = jest.fn(() => () => true);

      expect(
        instance.isInSelectedRange({ startDate: moment, endDate: null }),
      ).not.toBe(true);
    });

    it('should NOT isInSelectedRange() 3', () => {
      MOMENT_HELPERS.isOutsideRange = jest.fn(() => () => true);

      expect(
        instance.isInSelectedRange({ startDate: moment, endDate: moment }),
      ).not.toBe(true);
    });
  });

  describe('renderDay()', () => {
    it('should return isOutsideRange', () => {
      instance.isInSelectedRange = jest.fn(() => false);

      TEST_HELPERS.expectDefined(
        instance.renderDay({ startDate: moment, endDate: moment }),
        [1, 1, { isOutsideRange: true }],
      );
    });

    it('should return !isOutsideRange', () => {
      instance.isInSelectedRange = jest.fn(() => true);

      TEST_HELPERS.expectDefined(instance.renderDay(), [
        1,
        1,
        { isOutsideRange: false },
      ]);
    });
  });

  describe('renderSubtitle()', () => {
    it('should return null range', () => {
      rendered.setProps({ range: true });
      rendered.setState({ startDate: null });

      TEST_HELPERS.expectDefined(instance.renderSubtitle);
    });

    it('should renderSubtitle range', () => {
      rendered.setProps({ range: true });
      rendered.setState({ startDate: moment, endDate: null });

      TEST_HELPERS.expectDefined(instance.renderSubtitle);
    });

    it('should renderSubtitle range', () => {
      rendered.setProps({ range: true });
      rendered.setState({ startDate: moment, endDate: moment });

      TEST_HELPERS.expectDefined(instance.renderSubtitle);
    });

    it('should renderSubtitle !range !startDate', () => {
      rendered.setProps({ range: false });
      rendered.setState({ startDate: null });

      TEST_HELPERS.expectDefined(instance.renderSubtitle);
    });

    it('should renderSubtitle !range startDate', () => {
      rendered.setProps({ range: false });
      rendered.setState({ startDate: moment });

      TEST_HELPERS.expectDefined(instance.renderSubtitle);
    });
  });

  describe('render()', () => {
    it('should render', () => {
      instance.renderDay = jest.fn(() => 'renderDay');
      instance.renderSubtitle = jest.fn(() => 'renderSubtitle');

      TEST_HELPERS.expectDefined(instance.render);
    });
  });
});
