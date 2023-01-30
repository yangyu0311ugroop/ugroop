import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { DeleteTab } from '../index';

describe('<DeleteTab />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    tabId: 123,
    templateId: 233,
  };

  beforeEach(() => {
    rendered = shallow(<DeleteTab {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(DeleteTab).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentWillReceiveProps()', () => {
    it('should set state if props.open changed', () => {
      rendered.setProps({ open: false });
      rendered.setState({ isDeleteDialogOpen: false });

      instance.componentWillReceiveProps({ open: true });

      expect(rendered.state().isDeleteDialogOpen).toBe(true);
    });

    it('should NOT set state otherwise', () => {
      rendered.setProps({ open: false });
      rendered.setState({ isDeleteDialogOpen: true });

      instance.componentWillReceiveProps({ open: false });

      expect(rendered.state().isDeleteDialogOpen).toBe(true);
    });
  });

  describe('onDeleteConfirm()', () => {
    it('should call dispatchTo', () => {
      instance.onDeleteConfirm();

      expect(resaga.dispatchTo).toBeCalled();
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });

  describe('onCancelDelete()', () => {
    it('should call props.onClose', () => {
      const onClose = jest.fn();
      rendered.setProps({ onClose });

      instance.onCancelDelete();

      expect(onClose).toBeCalled();
      expect(onClose.mock.calls).toMatchSnapshot();
    });

    it('should not do anything otherwise', () => {
      instance.onCancelDelete();
    });
  });

  describe('deleteSuccess()', () => {
    it('should call props.onSuccess', () => {
      const onSuccess = jest.fn();
      rendered.setProps({ onSuccess });

      instance.deleteSuccess(1, 222);

      expect(onSuccess).toBeCalledWith(1, 222);
    });

    it('should call props.onCancelDelete', () => {
      instance.onCancelDelete = jest.fn();

      instance.deleteSuccess();

      expect(instance.onCancelDelete).toBeCalled();
    });
  });
  describe('deleteFailed()', () => {
    it('should set state if props.open changed', () => {
      rendered.setState({ isDeleting: true });

      instance.deleteFailed();

      expect(rendered.state().isDeleting).toBe(false);
    });
  });
  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
