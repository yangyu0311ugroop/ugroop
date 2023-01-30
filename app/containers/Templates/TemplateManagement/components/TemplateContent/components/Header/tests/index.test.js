import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { shallow } from 'enzyme';
import React from 'react';
import { DO_NOTHING } from 'appConstants';
import { scroller } from 'react-scroll/modules';
import Sticky from 'react-stickynode';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { Header } from '../index';

describe('<Header />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };
  const history = {
    push: jest.fn(),
  };

  const props = {
    classes: {},
    location: {},
    resaga,
    history,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    rendered = shallow(<Header {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Header).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('renderMenuMenu', () => {
    it('should match snapshot', () => {
      instance.renderPrivateTabs = jest.fn(() => 'renderPrivateTabs');
      instance.renderHiddenTabs = jest.fn(() => 'renderHiddenTabs');
      rendered.setProps({ smDown: true, editable: true });
      TEST_HELPERS.expectMatchSnapshot(
        instance.renderMenuMenu({ closeMenu: jest.fn() }),
      );
    });
  });

  describe('componentDidMount()', () => {
    it('should componentDidMount()', () => {
      rendered.setProps({ children: [1, 2, 3] });

      instance.componentDidMount();

      expect(rendered.state()).toMatchSnapshot();
    });
  });

  describe('renderExecuteMenu', () => {
    it('should render', () => {
      instance.canExecuteTab = jest.fn(() => true);
      instance.renderPrivateTabs = jest.fn(() => 'renderPrivateTabs');
      instance.renderHiddenTabs = jest.fn(() => 'renderHiddenTabs');

      TEST_HELPERS.expectMatchSnapshot(
        instance.renderExecuteMenu({ closeMenu: jest.fn() }),
      );
    });
    it('should render if smDown', () => {
      rendered.setProps({ smDown: true });
      instance.canExecuteTab = jest.fn(() => true);
      instance.renderPrivateTabs = jest.fn(() => 'renderPrivateTabs');
      instance.renderHiddenTabs = jest.fn(() => 'renderHiddenTabs');

      TEST_HELPERS.expectMatchSnapshot(
        instance.renderExecuteMenu({ closeMenu: jest.fn() }),
      );
    });
  });

  describe('do nothing', () => {
    it('should return do_nothing', () => {
      expect(instance.doNothing()).toEqual(DO_NOTHING);
    });
  });

  describe('showHelp', () => {
    it('should return state true', () => {
      PORTAL_HELPERS.openHelpDialog = jest.fn();
      instance.showHelp(true)();
      expect(PORTAL_HELPERS.openHelpDialog).toBeCalled();
    });
  });

  describe('componentDidUpdate()', () => {
    it('should call compute()', () => {
      instance.compute = jest.fn();
      rendered.setProps({ activeTab: 1 });

      instance.componentDidUpdate({ activeTab: 2 });

      TEST_HELPERS.expectCalled(instance.compute);
    });

    it('should call compute() #2', () => {
      instance.compute = jest.fn();
      rendered.setProps({ children: [1, 2] });

      instance.componentDidUpdate({ children: [1, 2, 3] });

      TEST_HELPERS.expectCalled(instance.compute);
    });
  });

  describe('addNewTab()', () => {
    it('should call PORTAL_HELPERS.openAddTab', () => {
      PORTAL_HELPERS.openAddTab = jest.fn();

      instance.addNewTab();

      TEST_HELPERS.expectCalled(PORTAL_HELPERS.openAddTab);
    });
  });

  describe('closeDialog()', () => {
    it('should setState', () => {
      rendered.setState({ testKey: true });

      instance.closeDialog('testKey');

      expect(rendered.state().testKey).toBe(false);
    });
  });

  describe('selectNewTab()', () => {
    it('should selectNewTab()', () => {
      rendered.setProps({ children: [1, 2] });

      instance.selectNewTab();

      TEST_HELPERS.expectCalled(history.push);
    });
  });

  describe('handleClick()', () => {
    it('should return null', () => {
      rendered.setProps({ children: [1, 2] });

      expect(instance.handleClick({ index: -1 })()).toBe(null);
    });

    it('should return null #2', () => {
      rendered.setProps({ children: [1, 2] });

      expect(instance.handleClick({ index: 4 })()).toBe(null);
    });

    it('should handleClick', () => {
      rendered.setProps({ children: [1, 2] });

      instance.handleClick({ index: 1 })();

      TEST_HELPERS.expectCalled(history.push);
    });

    it('should handleClick private', () => {
      rendered.setProps({ children: [1, 2] });

      instance.handleClick({ index: 1, id: 99, isPrivate: true })();

      TEST_HELPERS.expectCalled(history.push);
    });
  });

  describe('compute()', () => {
    it('should return null', () => {
      rendered.setState({ parentWidth: 0 });

      expect(instance.compute()).toBe(null);
    });

    it('should return null #2', () => {
      rendered.setProps({ children: [1, 2, 3] });
      rendered.setState({ parentWidth: 112, childrenWidths: [11, 22] });

      expect(instance.compute()).toBe(null);
    });

    it('should compute', () => {
      rendered.setProps({ children: [1, 2, 3, 4, 5, 6, 7], activeTab: 4 });
      rendered.setState({
        parentWidth: 400,
        childrenWidths: [80, 80, 80, 80, 80, 80, 80],
      });

      instance.compute();

      expect(rendered.state()).toMatchSnapshot();
    });
    it('should compute #2', () => {
      rendered.setProps({
        children: [1536, 1954, 1538, 1955, 2021, 2022, 2023],
        tabId: 1536,
      });
      rendered.setState({
        actionButtonWidth: 207.421875,
        parentWidth: 1140,
        childrenWidths: [
          1340.453125,
          39.1875,
          86.734375,
          43.15625,
          52.78125,
          52.78125,
          52.78125,
        ],
      });
      instance.compute();

      expect(rendered.state()).toMatchSnapshot();
    });
  });

  describe('handleResizeActionButtons', () => {
    it('should setState', () => {
      const actionButtonWidth = 1;
      instance.handleResizeActionButtons(actionButtonWidth);
      expect(rendered.state().actionButtonWidth).toEqual(1);
    });
  });

  describe('renderItem()', () => {
    it('should return null', () => {
      rendered.setProps({ children: [1, 2] });
      rendered.setState({ hidden_1: true });

      expect(instance.renderItem(11, 1)).toBe(null);
    });

    it('should renderItem', () => {
      rendered.setProps({ children: [1, 2, 3] });

      TEST_HELPERS.expectMatchSnapshot(instance.renderItem, [11, 1]);
    });
    it('should render mobile', () => {
      rendered.setProps({ children: [1, 2, 3], smDown: true });

      TEST_HELPERS.expectMatchSnapshot(instance.renderItem, [11, 1]);
    });
  });

  describe('renderHiddenItem()', () => {
    it('should return null', () => {
      rendered.setState({ hiddenIndex: 2 });

      expect(instance.renderHiddenItem()(1, 1)).toBe(null);
    });

    it('should return null #2', () => {
      rendered.setProps({ tabId: 223 });

      expect(instance.renderHiddenItem()(223, 2)).toBe(null);
    });

    it('should renderHiddenItem', () => {
      rendered.setState({ hiddenIndex: 1 });
      rendered.setProps({ activeTab: 9 });

      TEST_HELPERS.expectMatchSnapshot(instance.renderHiddenItem(), [1, 12]);
    });
  });

  describe('handleResize()', () => {
    it('should handleResize()', () => {
      instance.compute = jest.fn();

      instance.handleResize(123);

      expect(rendered.state().parentWidth).toEqual(123);
      TEST_HELPERS.expectCalled(instance.compute);
    });
  });

  describe('handleItemResize()', () => {
    it('should handleItemResize()', () => {
      instance.compute = jest.fn();
      rendered.setProps({ children: [1, 2] });
      rendered.setState({ childrenWidths: [12, 76] });

      instance.handleItemResize(1, 12);

      expect(rendered.state().childrenWidths).toEqual([12, 76]);
      TEST_HELPERS.expectCalled(instance.compute);
    });

    it('should handleItemResize() #2', () => {
      instance.compute = jest.fn();
      rendered.setProps({ children: [1, 2] });
      rendered.setState({ childrenWidths: [11, 76] });

      instance.handleItemResize(1, 11);

      expect(rendered.state().childrenWidths).toEqual([11, 76]);
      TEST_HELPERS.expectCalled(instance.compute);
    });
  });

  describe('openManageTabs()', () => {
    it('should openManageTabs()', () => {
      rendered.setProps({ children: [1, 2, 3], activeTab: 1 });
      PORTAL_HELPERS.openManageTabs = jest.fn();

      instance.openManageTabs();

      TEST_HELPERS.expectCalled(PORTAL_HELPERS.openManageTabs);
    });
  });

  describe('renderButton()', () => {
    it('should renderButton', () => {
      rendered.setProps({ smDown: true });
      TEST_HELPERS.expectMatchSnapshot(instance.renderButton, [
        { openMenu: jest.fn(), count: 1 },
      ]);
    });
  });
  describe('renderMobileButton()', () => {
    it('should renderMobileButton', () => {
      rendered.setProps({ smDown: true });
      TEST_HELPERS.expectMatchSnapshot(instance.renderMobileButton, [
        { openMenu: jest.fn(), count: 1 },
      ]);
    });
  });
  describe('shouldShowMore()', () => {
    it('should shouldShowMore', () => {
      instance.canExecuteTab = jest.fn(() => true);
      TEST_HELPERS.expectMatchSnapshot(instance.shouldShowMore, []);
    });
  });

  describe('renderPrivateTabs()', () => {
    it('should return false', () => {
      rendered.setProps({ privateIds: [1, 2], hiddenIds: [1, 2] });

      expect(instance.renderPrivateTabs({})).toBe(false);
    });

    it('should renderPrivateTabs', () => {
      rendered.setProps({ privateIds: [1, 2], hiddenIds: [] });

      TEST_HELPERS.expectMatchSnapshot(instance.renderPrivateTabs, [{}]);
    });
  });

  describe('renderHiddenTabs()', () => {
    it('should return false', () => {
      rendered.setProps({ hiddenIds: [] });

      expect(instance.renderHiddenTabs({})).toBe(false);
    });

    it('should renderHiddenTabs', () => {
      rendered.setProps({ hiddenIds: [1, 2] });

      TEST_HELPERS.expectMatchSnapshot(instance.renderHiddenTabs, [{}]);
    });
  });

  describe('renderMoreMenu()', () => {
    it('should renderMoreMenu', () => {
      rendered.setProps({ children: [1, 2, 3] });
      instance.canExecuteTab = jest.fn(() => true);
      instance.renderHiddenItem = jest.fn(() => () => 'renderHiddenItem');

      TEST_HELPERS.expectMatchSnapshot(instance.renderMoreMenu, [{}]);
    });
  });

  describe('renderMore()', () => {
    it('should renderMore', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderMore);
    });
    it('should renderMore mobile', () => {
      rendered.setProps({ smDown: true });
      TEST_HELPERS.expectMatchSnapshot(instance.renderMore);
    });
  });

  describe('renderMenuButton()', () => {
    it('should renderMenuButton', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderMenuButton, [{}]);
    });
  });

  describe('renderMenuMenu()', () => {
    it('should renderMenuMenu', () => {
      instance.renderPrivateTabs = jest.fn(() => 'renderHiddenTabs');
      instance.renderHiddenTabs = jest.fn(() => 'renderHiddenTabs');

      TEST_HELPERS.expectMatchSnapshot(instance.renderMenuMenu, [{}]);
    });
  });

  describe('renderMenu()', () => {
    it('should return null', () => {
      instance.canExecuteTab = jest.fn(() => false);
      rendered.setProps({ children: [1, 2] });

      expect(instance.renderMenu()).toBe(null);
    });

    it('should return null', () => {
      instance.canExecuteTab = jest.fn(() => true);
      rendered.setProps({ privateIds: [], hiddenIds: [], smDown: false });

      expect(instance.renderMenu()).toBe(null);
    });

    it('should renderMenu', () => {
      instance.canExecuteTab = jest.fn(() => true);
      rendered.setProps({ privateIds: [1] });

      TEST_HELPERS.expectMatchSnapshot(instance.renderMenu);
    });
    it('should renderMenu return mobile button', () => {
      instance.canExecuteTab = jest.fn(() => true);
      rendered.setProps({ privateIds: [1], smDown: true });

      TEST_HELPERS.expectMatchSnapshot(instance.renderMenu);
    });
  });

  describe('renderDialogs()', () => {
    it('should renderDialogs', () => {
      rendered.setProps({ ids: [1, 2, 3] });

      TEST_HELPERS.expectMatchSnapshot(instance.renderDialogs);
    });
  });

  describe('stickyChange()', () => {
    it('should stickyChange()', () => {
      instance.stickyChange({ status: Sticky.STATUS_FIXED });

      expect(rendered.state().isSticky).toBe(true);
    });
  });

  describe('renderTabsButton()', () => {
    it('should renderTabsButton', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderTabsButton, [{}]);
    });
  });

  describe('renderTabMenu()', () => {
    it('should renderTabMenu', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderTabMenu({}));
    });
  });

  describe('renderTabsMenu()', () => {
    it('should renderTabsMenu', () => {
      instance.canExecuteTab = jest.fn(() => true);
      instance.renderTabMenu = jest.fn(() => () => 'renderTabMenu');

      TEST_HELPERS.expectMatchSnapshot(instance.renderTabsMenu, [
        { ids: [1, 2] },
      ]);
    });
  });

  describe('renderStickyTabs()', () => {
    it('should renderStickyTabs', () => {
      rendered.setProps({ children: [1, 2, 3], activeTab: 1 });

      TEST_HELPERS.expectMatchSnapshot(instance.renderStickyTabs);
    });
  });
  describe('canDoSomething()', () => {
    it('should canDoSomething', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.canDoSomething);
    });
  });

  describe('renderMobile()', () => {
    it('should renderMobile', () => {
      rendered.setProps({
        editable: false,
        privateIds: [],
        hiddenIds: [],
      });

      TEST_HELPERS.expectMatchSnapshot(instance.renderMobile);
    });
  });

  describe('scrollToTop()', () => {
    it('should scrollToTop()', () => {
      scroller.scrollTo = jest.fn(() => '');

      instance.scrollToTop();

      TEST_HELPERS.expectCalled(scroller.scrollTo);
    });
  });

  describe('renderStickyTourHeader()', () => {
    it('should renderStickyTourHeader', () => {
      instance.renderStickyTabs = jest.fn(() => 'renderStickyTabs');

      TEST_HELPERS.expectMatchSnapshot(instance.renderStickyTourHeader);
    });
  });

  describe('render()', () => {
    it('should render', () => {
      instance.renderItem = jest.fn(() => 'renderItem');
      instance.renderMenu = jest.fn(() => 'renderMenu');
      instance.renderDialogs = jest.fn(() => 'renderDialogs');
      instance.canDoSomething = jest.fn(() => true);

      rendered.setProps({
        children: [1],
        smDown: false,
        isPublic: false,
        editable: false,
        privateIds: [],
        hiddenIds: [],
      });
      rendered.setState({ hiddenIndex: -1 });

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
    it('should render editable', () => {
      instance.renderItem = jest.fn(() => 'renderItem');
      instance.renderMenu = jest.fn(() => 'renderMenu');
      instance.renderDialogs = jest.fn(() => 'renderDialogs');
      instance.canDoSomething = jest.fn(() => true);

      rendered.setProps({
        children: [1],
        smDown: false,
        isPublic: false,
        editable: true,
        privateIds: [],
        hiddenIds: [],
        hideMenuMobile: true,
      });
      rendered.setState({ hiddenIndex: -1 });

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
    it('should render if isPublic and !smDown', () => {
      instance.renderItem = jest.fn(() => 'renderItem');
      instance.renderMenu = jest.fn(() => 'renderMenu');
      instance.renderDialogs = jest.fn(() => 'renderDialogs');
      instance.canDoSomething = jest.fn(() => false);

      rendered.setProps({
        children: [1],
        smDown: false,
        isPublic: true,
      });
      rendered.setState({ hiddenIndex: -1 });

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });

    it('should render if isPublic and smDown', () => {
      instance.renderItem = jest.fn(() => 'renderItem');
      instance.renderMenu = jest.fn(() => 'renderMenu');
      instance.renderDialogs = jest.fn(() => 'renderDialogs');
      instance.canDoSomething = jest.fn(() => true);

      rendered.setProps({
        children: [1],
        smDown: true,
        isPublic: false,
        hideMenuMobile: true,
      });
      rendered.setState({ hiddenIndex: -1 });

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });

    it('should render hidden', () => {
      instance.renderStickyTourHeader = jest.fn(() => 'renderStickyTourHeader');
      instance.renderItem = jest.fn(() => 'renderItem');
      instance.renderMore = jest.fn(() => 'renderMore');
      instance.renderDialogs = jest.fn(() => 'renderDialogs');

      rendered.setProps({ children: [1] });
      rendered.setState({
        hiddenIndex: 1,
        isSticky: true,
      });

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
