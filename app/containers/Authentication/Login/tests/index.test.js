/**
 * Created by quando on 1/7/17.
 */
import { shallow } from 'enzyme';
import { USER_API, RESEND_SIGNUP, ME } from 'apis/constants';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { LoginPage, mapDispatchToProps } from '../index';
import {
  USER_NOT_CONFIRMED,
  USER_NOT_CONFIRMED_ERROR,
  USER_NOT_EXISTS,
  USER_NOT_EXISTS_ERROR,
} from '../defines/serverErrors';
import Wrapper from '../wrapper';
import { INVALID_BUTTON } from '../defines/submitButtons';

describe('LoginPage/tests/index.test.js', () => {
  const children = <span>Title</span>;
  const resaga = {
    analyse: jest.fn(),
    dispatch: jest.fn(),
    dispatchTo: jest.fn(),
    setValue: jest.fn(),
    getValue: jest.fn(),
    isLoading: jest.fn(),
  };
  const classes = {};
  const history = {
    push: jest.fn(),
  };
  const onUserLogin = jest.fn();
  const config = jest.fn();
  let rendered;
  let instance;
  const props = {
    classes,
    resaga,
    history,
    onUserLogin,
    config,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    // override setTimeout to call immediately
    global.setTimeout = jest.fn(cb => cb());
    global.clearTimeout = jest.fn();

    rendered = shallow(<LoginPage {...props}>{children}</LoginPage>);
    instance = rendered.instance();
    jest.useFakeTimers();
  });

  describe('Smoke tests', () => {
    it('should exists', () => {
      expect(LoginPage).toBeDefined();
    });

    it('should render without exploding', () => {
      expect(rendered.length).toBe(1);
    });

    it('should have config default props of false', () => {
      rendered.setProps({
        config: undefined,
      });
      expect(instance.props.config()).toBe(false);
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
    beforeEach(() => {
      rendered.setProps({ config });
    });

    it('should set state', () => {
      instance.componentDidMount();
      expect(config).toBeCalled();
      expect(global.setTimeout).toBeCalled();
      expect(rendered.state().form).toBe(true);
    });
    it('size = state.size', () => {
      instance.setState({ size: 5 });
      instance.componentDidMount();
      expect(config).toBeCalled();
      expect(global.setTimeout).toBeCalled();
      expect(rendered.state().form).toBe(true);
    });
  });

  describe('renderErrorMessage', () => {
    it('should render properly if error message is USER_NOT_CONFIRMED_ERROR', () => {
      const snapshot = shallow(
        <div>{instance.renderErrorMessage(USER_NOT_CONFIRMED_ERROR)}</div>,
      );
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render properly if error message is different', () => {
      const snapshot = shallow(
        <div>{instance.renderErrorMessage('errorMsg')}</div>,
      );
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('componentWillUnmount()', () => {
    it('should call clearTimeout', () => {
      instance.componentWillUnmount();
      expect(global.clearTimeout.mock.calls.length).toBe(4);
    });
  });

  describe('verifySuccess()', () => {
    it('should call history.push if !registered', () => {
      instance.verifySuccess({ registered: false }, { tokenId: 123123 });

      expect(history.push).toBeCalledWith(`/registration/${123123}`);
    });

    it('should focus on password if registered', () => {
      instance.passwordInput = { focus: jest.fn() };

      instance.verifySuccess({ registered: true }, { tokenId: 123123 });

      expect(instance.passwordInput.focus).toBeCalledWith();
    });
  });

  describe('verifyFail()', () => {
    it('should go back to notification page if failed to verify', () => {
      instance.verifyFail({ registered: false }, { tokenId: 123123 });

      expect(history.push).toBeCalledWith(`/notification/${123123}`);
    });
  });

  describe('loginSuccess()', () => {
    it('should call browserHistory.push', () => {
      instance.fetchMe = jest.fn();
      instance.loginSuccess();
      expect(instance.fetchMe).toBeCalled();
    });
  });

  describe('loginError()', () => {
    it('should empty password', () => {
      const error = 'something wrong';
      instance.password = { setValue: jest.fn() };
      instance.loginError({ error, msg: error });
      expect(instance.password.setValue).toBeCalled();
      expect(rendered.state().errors).toBe(true);
      expect(rendered.state().errorMsg).toBe(error);
    });
  });

  describe('handleSubmit()', () => {
    it('should call resaga.dispatch', () => {
      instance.emailInput = { blur: jest.fn() };
      instance.passwordInput = { blur: jest.fn() };

      instance.handleSubmit({ username: 'abc', password: '123' });

      expect(resaga.dispatchTo).toBeCalled();
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });

    it('should use shareTo', () => {
      rendered.setProps({ shareTo: 'shareTo' });
      instance.passwordInput = { blur: jest.fn() };

      instance.handleSubmit({ password: '123' });

      expect(resaga.dispatchTo).toBeCalled();
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });

  describe('goToRegister()', () => {
    it('should call browserHistory', () => {
      const mockHistory = {
        push: jest.fn(),
      };
      rendered.setProps({
        history: mockHistory,
      });
      instance.goToRegister();
      jest.runAllTimers();
      expect(rendered.state().form).toBe(false);
      expect(mockHistory.push).toBeCalled();
    });
  });

  describe('goToForgetPassword()', () => {
    it('should call browserHistory', () => {
      const mockHistory = {
        push: jest.fn(),
      };
      rendered.setProps({
        history: mockHistory,
      });
      instance.goToForgetPassword();
      jest.runAllTimers();
      expect(rendered.state().form).toBe(false);
      expect(mockHistory.push).toBeCalled();
    });
    it('should set email query', () => {
      const email = 'hiiii';
      rendered.setState({ email });
      instance = rendered.instance();

      const mockHistory = {
        push: jest.fn(),
      };
      rendered.setProps({
        history: mockHistory,
      });
      instance.goToForgetPassword();
      jest.runAllTimers();

      expect(rendered.state().form).toBe(false);
      expect(mockHistory.push).toBeCalled();
    });
  });

  describe('handleRedirectTo()', () => {
    it('should call history push and set switchToken to null', () => {
      rendered.setProps({ switchToken: 'token' });
      instance.handleRedirectTo();
      expect(resaga.setValue).toBeCalledWith({
        switchToken: null,
        decline: null,
      });
      expect(history.push).toBeCalledWith('/notification/token');
    });
  });

  describe('handleEmailChange()', () => {
    it('should set ref', () => {
      const email = 'hiii';
      instance.handleEmailChange(email);
      expect(rendered.state().email).toBe(email);
    });
  });

  describe('handleEmailInputRef()', () => {
    it('should set ref', () => {
      const ref = 'hiii';
      instance.handleEmailInputRef(ref);
      expect(instance.emailInput).toBe(ref);
    });
  });

  describe('changeEmail()', () => {
    it('should changeEmail()', () => {
      instance.emailInput = { focus: jest.fn() };

      instance.changeEmail();

      TEST_HELPERS.expectCalled(instance.emailInput.focus);
    });
  });

  describe('clearEmail()', () => {
    it('should clearEmail()', () => {
      instance.changeEmail = jest.fn();
      instance.password = { setValue: jest.fn() };

      instance.clearEmail();

      TEST_HELPERS.expectCalled(instance.changeEmail);
      TEST_HELPERS.expectCalled(instance.password.setValue);
    });
  });

  describe('handlePasswordInputRef()', () => {
    it('should set ref', () => {
      const ref = 'hiii';
      instance.handlePasswordInputRef(ref);
      expect(instance.passwordInput).toBe(ref);
    });
  });

  describe('handlePasswordHOCRef()', () => {
    it('should set instance.password', () => {
      const ref = 'hi';
      instance.handlePasswordHOCRef(ref);
      expect(instance.password).toBe(ref);
    });
  });

  describe('enableButton()', () => {
    it('should empty error', () => {
      instance.enableButton();
      expect(rendered.state().errors).toBe(false);
    });
  });

  describe('toggleShowPassword()', () => {
    it('should empty error', () => {
      const event = { preventDefault: jest.fn() };
      instance.setState({ show: false });
      instance.toggleShowPassword(event);
      expect(event.preventDefault).toBeCalled();
      expect(rendered.state().show).toBe(true);
    });
  });

  describe('renderPasswordHelper()', () => {
    it('should render', () => {
      const value = { value: 'hiho' };
      const password = shallow(instance.renderPasswordHelper(value));
      expect(password.length).toBe(1);
    });
    it('show = true', () => {
      instance.setState({ show: true });
      const value = { value: 'hiho' };
      const password = shallow(instance.renderPasswordHelper(value));
      expect(password.length).toBe(1);
    });
  });

  describe('renderInvitationMessage()', () => {
    it('should return null if !isRegisterByInvitation', () => {
      rendered.setProps({ isRegisterByInvitation: false });

      expect(instance.renderInvitationMessage()).toBe(null);
    });

    it('should render if isRegisterByInvitation', () => {
      rendered.setProps({
        isRegisterByInvitation: true,
        shareTo: 'shareTo',
        senderName: 'senderName',
        senderEmail: 'senderEmail',
        nodeContent: 'nodeContent',
        roleName: 'roleName',
        organisationName: 'organisationName',
      });

      const snapshot = shallow(<div>{instance.renderInvitationMessage()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('fetchMe()', () => {
    it('should call dispatchTo', () => {
      instance.fetchMeSuccess = jest.fn();
      instance.fetchMe();
      resaga.dispatchTo(USER_API, ME, {
        payload: {},
        onSuccess: instance.fetchMeSuccess,
      });
    });
  });

  describe('fetchMeSuccess()', () => {
    it('should call dispatchTo', () => {
      instance.fetchMeSuccess({ givenName: 'abcd' });
      expect(onUserLogin).toBeCalled();
      expect(config).toBeCalled();
      jest.runAllTimers();
      expect(history.push).toBeCalled();
    });
  });

  describe('resendVerification', () => {
    it('shall call dispatchTo with right parameters', () => {
      instance.resendVerficationSuccess = jest.fn();
      instance.resendVerification();
      expect(resaga.dispatchTo).toBeCalledWith(USER_API, RESEND_SIGNUP, {
        payload: { username: undefined },
        onSuccess: instance.resendVerficationSuccess,
      });
    });
  });

  describe('resendVerificationSuccess', () => {
    it('set right state', () => {
      instance.resendVerficationSuccess();
      expect(instance.state.errors).toBe(false);
      expect(instance.state.errorMsg).toBe('');
    });
  });

  describe('renderForm()', () => {
    const value = { opacity: 0, translateX: 0 };

    it('should render', () => {
      rendered.setState({ email: 'some email' });

      const form = shallow(instance.renderForm(value));
      expect(form.length).toBe(1);
    });

    it('resaga.isLoading true', () => {
      rendered.setProps({ signInLoading: true });
      instance = rendered.instance();
      const form = shallow(instance.renderForm(value));
      expect(form.length).toBe(1);
    });

    it('show true', () => {
      instance.setState({ show: true });
      const form = shallow(instance.renderForm(value));
      expect(form.length).toBe(1);
    });

    it('errors true', () => {
      instance.setState({ errors: true });
      const form = shallow(instance.renderForm(value));
      expect(form.length).toBe(1);
    });
  });

  describe('render()', () => {
    it('should return error if error', () => {
      rendered.setState({ error: 'error' });
      expect(instance.render()).toBe('error');
    });
  });

  describe('errorAction', () => {
    it('should render resend button', () => {
      const data = instance.errorAction(USER_NOT_CONFIRMED_ERROR);
      expect(toJSON(data)).toMatchSnapshot();
    });
  });

  describe('mapDispatchToProps', () => {
    it('return correct data', () => {
      const dispatch = jest.fn();
      expect(mapDispatchToProps(dispatch)).toMatchSnapshot();
      mapDispatchToProps(dispatch).onUserLogin();
      expect(dispatch).toBeCalled();
    });
  });
  describe('invalidateForm', () => {
    it('should render resend button WITH USER NOT CONFIRMED ERROR', () => {
      instance.invalidateForm(USER_NOT_CONFIRMED);
      expect(instance.state.button).toBe(INVALID_BUTTON);
      expect(instance.state.button).toBe(INVALID_BUTTON);
      expect(instance.state.errorMsg).toBe(USER_NOT_CONFIRMED_ERROR);
    });
    it('should render resend button WITH USER_NOT_EXISTS ERROR', () => {
      instance.invalidateForm(USER_NOT_EXISTS);
      expect(instance.state.button).toBe(INVALID_BUTTON);
      expect(instance.state.button).toBe(INVALID_BUTTON);
      expect(instance.state.errorMsg).toBe(USER_NOT_EXISTS_ERROR);
    });
  });
});
