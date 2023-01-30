import { ability } from 'apis/components/Ability/ability';
import { shallow } from 'enzyme';
import momentjs from 'moment';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { scroller } from 'react-scroll';
import { TabDayView } from '../index';

describe('<TabDayView />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };

  const props = {
    classes: {},
    resaga,
    previousLayout: 'day',
  };

  beforeEach(() => {
    jest.clearAllMocks();

    rendered = shallow(<TabDayView {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(TabDayView).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentWillMount()', () => {
    it('should componentWillMount', () => {
      instance.selectDay = jest.fn();

      instance.componentWillMount();

      expect(instance.selectDay).toBeCalledWith(instance.props);
    });
  });

  describe('componentWillReceiveProps()', () => {
    it('should componentWillReceiveProps', () => {
      instance.selectDay = jest.fn();

      instance.componentWillReceiveProps({ hi: 'ho' });

      expect(instance.selectDay).toBeCalledWith({ hi: 'ho' });
    });
  });

  describe('selectDay()', () => {
    it('should return null', () => {
      expect(instance.selectDay({ dayIds: undefined })).toBe(null);
    });

    it('should return null #2', () => {
      expect(instance.selectDay({ dayIds: [1], selectedId: 1 })).toBe(null);
    });

    it('should selectDay', () => {
      instance.selectToday = jest.fn(() => 'selectToday');

      expect(instance.selectDay({ dayIds: [1], selectedId: 0 })).toBe(
        'selectToday',
      );
    });
  });

  describe('todayIndex()', () => {
    it('should return null', () => {
      expect(instance.todayIndex({ dayIds: undefined })).toBe(null);
    });

    it('should return -1', () => {
      expect(instance.todayIndex({ dayIds: [1], startDate: '' })).toBe(-1);
    });

    it('should return todayIndex 0', () => {
      const startDate = '1899-12-31T23:59:59.999Z';
      instance.selectToday = jest.fn(() => 'selectToday');

      rendered.setProps({ dayIds: [1], startDate });

      expect(instance.todayIndex(undefined, momentjs(startDate))).toBe(0);
    });

    it('should return todayIndex 1', () => {
      const startDate = '1899-12-30T23:59:59.999Z';
      const today = '1899-12-31T23:59:59.999Z';
      instance.selectToday = jest.fn(() => 'selectToday');

      rendered.setProps({ dayIds: [1, 2], startDate });

      expect(instance.todayIndex(undefined, momentjs(today))).toBe(1);
    });

    it('should return todayIndex -1', () => {
      const startDate = '1899-12-29T23:59:59.999Z';
      const today = '1899-12-31T23:59:59.999Z';
      instance.selectToday = jest.fn(() => 'selectToday');

      rendered.setProps({ dayIds: [1, 2], startDate });

      expect(instance.todayIndex(undefined, momentjs(today))).toBe(-1);
    });
  });

  describe('selectToday()', () => {
    it('should return null', () => {
      expect(instance.selectToday(undefined, { dayIds: undefined })).toBe(null);
    });

    it('should handleClick 0', () => {
      instance.handleClick = jest.fn(() => () => 'handleClick0');
      rendered.setProps({ dayIds: [1], startDate: '' });

      expect(instance.selectToday()).toBe('handleClick0');
    });

    it('should handleClick todayIndex 2', () => {
      instance.handleClick = jest.fn(() => () => 'handleClick');
      instance.todayIndex = jest.fn(() => 1);
      rendered.setProps({ dayIds: [1, 2], startDate: '1' });

      expect(instance.selectToday()).toBe('handleClick');
      TEST_HELPERS.expectCalledAndMatchSnapshot(instance.handleClick);
    });

    it('should handleClick todayIndex 1', () => {
      instance.handleClick = jest.fn(() => () => 'handleClick');
      instance.todayIndex = jest.fn(() => -1);
      rendered.setProps({ dayIds: [1, 2], startDate: '1' });

      expect(instance.selectToday()).toBe('handleClick');
      TEST_HELPERS.expectCalledAndMatchSnapshot(instance.handleClick);
    });
  });

  describe('canEdit()', () => {
    it('should return null', () => {
      rendered.setProps({ editable: false });

      expect(instance.canEdit()).toBe(false);
    });

    it('should canEdit', () => {
      rendered.setProps({ editable: true });
      ability.can = jest.fn(() => 'can');

      expect(instance.canEdit()).toBe('can');
    });
  });

  describe('handleClick()', () => {
    it('should handleClick', () => {
      instance.handleClick(2233)();

      TEST_HELPERS.expectMatchSnapshot(resaga.setValue);
    });
  });

  describe('selected()', () => {
    it('should return false', () => {
      rendered.setProps({ selectedId: 0 });

      expect(instance.selected()).toBe(false);
    });

    it('should return false #2', () => {
      rendered.setProps({ selectedId: 3, dayIds: [1, 2] });

      expect(instance.selected()).toBe(false);
    });

    it('should return true', () => {
      rendered.setProps({ selectedId: 1, dayIds: [1, 2] });

      expect(instance.selected()).toBe(true);
    });
  });

  describe('selectedIndex()', () => {
    it('should return 0', () => {
      instance.selected = jest.fn(() => false);

      expect(instance.selectedIndex()).toBe(0);
    });

    it('should return selectedIndex', () => {
      instance.selected = jest.fn(() => true);

      rendered.setProps({ dayIds: [1, 2, 3], selectedId: 3 });

      expect(instance.selectedIndex()).toBe(2);
    });
  });

  describe('onSwiped()', () => {
    it('should nextDay to be called', () => {
      // instance.nextDay = jest.fn();
      rendered.setState({ swiping: true, deltaX: 300 });
      rendered.setProps({ selectedId: 1, dayIds: [1, 2] });
      instance.onSwiped({ dir: 'Left' });
      expect(resaga.setValue).toBeCalled();
    });
    it('should prevDay to be called and return sencond day', () => {
      rendered.setState({ swiping: true, deltaX: 300 });
      rendered.setProps({ selectedId: 1, dayIds: [1, 2, 3] });
      instance.onSwiped({ dir: 'Right' });
      expect(resaga.setValue).toBeCalled();
    });
    it('should prevDay to be called', () => {
      rendered.setState({ swiping: true, deltaX: 300 });
      rendered.setProps({ selectedId: 2, dayIds: [1, 2, 3] });
      instance.onSwiped({ dir: 'Right' });
      expect(resaga.setValue).toBeCalled();
    });
    it('should do nothing', () => {
      rendered.setState({ swiping: true, deltaX: 300 });
      instance.prevDay = jest.fn();
      instance.onSwiped();
      expect(resaga.setValue).not.toBeCalled();
    });
    it('should do nothing and navigation to day should not be executed', () => {
      rendered.setState({ swiping: false, deltaX: 200 });
      instance.onSwiped();
      expect(resaga.setValue).not.toBeCalled();
    });
  });

  describe('onSwiping()', () => {
    it('should onSwiping()', () => {
      instance.onSwiping({ deltaX: 1 });
      expect(rendered.state().swiping).toBe(true);
      expect(rendered.state().deltaX).toBe(1);
    });
  });

  describe('scrolling()', () => {
    it('should scrolling()', () => {
      scroller.scrollTo = jest.fn(() => '');

      instance.scrolling(2233)();

      TEST_HELPERS.expectCalledAndMatchSnapshot(scroller.scrollTo);
    });
  });

  describe('componentWillUnmount()', () => {
    it('should call clearTimeout', () => {
      global.clearTimeout = jest.fn();

      instance.componentWillUnmount();

      expect(global.clearTimeout).toBeCalled();
    });
  });

  describe('selectedDayId()', () => {
    it('should return dayIds[0]', () => {
      instance.selected = jest.fn(() => false);

      rendered.setProps({ dayIds: [1, 2, 3] });

      expect(instance.selectedDayId()).toBe(1);
    });

    it('should return selectedId', () => {
      instance.selected = jest.fn(() => true);

      rendered.setProps({ selectedId: 3 });

      expect(instance.selectedDayId()).toBe(3);
    });
  });

  describe('render()', () => {
    it('should return null', () => {
      rendered.setProps({ dayIds: [] });

      expect(instance.render()).toBe(null);
    });
    it('should render', () => {
      instance.selectedIndex = jest.fn(() => 0);
      instance.selectedDayId = jest.fn(() => 0);
      instance.todayIndex = jest.fn(() => 0);

      rendered.setProps({ dayIds: [1] });

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
    it('should render checklist only', () => {
      instance.selectedIndex = jest.fn(() => 0);
      instance.selectedDayId = jest.fn(() => 0);
      instance.todayIndex = jest.fn(() => 0);

      rendered.setProps({ dayIds: [1], renderChecklistView: true });

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
    it('should render public only', () => {
      instance.selectedIndex = jest.fn(() => 0);
      instance.selectedDayId = jest.fn(() => 0);
      instance.todayIndex = jest.fn(() => 0);

      rendered.setProps({
        dayIds: [1],
        renderChecklistView: true,
        isPublic: true,
      });

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
