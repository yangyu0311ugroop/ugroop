import { HIDDEN } from 'appConstants';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { ManageTabs } from '../index';

describe('<ManageTabs />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };
  const history = {
    push: jest.fn(),
  };
  const location = {
    pathname: 'http://sample',
    search: '?tab=1',
  };

  const props = {
    classes: {},
    location,
    resaga,
    history,
  };

  beforeEach(() => {
    rendered = shallow(<ManageTabs {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(ManageTabs).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('onDragStart()', () => {
    it('should onDragStart()', () => {
      instance.onDragStart();

      expect(rendered.state().dragStarted).toBe(true);
    });
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
          destination: { index: 3 },
        }),
      ).toBe(false);
    });

    it('should call update server and store', () => {
      instance.updateServer = jest.fn();
      instance.updateStore = jest.fn();
      instance.availableChildren = jest.fn(() => [1, 2, 3]);
      rendered.setProps({ children: [1, 2, 3] });

      expect(
        instance.onDragEnd({ source: { index: 1 }, destination: { index: 2 } }),
      ).toBe(true);

      expect(instance.updateServer).toBeCalledWith(1, 2);
      expect(instance.updateStore).toBeCalledWith(1, 2);
    });
  });

  describe('updateServer()', () => {
    it('should updateServer()', () => {
      instance.updateServer(1, 2);

      TEST_HELPERS.expectCalled(resaga.dispatchTo);
    });
  });

  describe('movingNode()', () => {
    it('should movingNode movingNodeBefore', () => {
      rendered.setProps({ movingNodeBefore: true });

      expect(instance.movingNode()).toBe(true);
    });

    it('should movingNode movingNodeAfter', () => {
      rendered.setProps({ movingNodeAfter: true });

      expect(instance.movingNode()).toBe(true);
    });
  });

  describe('isDragDisabled()', () => {
    it('should isDragDisabled()', () => {
      rendered.setProps({});
      instance.movingNode = jest.fn();

      instance.isDragDisabled();

      TEST_HELPERS.expectCalled(instance.movingNode);
    });
  });

  describe('updateStore()', () => {
    it('should updateStore()', () => {
      instance.changeTab = jest.fn();

      instance.updateStore(1, 2);

      TEST_HELPERS.expectCalled(resaga.setValue);
      TEST_HELPERS.expectCalled(instance.changeTab);
    });
  });

  describe('activeId()', () => {
    it('should activeId()', () => {
      rendered.setProps({ visibleChildren: [1, 2, 3] });

      expect(instance.activeId()).toBe(2);
    });

    it('should activeId() 0', () => {
      rendered.setProps({ visibleChildren: [1, 2, 3], location: {} });

      expect(instance.activeId()).toBe(1);
    });

    it('should activeId() tabId', () => {
      rendered.setProps({
        visibleChildren: [1, 2, 3],
        location: { search: '?tabId=2233' },
      });

      expect(instance.activeId()).toBe(2233);
    });
  });

  describe('changeTab()', () => {
    it('should changeTab()', () => {
      rendered.setProps({
        children: [1, 2, 3, 4, 5],
        visibleChildren: [1, 2, 4],
      });
      instance.activeId = jest.fn(() => 1);
      instance.goToTab = jest.fn();

      instance.changeTab(2, 1);

      expect(instance.goToTab).toBeCalledWith(0);
    });
  });

  describe('availableChildren()', () => {
    it('should availableChildren()', () => {
      rendered.setProps({
        children: [1, 2, 3, 4, 5, 6, 7],
        visibleChildren: [1, 2],
        privateIds: [3],
        hiddenIds: [4],
      });

      expect(instance.availableChildren()).toEqual([1, 2, 3, 4]);
    });
  });

  describe('handleVisibilitySuccess()', () => {
    it('should go to correct index when hiding', () => {
      instance.goToTab = jest.fn();
      instance.activeId = jest.fn(() => 4);
      instance.availableChildren = jest.fn(() => [1, 2, 3]);
      rendered.setProps({ visibleChildren: [1, 2, 3, 4, 5] });

      instance.handleVisibilitySuccess(2, HIDDEN);

      expect(instance.goToTab).toBeCalledWith(2);
    });

    it('should go to correct index when showing', () => {
      instance.goToTab = jest.fn();
      instance.activeId = jest.fn(() => 4);
      instance.availableChildren = jest.fn(() => [1, 2, 3, 4, 5]);
      rendered.setProps({
        children: [1, 2, 3, 4, 5],
        visibleChildren: [1, 2, 4],
      });

      instance.handleVisibilitySuccess(3, '');

      expect(instance.goToTab).toBeCalledWith(3);
    });
  });

  describe('goToTab()', () => {
    it('should goToTab()', () => {
      instance.goToTab(1);

      TEST_HELPERS.expectCalled(history.push);
    });
  });

  describe('goToTabId()', () => {
    it('should goToTabId()', () => {
      rendered.setProps({ visibleChildren: [11, 22] });

      instance.goToTabId(22)();

      TEST_HELPERS.expectCalledAndMatchSnapshot(history.push);
    });

    it('should goToTabId()', () => {
      rendered.setProps({ visibleChildren: [11, 22] });

      instance.goToTabId(3333)();

      TEST_HELPERS.expectCalledAndMatchSnapshot(history.push);
    });
  });

  describe('handleClose()', () => {
    it('should return null', () => {
      rendered.setState({ dragStarted: true });

      expect(instance.handleClose({}, 'escapeKeyDown')).toBe(null);
    });

    it('should return null #2', () => {
      instance.movingNode = jest.fn(() => true);

      expect(instance.handleClose()).toBe(null);
    });

    it('should handleClose', () => {
      PORTAL_HELPERS.close = jest.fn(() => 'PORTAL_HELPERS.close');

      expect(instance.handleClose()).toBe('PORTAL_HELPERS.close');
    });
  });

  describe('renderDraggableContent()', () => {
    it('should renderDraggableContent', () => {
      rendered.setProps({ id: 3, galleryId: 2, timelineId: 1 });
      TEST_HELPERS.expectMatchSnapshot(instance.renderDraggableContent, [
        {},
        {},
        {},
      ]);
    });
  });

  describe('renderRow()', () => {
    it('should renderRow', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderRow);
    });
  });

  describe('renderDroppableContent()', () => {
    it('should renderDroppableContent', () => {
      instance.renderRow = jest.fn(() => 'renderRow');
      instance.availableChildren = jest.fn(() => [1, 2]);

      TEST_HELPERS.expectMatchSnapshot(instance.renderDroppableContent);
    });
  });

  describe('renderDroppable()', () => {
    it('should renderDroppable', () => {
      instance.renderDroppableContent = jest.fn(() => 'renderDroppableContent');

      TEST_HELPERS.expectMatchSnapshot(instance.renderDroppable(), [{}]);
    });
  });

  describe('movingNode()', () => {
    it('should movingNode', () => {
      instance.movingNode = jest.fn(() => true);
      rendered.setProps({ updatingNode: true });

      TEST_HELPERS.expectMatchSnapshot(instance.movingNode);
    });
  });

  describe('render()', () => {
    it('should render correctly', () => {
      const snapshot = shallow(<div>{instance.render()}</div>);

      expect(toJSON(snapshot)).toMatchSnapshot();
    });
  });
});
