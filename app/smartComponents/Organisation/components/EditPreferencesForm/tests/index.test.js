import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import SnackbarHelpers from 'ugcomponents/SnackBar/helpers';
import { EditPreferencesForm } from '../index';

describe('<EditPreferencesForm />', () => {
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
    rendered = shallow(<EditPreferencesForm {...props} />);
    instance = rendered.instance();
    SnackbarHelpers.openSuccessSnackbar = jest.fn();
    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(EditPreferencesForm).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('handleSubmitSuccess()', () => {
    it('should call openSuccessSnackbar helper', () => {
      instance.handleSubmitSuccess();
      expect(SnackbarHelpers.openSuccessSnackbar).toBeCalled();
      expect(SnackbarHelpers.openSuccessSnackbar.mock.calls).toMatchSnapshot();
    });
  });

  describe('handleSubmit()', () => {
    it('should call dispatchTo with particular param shape', () => {
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

  describe('handleSubmit', () => {
    it('should call dispatchTo if attempts and frequency is 0', () => {
      const formData = {
        reminderNumberOfAttempts: '0',
        reminderFrequency: '0',
      };
      instance.handleSubmit(formData);
      expect(resaga.dispatchTo).toHaveBeenCalled();
    });
    it('should call dispatchTo if attempts and frequency is not 0 or empty', () => {
      const formData = {
        reminderNumberOfAttempts: '6',
        reminderFrequency: '8',
      };
      instance.handleSubmit(formData);
      expect(resaga.dispatchTo).toHaveBeenCalled();
    });
  });
});
