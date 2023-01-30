import { shallow } from 'enzyme';
import React from 'react';
import toJSON from 'enzyme-to-json';
import { SENDING_BUTTON, VALID_RESET_BUTTON } from '../defines/submitButtons';
import { ResetPasswordForm } from '../resetPasswordForm';

import { INVALID_CODE, INVALID_CODE_ERROR } from '../defines/serverErrors';

describe('<ResetPasswordForm />', () => {
  const config = jest.fn();
  const mockResize = jest.fn();
  const mockTitle = jest.fn();
  const registerSuccess = jest.fn();
  const resagaMock = {
    analyse: jest.fn(),
    dispatch: jest.fn(),
    dispatchTo: jest.fn(),
    setValue: jest.fn(),
    getValue: jest.fn(),
    isLoading: jest.fn(),
  };
  const resetForm = {
    form: {
      updateInputsWithError: jest.fn(),
    },
  };

  let rendered;
  let form;
  let history;
  beforeEach(() => {
    // override setTimeout to call immediately
    global.setTimeout = jest.fn(cb => cb());
    global.clearTimeout = jest.fn();
    history = {
      push: jest.fn(),
    };
    rendered = shallow(
      <ResetPasswordForm
        resizeLayout={mockResize}
        setTitle={mockTitle}
        resaga={resagaMock}
        config={config}
        classes={{}}
        history={history}
      />,
    );
    form = rendered.instance();
    // override setTimeout to call immediately
    global.setTimeout = jest.fn(cb => cb());
    global.clearTimeout = jest.fn();
    jest.useFakeTimers();
    jest.clearAllMocks();
  });
  afterEach(() => {
    mockResize.mockClear();
    mockTitle.mockClear();
    registerSuccess.mockClear();
  });

  it('should exists', () => {
    expect(ResetPasswordForm);
  });
  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('<ResetPasswordForm /> componentWillMount()  ', () => {
    it('should mount without a problem - empty props', () => {
      form.componentWillMount();
      expect(mockResize).toBeCalledWith(7);
      expect(mockTitle).toBeCalledWith(<span>Change Password</span>);
    });
  });

  describe('<ResetPasswordForm /> componentDidMount()  ', () => {
    it('should mount without a problem - empty props', () => {
      form.componentDidMount();
      expect(config).toBeCalledWith({
        size: 7,
        title: <span>Change Password</span>,
        tinting: false,
        sidebar: '',
      });
    });
  });

  describe('componentWillUnmount()', () => {
    it('should call clearTimeout', () => {
      form.componentWillUnmount();
      expect(global.clearTimeout.mock.calls.length).toBe(1);
    });
  });

  describe('<ResetPasswordForm /> functions', () => {
    it('resetSuccess', () => {
      form.resetSuccess();
      expect(form.state.isSuccess).toBe(true);
    });
    it('resetFail', () => {
      form.invalidateForm = jest.fn();
      form.resetFail({ msg: 'error' });
      expect(form.invalidateForm).toBeCalledWith('error');
    });
    it('invalidateButton', () => {
      form.invalidateButton('some error');
      expect(form.state.button).toBe('some error');
    });
    it('invalidateForm invalid token', () => {
      form.resetPwdForm = resetForm.form;
      form.invalidateForm(INVALID_CODE);
      expect(form.state.serverError).toBe(INVALID_CODE_ERROR);
    });
    it('invalidateForm no error', () => {
      form.resetPwdForm = resetForm;
      form.invalidateForm('');
      expect(form.state.serverError).toBe(undefined);
    });
    it('invalidateForm no error', () => {
      form.resetPwdForm = null;
      form.invalidateForm(INVALID_CODE);
      expect(form.state.serverError).toBe(INVALID_CODE_ERROR);
    });
    it('enableButton', () => {
      form.enableButton();
      expect(form.state.serverError).toBe('');
      expect(form.state.button).toBe(VALID_RESET_BUTTON);
    });
    it('handleSubmit', () => {
      const submitData = { data: 'submitdata' };
      form.handleSubmit(submitData);
      expect(form.state.button).toBe(SENDING_BUTTON);
    });
    it('handlePassword', () => {
      form.handlePassword('some password');
      expect(form.state.hasPassword).toBe(true);
      expect(form.state.serverError).toBe('');
      form.handlePassword();
      expect(form.state.hasPassword).toBe(false);
      expect(form.state.serverError).toBe('');
    });
    it('handleShowPassword', () => {
      form.setState({ showPassword: true });
      form.handleShowPassword();
      expect(form.state.showPassword).toBe(false);
      form.handleShowPassword();
      expect(form.state.showPassword).toBe(true);
    });
    it('handleResetPwdFormRef', () => {
      const ref = resetForm;
      form.handleResetPwdFormRef(ref);
      expect(form.resetPwdForm).toBe(ref.form);
    });
    it('handleResetPwdFormRef', () => {
      form.handleResetPwdFormRef(null);
      expect(form.resetPwdForm).toBe(null);
    });
  });

  describe('goToLogin()', () => {
    it('should call browserHistory', () => {
      form.goToLogin();
      jest.runAllTimers();
      expect(history.push).toBeCalled();
    });
    it('should set email query', () => {
      const email = 'some email';
      rendered.setProps({ email });
      form = rendered.instance();
      form.goToLogin();
      jest.runAllTimers();
      expect(history.push).toBeCalled();
    });
  });

  describe('<ResetPasswordForm /> render if Submit is success', () => {
    it('resizeLayout', () => {
      const mock = {
        analyse: jest.fn(),
        dispatch: jest.fn(),
        setValue: jest.fn(),
        getValue: jest.fn(() => true),
        isLoading: jest.fn(),
      };
      const emptyRender = shallow(
        <ResetPasswordForm classes={{}} resaga={mock} config={config} />,
      );
      expect(toJSON(emptyRender)).toMatchSnapshot();
    });
  });

  describe('<ResetPasswordForm /> default props', () => {
    it('resizeLayout', () => {
      const emptyRender = shallow(
        <ResetPasswordForm classes={{}} resaga={resagaMock} config={config} />,
      );
      expect(emptyRender.instance().props.resizeLayout).toBeDefined();
    });
    it('setTitle', () => {
      const emptyRender = shallow(
        <ResetPasswordForm classes={{}} resaga={resagaMock} config={config} />,
      );
      expect(emptyRender.instance().props.setTitle).toBeDefined();
    });
  });
});
