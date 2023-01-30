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
    placeId: 'test',
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

  describe('handleSubmitSuccess()', () => {
    it('should call openSuccessSnackbar helper', () => {
      instance.handleSubmitSuccess();
      expect(SnackbarHelpers.openSuccessSnackbar).toBeCalled();
      expect(SnackbarHelpers.openSuccessSnackbar.mock.calls).toMatchSnapshot();
    });
  });
  describe('handleChange()', () => {
    it('should set value of local variable correctly', () => {
      instance.handleChange('placeId')('placeId');
      expect(instance.placeId).toEqual('placeId');
      instance.handleChange('timeZoneId')('timeZoneId');
      expect(instance.timezoneId).toEqual('timeZoneId');
      instance.handleChange('none')('test');
      expect(instance.locationChanged).toEqual(true);
      instance.handleSubmitSuccess();
    });
  });
  describe('handleSubmit()', () => {
    it('should call dispatchTo with particular param shape', () => {
      instance.locationChanged = true;
      instance.placeId = 'test';
      instance.handleSubmit({ address: 'manila' });
      instance.locationChanged = false;
      instance.placeId = 'test1';
      instance.handleSubmit({ address: 'manila' });
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
