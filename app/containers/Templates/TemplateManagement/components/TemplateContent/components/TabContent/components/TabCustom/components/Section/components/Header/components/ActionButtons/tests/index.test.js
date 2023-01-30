import sections from 'datastore/templateManagementStore/helpers/sectionHelper';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { ActionButtons } from '../index';
import styles from '../styles';

describe('<ActionButtons />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    id: 999,
    ids: 2,
  };

  beforeEach(() => {
    rendered = shallow(<ActionButtons {...props} />);
    instance = rendered.instance();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should exists', () => {
    expect(ActionButtons).toBeDefined();
    expect(styles).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('finishEdit()', () => {
    it('should call setValue', () => {
      rendered.setProps({ id: 999 });
      sections.remove = jest.fn();

      instance.finishEdit();

      expect(resaga.setValue).toBeCalled();
      expect(sections.remove).toBeCalledWith(999);
    });
  });

  describe('startEdit()', () => {
    it('should call setValue', () => {
      rendered.setProps({ id: 999, editing: 0 });
      sections.upsert = jest.fn();

      instance.startEdit();

      expect(resaga.setValue).toBeCalled();
      expect(sections.upsert).toBeCalledWith({ id: 999 }, { node: {} });
    });

    it('should NOT call setValue if editing is truthy', () => {
      rendered.setProps({ id: 999, editing: 999 });

      instance.startEdit();

      expect(resaga.setValue).not.toBeCalled();
    });
  });

  describe('deleteSection()', () => {
    it('should call dispatchTo', () => {
      rendered.setProps({ id: 999 });

      instance.deleteSection();

      expect(resaga.dispatchTo).toBeCalled();
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });

  describe('renderViewButtons()', () => {
    it('should render correctly', () => {
      rendered.setProps({
        editable: true,
        ids: [2, 3],
        movingNodeBefore: false,
        movingNodeAfter: false,
      });
      instance.isMoving = jest.fn(() => false);

      instance.renderInsertBefore = jest.fn(() => 'renderInsertBefore');
      instance.renderInsertAfter = jest.fn(() => 'renderInsertAfter');
      instance.renderDialog = jest.fn(() => 'renderDialog');

      const snapshot = shallow(<div>{instance.renderViewButtons()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('onClickDelete', () => {
    it('should set isOpenDialog to true', () => {
      instance.onClickDelete();
      expect(rendered.state().isOpenDialog).toBe(true);
    });
  });

  describe('renderDialog', () => {
    it('should match snapshot if content is not empty string', () => {
      rendered.setProps({
        content: 'Toronto Raptors will win the 2019 NBA Finals',
      });
      const snap = shallow(<div>{instance.renderDialog()}</div>);
      expect(toJSON(snap)).toMatchSnapshot();
    });
    it('should match snapshot if content is empty string', () => {
      rendered.setProps({
        content: '',
      });
      const snap = shallow(<div>{instance.renderDialog()}</div>);
      expect(toJSON(snap)).toMatchSnapshot();
    });
  });

  describe('onClickDelete', () => {
    it('should set isOpenDialog to false', () => {
      instance.onCancelDelete();
      expect(rendered.state().isOpenDialog).toBe(false);
    });
  });

  describe('renderEditButtons()', () => {
    it('should render Save button if dirty', () => {
      rendered.setProps({ dirty: true, deleteOnDiscard: false });

      let snapshot = shallow(<div>{instance.renderEditButtons()}</div>);

      rendered.setProps({ dirty: true, deleteOnDiscard: true });

      snapshot = shallow(<div>{instance.renderEditButtons()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should NOT render Save button if NOT dirty', () => {
      rendered.setProps({ dirty: true });

      const snapshot = shallow(<div>{instance.renderEditButtons()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render empty if moveMode', () => {
      rendered.setProps({ moveMode: true });

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render view buttons', () => {
      rendered.setProps({ moveMode: false, editing: 0 });
      instance.renderViewButtons = () => 'renderViewButtons';

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render edit buttons', () => {
      rendered.setProps({ moveMode: false, editing: 111 });
      instance.renderEditButtons = () => 'renderEditButtons';

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
