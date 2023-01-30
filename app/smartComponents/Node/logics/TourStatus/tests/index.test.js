import { ACTIVE, PAST } from 'appConstants';
import { shallow } from 'enzyme';
import React from 'react';
import MOMENT_HELPERS from 'utils/helpers/moment';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { TourStatus } from '../index';

describe('<TourStatus />', () => {
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

    rendered = shallow(<TourStatus {...props}>{children}</TourStatus>);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(TourStatus).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentWillReceiveProps()', () => {
    it('should call instance.getTreeAndTimes', () => {
      rendered.setProps({ id: null });
      instance.getTreeAndTimes = jest.fn(() => 'getTreeAndTimes');

      instance.componentWillReceiveProps({ id: 1122 });

      TEST_HELPERS.expectCalled(instance.getTreeAndTimes);
    });

    it('should call instance.updateStatus', () => {
      const startTime = '1899-12-30T23:59:59.999Z';
      const nextStartTime = '1899-12-31T23:59:59.999Z';

      rendered.setProps({ startTime });
      instance.updateStatus = jest.fn(() => 'updateStatus');

      instance.componentWillReceiveProps({ startTime: nextStartTime });

      TEST_HELPERS.expectCalledAndMatchSnapshot(instance.updateStatus, {
        startTime: nextStartTime,
      });
    });

    it('should call instance.updateStatus #2', () => {
      const startTime = '1899-12-30T23:59:59.999Z';

      rendered.setProps({ startTime, children: [1] });
      instance.updateStatus = jest.fn(() => 'updateStatus');

      instance.componentWillReceiveProps({ startTime, children: [1, 2] });

      TEST_HELPERS.expectCalledAndMatchSnapshot(instance.updateStatus, {
        startTime,
        children: [1, 2],
      });
    });
  });

  describe('componentWillUnmount()', () => {
    it('should call global.clearInterval', () => {
      global.clearInterval = jest.fn();

      instance.componentWillUnmount();

      TEST_HELPERS.expectCalledAndMatchSnapshot(global.clearInterval);
    });
  });

  describe('updateTimeHandler()', () => {
    it('should updateTimeHandler()', () => {
      instance.updateStatus = jest.fn(() => '');

      instance.updateTimeHandler();

      TEST_HELPERS.expectCalledAndMatchSnapshot(
        instance.updateStatus,
        instance.props,
      );
    });
  });

  describe('status()', () => {
    it('should return MOMENT_HELPERS.tourStatus', () => {
      const startTime = '1899-12-30T23:59:59.999Z';
      MOMENT_HELPERS.tourStatus = jest.fn(() => 'MOMENT_HELPERS.tourStatus');

      expect(instance.status({ startTime, children: [1, 2] })).toBe(
        'MOMENT_HELPERS.tourStatus',
      );

      expect(MOMENT_HELPERS.tourStatus).toBeCalled();
    });
  });

  describe('updateStatus()', () => {
    it('should not updateStatus', () => {
      instance.status = jest.fn(() => ACTIVE);
      rendered.setProps({ status: ACTIVE, layout: 'list' });

      expect(instance.updateStatus()).toBe(null);
    });

    it('should updateStatus()', () => {
      instance.status = jest.fn(() => ACTIVE);
      rendered.setProps({ status: PAST, layout: 'list' });

      instance.updateStatus();

      TEST_HELPERS.expectCalled(resaga.setValue);
    });

    it('should update layout', () => {
      instance.status = jest.fn(() => ACTIVE);
      rendered.setProps({ layout: '' });

      instance.updateStatus({ layoutRecheck: 1123 });

      expect(resaga.setValue).toBeCalled();
    });
  });

  describe('render()', () => {
    it('should return null', () => {
      expect(instance.render()).toBe(null);
    });
  });
});
