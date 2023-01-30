import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { DO_NOTHING } from 'appConstants';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { AddEditChecklist } from '../index';

describe('<AddEditChecklist />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    tabId: 999,
    selectedChecklists: [],
  };

  beforeEach(() => {
    rendered = shallow(<AddEditChecklist {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(AddEditChecklist).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentDidMount()', () => {
    it('should DO_NOTHING', () => {
      rendered.setProps({ id: 999 });

      expect(instance.componentDidMount()).toBe(DO_NOTHING);
    });

    it('should call fetchChecklists', () => {
      rendered.setProps({ id: 0, parentNodeId: 992 });
      instance.fetchChecklists = () => 'fetchChecklists';

      expect(instance.componentDidMount()).toBe('fetchChecklists');
    });
  });

  describe('componentWillReceiveProps()', () => {
    it('should DO_NOTHING', () => {
      expect(instance.componentWillReceiveProps({ id: 999 })).toBe(DO_NOTHING);
    });

    it('should call fetchChecklists', () => {
      rendered.setProps({ id: 0, parentNodeId: 992 });
      instance.fetchChecklists = () => 'fetchChecklists';

      expect(
        instance.componentWillReceiveProps({ id: 0, parentNodeId: 993 }),
      ).toBe('fetchChecklists');
    });
  });

  describe('onClose()', () => {
    it('should call setValue', () => {
      instance.onClose({ node: { id: 123 } });
      expect(resaga.setValue).toBeCalledWith({
        editChecklistId: null,
        addChecklistParentId: null,
        selectedChecklists: null,
      });
    });
  });

  describe('fetchChecklists()', () => {
    it('should return null', () => {
      expect(instance.fetchChecklists(0, {})).toBe(null);
    });

    it('should call dispatchTo', () => {
      instance.fetchChecklists(123);
      instance.fetchChecklists(123, { onSuccess: 'onSuccess' });

      expect(resaga.dispatchTo).toBeCalled();
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });

  describe('updateDialogProps()', () => {
    it('should set addDialogProps', () => {
      instance.updateDialogProps({
        parentContent: 'parentContent',
        parentType: 'parentType',
      });

      expect(instance.addDialogProps).toMatchSnapshot();
    });
  });

  describe('handleValidSubmit()', () => {
    it('should call editChecklist', () => {
      rendered.setProps({ id: 123 });
      instance.editChecklist = jest.fn();

      instance.handleValidSubmit('formData');

      expect(instance.editChecklist).toBeCalledWith('formData');
    });

    it('should call addChecklist', () => {
      rendered.setProps({ id: 0 });
      instance.addChecklist = jest.fn();

      instance.handleValidSubmit('formData');

      expect(instance.addChecklist).toBeCalledWith('formData');
    });
  });

  describe('handleInvalidSubmit()', () => {
    it('should setState', () => {
      rendered.setProps({ selectedChecklists: [] });
      instance.handleInvalidSubmit();
    });
    it('should call addChecklist', () => {
      instance.addChecklist = jest.fn();
      rendered.setProps({
        selectedChecklists: [{ id: 1, checklists: [1, 2] }],
      });
      instance.handleInvalidSubmit();
    });
  });

  describe('addChecklist()', () => {
    it('should call copyFrom', () => {
      rendered.setProps({
        parentNodeId: 1,
        selectedChecklists: [{ id: 1, checklists: [1, 2] }],
      });
      instance.copyFromIds = jest.fn(() => 'copyFrom');

      expect(instance.addChecklist({ copyFromNodeId: 223 })).toBe('copyFrom');
      expect(instance.copyFromIds).toBeCalledWith([1]);
    });

    it('should call NODE_API_HELPERS.createNode', () => {
      rendered.setProps({ parentNodeId: 2311 });
      NODE_API_HELPERS.createNode = jest.fn(() => 'createNode');

      expect(
        instance.addChecklist({
          content: 'content',
          description: 'description',
        }),
      ).toBe('createNode');
      expect(NODE_API_HELPERS.createNode).toBeCalled();
      expect(NODE_API_HELPERS.createNode.mock.calls).toMatchSnapshot();
    });
  });

  describe('addSuccess()', () => {
    it('should addSuccess()', () => {
      instance.getTreeAndTimes = jest.fn();
      instance.onClose = jest.fn();

      instance.addSuccess({ node: { id: 2233 } });

      TEST_HELPERS.expectCalledAndMatchSnapshot(instance.getTreeAndTimes);
    });
  });

  describe('copyFromIds()', () => {
    it('should call dispatchTo', () => {
      rendered.setProps({ checklists: [1], parentNodeId: 2392 });
      instance.copyFromIds([1, 2]);

      expect(resaga.dispatchTo).toBeCalled();
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });

  describe('selectoptionValue()', () => {
    it('should add selected', () => {
      rendered.setProps({
        selectedChecklists: [],
      });
      instance.selectoptionValue({
        id: 1,
        label: '',
        groupId: 2,
        checklists: [1, 2],
      })();
    });
    it('should add selected select group if same checklist count', () => {
      rendered.setProps({
        selectedChecklists: [{ id: 3, groupId: 2, checklists: [3] }],
      });
      instance.selectoptionValue({
        id: 1,
        label: '',
        groupId: 2,
        checklists: [1, 2],
      })();
    });
    it('should not add selected select group if same checklist count', () => {
      rendered.setProps({
        selectedChecklists: [{ id: 3, groupId: 2, checklists: [3] }],
      });
      instance.selectoptionValue({
        id: 1,
        label: '',
        groupId: 2,
        checklists: [1],
      })();
    });
    it('remove if already checked', () => {
      rendered.setProps({
        selectedChecklists: [{ id: 3, groupId: 2, checklists: [3] }],
      });
      instance.selectoptionValue({
        id: 3,
        label: '',
        groupId: 2,
        checklists: [1],
      })();
    });
    it('remove group if already checked', () => {
      rendered.setProps({
        selectedChecklists: [{ id: 3, groupId: 2, checklists: [3] }],
      });
      instance.selectoptionValue({
        id: 3,
        label: '',
        groupId: 3,
        checklists: [1],
      })();
    });
    it('remove group if already checked', () => {
      rendered.setProps({
        selectedChecklists: [
          { id: 3, groupId: 2, checklists: [3] },
          { id: 10, groupId: 5, checklists: [3] },
        ],
      });
      instance.selectoptionValue({
        id: 3,
        label: '',
        groupId: 2,
        checklists: [1],
      })();
    });
    it('add group id', () => {
      instance.setState = jest.fn();
      rendered.setProps({
        selectedChecklists: [
          { id: 3, groupId: 2, checklists: [3] },
          { id: 10, groupId: 5, checklists: [3] },
        ],
      });
      instance.selectoptionValue({
        id: 7,
        label: '',
        groupId: 7,
        checklists: [1],
      })();
      expect(resaga.setValue).toBeCalled();
    });
    it('add group id and checklist should not explode', () => {
      instance.setState = jest.fn();
      rendered.setProps({
        selectedChecklists: [
          { id: 3, groupId: 2, checklists: [3] },
          { id: 10, groupId: 5, checklists: [3] },
        ],
      });
      instance.selectoptionValue({
        id: 7,
        label: '',
        groupId: 7,
      })();
      expect(resaga.setValue).toBeCalled();
    });
  });

  describe('copyNodeSuccess()', () => {
    it('should call fetchChecklists', () => {
      instance.fetchChecklists = jest.fn();

      instance.copyNodeSuccess({ cloneId: 232 });

      expect(instance.fetchChecklists).toBeCalled();
      expect(instance.fetchChecklists).toMatchSnapshot();
    });
  });

  describe('fetchListSuccess()', () => {
    it('should call setValue', () => {
      instance.fetchListSuccess(1, { id: 232 });

      expect(resaga.setValue).toBeCalled();
      expect(resaga.setValue.mock.calls).toMatchSnapshot();
    });
  });
  describe('renderPopperButton()', () => {
    it('should match snapshots', () => {
      expect(instance.renderPopperButton({})).toMatchSnapshot();
    });
  });
  describe('batchCopyNodeSuccess()', () => {
    it('should match snapshots', () => {
      instance.batchCopyNodeSuccess({ clonedIds: [1] });
      expect(resaga.setValue).toBeCalled();
    });
  });
  describe('renderPopperOptions()', () => {
    it('should match snapshots', () => {
      expect(instance.renderPopperOptions()).toMatchSnapshot();
    });
  });

  describe('editChecklist()', () => {
    it('should call dispatchTo', () => {
      instance.editChecklist({
        content: 'content',
        description: 'description',
      });

      expect(resaga.dispatchTo).toBeCalled();
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });

  describe('dialogProps()', () => {
    it('should return editDialogProps', () => {
      rendered.setProps({ id: 222 });
      expect(instance.dialogProps()).toBe(instance.editDialogProps);
    });

    it('should return addDialogProps', () => {
      rendered.setProps({ id: 0 });
      expect(instance.dialogProps()).toBe(instance.addDialogProps);
    });
  });
  describe('onUpdateError()', () => {
    it('set state to be called', () => {
      rendered.setProps({ id: 222 });
      instance.onUpdateError();
      expect(rendered.state().loading).toEqual(false);
    });
  });
  describe('renderCopyItems()', () => {
    it('should return null', () => {
      rendered.setProps({ id: 222 });
      expect(instance.renderCopyItems()).toBe(null);
    });

    it('should renderCopyItems', () => {
      rendered.setProps({
        id: 0,
        selectedChecklists: [
          { id: 1, groupId: 1, checklists: [] },
          { id: 3, groupId: 2, checklists: [] },
        ],
      });

      const snapshot = shallow(<div>{instance.renderCopyItems()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('render()', () => {
    it('should render correctly', () => {
      instance.renderCopyItems = jest.fn(() => 'renderCopyItems');
      instance.dialogProps = jest.fn(() => 'dialogProps');

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
