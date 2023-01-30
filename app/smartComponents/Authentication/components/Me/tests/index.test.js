/**
 * Created by stephenkarpinskyj on 25/10/18.
 */

import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { USER_API_HELPERS } from 'apis/components/User/helpers';
import { Me } from '..';

describe('<Me />', () => {
  let wrapper;
  let instance;
  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const makeProps = () => ({
    authenticated: false,
    resaga,
  });

  beforeEach(() => {
    wrapper = shallow(<Me {...makeProps()} />);
    instance = wrapper.instance();
  });

  it('exists', () => {
    expect(Me).toBeDefined();
  });

  describe('#componentDidMount()', () => {
    it('calls fetchMe if props.authenticated', () => {
      USER_API_HELPERS.fetchMe = jest.fn();
      wrapper.setProps({ authenticated: true });
      instance.componentDidMount();
      expect(USER_API_HELPERS.fetchMe).toBeCalled();
    });

    it('not calls fetchMe if !props.authenticated', () => {
      USER_API_HELPERS.fetchMe = jest.fn();
      instance.componentDidMount();
      expect(USER_API_HELPERS.fetchMe).not.toBeCalled();
    });
  });
  describe('#onSuccess()', () => {
    it('calls onSuccess if props.authenticated', () => {
      USER_API_HELPERS.fetchUserPreference = jest.fn();
      wrapper.setProps({ authenticated: true });
      instance.onSuccess();
      expect(USER_API_HELPERS.fetchUserPreference).toBeCalled();
    });
  });

  describe('#render()', () => {
    it('not explodes', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('still matches snapshot', () => {
      expect(toJSON(wrapper)).toMatchSnapshot();
    });
  });
});
