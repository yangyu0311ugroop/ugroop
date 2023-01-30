import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { LastUpdateAt } from '../index';

describe('<LastUpdateAt />', () => {
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
    rendered = shallow(<LastUpdateAt {...props} />);
    instance = rendered.instance();
  });
  it('to match with Snapshot', () => {
    expect(toJSON(instance.render())).toMatchSnapshot();
  });
  it('to match with Snapshot with time', () => {
    rendered = shallow(<LastUpdateAt {...props} lastUpdate="2001-01-01" />);
    instance = rendered.instance();
    expect(toJSON(instance.render())).toMatchSnapshot();
  });

  describe('componentWillUnmount()', () => {
    it('should setInterval', () => {
      global.clearInterval = jest.fn();

      instance.componentWillUnmount();

      expect(global.clearInterval).toBeCalledWith(instance.updateTime);
    });
  });

  describe('updateTimeHandler()', () => {
    it('should setInterval', () => {
      instance.forceUpdate = jest.fn();

      instance.updateTimeHandler();

      expect(instance.forceUpdate).toBeCalledWith();
    });
  });

  describe('renderProp()', () => {
    it('should return null', () => {
      expect(instance.renderProp()).toBe(null);
    });

    it('should renderDefault', () => {
      rendered.setProps({ lastUpdate: '2233' });
      instance.renderDefault = jest.fn(() => 'renderDefault');

      TEST_HELPERS.expectMatchSnapshot(instance.renderProp);
    });
  });

  describe('render()', () => {
    it('should render children', () => {
      const children = jest.fn(() => 'children');

      rendered.setProps({ children, lastUpdate: '232123' });

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
