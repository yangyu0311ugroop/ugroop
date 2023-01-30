/**
 * Created by quando on 21/2/17.
 */

import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { RegisterSucceed } from '../registerSucceed';

describe('<RegisterSucceed />', () => {
  const config = jest.fn();

  let rendered;
  let instance;

  beforeEach(() => {
    // override setTimeout to call immediately
    global.setTimeout = jest.fn(cb => cb());
    global.clearTimeout = jest.fn();

    rendered = shallow(<RegisterSucceed classes={{}} config={config} />);
    instance = rendered.instance();
  });
  afterEach(() => jest.clearAllMocks());

  describe('<RegisterSucceed />', () => {
    it('should exists', () => {
      expect(RegisterSucceed);
    });
    it('should render without exploding', () => {
      expect(rendered.length).toBe(1);
    });
  });

  describe('<RegisterSucceed /> componentDidMount()  ', () => {
    it('should be called correctly', () => {
      instance.componentDidMount();
      expect(rendered.state().form).toBe(true);
      expect(config).toBeCalled();
    });
  });

  describe('componentWillUnmount()', () => {
    it('should call clearTimeout', () => {
      instance.componentWillUnmount();
      expect(global.clearTimeout.mock.calls.length).toBe(1);
    });
  });

  describe('<RegisterSucceed /> makeEmail()  ', () => {
    const email = 'Quan@qq.com';
    it('should be called correctly', () => {
      const form = rendered.instance();
      expect(form.makeEmail('')).toEqual('');
      expect(form.makeEmail(email)).toBeTruthy();
    });
  });

  describe('<RegisterSucceed /> makeOrgName()  ', () => {
    const orgName = 'My Org';
    it('should be called correctly', () => {
      const form = rendered.instance();
      expect(form.makeOrgName('')).toEqual('');
      expect(form.makeOrgName(orgName)).toBeTruthy();
    });
  });

  describe('renderRegisterByInvitationSuccess()', () => {
    it('should renderRegisterByInvitationSuccess correctly', () => {
      rendered.setProps({ data: { user: { email: 'that@guy' } } });

      const snapshot = shallow(
        <div>{instance.renderRegisterByInvitationSuccess()}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderPersonalRegisterMessage', () => {
    it('should renderPersonalRegisterMessage correctly', () => {
      const snapshot = shallow(
        <div>{instance.renderPersonalRegisterMessage()}</div>,
      );
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderPage()', () => {
    const value = { opacity: 0, translateX: 0 };

    it('should render', () => {
      const form = shallow(instance.renderPage(value));
      expect(form.length).toBe(1);
    });

    it('should render isRegisterByInvitation', () => {
      rendered.setProps({ data: { isRegisterByInvitation: true } });
      instance.renderRegisterByInvitationSuccess = jest.fn(
        () => 'renderRegisterByInvitationSuccess',
      );

      expect(instance.renderPage(value)).toBe(
        'renderRegisterByInvitationSuccess',
      );
    });
    it('should render message for personal registration', () => {
      rendered.setProps({ data: { personal: true } });
      instance.renderPersonalRegisterMessage = jest.fn(
        () => 'renderPersonalRegisterMessage',
      );

      expect(instance.renderPage(value)).toBe('renderPersonalRegisterMessage');
    });
  });
});
