/**
 * Created by quando on 1/7/17.
 */
import {
  CREATE_ORG_USER,
  USER_API,
  CREATE_USER_VIA_INVITE,
  CREATE_PERSONAL_REGISTRATION,
} from 'apis/constants';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { HTTP_STATUS_CODE } from 'utils/http-constant';
import { TOUR_INTERESTED } from 'utils/modelConstants';
import { TOUR_ROLES } from 'datastore/invitationStore/constants';
import {
  EMAIL_EXISTS,
  EMAIL_INVALID,
  ORG_NAME_EXISTS,
  INVITATION_TOKEN_NOT_FOUND,
  PERSON_SERVICE_ERROR,
} from '../defines/serverErrors';
import {
  INVALID_BUTTON,
  REQUIRED_BUTTON,
  VALID_BUTTON,
} from '../defines/submitButton';
import { RegisterForm } from '../registerForm';
import style from '../style';
import Wrapper from '../wrapper';
import { REGISTRATION_TYPE_DEFAULT } from '../../../../appConstants';

describe('RegisterForm/tests/index.test.js', () => {
  const children = <span>Title</span>;
  const resaga = {
    analyse: jest.fn(),
    dispatchTo: jest.fn(),
    setValue: jest.fn(),
    getValue: jest.fn(),
    isLoading: jest.fn(),
  };
  const config = jest.fn();
  const registerSuccess = jest.fn();
  const classes = {};

  let rendered;
  let instance;
  beforeEach(() => {
    // override setTimeout to call immediately
    global.setTimeout = jest.fn(cb => cb());
    global.clearTimeout = jest.fn();

    const history = {};
    const props = {
      classes,
      resaga,
      config,
      registerSuccess,
      history,
    };
    rendered = shallow(<RegisterForm {...props}>{children}</RegisterForm>);
    instance = rendered.instance();

    jest.clearAllMocks();
  });

  describe('Smoke tests', () => {
    it('should exists', () => {
      expect(RegisterForm).toBeDefined();
    });
    it('should render without exploding', () => {
      expect(rendered.length).toBe(1);
    });
    it('style', () => {
      expect(style).toBeDefined();
      expect(typeof style({ typography: { fontWeightLight: 'hi' } })).toBe(
        'object',
      );
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
      expect(config.mock.calls.length).toBe(2);
      expect(global.setTimeout.mock.calls.length).toBe(2);
      expect(rendered.state().form).toBe(true);
    });
    it('should set state if inviteToOrganisation us true', () => {
      rendered.setProps({
        inviteToOrganisation: true,
        isRegisterByOrgInvitation: true,
      });
      instance.componentDidMount();
      expect(config.mock.calls.length).toBe(2);
      expect(global.setTimeout.mock.calls.length).toBe(2);
      expect(rendered.state().form).toBe(true);
    });
  });

  describe('componentWillUnmount()', () => {
    it('should call clearTimeout', () => {
      instance.componentWillUnmount();
      expect(global.clearTimeout.mock.calls.length).toBe(3);
    });
  });

  describe('registerSuccess()', () => {
    it('should call props.registerSuccess', () => {
      instance.registerSuccess(null, {
        password: 'do not give me away',
        email: 'that@guy',
      });

      expect(registerSuccess).toBeCalledWith({
        isRegisterByInvitation: false,
        email: 'that@guy',
      });
    });
  });

  describe('handleLocationChange', () => {
    it('should setState if key is countryShort', () => {
      instance.handleLocationChange('countryShort')('PH');
      expect(rendered.state().countryShort).toBe('PH');
    });
    it('should setState if key is countryLong', () => {
      instance.handleLocationChange('countryLong')('Philippines');
      expect(rendered.state().countryLong).toBe('Philippines');
    });
    it('should setState if key is neither countryLong nor countryShort', () => {
      instance.handleLocationChange('key')('value');
      expect(rendered.state().countryShort).toBe('');
      expect(rendered.state().countryLong).toBe('');
    });
  });
  describe('handleOrgOptionChange', () => {
    it('should setState resitrationType', () => {
      instance.handleOrgOptionChange('organisation');
      expect(rendered.state().registrationType).toBe('organisation');
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

  describe('invalidateButton()', () => {
    it('should empty error', () => {
      instance.invalidateButton();
      expect(rendered.state().button).toBe(INVALID_BUTTON);
    });
  });

  describe('handleClickSubmit()', () => {
    it('should empty error', () => {
      instance.registerForm = { submit: jest.fn() };
      instance.handleClickSubmit();
      expect(instance.registerForm.submit).toBeCalled();
    });
  });

  describe('invalidateForm()', () => {
    it('EMAIL_EXISTS', () => {
      const errors = EMAIL_EXISTS;
      instance.registerForm = { updateInputsWithError: jest.fn() };
      instance.invalidateForm(errors);
      expect(instance.registerForm.updateInputsWithError).toBeCalled();
    });
    it('EMAIL_INVALID', () => {
      const errors = EMAIL_INVALID;
      instance.registerForm = { updateInputsWithError: jest.fn() };
      instance.invalidateForm(errors);
      expect(instance.registerForm.updateInputsWithError).toBeCalled();
    });
    it('ORG_NAME_EXISTS', () => {
      const errors = ORG_NAME_EXISTS;
      instance.registerForm = { updateInputsWithError: jest.fn() };
      instance.invalidateForm(errors);
      expect(instance.registerForm.updateInputsWithError).toBeCalled();
    });
    it('Person ID exists else', () => {
      const errors = PERSON_SERVICE_ERROR;
      instance.registerForm = { updateInputsWithError: jest.fn() };
      instance.invalidateForm(errors);
      expect(instance.registerForm.updateInputsWithError).toBeCalled();
    });
    it('something else', () => {
      const errors = 'something else';
      instance.registerForm = { updateInputsWithError: jest.fn() };
      instance.invalidateForm(errors);
      expect(instance.registerForm.updateInputsWithError).toBeCalled();
    });
  });

  describe('handleSubmit()', () => {
    it('should call registerViaInvite', () => {
      rendered.setProps({ isRegisterByOrgInvitation: true, token: 'abc' });
      instance.registerViaInvite = jest.fn();

      instance.handleSubmit({ data: 'abcd' });

      expect(instance.registerViaInvite).toBeCalledWith({ data: 'abcd' });
    });
    it('should call User register', () => {
      rendered.setState({ registrationType: REGISTRATION_TYPE_DEFAULT });
      rendered.setProps({ isRegisterByOrgInvitation: false, token: 'abc' });
      instance.userRegister = jest.fn();
      instance.handleSubmit({ email: 'abcd', firstname: 'a' });
      const payload = {
        firstname: 'a',
        email: 'abcd',
      };
      expect(instance.userRegister).toBeCalledWith(payload);
    });
    it('should call registerPersonal', () => {
      rendered.setState({
        registrationType: 'personal',
      });
      rendered.setProps({ isRegisterByOrgInvitation: false, token: 'abc' });
      instance.registerPersonal = jest.fn();

      instance.handleSubmit({ data: 'abcd' });

      expect(instance.registerPersonal).toBeCalledWith({ data: 'abcd' });
    });
    it('should call User register with shareTo data ', () => {
      rendered.setState({ registrationType: REGISTRATION_TYPE_DEFAULT });
      rendered.setProps({
        inviteToOrganisation: false,
        token: 'abc',
        shareTo: 'aaa',
      });
      instance.userRegister = jest.fn();
      instance.handleSubmit({ firstname: 'a' });
      const payload = {
        firstname: 'a',
        email: 'aaa',
      };
      expect(instance.userRegister).toBeCalledWith(payload);
    });
    it('should call userRegister and dispatchTo if there is a countryLong and countryShort', () => {
      rendered.setState({
        countryLong: 'Philippines',
        countryShort: 'PH',
      });
      const payload = {
        firstname: 'a',
        email: 'abcd',
      };
      instance.handleSubmit(payload);
      expect(resaga.dispatchTo).toBeCalled();
    });
  });

  describe('onSubmit()', () => {
    it('should call User register', () => {
      rendered.setState({ registrationType: REGISTRATION_TYPE_DEFAULT });
      instance.onSubmit();
      expect(rendered.state().optionError).toEqual(false);
    });
  });

  describe('registerError()', () => {
    it('should display You have already registered. ', () => {
      instance.isRegisterByInvitation = jest.fn(() => true);
      instance.invalidateForm = jest.fn();
      instance.registerError({
        error: {
          message: EMAIL_EXISTS,
          status: HTTP_STATUS_CODE.STATUS_SERVER_ERROR,
        },
        msg: EMAIL_EXISTS,
      });
      expect(instance.state.existError).toBe('You have already registered.');
      expect(instance.invalidateForm).not.toBeCalled();
    });
    it('should call INVITATION_TOKEN_NOT_FOUND', () => {
      instance.isRegisterByInvitation = jest.fn(() => false);
      instance.invalidateForm = jest.fn();
      instance.registerError({
        error: {
          status: HTTP_STATUS_CODE.STATUS_RESOURCE_NOT_FOUND,
        },
        msg: INVITATION_TOKEN_NOT_FOUND,
      });
      expect(instance.state.existError).toBe(INVITATION_TOKEN_NOT_FOUND);
      expect(instance.invalidateForm).toBeCalled();
    });
    it('calls invalidateForm for non-404', () => {
      instance.isRegisterByInvitation = jest.fn(() => false);
      instance.invalidateForm = jest.fn();
      instance.registerError({
        error: {
          status: HTTP_STATUS_CODE.STATUS_UNAUTHORIZED,
        },
      });
      expect(instance.invalidateForm).toBeCalled();
    });
  });

  describe('registerViaInvite()', () => {
    it('should call registerViaInvite', () => {
      rendered.setProps({ shareTo: 'a@a.com', token: 'abcd' });
      instance = rendered.instance();
      instance.registerSuccess = jest.fn();
      instance.registerError = jest.fn();
      const data = {
        user: {
          email: 'a@a.com',
          firstName: 'a',
          lastName: 'b',
          password: 'c',
        },
        org: { orgInvitationToken: 'abcd' },
      };
      instance.registerViaInvite({
        firstName: 'a',
        lastName: 'b',
        password: 'c',
      });
      expect(resaga.dispatchTo).toBeCalledWith(
        USER_API,
        CREATE_USER_VIA_INVITE,
        {
          payload: data,
          onSuccess: instance.registerSuccess,
          onError: instance.registerError,
        },
      );
    });
  });
  describe('registerPersonal()', () => {
    it('should call registerPersonal', () => {
      rendered.setProps({ shareTo: 'a@a.com', token: 'abcd' });
      instance = rendered.instance();
      instance.registerSuccess = jest.fn();
      instance.registerError = jest.fn();
      const data = {
        email: 'a@a.com',
        givenName: 'a',
        surname: 'b',
        password: 'c',
        personal: true,
        tourInvitationToken: 'abcd',
      };
      instance.registerPersonal({
        email: 'a@a.com',
        firstName: 'a',
        lastName: 'b',
        password: 'c',
        personal: true,
      });
      expect(resaga.dispatchTo).toBeCalledWith(
        USER_API,
        CREATE_PERSONAL_REGISTRATION,
        {
          payload: data,
          onSuccess: instance.registerSuccess,
          onError: instance.registerError,
        },
      );
    });
    it('dispatchTo should still be called if email from form is null', () => {
      rendered.setProps({ shareTo: 'a@a.com', token: 'abcd' });
      instance = rendered.instance();
      instance.registerSuccess = jest.fn();
      instance.registerError = jest.fn();
      const data = {
        email: 'a@a.com',
        givenName: 'a',
        surname: 'b',
        password: 'c',
        personal: true,
        tourInvitationToken: 'abcd',
      };
      instance.registerPersonal({
        firstName: 'a',
        lastName: 'b',
        password: 'c',
        personal: true,
        tourInvitationToken: 'abcd',
      });
      expect(resaga.dispatchTo).toBeCalledWith(
        USER_API,
        CREATE_PERSONAL_REGISTRATION,
        {
          payload: data,
          onSuccess: instance.registerSuccess,
          onError: instance.registerError,
        },
      );
    });
  });

  describe('userRegister()', () => {
    it('should call userRegister', () => {
      instance = rendered.instance();
      instance.registerSuccess = jest.fn();
      instance.registerError = jest.fn();
      const data = {
        user: {
          email: 'a@a.com',
          firstName: 'a',
          lastName: 'b',
          password: 'c',
        },
        org: { orgInvitationToken: 'abcd' },
      };
      instance.userRegister(data);
      expect(resaga.dispatchTo).toBeCalledWith(USER_API, CREATE_ORG_USER, {
        payload: data,
        onSuccess: instance.registerSuccess,
        onError: instance.registerError,
      });
    });
    it('should call userRegister', () => {
      const country = { countryLong: true, countryShort: true };
      instance.setState(country);
      instance = rendered.instance();
      instance.registerSuccess = jest.fn();
      instance.registerError = jest.fn();
      const data = {
        ...country,
        user: {
          email: 'a@a.com',
          firstName: 'a',
          lastName: 'b',
          password: 'c',
        },
        org: { orgInvitationToken: 'abcd' },
      };
      instance.userRegister(data);
      expect(resaga.dispatchTo).toBeCalledWith(USER_API, CREATE_ORG_USER, {
        payload: { ...data },
        onSuccess: instance.registerSuccess,
        onError: instance.registerError,
      });
    });
  });

  describe('handleShowPassword()', () => {
    it('should toggle show password', () => {
      instance.setState({ showPassword: false });
      instance.handleShowPassword();
      expect(rendered.state().showPassword).toBe(true);
    });
    it('should toggle show password', () => {
      instance.setState({ showPassword: true });
      instance.handleShowPassword();
      expect(rendered.state().showPassword).toBe(false);
    });
  });

  describe('handlePassword()', () => {
    it('should toggle show password', () => {
      instance.handlePassword('hiii');
      expect(rendered.state().hasPassword).toBe(true);
    });
    it('should toggle show password', () => {
      instance.handlePassword();
      expect(rendered.state().hasPassword).toBe(false);
    });
  });

  describe('loginPath()', () => {
    it('should include email', () => {
      rendered.setProps({ shareTo: 'that+1@guy' });

      expect(instance.loginPath()).toBe(
        `/login?email=${encodeURIComponent('that+1@guy')}`,
      );
    });
    it('should not include email', () => {
      rendered.setProps({ shareTo: null });

      expect(instance.loginPath()).toBe('/login');
    });
  });

  describe('goToLogin()', () => {
    it('should call browserHistory', () => {
      const history = {
        push: jest.fn(),
      };
      rendered.setProps({
        history,
      });
      instance.goToLogin();
      expect(rendered.state().form).toBe(false);
      expect(history.push).toBeCalled();
      expect(config).toBeCalled();
    });
  });

  describe('handleCaptchaRef()', () => {
    it('should set instance.password', () => {
      const ref = 'hi';
      instance.handleCaptchaRef(ref);
      expect(instance.captcha).toBe(ref);
    });
  });

  describe('handleCaptchaChange()', () => {
    it('should set instance.password', () => {
      instance.handleClickSubmit = jest.fn();
      instance.handleCaptchaChange();
      expect(instance.handleClickSubmit).toBeCalled();
    });
  });

  describe('handleRegisterFormRef()', () => {
    it('should set instance.registerForm', () => {
      const ref = { form: 'hi' };
      instance.handleRegisterFormRef(ref);
      expect(instance.registerForm).toBe(ref.form);
    });

    it('should not set', () => {
      const ref = false;
      instance.handleRegisterFormRef(ref);
      expect(instance.registerForm).toBe(null);
    });
  });

  describe('renderJoinTour()', () => {
    it('should renderJoinTour correctly', () => {
      const snapshot = shallow(<div>{instance.renderJoinTour()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should renderJoinTour correctly if invitation is from tour transfer', () => {
      instance.isTransfer = jest.fn(() => true);
      const snapshot = shallow(<div>{instance.renderJoinTour()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should renderJoinTour correctly when roleName = tour_interested', () => {
      rendered.setProps({ roleName: TOUR_ROLES.tour_interested });
      const snapshot = shallow(<div>{instance.renderJoinTour()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderOrgOption()', () => {
    it('render empty string if props.role is not contributor', () => {
      rendered.setProps({ role: TOUR_INTERESTED });
      expect(instance.renderOrgOption()).toEqual('');
    });
  });

  describe('renderInformation()', () => {
    it('should return null', () => {
      instance.isRegisterByInvitation = jest.fn(() => false);

      expect(instance.renderInformation()).toBe(null);
    });

    it('should renderError', () => {
      instance.isRegisterByInvitation = jest.fn(() => true);
      rendered.setState({ existError: true });
      instance.renderError = jest.fn(() => 'renderError');

      expect(instance.renderInformation()).toBe('renderError');
    });

    it('should renderJoinTour', () => {
      rendered.setProps({
        isRegisterByTourInvitation: true,
        isRegisterByOrgInvitation: false,
      });
      rendered.setState({ existError: false });
      instance.renderJoinTour = jest.fn(() => 'renderJoinTour');

      expect(instance.renderInformation()).toBe('renderJoinTour');
    });
  });

  describe('renderShowPassword', () => {
    it('should show component eye icon if value exist', () => {
      rendered.setState({
        showPassword: true,
        optionError: true,
      });
      const render = shallow(
        <div>{instance.renderShowPassword({ value: 'Shoooooooow' })}</div>,
      );
      expect(toJSON(render)).toMatchSnapshot();
    });
    it('should renderJoinOrg', () => {
      rendered.setProps({
        isRegisterByTourInvitation: true,
        isRegisterByOrgInvitation: true,
      });
      rendered.setState({ existError: false });
      instance.renderJoinOrg = jest.fn(() => 'renderJoinOrg');

      expect(instance.renderInformation()).toBe('renderJoinOrg');
    });
    it('should not show component eye icon if value exist', () => {
      const render = shallow(<div>{instance.renderShowPassword({})}</div>);
      expect(toJSON(render)).toMatchSnapshot();
    });
    it('should show different icon if showPassword is false', () => {
      rendered.setState({
        showPassword: false,
      });
      const render = shallow(
        <div>{instance.renderShowPassword({ value: 'Shoooooooow' })}</div>,
      );
      expect(toJSON(render)).toMatchSnapshot();
    });
  });
});
