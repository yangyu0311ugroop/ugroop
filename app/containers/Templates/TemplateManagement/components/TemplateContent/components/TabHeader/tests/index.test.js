import { FIXED_TABS_OFFSET } from 'containers/Templates/TemplateManagement/components/TemplateContent/components/TabHeader/constants';
import { DAY_TAB_INDEX } from 'containers/Templates/TemplateManagement/constants';
import tabHelper from 'datastore/templateManagementStore/helpers/tabs';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { ability } from 'apis/components/Ability/ability';
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
    replace: jest.fn(),
  };

  const location = {
    search: '?tab=1',
    pathname: '/admin/stuff',
  };

  const props = {
    classes: {},
    location,
    resaga,
    history,
    userIdRelatedIds: [[1, 'tour_organizer', 2], [1, 'tour_collaborator', 3]],
  };

  beforeEach(() => {
    rendered = shallow(<Header {...props} />);
    instance = rendered.instance();
  });

  afterEach(() => jest.clearAllMocks());

  it('should exists', () => {
    expect(Header).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('onDragEnd()', () => {
    it('should not do anything if reason = CANCEL', () => {
      expect(instance.onDragEnd({ reason: 'CANCEL' })).toBe(false);
    });

    it('should not do anything if destinationIndex = -1', () => {
      expect(instance.onDragEnd({ destination: { index: -1 } })).toBe(false);
    });

    it('should not do anything if sourceIndex = destinationIndex', () => {
      expect(
        instance.onDragEnd({
          source: { index: 3 },
          destination: { index: 3 - FIXED_TABS_OFFSET },
        }),
      ).toBe(false);
    });

    it('should call update server and store', () => {
      instance.updateServer = jest.fn();
      instance.updateStore = jest.fn();

      expect(
        instance.onDragEnd({ source: { index: 1 }, destination: { index: 2 } }),
      ).toBe(true);

      expect(instance.updateServer).toBeCalledWith(1, 2 + FIXED_TABS_OFFSET);
      expect(instance.updateStore).toBeCalledWith(1, 2 + FIXED_TABS_OFFSET);
    });
  });

  describe('updateServer()', () => {
    it('should MOVE_NODE_BEFORE if destination < source', () => {
      rendered.setProps({ templateId: 123, tabIds: [1, 2, 3] });

      instance.updateServer(2, 1);

      expect(resaga.dispatchTo).toBeCalled();
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });

    it('should MOVE_NODE_AFTER if destination > source', () => {
      rendered.setProps({ templateId: 123, tabIds: [1, 2, 3] });

      instance.updateServer(1, 2);

      expect(resaga.dispatchTo).toBeCalled();
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });

  describe('updateStore()', () => {
    it('should call setValue', () => {
      rendered.setProps({ templateId: 123 });
      tabHelper.moveChildren = jest.fn();

      instance.updateStore(2, 1);

      expect(resaga.setValue).toBeCalled();
      expect(resaga.setValue.mock.calls).toMatchSnapshot();

      expect(tabHelper.moveChildren).toBeCalledWith(123, 2, 1);
    });
  });

  describe('updateSuccess()', () => {
    it('should call handleTabChange', () => {
      instance.handleTabChange = jest.fn();

      instance.updateSuccess({}, { destination: 1 });

      expect(instance.handleTabChange).toBeCalledWith({}, 1);
    });
  });

  describe('deleteSuccess()', () => {
    it('should call handleTabChange', () => {
      instance.handleTabChange = jest.fn();

      instance.deleteSuccess();

      expect(instance.handleTabChange).toBeCalledWith();
    });
  });

  describe('handleTabChange()', () => {
    it('should not do anything if index too big', () => {
      rendered.setProps({ tabIds: [1, 2, 3] });

      expect(instance.handleTabChange({}, 3)).toBe(false);
    });

    it('should call history.push', () => {
      rendered.setProps({ tabIds: [1, 2, 3], pathname: 'somepath' });
      instance.handleTabChange({}, 1);

      expect(history.push).toBeCalledWith(`${'somepath'}?tab=${1}`);
    });

    it('should call history.push using default value', () => {
      rendered.setProps({ tabIds: [1, 2, 3], pathname: 'somepath' });
      instance.handleTabChange();

      expect(history.push).toBeCalledWith(`${'somepath'}?tab=${0}`);
    });
  });

  describe('handleViewChange()', () => {
    it('should call replace and setValue when current tab is not equal to DAY_TAB_INDEX', () => {
      instance.handleViewChange('card')();
      expect(history.replace).toBeCalledWith(
        `${location.pathname}?tab=${DAY_TAB_INDEX}&dayView=card`,
      );
      expect(resaga.setValue).toBeCalled();
    });

    it('should call setValue when current tab is equal to DAY_TAB_INDEX', () => {
      const activeTab = {
        search: '?tab=0',
        pathname: '/admin/stuff',
      };
      rendered.setProps({ location: activeTab });

      instance.handleViewChange('card')();

      expect(resaga.setValue).toBeCalled();
    });

    it('should run history replace if layout change was triggered when not in the day tab', () => {
      const activeTab = {
        search: '?tab=0&dayView=card',
        pathname: '/admin/stuff',
      };
      rendered.setProps({ location: activeTab });

      instance.handleViewChange('card')();

      expect(resaga.setValue).toBeCalled();
    });
  });

  describe('addNewTab()', () => {
    it('should setState', () => {
      rendered.setState({ addTab: false });

      instance.addNewTab();

      expect(rendered.state().addTab).toBe(true);
    });
  });

  describe('openDeleteTab()', () => {
    it('should setState', () => {
      rendered.setProps({ activeTab: 2 });
      rendered.setState({ deleteTab: false });

      instance.openDeleteTab();

      expect(rendered.state().deleteTab).toBe(true);
    });

    it('should not allowed when activeTab < 2', () => {
      rendered.setProps({ activeTab: 1 });
      rendered.setState({ deleteTab: false });
      global.alert = jest.fn();

      instance.openDeleteTab();

      expect(global.alert).toBeCalled();
      expect(rendered.state().deleteTab).toBe(false);
    });
  });

  describe('closeDialog()', () => {
    it('should setState', () => {
      rendered.setState({ testKey: true });

      instance.closeDialog('testKey');

      expect(rendered.state().testKey).toBe(false);
    });
  });

  describe('renameTab()', () => {
    it('should not allowed when activeTab < 2', () => {
      rendered.setProps({ activeTab: 1 });
      rendered.setState({ editTab: false });
      global.alert = jest.fn();

      instance.renameTab();

      expect(global.alert).toBeCalled();
      expect(rendered.state().editTab).toBe(false);
    });

    it('should allow when activeTab >= 2', () => {
      rendered.setProps({ activeTab: 2 });
      rendered.setState({ editTab: false });
      global.alert = jest.fn();

      instance.renameTab();

      expect(global.alert).not.toBeCalled();
      expect(rendered.state().editTab).toBe(true);
    });
  });

  describe('showHelp()', () => {
    it('should setState', () => {
      instance.showHelp();
      expect(rendered.state().helpTab).toBe(true);
    });
  });

  describe('canSeeMoreButton()', () => {
    it('should return true', () => {
      ability.can = jest.fn(() => true);

      expect(instance.canSeeMoreButton()).toBe(true);
    });

    it('should return false', () => {
      ability.can = jest.fn(() => false);

      expect(instance.canSeeMoreButton()).toBe(false);
    });
  });

  describe('renderTabItems()', () => {
    it('should renderTabItems correctly', () => {
      rendered.setProps({ activeTab: 2, tabIds: [0, 1, 2222] });

      const snapshot = shallow(<div>{instance.renderTabItems()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should renderTabItems correctly on public tour', () => {
      rendered.setProps({
        activeTab: 2,
        tabIds: [0, 1, 2222],
        isPublicView: true,
      });

      const snapshot = shallow(<div>{instance.renderTabItems()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should renderTabItems correctly on public tour if tabids is null', () => {
      rendered.setProps({
        activeTab: 2,
        tabIds: false,
        isPublicView: true,
      });

      const snapshot = shallow(<div>{instance.renderTabItems()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderTabs()', () => {
    it('should renderTabs correctly', () => {
      instance.canDoSomething = jest.fn(() => true);
      rendered.setProps({ activeTab: 2 });

      const snapshot = shallow(<div>{instance.renderTabs()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should renderTabs correctly on public', () => {
      instance.canDoSomething = jest.fn(() => true);
      rendered.setProps({ activeTab: 2, isPublicView: true });

      const snapshot = shallow(<div>{instance.renderTabs()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderDroppable()', () => {
    it('should renderDroppable correctly', () => {
      const snapshot = shallow(
        <div>
          {instance.renderDroppable()({
            innerRef: 'some ref',
            droppableProps: { hi: 'hoo' },
            placeholder: 'some holder',
          })}
        </div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderContent()', () => {
    it('should renderContent correctly', () => {
      const snapshot = shallow(<div>{instance.renderContent()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderDialogs()', () => {
    it('should renderDialogs correctly', () => {
      rendered.setProps({
        tabIds: [11, 21, 232],
        templateId: 2222,
        activeTab: 1,
      });
      rendered.setState({ addTab: true, deleteTab: true });

      const snapshot = shallow(<div>{instance.renderDialogs()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('viewIconFromValue()', () => {
    it('should viewIconFromValue', () => {
      expect(instance.viewIconFromValue('day')).toMatchSnapshot();
      expect(instance.viewIconFromValue('card')).toMatchSnapshot();
      expect(instance.viewIconFromValue('timeline')).toMatchSnapshot();
      expect(instance.viewIconFromValue('title')).toMatchSnapshot();
      expect(instance.viewIconFromValue('map')).toMatchSnapshot();
      expect(instance.viewIconFromValue('default')).toMatchSnapshot();
    });
  });

  describe('renderViewButton()', () => {
    it('should renderViewButton', () => {
      const snapshot = shallow(<div>{instance.renderViewButton({})}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderViewPopper()', () => {
    it('should renderViewPopper', () => {
      const snapshot = shallow(<div>{instance.renderViewPopper({})}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderSwitchView()', () => {
    it('should renderSwitchView', () => {
      const snapshot = shallow(<div>{instance.renderSwitchView({})}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderMoreButton()', () => {
    it('should return null', () => {
      instance.canSeeMoreButton = jest.fn(() => false);

      const snapshot = shallow(<div>{instance.renderMoreButton({})}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should renderMoreButton', () => {
      instance.canSeeMoreButton = jest.fn(() => true);

      const snapshot = shallow(<div>{instance.renderMoreButton({})}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderMorePopper()', () => {
    it('should renderMorePopper', () => {
      const snapshot = shallow(<div>{instance.renderMorePopper({})}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
    it('should match snapshot if tabType is tabother', () => {
      rendered.setProps({
        tabType: 'tabother',
        editable: true,
      });
      const snapshot = shallow(<div>{instance.renderMorePopper({})}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderMoreMenu()', () => {
    it('should renderMoreMenu', () => {
      const snapshot = shallow(<div>{instance.renderMoreMenu({})}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderSwitchViewPopper()', () => {
    it('should renderSwitchViewPopper', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderSwitchViewPopper);
    });
  });

  describe('renderTabTimeLine()', () => {
    it('should renderTabTimeLine', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderTabTimeLine(), [{}]);
    });
  });

  describe('renderLabel()', () => {
    it('should renderSwitchViewPopper', () => {
      instance.renderSwitchViewPopper = jest.fn(() => 'renderSwitchViewPopper');

      expect(
        instance.renderLabel({
          label: 'Days & Events',
          index: 0,
          active: true,
        }),
      ).toBe('renderSwitchViewPopper');
    });

    it('should render normal tab time line button', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderLabel, [
        { label: 'Days & Events', index: 0, active: false },
      ]);
    });

    it('should renderLabel', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderLabel, [
        { label: 'Custom tab', index: 3, active: false },
      ]);
    });
  });

  describe('renderLabel()', () => {
    it('should renderLabel Days & Events', () => {
      const snapshot = shallow(
        <div>{instance.renderLabel({ label: 'Days & Events' })}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should still match snapshot if the tab is a private tab', () => {
      const snapshot = shallow(
        <div>{instance.renderLabel({ label: 'Other', privateTab: true })}</div>,
      );
      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should still match snapshot for other label', () => {
      const snapshot = shallow(
        <div>{instance.renderLabel({ label: 'Other' })}</div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      instance.renderContent = () => 'renderContent';
      instance.renderDialogs = () => 'renderDialogs';
      instance.renderMenus = () => 'renderMenus';

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('render Sticky()', () => {
    it('should renderTabs correctly when sticky', () => {
      instance.canDoSomething = jest.fn(() => true);
      rendered.setState({ isSticky: true });
      const snapshot = shallow(<div>{instance.renderTabs()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
  describe('stickyChange()', () => {
    it('should stickyChange should return false ', () => {
      instance.stickyChange(1);
      expect(rendered.state().isSticky).toBe(false);
    });
  });
});
