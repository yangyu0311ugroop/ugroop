import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import helper from 'ugcomponents/SnackBar/helpers';
import { ChangePasswordForm } from '../index';
import { CHANGE_PWD, USER_API } from '../../../../../apis/constants';
import {
  INCORRECT_PASSWORD,
  INCORRECT_USER_PASSWORD,
} from '../defines/serverErrors';

describe('<ChangePasswordForm />', () => {
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
    rendered = shallow(<ChangePasswordForm {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(ChangePasswordForm).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('handleClick', () => {
    it('should toggle the target state', () => {
      instance.handleClick('showNewPassword')();
      expect(rendered.state().showNewPassword).toBe(true);
    });
  });

  describe('handleValidSubmit', () => {
    it('should call correct data', () => {
      const mocked = jest.fn();
      const changePwdSuccess = () => mocked;
      const changePwdFailed = mocked;
      instance.changePwdSuccess = changePwdSuccess;
      instance.changePwdFailed = changePwdFailed;
      instance.handleValidSubmit({
        currentPassword: 'a',
        password: 'b',
        mocked,
      });
      expect(resaga.dispatchTo).toBeCalledWith(USER_API, CHANGE_PWD, {
        payload: {
          oldPassword: 'a',
          newPassword: 'b',
        },
        onSuccess: mocked,
        onError: mocked,
      });
      jest.restoreAllMocks();
    });
  });

  describe('handleChange()', () => {
    it('should handleChange()', () => {
      instance.handleChange(true, true);

      expect(rendered.state().isChanged).toBe(true);
      expect(rendered.state().serverError).toBe('');
    });

    it('should handleChange() false', () => {
      instance.handleChange(true, false);

      expect(rendered.state().isChanged).toBe(false);
    });
  });

  describe('renderWithForm()', () => {
    it('should render correctly', () => {
      rendered.setProps({ onDiscard: jest.fn(() => () => 'onDiscard') });
      const snapshot = shallow(<div>{instance.renderWithForm()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderFields', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.renderFields()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should render correctly if all show password is true', () => {
      rendered.setState({
        showCurrentPassword: true,
        showNewPassword: true,
        showRetypePassword: true,
      });
      const snapshot = shallow(<div>{instance.renderFields()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('changePwdFailed', () => {
    it('should call correct msg', () => {
      const mocked = jest.fn();
      helper.openErrorSnackbar = mocked;
      instance.changePwdFailed({ msg: 'a' });
      expect(mocked).toBeCalledWith('a', resaga);
    });
    it('should call correct msg', () => {
      const mocked = jest.fn();
      helper.openErrorSnackbar = mocked;
      instance.changePwdFailed({ msg: INCORRECT_USER_PASSWORD });
      expect(mocked).toBeCalledWith(INCORRECT_PASSWORD, resaga);
    });
  });
  describe('changePwdSuccess', () => {
    it('should call correct msg', () => {
      const mocked = jest.fn();
      const reset = jest.fn();
      helper.openSuccessSnackbar = mocked;
      instance.changePwdSuccess(reset)();
      expect(mocked).toBeCalledWith(
        'Success! Your Password has been changed!',
        resaga,
      );
      expect(reset).toBeCalled();
    });
  });
  describe('validPassword', () => {
    it('should return false', () => {
      const result = instance.validPassword({
        password: 'a',
        confirmedPassword: 'b',
      });
      expect(result).toBe(false);
    });
    it('should return true', () => {
      const result = instance.validPassword({
        password: 'a',
        confirmedPassword: 'a',
      });
      expect(result).toBe(true);
    });
  });
  describe('render()', () => {
    it('should render correctly', () => {
      LOGIC_HELPERS.switchCase = jest.fn(() => <div />);
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
      expect(LOGIC_HELPERS.switchCase.mock.calls).toMatchSnapshot();
    });
  });
});
