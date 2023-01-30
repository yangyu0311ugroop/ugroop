import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import Sticky from 'react-stickynode';
import { LOGIC_HELPERS } from 'utils/helpers/logic';

import { TabHeader } from '../index';

describe('<TabHeader />', () => {
  let rendered;
  let instance;

  const history = {
    push: jest.fn(),
  };

  const location = {
    pathname: 'http://sample',
  };

  const props = {
    classes: {},
    history,
    location,
    tabItems: [{ id: 1, label: 'tab 1' }, { id: 2, label: 'tab 2' }],
  };

  beforeEach(() => {
    LOGIC_HELPERS.ifFunction = jest.fn();
    rendered = shallow(<TabHeader {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(TabHeader).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentWillReceiveProps', () => {
    it('should set activeTab state to the update activeTab prop', () => {
      rendered.setProps({
        activeTab: 2,
      });
      expect(rendered.state().activeTab).toBe(2);
    });

    it('should not set activeTab state to the update activeTab prop when controlledActiveTab is true', () => {
      rendered.setProps({
        controlledActiveTab: true,
      });
      rendered.setProps({
        activeTab: 2,
      });
      expect(rendered.state().activeTab).toBe(0);
    });
  });

  describe('handleTabChange', () => {
    it('set state of activeTab and call ifFunction', () => {
      instance.handleTabChange(null, 1);
      expect(rendered.state().activeTab).toBe(1);
      expect(LOGIC_HELPERS.ifFunction.mock.calls).toMatchSnapshot();
    });

    it('should not set state of activeTab and call ifFunction', () => {
      rendered.setProps({
        controlledActiveTab: true,
      });
      instance.handleTabChange(null, 1);
      expect(rendered.state().activeTab).toBe(0);
      expect(LOGIC_HELPERS.ifFunction.mock.calls).toMatchSnapshot();
    });
  });

  describe('handleStateChange', () => {
    it('should change sticky status if status of sticky is fixed', () => {
      instance.handleStateChange({ status: Sticky.STATUS_FIXED });
      expect(rendered.state().sticky).toBe(true);
    });
    it('should change sticky status to false if status is not fixed', () => {
      instance.handleStateChange({ status: null });
      expect(rendered.state().sticky).toBe(false);
    });
    it('should not change sticky state if status is not object', () => {
      rendered.setState({
        sticky: true,
      });
      instance.handleStateChange();
      expect(rendered.state().sticky).toBe(true);
    });
  });

  describe('render', () => {
    it('should render something', () => {
      expect(toJSON(rendered)).toMatchSnapshot();
    });

    it('should render children passed to it', () => {
      rendered.setProps({
        children: <p>Sample</p>,
      });
      expect(toJSON(rendered)).toMatchSnapshot();
    });

    it('should pass the props active tab rather than state if controlledActiveTab is true', () => {
      rendered.setProps({
        controlledActiveTab: true,
      });
      rendered.setState({
        activeTab: 5,
      });
      rendered.setProps({
        children: <p>Sample</p>,
      });
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });
});
