import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { FirstDayStartTime } from '../index';

describe('<FirstDayStartTime />', () => {
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

  const children = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    rendered = shallow(
      <FirstDayStartTime {...props}>{children}</FirstDayStartTime>,
    );
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(FirstDayStartTime).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentWillMount()', () => {
    it('should componentWillMount()', () => {
      instance.updateFirstDayStartTime = jest.fn(() => '');

      instance.componentWillMount();

      TEST_HELPERS.expectCalledAndMatchSnapshot(
        instance.updateFirstDayStartTime,
        instance.props,
      );
    });
  });

  describe('componentWillReceiveProps()', () => {
    it('should call updateFirstDayStartTime', () => {
      instance.updateFirstDayStartTime = jest.fn();
      instance.timeChanged = jest.fn(() => true);

      instance.componentWillReceiveProps(2233);

      TEST_HELPERS.expectCalledAndMatchSnapshot(
        instance.updateFirstDayStartTime,
        2233,
      );
    });

    it('should NOT call updateFirstDayStartTime', () => {
      instance.updateFirstDayStartTime = jest.fn();
      instance.timeChanged = jest.fn(() => false);

      instance.componentWillReceiveProps(2233);

      expect(instance.updateFirstDayStartTime).not.toBeCalled();
    });
  });

  describe('timeChanged()', () => {
    const time = '1899-12-30T11:59:59.999Z';

    it('should return false', () => {
      expect(instance.timeChanged(false, false)).toBe(false);
    });

    it('should return false #2', () => {
      expect(instance.timeChanged(time, time)).toBe(false);
    });

    it('should return true #2', () => {
      expect(instance.timeChanged(time, null)).toBe(true);
    });

    it('should return true #3', () => {
      expect(instance.timeChanged(null, time)).toBe(time);
    });

    it('should return true #4', () => {
      const nextTime = '1899-12-30T12:59:59.999Z';
      expect(instance.timeChanged(time, nextTime)).toBe(true);
    });
  });

  describe('updateFirstDayStartTime()', () => {
    const startTime = '1899-12-30T11:59:59.999Z';
    const firstEventTime = '2899-12-30T11:59:59.999Z';

    it('should setValue null', () => {
      instance.updateFirstDayStartTime({});

      TEST_HELPERS.expectCalledAndMatchSnapshot(resaga.setValue);
    });

    it('should setValue firstEventTime', () => {
      instance.updateFirstDayStartTime({ startTime: 'start', firstEventTime });

      TEST_HELPERS.expectCalledAndMatchSnapshot(resaga.setValue);
    });

    it('should setValue startTime', () => {
      instance.updateFirstDayStartTime({ startTime, firstEventTime: null });

      TEST_HELPERS.expectCalledAndMatchSnapshot(resaga.setValue);
    });
  });

  describe('render()', () => {
    it('should return null', () => {
      expect(instance.render()).toBe(null);
    });
  });
});
