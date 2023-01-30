import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { OPTION, ICON_BUTTON } from 'appConstants';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
// import { CHECKLISTS } from 'utils/modelConstants';
import { VARIANTS } from 'variantsConstants';
import { scroller } from 'react-scroll';
import { Checklists } from '../index';
import { PORTAL_HELPERS } from '../../../../../containers/Portal/helpers';

describe('<Checklists />', () => {
  let rendered;
  let instance;

  const event = {
    stopPropagation: jest.fn(),
  };

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    rendered = shallow(<Checklists {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Checklists).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('toggleChecklists()', () => {
    it('should toggleChecklists', () => {
      rendered.setState({ showChecklists: true });

      instance.toggleChecklists();
      expect(rendered.state().showChecklists).toBe(false);

      instance.toggleChecklists();
      expect(rendered.state().showChecklists).toBe(true);
    });
  });

  describe('toggleShowClosed()', () => {
    it('should toggleShowClosed', () => {
      rendered.setProps({ showClosed: true, stopPropogateShowClose: false });

      instance.toggleShowClosed(event);
      expect(event.stopPropagation).toBeCalled();
      expect(resaga.setValue).toBeCalled();

      rendered.setProps({
        remainingChecklist: [],
        stopPropogateShowClose: true,
        showClosed: false,
      });
      instance.toggleShowClosed(event);
      expect(resaga.setValue).toBeCalled();
    });
  });

  describe('addChecklist()', () => {
    it('should call setValue and stop propogation', () => {
      rendered.setState({ showChecklists: true });
      rendered.setProps({ parentNodeId: 2299 });

      instance.addChecklist(event);

      expect(event.stopPropagation).toBeCalledWith();
      expect(resaga.setValue).toBeCalledWith({ addChecklistParentId: 2299 });
    });
    it('should call setValue', () => {
      rendered.setState({ showChecklists: true });
      rendered.setProps({ parentNodeId: 2299, stopPropagation: false });

      instance.addChecklist(event);

      expect(event.stopPropagation).not.toBeCalled();
      expect(resaga.setValue).toBeCalledWith({ addChecklistParentId: 2299 });
    });
  });
  describe('renderAddIconButton()', () => {
    it('should call setValue and stop propogation', () => {
      const snapshot = shallow(<div> {instance.renderAddIconButton()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('deleteNode()', () => {
    it('should call NODE_API_HELPERS.deleteNode', () => {
      rendered.setProps({ parentNodeId: 2299, parentParentNodeId: 234 });
      NODE_API_HELPERS.deleteNode = jest.fn();

      instance.deleteNode(event)();

      expect(event.stopPropagation).toBeCalledWith();
      expect(NODE_API_HELPERS.deleteNode).toHaveBeenCalled();
    });
  });

  describe('confirmDelete()', () => {
    it('should confirmDelete()', () => {
      PORTAL_HELPERS.confirmDelete = jest.fn();

      instance.confirmDelete();

      TEST_HELPERS.expectCalled(PORTAL_HELPERS.confirmDelete);
    });
  });

  describe('renderBody()', () => {
    it('should renderBody', () => {
      instance.renderAddCheckItem = jest.fn(() => 'renderAddCheckItem');
      instance.renderBodyContent = jest.fn(() => 'renderBodyContent');
      const snapshot = shallow(
        <div>
          {instance.renderBody(
            { id: 123, checklists: [1, 2] },
            { showCompleted: true },
            {
              toggleShowCompleted: jest.fn(),
              toggleShowOutstanding: jest.fn(),
            },
          )}
        </div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderAddCheckItem', () => {
    it('should return something if editingCheckItem is false', () => {
      rendered.setProps({
        editingCheckItem: false,
        createdBy: 'Elijah',
      });
      instance.renderAddCheckItem(1, [0, 2, 3]);
      expect(rendered).toMatchSnapshot();
    });
    it('should return null if editingCheckItem is true', () => {
      rendered.setProps({
        editingCheckItem: true,
        createdBy: 'Elijah',
      });

      expect(instance.renderAddCheckItem(1, [0, 2, 3])).toBe(null);
    });
  });

  describe('renderContent()', () => {
    it('should return null', () => {
      rendered.setState({ showChecklists: false });

      expect(instance.renderContent()).toBe(null);
    });

    it('should return blank slate', () => {
      rendered.setProps({
        renderBlankSlate: true,
        checklists: [],
        showChecklists: true,
      });
      instance.renderBlankslate = jest.fn(() => 'renderBlankslate');
      TEST_HELPERS.expectMatchSnapshot(instance.renderContent);
    });

    it('should render empty', () => {
      rendered.setProps({ checklists: [] });
      rendered.setState({ showChecklists: true });

      expect(instance.renderContent()).toBe(null);
    });

    it('should renderContent correctly', () => {
      rendered.setProps({ checklists: [1] });
      rendered.setState({ showChecklists: true });
      instance.renderSortedChecklists = jest.fn(() => 'renderSortedChecklists');

      const snapshot = shallow(<div>{instance.renderContent()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderSortedChecklists()', () => {
    it('should renderSortedChecklists correctly', () => {
      const snapshot = shallow(
        <div>
          {instance.renderSortedChecklists({}, {})({
            ids: [1, 2],
            sortedIds: [2, 1],
          })}
        </div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should renderSortedChecklists correctly if show open', () => {
      const snapshot = shallow(
        <div>
          {instance.renderSortedChecklists({}, { showClosed: true })({
            ids: [1, 2],
            sortedIds: [2, 1],
          })}
        </div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('toggleCurrentChecklist()', () => {
    it('should renderSortedChecklists correctly', () => {
      rendered.setState({ opened: false });
      const snapshot = shallow(<div>{instance.toggleCurrentChecklist(1)}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('renderChecklists()', () => {
    it('should return null', () => {
      rendered.setState({ content: '', checklists: [] });

      expect(instance.renderChecklists()).toBe(null);
    });

    it('should renderChecklists', () => {
      rendered.setProps({ content: 'School', checklists: [1, 2] });
      instance.renderContent = jest.fn(() => 'renderContent');
      instance.renderHeader = jest.fn(() => 'renderHeader');

      const snapshot = shallow(<div>{instance.renderChecklists()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderToggleClosedButton()', () => {
    it('should return null', () => {
      expect(instance.renderToggleClosedButton({})).toBe(null);
      expect(instance.renderToggleClosedButton({ closed: false })).toBe(null);
    });

    it('should renderToggleClosedButton', () => {
      const snapshot = shallow(
        <div>{instance.renderToggleClosedButton({ closed: true })}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderToggleSortBy()', () => {
    it('should return null #1', () => {
      rendered.setState({ showChecklists: false });
      expect(instance.renderToggleSortBy()).toBe(null);
    });

    it('should return null #2', () => {
      rendered.setState({ showChecklists: true });
      rendered.setProps({ checklists: [1] });
      expect(instance.renderToggleSortBy()).toBe(null);
    });

    it('should renderToggleSortBy', () => {
      rendered.setState({ showChecklists: true });
      rendered.setProps({ checklists: [1, 2] });

      const snapshot = shallow(<div>{instance.renderToggleSortBy()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderHeader()', () => {
    it('should renderHeader', () => {
      rendered.setState({ showChecklists: false });
      rendered.setProps({ isLayoutView: true, checklists: [] });
      const snapshot = shallow(<div>{instance.renderHeader()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should renderHeader', () => {
      rendered.setState({ showChecklists: true });
      LOGIC_HELPERS.ifElse = jest.fn(() => 'ifElse');

      const snapshot = shallow(<div>{instance.renderHeader()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
      expect(LOGIC_HELPERS.ifElse).toBeCalled();
      expect(LOGIC_HELPERS.ifElse.mock.calls.length).toBe(1);
    });
  });

  describe('renderAddButton()', () => {
    it('should return null', () => {
      rendered.setState({ showChecklists: false });

      expect(instance.renderAddButton()).toBe(null);
    });

    it('should return null if organisation is true && !checklists.length', () => {
      rendered.setProps({
        renderBlankSlate: true,
        checklists: [],
        showChecklists: true,
      });
      expect(instance.renderAddButton()).toEqual(null);
    });

    it('should renderAddButton', () => {
      rendered.setState({ showChecklists: true });

      const snapshot = shallow(<div>{instance.renderAddButton()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should renderAddButton simple', () => {
      rendered.setState({ showChecklists: true });

      const snapshot = shallow(<div>{instance.renderAddButton(true)}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderDeleteButton()', () => {
    it('should return null', () => {
      rendered.setState({ showChecklists: false });

      expect(instance.renderDeleteButton()).toBe(null);
    });

    it('should renderDeleteButton', () => {
      rendered.setState({ showChecklists: true });

      const snapshot = shallow(<div>{instance.renderDeleteButton()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderEditGroupButton()', () => {
    it('should return null', () => {
      rendered.setState({ showChecklists: false });

      expect(instance.renderEditGroupButton()).toBe(null);
    });

    it('should renderEditGroupButton', () => {
      rendered.setState({ showChecklists: true });

      const snapshot = shallow(<div>{instance.renderEditGroupButton()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderClosedButton()', () => {
    it('should return null', () => {
      rendered.setState({ showChecklists: false });

      expect(instance.renderClosedButton()).toBe(null);
    });

    it('should renderClosedButton', () => {
      rendered.setState({ showChecklists: true, type: 'template' });
      rendered.setProps({ type: 'template' });

      const snapshot = shallow(<div>{instance.renderClosedButton()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderOption()', () => {
    it('should return null', () => {
      rendered.setProps({ checklists: [] });

      expect(instance.renderOption()).toBe(null);
    });

    it('should renderOption', () => {
      rendered.setProps({
        variant: OPTION,
        checklists: [1],
        parentNodeId: 22999,
      });

      const snapshot = shallow(<div>{instance.renderOption()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should renderOption', () => {
      rendered.setProps({
        variant: ICON_BUTTON,
        checklists: [1],
        parentNodeId: 22999,
      });

      const snapshot = shallow(<div>{instance.renderOption()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should renderList', () => {
      rendered.setProps({
        variant: VARIANTS.LIST_ONLY,
        parentNodeId: 22999,
        expandedParentChecklistId: 22999,
        expandedChecklistId: 1,
      });
      instance.renderList = jest.fn(() => 'renderList');

      expect(instance.renderList()).toBe('renderList');
    });

    it('should renderChecklists', () => {
      rendered.setProps({
        variant: VARIANTS.LIST_ONLY,
        content: 'hellow',
        checklists: [],
        showEmpty: true,
        parentNodeId: 22999,
        expandedParentChecklistId: 22999,
      });
      instance.renderList = jest.fn(() => 'renderList');
      expect(instance.render()).toBe('renderList');
    });
  });

  describe('onScroll()', () => {
    it('should onScroll', () => {
      scroller.scrollTo = jest.fn(() => 1);
      expect(instance.onScroll(1)()).toBe(1);
    });
    it('should onScroll', () => {
      rendered.setProps({ expandedParentChecklistId: 1 });
      scroller.scrollTo = jest.fn(() => 1);
      expect(instance.onScroll(1)()).toBe(1);
    });
    it('should onScroll', () => {
      rendered.setProps({ expandedParentChecklistId: 1, checklists: [2, 3] });
      scroller.scrollTo = jest.fn(() => 1);
      expect(instance.onScroll(2)()).toBe(1);
    });
  });

  describe('render()', () => {
    it('should renderOption', () => {
      rendered.setProps({ variant: OPTION });
      instance.renderOption = jest.fn(() => 'renderOption');

      expect(instance.render()).toBe('renderOption');
    });

    it('should renderChecklists', () => {
      instance.renderChecklists = jest.fn(() => 'renderChecklists');

      expect(instance.render()).toBe('renderChecklists');
    });
  });

  describe('componentWillReceiveProps()', () => {
    it('should set sate showChecklists to true ', () => {
      rendered.setProps({ showChecklists: false });
      rendered.setState({ showChecklists: false });
      instance.componentWillReceiveProps({ showChecklists: true });
      expect(rendered.state().showChecklists).toBe(true);
    });
  });

  describe('onDragEnd', () => {
    it('should call updateServer and updateStore', () => {
      const destination = { index: 1 };
      const source = { index: 3 };
      const reason = 'DROP';

      instance.updateServer = jest.fn();
      instance.updateStore = jest.fn();

      instance.onDragEnd(1)({ destination, source, reason });
      expect(instance.updateServer).toBeCalled();
      expect(instance.updateStore).toBeCalled();
    });

    it('should return false if one of the conditions is met', () => {
      const destination = { index: -1 };
      const source = { index: 1 };
      const reason = 'CANCEL';

      expect(instance.onDragEnd(1)({ destination, source, reason })).toBe(
        false,
      );
    });
  });

  describe('updateServer', () => {
    it('should call dispatchTo if destination is less than source', () => {
      const checklists = [7395, 7413];
      const checkItems = [[7397, 7407], [7415, 7414, 7416]];
      rendered.setProps({
        checklists,
        checkItems,
      });
      const id = 7413;
      const destination = 0;
      const source = 2;
      instance.updateServer(source, destination, id);
      expect(resaga.dispatchTo).toBeCalled();
    });

    it('should call dispatchTo if destination is greater than source', () => {
      rendered.setProps({
        checklists: [7395, 7413],
        checkItems: [[7397, 7407], [7415, 7414, 7416]],
      });
      instance.updateServer(2, 3, 7413);
      expect(resaga.dispatchTo).toBeCalled();
    });
  });

  describe('updateStore', () => {
    it('should call setValue', () => {
      instance.updateStore(2, 3, 7413);
      expect(resaga.setValue).toBeCalled();
    });
  });
  describe('toggleNode', () => {
    it('should call dispatchTo if toggleNode called', () => {
      instance.toggleNode({ status: '', id: 1 })();
      expect(resaga.dispatchTo).toBeCalled();
    });
  });
  describe('renderButtons', () => {
    it('should match snapshots', () => {
      const snapshot = shallow(
        <div>{instance.renderButtons({ status: '', id: 1 })}</div>,
      );
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('renderContentOverview', () => {
    it('should match snapshots', () => {
      rendered.setProps({ expandedChecklistId: 1 });
      const snapshot = shallow(
        <div>{instance.renderContentOverview(1, 1)}</div>,
      );
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('renderBodyContent', () => {
    it('should be called', () => {
      const variant = 'VARIANT';
      const id = 7413;
      const checklists = [7416, 7415, 7414];
      const showCompleted = false;
      const showOutstanding = true;
      const anchorDate = 'anchorDate';
      const provided = {
        innerRef: 'innerRef',
        droppableProps: {
          props: 'droppableProps',
        },
        placeholder: 'placeholder',
      };

      const snapshot = shallow(
        <div>
          {instance.renderBodyContent({
            variant,
            id,
            checklists,
            showCompleted,
            showOutstanding,
            anchorDate,
          })(provided)}
        </div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderBlankslate', () => {
    it('should match snapshot', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderBlankslate);
    });
    it('should match snapshot', () => {
      rendered.setProps({ isLayoutView: true });
      TEST_HELPERS.expectMatchSnapshot(instance.renderBlankslate);
    });
  });
  describe('renderAsIconButton', () => {
    it('should match snapshot', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderAsIconButton({ id: 1 }), [
        'test',
      ]);
    });
  });
  describe('renderIconButtons', () => {
    it('should match snapshot', () => {
      rendered.setProps({ content: false, checklists: [], showEmpty: false });
      TEST_HELPERS.expectMatchSnapshot(instance.renderIconButtons);
    });
  });
  describe('renderEditButton', () => {
    it('should match snapshot', () => {
      rendered.setProps({ checklists: [], showEmpty: false });
      TEST_HELPERS.expectMatchSnapshot(instance.renderEditButton);
    });
    it('should match snapshot', () => {
      rendered.setState({ showChecklists: true });
      rendered.setProps({
        checklists: [],
        showEmpty: false,
        renderBlankSlate: true,
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderEditButton);
    });
    it('should match snapshot', () => {
      rendered.setState({ showChecklists: true });
      rendered.setProps({ checklists: [1], showEmpty: false });
      TEST_HELPERS.expectMatchSnapshot(instance.renderEditButton);
    });
  });
  describe('toggleChecklist', () => {
    it('setValue to be called', () => {
      rendered.setProps({
        content: false,
        checklists: [],
        showEmpty: false,
        isClick: jest.fn(),
        parentNodeId: 10,
      });
      instance.toggleChecklist(1)(event);
      expect(resaga.setValue).toBeCalledWith({
        expandedChecklistId: 1,
        expandedParentChecklistId: 10,
      });
    });
    it('setValue to be called', () => {
      rendered.setProps({
        content: false,
        checklists: [],
        showEmpty: false,
        isClick: jest.fn(),
        parentNodeId: 10,
        expandedChecklistId: 1,
      });
      instance.toggleChecklist(1)(event);
      expect(resaga.setValue).toBeCalledWith({
        expandedChecklistId: 0,
        expandedParentChecklistId: 10,
      });
    });
  });
  describe('deleteSuccess()', () => {
    it('should call deleteSuccess', () => {
      PORTAL_HELPERS.closePortal = jest.fn(() => 'closePortal');
      instance.deleteSuccess();

      expect(PORTAL_HELPERS.closePortal).toHaveBeenCalled();
    });
  });
  describe('selectoptionValue', () => {
    it('remove value', () => {
      rendered.setState({ selectedId: [1] });
      instance.selectoptionValue(1)();
      // expect(resaga.setValue).toBeCalledWith({ expandedChecklistId: 1 });
    });
    it('add value', () => {
      rendered.setState({ selectedId: [2] });
      instance.selectoptionValue(1)();
      // expect(resaga.setValue).toBeCalledWith({ expandedChecklistId: 1 });
    });
  });
  describe('renderMultiOption', () => {
    it('remove value', () => {
      rendered.setProps({ onChange: jest.fn() });
      expect(instance.renderMultiOption(1)).toEqual(null);
    });
    it('remove value', () => {
      rendered.setState({ selectedId: [1] });
      rendered.setProps({
        checklists: [1],
        onChange: jest.fn(),
        selectedChecklists: [{ id: 1 }],
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderMultiOption, [1]);
    });
  });
  describe('renderSortedIcons', () => {
    it('should match snapshot', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderSortedIcons({}, {}), [
        { sortedIds: [1, 2] },
      ]);
    });
    it('should match snapshot', () => {
      rendered.setProps({ showAsContent: true });
      TEST_HELPERS.expectMatchSnapshot(
        instance.renderSortedIcons(
          { showAsContent: true },
          { showClosed: false },
        ),
        [{ sortedIds: [1, 2] }],
      );
    });
    it('should match snapshot', () => {
      rendered.setProps({ showAsContent: true });
      TEST_HELPERS.expectMatchSnapshot(
        instance.renderSortedIcons(
          { showAsContent: true },
          { showClosed: true },
        ),
        [{ sortedIds: [1, 2] }],
      );
    });
    it('should match snapshot show as icon', () => {
      rendered.setProps({ showAsContent: true });
      TEST_HELPERS.expectMatchSnapshot(
        instance.renderSortedIcons(
          { showAsContent: false },
          { showClosed: true },
        ),
        [{ sortedIds: [1, 2] }],
      );
    });
  });
});
