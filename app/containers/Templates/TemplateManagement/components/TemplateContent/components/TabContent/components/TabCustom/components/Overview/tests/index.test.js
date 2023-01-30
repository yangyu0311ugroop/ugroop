import { ability } from 'apis/components/Ability/ability';
import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { TOUR_ITINERARY } from 'appConstants';
import tabHelper from 'datastore/templateManagementStore/helpers/tabs';
import { shallow } from 'enzyme';
import React from 'react';
import { scroller } from 'react-scroll';
import { LOGIC_HELPERS } from 'utils/helpers/logic';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { moment } from 'utils/index';
import { ACTIVITY, DAY } from 'utils/modelConstants';
import {
  ACCOMMODATIONS,
  ACTIVITIES,
  FOOD,
  ITINERARY,
  Overview,
  TRANSPORTATION,
  ATTACHMENT,
} from '../index';

describe('<Overview />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    history: { location: { pathname: 'some path' } },
    location: {},
  };

  beforeEach(() => {
    jest.clearAllMocks();

    rendered = shallow(<Overview {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(Overview).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentWillUnmount()', () => {
    it('should call clearTimeout', () => {
      global.clearTimeout = jest.fn();

      instance.componentWillUnmount();

      expect(global.clearTimeout).toBeCalled();
    });
  });

  describe('handleCreateSuccess', () => {
    it('should setState', () => {
      instance.handleClick = jest.fn(() => jest.fn());
      global.setTimeout = jest.fn(cb => cb());

      instance.handleCreateSuccess({ node: { id: 2323 } }, { id: 22 });

      TEST_HELPERS.expectCalled(instance.handleClick);
      expect(rendered.state().loading22).toBe(false);
    });
  });

  describe('scrolling', () => {
    it('should setState', () => {
      scroller.scrollTo = jest.fn();
      global.setTimeout = jest.fn(cb => cb());
      instance.scrolling()(1);
      expect(scroller.scrollTo).toBeCalled();
    });
  });

  describe('handleClick()', () => {
    it('should handleClick list view', () => {
      scroller.scrollTo = jest.fn();

      instance.handleClick(2233)();

      expect(scroller.scrollTo).toBeCalled();
      TEST_HELPERS.expectNotCalled(resaga.setValue);
    });
    it('should handleClick activity view', () => {
      rendered.setProps({ layout: 'list', type: 'activity' });
      scroller.scrollTo = jest.fn();

      instance.handleClick(2233)();

      expect(scroller.scrollTo).toBeCalled();
      expect(resaga.setValue).toBeCalledWith({ selectedId: 2233 });
    });
    it('should handleClick template', () => {
      rendered.setProps({ layout: 'list', templateId: 2233 });
      scroller.scrollTo = jest.fn();

      instance.handleClick(2233)();

      expect(scroller.scrollTo).toBeCalled();
      TEST_HELPERS.expectNotCalled(resaga.setValue);
    });
    it('should setValue selected id if view is day view', () => {
      rendered.setProps({
        layout: 'day',
        templateId: 2233,
        location: { search: '?dayView=day' },
        type: 'day',
      });
      scroller.scrollTo = jest.fn();

      instance.handleClick(2233)();

      expect(resaga.setValue).toBeCalledWith({ selectedId: 2233 });
    });
    it('should setValue selected id if view is day view do not scroll timer', () => {
      rendered.setProps({
        layout: 'day',
        templateId: 2233,
        location: { search: '?dayView=day' },
        type: 'day',
      });
      scroller.scrollTo = jest.fn();

      instance.handleClick(2233, false)();

      expect(resaga.setValue).toBeCalledWith({ selectedId: 2233 });
    });
  });

  describe('goToDayView()', () => {
    it('should goToDayView', () => {
      instance.goToDayView(2233)();

      TEST_HELPERS.expectCalled(resaga.setValue);
    });
  });

  describe('selectDay()', () => {
    it('should selectDay()', () => {
      instance.handleClick = jest.fn(() => () => false);

      instance.selectDay(2233);

      TEST_HELPERS.expectCalledAndMatchSnapshot(instance.handleClick);
    });
  });

  describe('plularalizeHeader()', () => {
    it('should return ITINERARY', () => {
      expect(instance.plularalizeHeader('some', null, 1)).toEqual('ITINERARY');
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
        instance.onDragEnd({ source: { index: 3 }, destination: { index: 3 } }),
      ).toBe(false);
    });

    it('should call update server and store', () => {
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
      tabHelper.moveChildren = jest.fn(() => 'moveChildren');

      instance.updateStore(2, 1);

      expect(resaga.setValue).toBeCalled();
      expect(resaga.setValue.mock.calls).toMatchSnapshot();
    });
  });

  describe('moveSuccess()', () => {
    it('should call handleClick', () => {
      instance.handleClick = jest.fn(() => jest.fn());
      instance.updateTimes = jest.fn();

      instance.moveSuccess({ id: 2233 });

      TEST_HELPERS.expectCalledAndMatchSnapshot(instance.handleClick);
      TEST_HELPERS.expectCalledAndMatchSnapshot(instance.updateTimes);
    });
  });

  describe('updateTimes()', () => {
    it('should call NODE_API_HELPERS.getTreeAndTimes', () => {
      NODE_API_HELPERS.getTreeAndTimes = jest.fn();
      rendered.setProps({ type: DAY });

      instance.updateTimes({ id: 2233 });

      TEST_HELPERS.expectCalledAndMatchSnapshot(
        NODE_API_HELPERS.getTreeAndTimes,
      );
    });

    it('should NOT call NODE_API_HELPERS.getTreeAndTimes', () => {
      NODE_API_HELPERS.getTreeAndTimes = jest.fn();
      rendered.setProps({ type: ACTIVITY });

      instance.updateTimes({ id: 2233 });

      expect(NODE_API_HELPERS.getTreeAndTimes).not.toBeCalled();
    });
  });

  describe('editable()', () => {
    it('should return true', () => {
      ability.can = jest.fn(() => true);
      rendered.setProps({ editable: true });

      expect(instance.editable()).toBe(true);
    });

    it('should return false #1', () => {
      ability.can = jest.fn(() => false);

      expect(instance.editable()).toBe(false);
    });

    it('should return false #2', () => {
      ability.can = jest.fn(() => true);
      rendered.setProps({ editable: false });

      expect(instance.editable()).toBe(false);
    });
  });

  describe('showInsertBefore()', () => {
    it('should return true #1', () => {
      instance.hoverTop = jest.fn(() => true);

      expect(instance.showInsertBefore()).toBe(true);
    });

    it('should return true #2', () => {
      instance.hoverBottom = jest.fn(() => true);

      expect(instance.showInsertBefore()).toBe(true);
    });

    it('should return true #3', () => {
      instance.hoverIcon = jest.fn(() => true);

      expect(instance.showInsertBefore()).toBe(true);
    });

    it('should return true #4', () => {
      instance.loading = jest.fn(() => true);

      expect(instance.showInsertBefore()).toBe(true);
    });
  });

  describe('loading()', () => {
    it('should return state', () => {
      expect(instance.loading(2233)).toBe(rendered.state().loading2233);
    });
  });

  describe('hoverTop()', () => {
    it('should return state', () => {
      expect(instance.hoverTop(2233)).toBe(rendered.state().hoverTop2233);
    });
  });

  describe('hoverBottom()', () => {
    it('should return state', () => {
      expect(instance.hoverBottom(2233)).toBe(rendered.state().hoverBottom2233);
    });
  });

  describe('hoverIcon()', () => {
    it('should return false', () => {
      instance.loading = jest.fn(() => true);

      expect(instance.hoverIcon(2233)).toBe(false);
    });

    it('should return state', () => {
      instance.loading = jest.fn(() => false);

      expect(instance.hoverIcon(2233)).toBe(rendered.state().hoverIcon2233);
    });
  });

  describe('hoverRow()', () => {
    it('should return state', () => {
      expect(instance.hoverRow(2233)).toBe(rendered.state().hoverRow2233);
    });
  });

  describe('rowEnter()', () => {
    it('should setState', () => {
      instance.rowEnter(2233)();

      expect(rendered.state().hoverRow2233).toBe(true);
    });
  });

  describe('rowLeave()', () => {
    it('should setState', () => {
      instance.rowLeave(2233)();

      expect(rendered.state().hoverRow2233).toBe(false);
    });
  });

  describe('iconEnter()', () => {
    it('should setState', () => {
      instance.iconEnter(2233)();

      expect(rendered.state().hoverIcon2233).toBe(true);
    });
  });

  describe('iconLeave()', () => {
    it('should setState', () => {
      instance.iconLeave(2233)();

      expect(rendered.state().hoverIcon2233).toBe(false);
    });
  });

  describe('topEnter()', () => {
    it('should setState', () => {
      instance.topEnter(2233)();

      expect(rendered.state().hoverTop2233).toBe(true);
    });
  });

  describe('topLeave()', () => {
    it('should setState', () => {
      instance.topLeave(2233)();

      expect(rendered.state().hoverTop2233).toBe(false);
    });
  });

  describe('bottomEnter()', () => {
    it('should setState', () => {
      instance.bottomEnter(2233)();

      expect(rendered.state().hoverBottom2233).toBe(true);
    });
  });

  describe('bottomLeave()', () => {
    it('should setState', () => {
      instance.bottomLeave(2233)();

      expect(rendered.state().hoverBottom2233).toBe(false);
    });
  });

  describe('renderContent()', () => {
    it('should renderContent', () => {
      rendered.setProps({ variant: TOUR_ITINERARY });

      TEST_HELPERS.expectMatchSnapshot(instance.renderContent, [
        {
          id: 1,
          selectedId: 1,
          layout: 'list',
        },
      ]);
    });
  });

  describe('handleInsertButton', () => {
    it('should setState', () => {
      instance.iconLeave = jest.fn(() => jest.fn());

      instance.handleInsertButton(22, 2233)();

      expect(rendered.state().loading2233).toBe(true);
      TEST_HELPERS.expectCalledAndMatchSnapshot(instance.iconLeave);
    });
  });

  describe('date()', () => {
    it('should return null', () => {
      rendered.setProps({ startDate: false });

      expect(instance.date()).toBe(null);
    });

    it('should date', () => {
      moment.renderDateShorter = jest.fn(() => 'renderDateShorter');

      rendered.setProps({ startDate: new Date() });

      expect(instance.date()).toBe('renderDateShorter');
    });
  });

  describe('showDayTitle()', () => {
    it('should showDayTitle()', () => {
      instance.showDayTitle();
      expect(resaga.setValue).toBeCalledWith({ headerValue: ITINERARY });
    });
  });

  describe('showAccommodations()', () => {
    it('should showAccommodations()', () => {
      instance.showAccommodations();
      expect(resaga.setValue).toBeCalledWith({ headerValue: ACCOMMODATIONS });
    });
  });

  describe('showActivity()', () => {
    it('should showActivity()', () => {
      instance.showActivity();
      expect(resaga.setValue).toBeCalledWith({ headerValue: ACTIVITIES });
    });
  });

  describe('showFood()', () => {
    it('should showFood()', () => {
      instance.showFood();
      expect(resaga.setValue).toBeCalledWith({ headerValue: FOOD });
    });
  });

  describe('showTransportation()', () => {
    it('should showTransportation()', () => {
      instance.showTransportation();
      expect(resaga.setValue).toBeCalledWith({ headerValue: TRANSPORTATION });
    });
  });
  describe('showAttachment()', () => {
    it('should showAttachment()', () => {
      instance.showAttachment();
      expect(resaga.setValue).toBeCalledWith({ headerValue: ATTACHMENT });
    });
  });
  describe('showChecklist()', () => {
    it('should showChecklist()', () => {
      instance.showChecklist();
      expect(resaga.setValue).toBeCalledWith({ headerValue: 'checklist' });
    });
  });
  describe('grouping()', () => {
    it('should grouping()', () => {
      LOGIC_HELPERS.switchCase = jest.fn(() => 'switchCase');

      expect(instance.grouping(ACCOMMODATIONS)).toBe('switchCase');

      TEST_HELPERS.expectCalledAndMatchSnapshot(LOGIC_HELPERS.switchCase);
    });
  });

  describe('renderSubHeader()', () => {
    it('should return null', () => {
      rendered.setProps({ startDate: false });
      instance.isDayrow = jest.fn(() => true);

      expect(instance.renderSubHeader()).toBe(null);
    });

    it('should renderSubHeader for day', () => {
      instance.date = jest.fn(() => 'date');
      instance.isDayrow = jest.fn(() => true);
      rendered.setProps({ startDate: true });

      TEST_HELPERS.expectMatchSnapshot(instance.renderSubHeader);
    });
    it('should renderSubHeader for tour', () => {
      instance.date = jest.fn(() => 'date');
      instance.isDayrow = jest.fn(() => false);
      rendered.setProps({ startDate: true });

      TEST_HELPERS.expectMatchSnapshot(instance.renderSubHeader);
    });
  });

  describe('renderChecklist()', () => {
    it('should renderChecklist', () => {
      instance.date = jest.fn(() => 'date');
      TEST_HELPERS.expectMatchSnapshot(instance.renderChecklist, [
        { id: 1, index: 1 },
      ]);
    });
    it('should renderChecklist', () => {
      instance.date = jest.fn(() => 'date');
      rendered.setProps({ headerValue: 'checklist' });

      TEST_HELPERS.expectMatchSnapshot(instance.renderChecklist, [
        { id: 1, index: 1 },
      ]);
    });
  });

  describe('renderGallery()', () => {
    it('should return null', () => {
      rendered.setProps({ showGallery: false });

      expect(instance.renderGallery()).toBe(null);
    });

    it('should renderGallery', () => {
      rendered.setProps({ showGallery: true });

      TEST_HELPERS.expectMatchSnapshot(instance.renderGallery, [1122, 0]);
    });
  });
  describe('renderAttachment()', () => {
    it('should return null', () => {
      expect(instance.renderAttachment()).toBe(null);
    });

    it('should renderAttachment', () => {
      rendered.setProps({ headerValue: ATTACHMENT });
      TEST_HELPERS.expectMatchSnapshot(instance.renderAttachment, [1]);
    });
  });
  describe('renderEventsOnDay()', () => {
    it('should renderEventsOnDay', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderEventsOnDay, [{}]);
    });
  });

  describe('renderContent()', () => {
    beforeEach(() => {
      instance.renderSubHeader = jest.fn(() => 'renderSubHeader');
      instance.renderFeedback = jest.fn(() => 'renderFeedback');
    });

    it('should renderContent editable true', () => {
      instance.editable = jest.fn(() => true);
      instance.hoverIcon = jest.fn(() => true);
      instance.isDayrow = jest.fn(() => true);
      rendered.setProps({ ids: [1, 2] });

      TEST_HELPERS.expectMatchSnapshot(instance.renderContent, [{}]);
    });

    it('should renderContent editable false', () => {
      instance.editable = jest.fn(() => false);
      instance.hoverIcon = jest.fn(() => false);
      instance.isDayrow = jest.fn(() => true);
      rendered.setProps({ ids: [1], layout: 'day' });

      TEST_HELPERS.expectMatchSnapshot(instance.renderContent, [{}]);
    });
    it('should renderContent ATTACHMENT', () => {
      instance.editable = jest.fn(() => false);
      instance.hoverIcon = jest.fn(() => false);

      TEST_HELPERS.expectMatchSnapshot(instance.renderContent, [
        { headerValue: ATTACHMENT },
      ]);
    });
    it('should renderContent CHECKLIST', () => {
      instance.editable = jest.fn(() => false);
      instance.hoverIcon = jest.fn(() => false);
      instance.isDayrow = jest.fn(() => false);

      TEST_HELPERS.expectMatchSnapshot(instance.renderContent, [
        { headerValue: 'checklist' },
      ]);
    });
  });

  describe('renderDraggableContent()', () => {
    it('should renderDraggableContent', () => {
      instance.renderContent = jest.fn(() => 'renderContent');

      TEST_HELPERS.expectMatchSnapshot(
        instance.renderDraggableContent(2233, 12),
        [{}],
      );
    });
  });

  describe('renderInsertBeforeButton()', () => {
    it('should renderInsertBeforeButton', () => {
      TEST_HELPERS.expectMatchSnapshot(
        instance.renderInsertBeforeButton(2233),
        [{}],
      );
    });
  });

  describe('renderInsertBefore()', () => {
    it('should return null #1', () => {
      instance.editable = jest.fn(() => false);

      expect(instance.renderInsertBefore()).toBe(false);
    });

    it('should return null #2', () => {
      instance.editable = jest.fn(() => true);
      instance.showInsertBefore = jest.fn(() => false);

      expect(instance.renderInsertBefore()).toBe(false);
    });

    it('should renderInsertBefore', () => {
      instance.editable = jest.fn(() => true);
      instance.showInsertBefore = jest.fn(() => true);

      TEST_HELPERS.expectMatchSnapshot(instance.renderInsertBefore, [2233, 12]);
    });
  });

  describe('renderRowContent()', () => {
    it('should renderDraggableContent', () => {
      instance.renderDraggableContent = jest.fn(() => 'renderDraggableContent');
      instance.editable = jest.fn(() => true);

      TEST_HELPERS.expectMatchSnapshot(instance.renderRowContent);
    });

    it('should renderContent', () => {
      instance.renderContent = jest.fn(() => 'renderContent');
      instance.editable = jest.fn(() => false);

      TEST_HELPERS.expectMatchSnapshot(instance.renderRowContent);
    });
    it('should renderContent', () => {
      instance.renderContent = jest.fn(() => 'renderContent');
      instance.editable = jest.fn(() => false);
      instance.getLayout = jest.fn(() => 'day');

      TEST_HELPERS.expectMatchSnapshot(instance.renderRowContent, [1, 1]);
    });
  });

  describe('renderRow()', () => {
    it('should renderRow', () => {
      instance.renderRowContent = jest.fn(() => 'renderRowContent');
      instance.renderInsertBefore = jest.fn(() => 'renderInsertBefore');

      TEST_HELPERS.expectMatchSnapshot(instance.renderRow);
    });
  });

  describe('renderNewNodeButton()', () => {
    it('should render loading', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderNewNodeButton, [
        { loading: true },
      ]);
    });

    it('should renderNewNodeButton', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderNewNodeButton, [{}]);
    });
  });

  describe('renderNewNode()', () => {
    it('should return null', () => {
      instance.editable = jest.fn(() => false);

      expect(instance.renderNewNode()).toBe(null);
    });

    it('should return null 2', () => {
      rendered.setProps({ ids: [] });
      instance.editable = jest.fn(() => true);

      TEST_HELPERS.expectMatchSnapshot(instance.renderNewNode);
    });

    it('should renderNewNode', () => {
      rendered.setProps({ ids: [1] });
      instance.editable = jest.fn(() => true);

      TEST_HELPERS.expectMatchSnapshot(instance.renderNewNode);
    });
    it('should renderNewNode', () => {
      instance.editable = jest.fn(() => true);
      rendered.setProps({ ids: [1, 2] });

      TEST_HELPERS.expectMatchSnapshot(instance.renderNewNode);
    });
  });

  describe('renderShowDownload()', () => {
    it('should return null', () => {
      rendered.setProps({
        showDownload: false,
        history: { location: { pathname: 'some path' } },
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderShowDownload);
    });

    it('should renderShowDownload', () => {
      rendered.setProps({
        showDownload: true,
        history: { location: { pathname: 'some path' } },
      });

      TEST_HELPERS.expectMatchSnapshot(instance.renderShowDownload);
    });
    it('should match snapshot when on public', () => {
      rendered.setProps({
        showDownload: false,
        history: { location: { pathname: 'some path' } },
        isPublic: true,
      });
      TEST_HELPERS.expectMatchSnapshot(instance.renderShowDownload);
    });
  });

  describe('renderHeaderButton()', () => {
    it('should renderHeaderButton', () => {
      LOGIC_HELPERS.switchCase = jest.fn(() => 'LOGIC_HELPERS.switchCase');

      TEST_HELPERS.expectMatchSnapshot(instance.renderHeaderButton({}), [{}]);
    });
  });

  describe('renderHeaderMenu()', () => {
    it('should renderHeaderMenu', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderHeaderMenu(), [{}]);
    });
  });

  describe('renderHeader()', () => {
    it('should return null', () => {
      rendered.setProps({ header: false });

      expect(instance.renderHeader()).toBe(null);
    });

    it('should renderHeader', () => {
      rendered.setProps({ header: true });

      TEST_HELPERS.expectMatchSnapshot(instance.renderHeader);
    });

    it('should renderHeader TOUR_ITINERARY', () => {
      rendered.setProps({ header: true, variant: TOUR_ITINERARY });

      TEST_HELPERS.expectMatchSnapshot(instance.renderHeader);
    });
  });

  describe('renderDroppableContent()', () => {
    it('should return placeholder', () => {
      rendered.setProps({ ids: [], showEmpty: true });

      TEST_HELPERS.expectMatchSnapshot(instance.renderDroppableContent);
    });

    it('should renderDroppableContent', () => {
      instance.renderRow = jest.fn(() => 'renderRow');
      rendered.setProps({ ids: [1, 2] });

      TEST_HELPERS.expectMatchSnapshot(instance.renderDroppableContent);
    });
  });

  describe('renderDroppable()', () => {
    it('should renderDroppable', () => {
      instance.renderDroppableContent = jest.fn(() => 'renderDroppableContent');

      TEST_HELPERS.expectMatchSnapshot(instance.renderDroppable(), [{}]);
    });
  });

  describe('renderBody()', () => {
    it('should return editable', () => {
      instance.editable = jest.fn(() => true);
      instance.renderDroppable = jest.fn(() => 'renderDroppable');

      TEST_HELPERS.expectMatchSnapshot(instance.renderBody);
    });

    it('should renderBody editable', () => {
      rendered.setProps({ ids: [1, 2] });
      instance.editable = jest.fn(() => true);
      instance.renderDroppable = jest.fn(() => 'renderDroppable');

      TEST_HELPERS.expectMatchSnapshot(instance.renderBody);
    });

    it('should renderBody', () => {
      rendered.setProps({ ids: [1, 2] });
      instance.editable = jest.fn(() => false);
      instance.renderDroppableContent = jest.fn(() => 'renderDroppableContent');

      TEST_HELPERS.expectMatchSnapshot(instance.renderBody);
    });
    it('should renderBody checklist', () => {
      rendered.setProps({ ids: [1, 2], headerValue: 'checklist' });
      instance.editable = jest.fn(() => false);
      instance.renderDroppableContent = jest.fn(() => 'renderDroppableContent');

      TEST_HELPERS.expectMatchSnapshot(instance.renderBody);
    });
  });

  describe('handleScroll()', () => {
    it('should return null', () => {
      expect(instance.handleScroll()).toBe(null);
    });

    it('should handleScroll', () => {
      rendered.setProps({ type: 'day' });
      instance.handleScroll({ id: 'day1' });

      expect(rendered.state().activeId).toBe(1);
    });

    it('should handleScroll invalid id', () => {
      instance.handleScroll({ id: 'daywrong' });

      expect(instance.handleScroll()).toBe(null);
    });
  });

  describe('render()', () => {
    it('should return null', () => {
      rendered.setProps({ showEmpty: false, ids: [] });

      expect(instance.render()).toBe(null);
    });

    it('should render', () => {
      rendered.setProps({ ids: [1, 2] });
      instance.renderHeader = jest.fn(() => 'renderHeader');
      instance.renderBody = jest.fn(() => 'renderBody');
      instance.renderNewNode = jest.fn(() => 'renderNewNode');

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
