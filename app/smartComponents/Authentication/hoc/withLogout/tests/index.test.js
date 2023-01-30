/**
 * Created by stephenkarpinskyj on 29/10/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { USER_API_HELPERS } from 'apis/components/User/helpers';
import composedWithLogout, { withLogout, mapDispatchToProps } from '../index';

describe('smartComponents/Authentication/withLogout', () => {
  let wrapper;
  let instance;

  const Component = () => <div />;
  const Hoc = withLogout(Component);

  const makeProps = () => ({
    logout: jest.fn(),
    authenticated: false,
    resaga: { dispatchTo: jest.fn() },
  });

  beforeEach(() => {
    wrapper = shallow(<Hoc {...makeProps()} />);
    instance = wrapper.instance();
    jest.clearAllMocks();
  });

  it('exists', () => {
    expect(withLogout).toBeDefined();
  });

  describe('#handleLogout()', () => {
    it('calls signOut if props.authenticated', () => {
      USER_API_HELPERS.signOut = jest.fn();
      wrapper.setProps({ authenticated: true });
      instance.handleLogout();
      expect(USER_API_HELPERS.signOut).toBeCalled();
    });

    it('not calls signOut if !props.authenticated', () => {
      USER_API_HELPERS.signOut = jest.fn();
      instance.handleLogout();
      expect(USER_API_HELPERS.signOut).not.toBeCalled();
    });
  });

  describe('#render()', () => {
    it('still matches snapshot', () => {
      expect(toJSON(wrapper)).toMatchSnapshot();
    });
  });

  describe('#mapDispatchToProps', () => {
    it('logout still matches snapshot', () => {
      const dispatch = jest.fn((...args) => args);
      expect(mapDispatchToProps(dispatch).logout()).toMatchSnapshot();
    });
  });

  describe('#composed', () => {
    it('is defined', () => {
      expect(composedWithLogout(Component)).toBeDefined();
    });
  });
});
