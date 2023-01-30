import { shallow } from 'enzyme';
import React from 'react';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import MOMENT_HELPERS from 'utils/helpers/moment';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { CountDown } from '../index';

describe('<CountDown />', () => {
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

    rendered = shallow(<CountDown {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(CountDown).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentWillUnmount()', () => {
    it('should setInterval', () => {
      global.clearInterval = jest.fn();

      instance.componentWillUnmount();

      expect(global.clearInterval).toBeCalledWith(instance.updateTime);
    });
  });

  describe('updateTimeHandler()', () => {
    it('should updateTimeHandler()', () => {
      instance.forceUpdate = jest.fn(() => '');

      instance.updateTimeHandler();

      TEST_HELPERS.expectCalledAndMatchSnapshot(instance.forceUpdate);
    });
  });

  describe('timeToGo()', () => {
    it('should timeToGo()', () => {
      rendered.setProps({ startTime: 'starttt' });
      MOMENT_HELPERS.timeToGo = jest.fn(() => 'MOMENT_HELPERS.timeToGo');

      expect(instance.timeToGo()).toBe('MOMENT_HELPERS.timeToGo');

      TEST_HELPERS.expectCalledAndMatchSnapshot(
        MOMENT_HELPERS.timeToGo,
        'starttt',
      );
    });
  });

  describe('renderDefault()', () => {
    it('should renderDefault()', () => {
      const children = jest.fn(() => 'children');
      rendered.setProps({ children });

      instance.renderDefault();
    });
  });

  describe('render()', () => {
    it('should render', () => {
      LOGIC_HELPERS.switchCase = jest.fn(() => 'LOGIC_HELPERS.switchCase');

      expect(instance.render()).toBe('LOGIC_HELPERS.switchCase');
    });
  });
});
