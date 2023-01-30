import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import SnackbarHelpers from 'ugcomponents/SnackBar/helpers';
import { PhoneCUD } from '../cud';

describe('<PhoneCUD />', () => {
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
    LOGIC_HELPERS.ifFunction = jest.fn(() => 'ifFunction');
    SnackbarHelpers.openSuccessSnackbar = jest.fn();
    SnackbarHelpers.openErrorSnackbar = jest.fn();
    rendered = shallow(<PhoneCUD {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(PhoneCUD).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('handleUpdateSuccess', () => {
    it('should run openSuccessSnackbar and ifFunction', () => {
      instance.handleUpdateSuccess('onSuccess')();
      expect(SnackbarHelpers.openSuccessSnackbar.mock.calls).toMatchSnapshot();
      expect(LOGIC_HELPERS.ifFunction).toBeCalledWith('onSuccess');
    });
  });

  describe('handleStoreSuccess', () => {
    it('should run openSuccessSnackbar and ifFunction', () => {
      instance.handleStoreSuccess('onSuccess')();
      expect(SnackbarHelpers.openSuccessSnackbar.mock.calls).toMatchSnapshot();
      expect(LOGIC_HELPERS.ifFunction).toBeCalledWith('onSuccess');
    });
  });

  describe('handleDestroySuccess', () => {
    it('should run openSuccessSnackbar and ifFunction', () => {
      instance.handleDestroySuccess('onSuccess')();
      expect(SnackbarHelpers.openSuccessSnackbar.mock.calls).toMatchSnapshot();
      expect(LOGIC_HELPERS.ifFunction).toBeCalledWith('onSuccess');
    });
  });

  describe('genericHandlerError', () => {
    it('should run snackbar helper for error', () => {
      instance.genericHandlerError();
      expect(SnackbarHelpers.openErrorSnackbar.mock.calls).toMatchSnapshot();
    });
  });

  describe('handleUpdateAndCreate', () => {
    it('should fire snackbar helper for error based on the message returned by the backend', () => {
      instance.handleUpdateAndCreate({
        response: {
          error: {
            message: 'Sample Message',
          },
        },
      });
      expect(SnackbarHelpers.openErrorSnackbar.mock.calls).toMatchSnapshot();
    });
  });

  describe('update', () => {
    it('should run dispatchTo', () => {
      instance.update({}, jest.fn());
      expect(resaga.dispatchTo).toBeCalled();
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });

  describe('store', () => {
    it('should run dispatchTo', () => {
      instance.store({}, jest.fn());
      expect(resaga.dispatchTo).toBeCalled();
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });

  describe('destroy', () => {
    it('should run dispatchTo', () => {
      instance.destroy(jest.fn());
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
