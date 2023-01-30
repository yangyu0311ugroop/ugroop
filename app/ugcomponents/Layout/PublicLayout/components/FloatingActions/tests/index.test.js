import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { FloatingActions } from '../index';

describe('<FloatingActions />', () => {
  let rendered;
  let instance;
  const push = jest.fn();
  const history1 = { location: { pathname: '/public/template/abcd' }, push };
  const history2 = { location: { pathname: '/public/template/2/abcd' }, push };

  beforeEach(() => {
    rendered = shallow(
      <FloatingActions
        classes={{}}
        history={history1}
        location={{ pathname: 'qqq' }}
      />,
    );
    instance = rendered.instance();
  });

  afterEach(() => jest.clearAllMocks());

  describe('Smoke tests', () => {
    it('should exist', () => {
      expect(FloatingActions).toBeDefined();
    });
    it('should render without exploding', () => {
      expect(rendered.length).toBe(1);
    });
    it('should render interactive layout', () => {
      expect(toJSON(rendered)).toMatchSnapshot();
    });
    it('should render print layout', () => {
      rendered.setState({ layout: 1 });
      expect(toJSON(rendered)).toMatchSnapshot();
    });
    it('should not render print layout', () => {
      rendered.setState({ layout: 1 });
      rendered.setProps({ hideChangeLayout: true });
      expect(toJSON(rendered)).toMatchSnapshot();
    });
    it('should render the floating actions if pathname is interested', () => {
      rendered.setProps({ location: { pathname: '/interested' } });
      expect(toJSON(rendered)).toMatchSnapshot();
    });
    it('should render the floating actions if pathname is print tour', () => {
      rendered.setProps({ location: { pathname: '/print/tour' } });
      expect(toJSON(rendered)).toMatchSnapshot();
    });
    it('should render open action', () => {
      rendered.setState({ open: true });
      expect(toJSON(rendered)).toMatchSnapshot();
    });
  });

  describe('instance', () => {
    it('handleRedirect to print', () => {
      instance.handleRedirect(1);
      expect(push).toBeCalledWith('/public/template/2/abcd');
    });
    it('handleRedirect to interactive', () => {
      rendered.setProps({ history: history2 });
      instance.handleRedirect(0);
      expect(push).toBeCalledWith('/public/template/abcd');
    });
    it('redirectToRYI in Interactive Layout', () => {
      instance.redirectToRYI();
      expect(push).toBeCalledWith('/public/template/abcd/interested');
    });
    it('redirectToRYI in Print Layout', () => {
      rendered.setState({ layout: 1 });
      rendered.setProps({ history: history2 });
      instance.redirectToRYI();
      expect(push).toBeCalledWith('/public/template/abcd/interested');
    });
    it('onChange', () => {
      jest.useFakeTimers();
      instance.handleRedirect = jest.fn();
      instance.onChange(0)();
      jest.runAllTimers();
      expect(instance.state.layout).toBe(0);
      expect(instance.handleRedirect).toBeCalledWith(0);
    });
    it('handleClick', () => {
      rendered.setState({ open: true });
      instance.handleClick();
      expect(instance.state.open).toBe(false);
    });
    it('handleBlur', () => {
      jest.useFakeTimers();
      instance.handleRedirect = jest.fn();
      instance.handleBlur();
      jest.runAllTimers();
      expect(instance.state.open).toBe(false);
    });
    it('componentWillMount', () => {
      rendered.setProps({ history: history2 });
      instance.componentWillMount();
      expect(instance.state.layout).toBe(1);
    });
    it('renderRYIButton', () => {
      rendered.setProps({ disableRYI: true });
      expect(instance.renderRYIButton()).toEqual(null);
    });
  });
});
