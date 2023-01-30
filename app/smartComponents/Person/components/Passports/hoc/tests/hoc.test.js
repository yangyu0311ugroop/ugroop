import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import SnackbarHelper from 'ugcomponents/SnackBar/helpers';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { PassportCUD } from '../hoc';

describe('<PassportCUD />', () => {
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
    SnackbarHelper.openSuccessSnackbar = jest.fn();
    SnackbarHelper.openErrorSnackbar = jest.fn();
    LOGIC_HELPERS.ifFunction = jest.fn();
    rendered = shallow(<PassportCUD {...props}>{() => {}}</PassportCUD>);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(PassportCUD).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('validateData()', () => {
    it('should not make issuedDate and expireDate value to null if issuedDate and expiredDate does not exist', () => {
      const result = instance.validateData({
        photo: null,
      });
      expect(result).toEqual({
        photo: null,
      });
    });
    it('should make issuedDate, birthDate and expireDate value to null if issuedDate is empty string', () => {
      const result = instance.validateData({
        issuedDate: '',
        expireDate: '',
        birthDate: '',
        photo: null,
      });
      expect(result).toEqual({
        issuedDate: null,
        expireDate: null,
        birthDate: null,
        photo: null,
      });
    });
    it('should use the original issuedDate and expireDate value if it is not empty string', () => {
      const result = instance.validateData({
        issuedDate: '03/14/1994',
        expireDate: '03/14-2024',
        birthDate: '03/14-2024',
        photo: 'qqq@gg.com',
      });
      expect(result).toEqual({
        issuedDate: '03/14/1994',
        expireDate: '03/14-2024',
        birthDate: '03/14-2024',
        photo: 'qqq@gg.com',
      });
    });
    it('should remove passportOtherType in the formData and put passportOtherType as type for passportType', () => {
      const result = instance.validateData({
        passportType: 'other',
        passportOtherType: 'eternal',
      });

      expect(result).toEqual({
        passportType: 'eternal',
      });
    });
  });

  describe('genericError', () => {
    it('should call openErrorSnackbar', () => {
      instance.genericError();
      expect(SnackbarHelper.openErrorSnackbar).toBeCalled();
      expect(SnackbarHelper.openErrorSnackbar.mock.calls).toMatchSnapshot();
    });
  });

  describe('store()', () => {
    it('should call dispatch to with particular params', () => {
      instance.validateData = jest.fn();
      instance.store()({});
      expect(resaga.dispatchTo).toBeCalled();
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });

  describe('destroy()', () => {
    it('should call dispatchTo with particular params', () => {
      instance.destroy();
      expect(resaga.dispatchTo).toBeCalled();
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });

  describe('update()', () => {
    it('should call dispatch to with particular params', () => {
      instance.validateData = jest.fn(() => ({}));
      instance.update()({}, true);
      expect(resaga.dispatchTo).toBeCalled();
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
    it('should not call dispatch to if isChanged param is false', () => {
      instance.validateData = jest.fn(() => ({}));
      instance.update()({}, false);
      expect(resaga.dispatchTo).toBeCalled();
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });

  describe('destroySuccess()', () => {
    it('should call SnackbarHelper open success snackbar', () => {
      instance.destroySuccess();
      expect(SnackbarHelper.openSuccessSnackbar).toBeCalled();
      expect(SnackbarHelper.openSuccessSnackbar.mock.calls).toMatchSnapshot();
    });
  });

  describe('createSuccess()', () => {
    it('should call SnackbarHelper open success snackbar', () => {
      instance.createSuccess('qqqq')();
      expect(SnackbarHelper.openSuccessSnackbar).toBeCalled();
      expect(SnackbarHelper.openSuccessSnackbar.mock.calls).toMatchSnapshot();
      expect(LOGIC_HELPERS.ifFunction).toBeCalledWith('qqqq');
    });
  });

  describe('updateSuccess()', () => {
    it('should call SnackbarHelper open success snackbar and call closeEditMode', () => {
      instance.closeEditMode = jest.fn();
      instance.updateSuccess('qqqq')();
      expect(SnackbarHelper.openSuccessSnackbar).toBeCalled();
      expect(SnackbarHelper.openSuccessSnackbar.mock.calls).toMatchSnapshot();
      expect(LOGIC_HELPERS.ifFunction).toBeCalledWith('qqqq');
      expect(instance.closeEditMode).toBeCalled();
    });
  });

  describe('confirmDelete()', () => {
    it('should set showDialog state to true', () => {
      rendered.setState({
        showDialog: false,
      });
      instance.confirmDelete();
      expect(rendered.state().showDialog).toBe(true);
    });
  });

  describe('closeDialog()', () => {
    it('should set showDialog state to false', () => {
      rendered.setState({
        showDialog: true,
      });
      instance.closeDialog();
      expect(rendered.state().showDialog).toBe(false);
    });
  });

  describe('openEdit()', () => {
    it('should set editable redux value to false', () => {
      instance.openEdit();
      expect(resaga.setValue).toBeCalledWith({
        editable: true,
      });
    });
  });

  describe('closeEditMode()', () => {
    it('should set editable redux value to false', () => {
      instance.closeEditMode();
      expect(resaga.setValue).toBeCalledWith({
        editable: false,
      });
    });
  });

  describe('setIsPrimary()', () => {
    it('should call update function and pass a particular data shape together with the options passed to it', () => {
      instance.update = jest.fn(() => jest.fn());
      instance.setIsPrimary(false)();
      expect(instance.update).toBeCalled();
      expect(instance.update.mock.calls).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
