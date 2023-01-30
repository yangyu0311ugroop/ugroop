import { ability } from 'apis/components/Ability/ability';
import tabs from 'datastore/templateManagementStore/helpers/tabs';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { TabCustom } from '../index';
import styles from '../styles';

describe('<TabCustom />', () => {
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
    id: 999,
  };

  beforeEach(() => {
    rendered = shallow(<TabCustom {...props} />);
    instance = rendered.instance();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(TabCustom).toBeDefined();
      expect(styles).toBeDefined();
    });

    it('should render without exploding', () => {
      expect(rendered.length).toBe(1);
    });
  });

  describe('canEdit()', () => {
    it('should return true', () => {
      rendered.setProps({ editable: true });
      ability.can = jest.fn(() => true);

      expect(instance.canEdit()).toBe(true);
    });

    it('should return false', () => {
      rendered.setProps({ editable: false });
      ability.can = jest.fn(() => true);

      expect(instance.canEdit()).toBe(false);
    });
  });

  describe('onDragEnd()', () => {
    it('should return false if destination = -1', () => {
      expect(instance.onDragEnd({})).toBe(false);
    });

    it('should return false if reason = CANCEL', () => {
      expect(
        instance.onDragEnd({ destination: { index: 1 }, reason: 'CANCEL' }),
      ).toBe(false);
    });

    it('should return false if source = destination', () => {
      expect(
        instance.onDragEnd({ source: { index: 1 }, destination: { index: 1 } }),
      ).toBe(false);
    });

    it('should return true and call updates', () => {
      instance.updateServer = jest.fn();
      instance.updateStore = jest.fn();

      expect(
        instance.onDragEnd({ source: { index: 1 }, destination: { index: 2 } }),
      ).toBe(true);
      expect(instance.updateServer).toBeCalledWith(1, 2);
      expect(instance.updateStore).toBeCalledWith(1, 2);
    });
  });

  describe('updateServer()', () => {
    it('should call move before', () => {
      rendered.setProps({ sectionIds: [11, 12, 13] });

      instance.updateServer(2, 1);

      expect(resaga.dispatchTo).toBeCalled();
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });

    it('should call move after', () => {
      rendered.setProps({ sectionIds: [11, 12, 13] });

      instance.updateServer(1, 2);

      expect(resaga.dispatchTo).toBeCalled();
      expect(resaga.dispatchTo.mock.calls).toMatchSnapshot();
    });
  });

  describe('updateStore()', () => {
    it('should call set value', () => {
      tabs.moveChildren = jest.fn();

      instance.updateStore(1, 2);

      expect(resaga.setValue).toBeCalled();
      expect(resaga.setValue.mock.calls).toMatchSnapshot();

      expect(tabs.moveChildren).toBeCalled();
      expect(tabs.moveChildren.mock.calls).toMatchSnapshot();
    });
  });

  describe('handleClick()', () => {
    it('should return null', () => {
      rendered.setProps({ offset: true });

      expect(instance.handleClick(2233)()).toBe(null);
    });

    it('should call setValue', () => {
      rendered.setProps({ offset: false });

      instance.handleClick(2233)();

      TEST_HELPERS.expectCalledAndMatchSnapshot(resaga.setValue);
    });
  });

  describe('openDeleteTab()', () => {
    it('should openDeleteTab()', () => {
      instance.openDeleteTab();

      expect(rendered.state().deleteTab).toBe(true);
    });
  });

  describe('closeDialog()', () => {
    it('should closeDialog()', () => {
      rendered.setState({ deleteTab: true });

      instance.closeDialog('deleteTab');

      expect(rendered.state().deleteTab).toBe(false);
    });
  });

  describe('deleteSuccess()', () => {
    it('should call handleTabChange', () => {
      rendered.setProps({ tabIds: [1, 2], id: 2 });
      instance.handleTabChange = jest.fn();

      instance.deleteSuccess();

      TEST_HELPERS.expectCalledAndMatchSnapshot(instance.handleTabChange);
    });

    it('should NOT call handleTabChange', () => {
      rendered.setProps({ tabIds: [1, 2], id: 1 });
      instance.handleTabChange = jest.fn();

      instance.deleteSuccess();

      TEST_HELPERS.expectNotCalled(instance.handleTabChange);
    });
  });

  describe('handleTabChange()', () => {
    it('should handleTabChange()', () => {
      instance.handleTabChange();

      TEST_HELPERS.expectCalled(history.push);
    });
  });

  describe('renderContentDraggable()', () => {
    it('should render section and draggable props', () => {
      const snapshot = shallow(
        <div>
          {instance.renderContentDraggable(123)(
            {
              innerRef: 'some ref',
              draggableProps: { some: 'props' },
            },
            {},
          )}
        </div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderContent()', () => {
    it('should render EMPTY if !sectionIds.length', () => {
      const snapshot = shallow(<div>{instance.renderContent([])}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render Section List if sectionIds.length > 0', () => {
      instance.renderContentDraggable = jest.fn(() => 'renderContentDraggable');
      instance.renderInsertSection = jest.fn(() => 'renderInsertSection');

      const snapshot = shallow(<div>{instance.renderContent([1, 2, 3])}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderDroppable()', () => {
    it('should render content and droppable props', () => {
      instance.renderContent = () => 'renderContent';

      const snapshot = shallow(
        <div>
          {instance.renderDroppable([1, 2, 3])({
            innerRef: 'some ref',
            droppableProps: { some: 'props' },
          })}
        </div>,
      );

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('renderOverview()', () => {
    it('should renderOverview', () => {
      rendered.setProps({ showOverview: true });

      TEST_HELPERS.expectMatchSnapshot(instance.renderOverview([1]));
    });
  });

  describe('renderPrivateButton()', () => {
    it('should renderPrivateButton', () => {
      instance.renderPrivateTooltip = jest.fn();

      TEST_HELPERS.expectMatchSnapshot(instance.renderPrivateButton);
    });
  });

  describe('renderPrivateTooltip()', () => {
    it('should renderPrivateTooltip', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderPrivateTooltip);
    });
  });

  describe('renderRightColumn()', () => {
    it('should use default value', () => {
      expect(instance.renderRightColumn()).toBe(undefined);
    });

    it('should renderRightColumn', () => {
      rendered.setProps({ showOverview: true });

      TEST_HELPERS.expectMatchSnapshot(instance.renderRightColumn([1]));
    });
  });

  describe('renderSubtitle()', () => {
    it('should renderSubtitle', () => {
      rendered.setProps({ editable: true });

      TEST_HELPERS.expectMatchSnapshot(instance.renderSubtitle);
    });
  });

  describe('renderDescription()', () => {
    it('should renderDescription', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderDescription, [
        { content: 'content' },
      ]);
    });
  });

  describe('renderDefault', () => {
    it('should return null', () => {
      rendered.setProps({
        showOverview: false,
        showEmpty: false,
        sectionIds: [],
        pubSectionIds: [],
      });
      expect(instance.renderDefault()).toEqual(null);
    });
  });

  describe('renderAbout()', () => {
    it('should renderAbout', () => {
      instance.canEdit = jest.fn(() => true);
      instance.renderSubtitle = jest.fn(() => 'renderSubtitle');

      TEST_HELPERS.expectMatchSnapshot(instance.renderAbout);
    });
  });

  describe('renderTabPeople', () => {
    it('should match snapshot', () => {
      const snapshot = shallow(<div>{instance.renderTabPeople()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });

  describe('render()', () => {
    it('should render server error', () => {
      rendered.setProps({ serverError: 'some error' });

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render fetching', () => {
      rendered.setProps({ fetching: true });

      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render using sectionIds', () => {
      rendered.setProps({ sectionIds: [1, 2, 3] });
      const snapshot = shallow(<div>{instance.render()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });

    it('should render using pubSectionIds', () => {
      rendered.setProps({ offset: true, pubSectionIds: [1, 2, 3] });
      const snapshot = shallow(<div>{instance.render()}</div>);
      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
