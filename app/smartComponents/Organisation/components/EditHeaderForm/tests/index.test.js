import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import SnackbarHelpers from 'ugcomponents/SnackBar/helpers';
import { EditHeaderForm } from '../index';

describe('<EditHeaderForm />', () => {
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
    rendered = shallow(<EditHeaderForm {...props} />);
    instance = rendered.instance();
    SnackbarHelpers.openSuccessSnackbar = jest.fn();
    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(EditHeaderForm).toBeDefined();
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
      instance.handleSubmit({ OrgName: 'Ugroop' });
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
  describe('Set state()', () => {
    it('should setState.editing to false', () => {
      rendered.setProps({ readOnly: true });
      instance.startEdit();
      expect(rendered.state().editing).toBe(false);
    });
    it('should setState.editing to true', () => {
      instance.startEdit();
      expect(rendered.state().editing).toBe(true);
    });
    it('should setState.editing to false', () => {
      instance.cancelEdit();
      expect(rendered.state().editing).toBe(false);
    });
  });
});
