import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import SnackbarHelpers from 'ugcomponents/SnackBar/helpers';
import { EditSchoolForm } from '../index';

describe('<EditSchoolForm />', () => {
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
    rendered = shallow(<EditSchoolForm {...props} />);
    instance = rendered.instance();
    SnackbarHelpers.openSuccessSnackbar = jest.fn();
    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(EditSchoolForm).toBeDefined();
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
      instance.handleSubmit({ subType: 'Boys' });
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
