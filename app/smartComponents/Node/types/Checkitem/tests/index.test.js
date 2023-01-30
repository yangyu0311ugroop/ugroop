import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { COMPLETED, EMPTY_RTE, OUTSTANDING } from 'appConstants';
import { DATASTORE_UTILS } from 'datastore';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { CHECKLIST_HELPERS } from 'smartComponents/Node/components/Checklists/utils';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { CHECKITEM } from 'utils/modelConstants';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { ability } from 'apis/components/Ability/ability';
import { Checkitem } from '../index';

describe('<Checkitem />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    id: 44999,
    nextNodeId: 2293,
    classes: {
      done: 'done',
    },
    resaga,
    history: {
      location: {},
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();

    rendered = shallow(<Checkitem {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Checkitem).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('confirmDelete()', () => {
    it('should confirmDelete()', () => {
      PORTAL_HELPERS.confirmDelete = jest.fn();

      instance.confirmDelete(1, 2, 3)();

      TEST_HELPERS.expectCalled(PORTAL_HELPERS.confirmDelete);
    });
  });

  describe('deleteNode()', () => {
    it('should call deleteNode', () => {
      NODE_API_HELPERS.deleteNode = jest.fn(() => 'deleteNode');

      expect(instance.deleteNode(1, 2, 3)()).toBe('deleteNode');

      expect(NODE_API_HELPERS.deleteNode).toHaveBeenCalled();
    });
  });

  describe('deleteSuccess()', () => {
    it('should call deleteSuccess', () => {
      PORTAL_HELPERS.closePortal = jest.fn(() => 'closePortal');
      instance.deleteSuccess();

      expect(PORTAL_HELPERS.closePortal).toHaveBeenCalled();
    });
  });

  describe('toggleStatusStoreValue()', () => {
    it('should call toggleStatusStoreValue', () => {
      rendered.setProps({ me: 123, status: OUTSTANDING });

      CHECKLIST_HELPERS.toggleStatus = jest.fn(() => 'toggleStatusStoreValue');
      DATASTORE_UTILS.upsertObject = jest.fn(() => 'upsertObject');

      expect(instance.toggleStatusStoreValue(1, 2, 3)).toBe(
        'toggleStatusStoreValue',
      );

      expect(CHECKLIST_HELPERS.toggleStatus).toBeCalledWith(
        { status: OUTSTANDING, type: CHECKITEM },
        { me: 123 },
      );
      expect(DATASTORE_UTILS.upsertObject).toBeCalledWith(
        'toggleStatusStoreValue',
      );
      expect(resaga.setValue).toBeCalledWith({ node: 'upsertObject' });
    });
  });

  describe('toggleStatus()', () => {
    it('should call toggleStatus', done => {
      const debounceMs = 100;
      rendered.setProps({ debounceMs });

      instance.toggleStatusStoreValue = jest.fn(() => 'toggleStatusStoreValue');
      instance.updateNode = jest.fn();

      instance.toggleStatus(2222);
      instance.toggleStatus(1111); // should cancel the first call

      setTimeout(() => {
        expect(instance.updateNode).toBeCalled();
        expect(instance.updateNode.mock.calls).toMatchSnapshot();
        done();
      }, debounceMs + 10); // a bit after debounce function is called to prevent this test randomly failing
    });
  });

  describe('updateNode()', () => {
    it('should call dispatchTo', () => {
      instance.updateNode(2222);

      expect(resaga.dispatchTo).toBeCalled();
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });

  describe('isCompleted()', () => {
    it('should return true', () => {
      rendered.setProps({ status: COMPLETED });

      expect(instance.isCompleted()).toBe(true);
    });

    it('should return false', () => {
      rendered.setProps({ status: OUTSTANDING });

      expect(instance.isCompleted()).toBe(false);
    });
  });

  describe('hasSomeData()', () => {
    it('should return true', () => {
      rendered.setProps({ dueDate: {}, description: '', notes: '' });
      expect(instance.hasSomeData()).toBe(true);
      rendered.setProps({
        dueDate: null,
        description: 'some description',
        notes: '',
      });
      expect(instance.hasSomeData()).toBe(true);
      rendered.setProps({
        dueDate: null,
        description: '',
        notes: 'some notes',
      });
      expect(instance.hasSomeData()).toBe(true);
    });

    it('should return false', () => {
      rendered.setProps({ dueDate: null, description: EMPTY_RTE, notes: '' });

      expect(instance.hasSomeData()).toBe('');
    });
  });

  describe('showDetail()', () => {
    it('should call setValue', () => {
      rendered.setProps({ parentNodeId: 22331 });

      instance.showDetail();

      expect(resaga.setValue).toBeCalledWith({
        seeDetail: 44999,
        seeCheckItemParentId: 22331,
      });
    });
  });

  describe('disabled()', () => {
    it('should return true #1', () => {
      rendered.setProps({ id: 0 });

      expect(instance.disabled()).toBe(true);
    });

    it('should return true #2', () => {
      rendered.setProps({ id: 123 });
      rendered.setState({ deleting: true });

      expect(instance.disabled()).toBe(true);
    });

    it('should return false', () => {
      rendered.setProps({ id: 123 });
      rendered.setState({ deleting: false });
      instance.canDelete = () => true;

      expect(instance.disabled()).toBe(false);
    });
  });

  describe('tooltipText()', () => {
    it('should return tooltipText', () => {
      expect(instance.tooltipText('Mr Ping')).toMatchSnapshot();
    });
  });

  describe('renderSub()', () => {
    it('should return null', () => {
      instance.hasSomeData = jest.fn(() => false);

      expect(instance.renderSub()).toBe(null);
    });

    it('should renderSub', () => {
      instance.hasSomeData = jest.fn(() => true);
      instance.hasDescription = jest.fn(() => true);
      instance.hasNotes = jest.fn(() => true);

      const snapshot = shallow(<div>{instance.renderSub()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderCompletedList()', () => {
    it('should return null #1', () => {
      rendered.setProps({ showCompletedList: false });

      expect(instance.renderCompletedList()).toBe(null);
    });

    it('should return null #2', () => {
      rendered.setProps({ showCompletedList: true, id: 0 });

      expect(instance.renderCompletedList()).toBe(null);
    });

    it('should renderCompletedList', () => {
      rendered.setProps({ showCompletedList: true, id: 2233 });

      const snapshot = shallow(<div>{instance.renderCompletedList()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderDefault()', () => {
    it('should return AddCheckitem if the type of id is string', () => {
      rendered.setProps({
        id: 'id',
        parentNodeId: 2,
        showCompleted: true,
        deleting: false,
        status: OUTSTANDING,
      });
      const snapshot = shallow(<div>{instance.renderDefault()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should renderDefault if page location is in admin', () => {
      rendered.setProps({
        parentNodeId: 2,
        showCompleted: true,
        deleting: false,
        status: OUTSTANDING,
        showDelete: true,
        history: {
          location: {
            pathname: '/',
          },
        },
      });
      instance.isCompleted = jest.fn(() => false);
      instance.canDelete = jest.fn(() => true);

      const snapshot = shallow(<div>{instance.renderDefault()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderNull()', () => {
    it('should renderNull', () => {
      expect(instance.renderNull()).toBe(null);
    });
  });

  describe('renderLogic()', () => {
    it('should renderLogic', () => {
      rendered.setProps({ parentNodeId: 22321 });

      const snapshot = shallow(<div>{instance.renderLogic()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should renderDefault', () => {
      LOGIC_HELPERS.switchCase = jest.fn();
      instance.render();
      expect(LOGIC_HELPERS.switchCase.mock.calls).toMatchSnapshot();
    });
  });

  describe('insertBefore', () => {
    it('should call dispatchTo', () => {
      instance.insertBefore();
      expect(resaga.dispatchTo).toBeCalled();
    });
  });

  describe('insertAfter', () => {
    it('should call dispatchTo', () => {
      instance.insertAfter();
      expect(resaga.dispatchTo).toBeCalled();
    });
  });

  describe('handleRequestClose', () => {
    it('should close the dialog box', () => {
      const checkitem = shallow(<Checkitem classes={{}} resaga={{}} id={1} />);
      const checkInstance = checkitem.instance();
      checkInstance.setState({ open: true });
      checkInstance.handleRequestClose();
      expect(checkitem.state().open).toBe(false);
    });
  });

  describe('showAddItemOption', () => {
    it('should do nothing', () => {
      const checkitem = shallow(<Checkitem classes={{}} resaga={{}} id={1} />);
      const checkInstance = checkitem.instance();
      checkInstance.setState({ open: true });
      const event = { currentTarget: 'target', preventDefault: jest.fn() };
      checkInstance.showAddItemOption(event);
      expect(checkitem.state().open).toBe(true);
    });
    it('should set the open to true', () => {
      const checkitem = shallow(<Checkitem classes={{}} resaga={{}} id={1} />);
      const checkInstance = checkitem.instance();
      checkInstance.setState({ open: false });
      const event = { currentTarget: 'target', preventDefault: jest.fn() };
      checkInstance.showAddItemOption(event);
      expect(checkitem.state().open).toBe(true);
    });
  });

  describe('canDelete', () => {
    it('should be called', () => {
      rendered.setProps({
        createdBy: 1,
      });
      ability.can = jest.fn(() => false);
      expect(instance.canDelete()).toBe(false);
    });
  });
  describe('onClickDescription', () => {
    it('should be called', () => {
      ability.can = jest.fn(() => false);
      expect(
        instance.onClickDescription({ stopPropagation: jest.fn(() => true) }),
      ).toBe(true);
    });
  });
  describe('isTemplate', () => {
    it('should be called', () => {
      rendered.setProps({ parentType: 'template' });
      expect(instance.isTemplate()).toBe(true);
    });
  });
  describe('canMove', () => {
    it('should be true', () => {
      rendered.setProps({ editable: true });
      ability.can = jest.fn(() => true);

      expect(instance.canMove()).toBe(true);
    });

    it('should be false #1', () => {
      rendered.setProps({ editable: false });
      instance.isTemplate = jest.fn(() => true);

      expect(instance.canMove()).toBe(false);
    });

    it('should be false #2', () => {
      rendered.setProps({ editable: true });
      ability.can = jest.fn(() => false);

      expect(instance.canMove()).toBe(false);
    });
  });

  describe('renderContentDraggable', () => {
    it('should be called', () => {
      rendered.setProps({
        id: 1,
        parentNodeId: 2,
        deleting: false,
        status: 'outstanding',
        showDelete: true,
        editingCheckItem: false,
        checkitems: [1, 2],
      });

      const provided = {
        innerRef: 'innerRef',
        draggableProps: {
          props: 'draggableProps',
        },
        dragHandleProps: {
          props: 'dragHandleProps',
        },
      };

      instance.isTemplate = jest.fn(() => true);
      instance.isCompleted = jest.fn(() => false);
      instance.canDelete = jest.fn(() => true);
      instance.canMove = jest.fn(() => true);
      instance.renderCompletedList = jest.fn(() => 'renderCompletedList');
      instance.renderSub = jest.fn(() => 'renderSub');

      const snapshot = shallow(
        <div>{instance.renderContentDraggable()(provided)}</div>,
      );
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should be called', () => {
      const provided = {
        innerRef: 'innerRef',
        draggableProps: {
          props: 'draggableProps',
        },
        dragHandleProps: {
          props: 'dragHandleProps',
        },
      };

      instance.isTemplate = jest.fn(() => false);
      const snapshot = shallow(
        <div>{instance.renderContentDraggable()(provided)}</div>,
      );
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should be called', () => {
      const provided = {
        innerRef: 'innerRef',
        draggableProps: {
          props: 'draggableProps',
        },
        dragHandleProps: {
          props: 'dragHandleProps',
        },
      };

      rendered.setProps({ showCompleted: false });
      instance.isCompleted = jest.fn(() => true);

      instance.isTemplate = jest.fn(() => false);
      const snapshot = shallow(
        <div>{instance.renderContentDraggable()(provided)}</div>,
      );
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should be called', () => {
      const provided = {
        innerRef: 'innerRef',
        draggableProps: {
          props: 'draggableProps',
        },
        dragHandleProps: {
          props: 'dragHandleProps',
        },
      };

      rendered.setProps({ showOutstanding: false });
      instance.isCompleted = jest.fn(() => false);

      instance.isTemplate = jest.fn(() => false);
      const snapshot = shallow(
        <div>{instance.renderContentDraggable()(provided)}</div>,
      );
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
