/**
 * Created by quando on 1/7/17.
 */
import { shallow } from 'enzyme';
import React from 'react';
import {
  SENDING_BUTTON,
  REQUIRED_BUTTON,
  VALID_BUTTON,
} from '../defines/submitButtons';
import { ForgetPasswordPage } from '../index';
import Wrapper from '../wrapper';
import { FORGET_PWD, USER_API } from '../../../../apis/constants';

describe('ForgetPasswordPage/tests/index.test.js', () => {
  const children = <span>Title</span>;
  const resaga = {
    analyse: jest.fn(),
    dispatch: jest.fn(),
    dispatchTo: jest.fn(),
    setValue: jest.fn(),
    getValue: jest.fn(),
    isLoading: jest.fn(),
  };
  const config = jest.fn();
  const classes = {};
  let history;

  let rendered;
  let instance;
  beforeEach(() => {
    // override setTimeout to call immediately
    global.setTimeout = jest.fn(cb => cb());
    global.clearTimeout = jest.fn();

    history = {
      push: jest.fn(),
    };
    const props = {
      classes,
      resaga,
      config,
      history,
    };
    rendered = shallow(
      <ForgetPasswordPage {...props}>{children}</ForgetPasswordPage>,
    );
    instance = rendered.instance();
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  describe('Smoke tests', () => {
    it('should exists', () => {
      expect(ForgetPasswordPage).toBeDefined();
    });
    it('should render without exploding', () => {
      expect(rendered.length).toBe(1);
    });
  });

  describe('Wrapper', () => {
    it('should exists', () => {
      expect(Wrapper).toBeDefined();
    });

    it('should render without exploding', () => {
      const wrapperRender = shallow(<Wrapper />);
      expect(wrapperRender.length).toBe(1);
    });
  });

  describe('componentWillMount()', () => {
    it('should setState email', () => {
      const location = { search: '?email=j4%40qq.com' };
      rendered.setProps({ location });
      instance = rendered.instance();

      instance.componentWillMount();
      expect(rendered.state().email).toBe('j4@qq.com');
    });
  });

  describe('componentDidMount()', () => {
    it('should set state', () => {
      instance.componentDidMount();
      expect(config.mock.calls.length).toBe(1);
      expect(global.setTimeout.mock.calls.length).toBe(1);
      expect(rendered.state().form).toBe(true);
    });
  });

  describe('componentWillUnmount()', () => {
    it('should call clearTimeout', () => {
      instance.componentWillUnmount();
      expect(global.clearTimeout.mock.calls.length).toBe(1);
    });
  });

  describe('sendResetCodeSuccess()', () => {
    it('should call resetSuccess', () => {
      instance.sendResetCodeSuccess();
      expect(rendered.state().hasSecurityCode).toBe(true);
    });
  });

  describe('sendResetCodeFail()', () => {
    it('should call invalidateForm', () => {
      instance.invalidateForm = jest.fn();
      instance.sendResetCodeFail({ error: 'error', msg: 'error msg' });
      expect(instance.invalidateForm).toHaveBeenCalledWith('error msg');
    });
  });

  describe('invalidateForm()', () => {
    it('should call invalidateForm', () => {
      instance.disableButton = jest.fn();
      instance.invalidateForm('error');
      expect(instance.disableButton).toBeCalled();
      expect(rendered.state().errors).toBeDefined();
    });
  });

  describe('enableButton()', () => {
    it('should empty error', () => {
      instance.enableButton();
      expect(rendered.state().button).toBe(VALID_BUTTON);
      expect(rendered.state().errors).toBe(false);
    });
  });

  describe('disableButton()', () => {
    it('should empty error', () => {
      instance.disableButton();
      expect(rendered.state().button).toBe(REQUIRED_BUTTON);
    });
  });

  describe('handleSubmit()', () => {
    it('should call resaga.dispatch', () => {
      const data = { email: 'hi ho' };
      const sendResetCodeSuccess = jest.fn();
      const sendResetCodeFail = jest.fn();
      instance.sendResetCodeSuccess = sendResetCodeSuccess;
      instance.sendResetCodeFail = sendResetCodeFail;
      instance.handleSubmit(data);
      expect(resaga.dispatchTo).toBeCalledWith(USER_API, FORGET_PWD, {
        payload: { username: data.email },
        onSuccess: sendResetCodeSuccess,
        onError: sendResetCodeFail,
      });
      expect(rendered.state().button).toBe(SENDING_BUTTON);
      expect(rendered.state().email).toBe(data.email);
    });
  });

  describe('handleEmailChange()', () => {
    it('should set ref', () => {
      const email = 'hiii';
      instance.handleEmailChange(email);
      expect(rendered.state().email).toBe(email);
    });
  });

  describe('goToLogin()', () => {
    it('should call browserHistory', () => {
      instance.goToLogin();
      jest.runAllTimers();
      expect(rendered.state().form).toBe(false);
      expect(history.push).toBeCalled();
    });
    it('should set email query', () => {
      const email = 'hiiii';
      rendered.setState({ email });
      instance = rendered.instance();
      instance.goToLogin();
      jest.runAllTimers();
      expect(rendered.state().form).toBe(false);
      expect(history.push).toBeCalled();
    });
  });

  describe('renderForm()', () => {
    const value = { opacity: 0, translateX: 0 };
    it('should render', () => {
      const form = shallow(instance.renderForm(value));
      expect(form.length).toBe(1);
    });
    it('isLoadingOrErrors true', () => {
      resaga.isLoading = jest.fn(() => true);
      rendered.setProps({ sendForgetPwdCodeLoading: true });
      instance = rendered.instance();
      const form = shallow(instance.renderForm(value));
      expect(form.length).toBe(1);
    });
  });
});
