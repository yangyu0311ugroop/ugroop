/**
 * Created by quando on 21/2/17.
 */

import { DO_NOTHING } from 'appConstants';
import React from 'react';
import { shallow } from 'enzyme';
import { Register } from '../index';
import RegisterForm from '../registerForm';

describe('<RegisterPage />', () => {
  let rendered;
  let instance;
  const history = { push: jest.fn() };
  const props = {
    history,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    rendered = shallow(<Register {...props} classes={{}} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Register);
  });
  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });
  it('should render children', () => {
    expect(rendered.find(RegisterForm).length).toBe(1);
  });

  describe('verifySuccess()', () => {
    it('should call history.push if registered', () => {
      instance.verifySuccess({ registered: true }, { tokenId: 123123 });

      expect(history.push).toBeCalledWith(`/login/${123123}`);
    });

    it('should DO_NOTHING if !registered', () => {
      expect(
        instance.verifySuccess({ registered: false }, { tokenId: 123123 }),
      ).toBe(DO_NOTHING);
    });
  });

  describe('verifyFail()', () => {
    it('should go back to notification page if failed to verify', () => {
      instance.verifyFail({ registered: false }, { tokenId: 123123 });

      expect(history.push).toBeCalledWith(`/notification/${123123}`);
    });
  });

  describe('<RegisterPage /> registerSuccess()  ', () => {
    it('should be called correctly - true', () => {
      const form = rendered.instance();
      const data = { hi: 'ho ho ho' };
      form.registerSuccess(data);
      expect(rendered.state().isRegisterSuccess).toBe(true);
      expect(rendered.state().data).toEqual(data);
    });
  });

  describe('render()', () => {
    it('should return error if error', () => {
      rendered.setState({ error: 'error' });

      expect(instance.render()).toBe('error');
    });
  });
});
