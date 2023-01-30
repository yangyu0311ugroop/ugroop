import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import SnackbarHelpers from 'ugcomponents/SnackBar/helpers';
import { EditProfileForm } from '../index';

describe('<EditProfileForm />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    id: 1,
  };

  beforeEach(() => {
    rendered = shallow(<EditProfileForm {...props} />);
    instance = rendered.instance();
    SnackbarHelpers.openSuccessSnackbar = jest.fn();
    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(EditProfileForm).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('validateData', () => {
    it('should make birthDate null if birthDate is empty string', () => {
      const result = instance.validateData({ birthDate: '' });
      expect(result).toEqual({ birthDate: null });
    });
    it('should return data as is if birthDate is not empty string', () => {
      const result = instance.validateData({ birthDate: '03/14/1994' });
      expect(result).toEqual({ birthDate: '03/14/1994' });
    });
  });

  describe('handleSubmitSuccess()', () => {
    it('should call openSuccessSnackbar helper', () => {
      instance.handleSubmitSuccess();
      expect(SnackbarHelpers.openSuccessSnackbar).toBeCalled();
      expect(SnackbarHelpers.openSuccessSnackbar.mock.calls).toMatchSnapshot();
    });
  });

  it('should call setValue if there is knownAs', () => {
    instance.handleSubmit({ knownAs: '' });
    expect(resaga.setValue).toBeCalled();
  });

  describe('handleSubmit()', () => {
    it('should call dispatchTo with particular param shape', () => {
      instance.validateData = jest.fn(() => ({}));
      instance.handleSubmit({ knownAs: 'Jesus Christ' });
      expect(resaga.dispatchTo).toBeCalled();
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
