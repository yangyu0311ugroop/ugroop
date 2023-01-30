import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { shallow } from 'enzyme';
import React from 'react';
import { EVENT_VIEW_HELPERS } from 'smartComponents/Node/types/Event/helpers';
import MOMENT_HELPERS from 'utils/helpers/moment';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { ViewEvent } from '../index';

describe('<ViewEvent />', () => {
  let rendered;
  let instance;

  const resaga = {
    setValue: jest.fn(),
    dispatchTo: jest.fn(),
  };
  const event = { id: 99 };

  const props = {
    classes: {},
    resaga,
    event,
    startDate: MOMENT_HELPERS.testInstance,
  };

  beforeEach(() => {
    jest.clearAllMocks();

    rendered = shallow(<ViewEvent {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(ViewEvent).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('componentDidUpdate', () => {
    it('should set selectedId', () => {
      rendered.setProps({ dayId: 122 });

      instance.componentDidUpdate({ dayId: 11 });

      expect(rendered.state().selectedId).toBe(122);
    });

    it('should set showType', () => {
      rendered.setProps({ showType: 'Food' });

      instance.componentDidUpdate({ showType: 'Activity' });

      expect(rendered.state().showType).toBe('Food');
    });
  });

  describe('changeAction()', () => {
    it('should changeAction()', () => {
      instance.changeAction('create')();

      expect(rendered.state().action).toBe('create');
    });
  });

  describe('handleCloseDialog', () => {
    it('should set dialogOpen state to false', () => {
      PORTAL_HELPERS.close = jest.fn();

      instance.handleCloseDialog();

      TEST_HELPERS.expectCalled(PORTAL_HELPERS.close);
    });
  });

  describe('renderPart()', () => {
    it('should renderPart', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderPart, ['span']);
    });
  });

  describe('renderHeaderTime()', () => {
    it('should renderHeaderTime', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderHeaderTime);
    });
  });

  describe('renderHeader()', () => {
    it('should renderHeader', () => {
      rendered.setProps({ tourStartDate: 'startDate' });
      EVENT_VIEW_HELPERS.location = jest.fn(() => 'location');
      EVENT_VIEW_HELPERS.eventFullName = jest.fn(() => 'eventFullName');
      instance.renderStartTimeDate = jest.fn(() => 'renderStartTimeDate');
      instance.renderHeaderTime = jest.fn(() => 'renderHeaderTime');
      instance.renderHeaderStartDate = jest.fn(() => 'renderHeaderStartDate');

      TEST_HELPERS.expectMatchSnapshot(instance.renderHeader);
    });
  });

  describe('renderEventListEmpty()', () => {
    it('should renderEventListEmpty', () => {
      rendered.setState({ action: 'create' });

      TEST_HELPERS.expectMatchSnapshot(instance.renderEventListEmpty);
    });

    it('should renderEventListEmpty', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderEventListEmpty);
    });
  });

  describe('renderEvent()', () => {
    it('should renderEvent create', () => {
      rendered.setState({ action: 'create' });

      TEST_HELPERS.expectMatchSnapshot(instance.renderEvent);
    });

    it('should renderEvent plan', () => {
      rendered.setState({ action: 'plan' });

      TEST_HELPERS.expectMatchSnapshot(instance.renderEvent);
    });

    it('should renderEvent edit', () => {
      rendered.setState({ action: 'edit' });

      TEST_HELPERS.expectMatchSnapshot(instance.renderEvent);
    });

    it('should renderEvent edit', () => {
      rendered.setState({ action: 'view' });

      TEST_HELPERS.expectMatchSnapshot(instance.renderEvent);
    });
  });

  describe('handleScheduleEvent()', () => {
    it('should return null', () => {
      rendered.setProps({ dayIds: [] });

      expect(instance.handleScheduleEvent()).toBe(null);
    });

    it('should handleScheduleEvent', () => {
      instance.handleSelectDay = jest.fn(() => 'handleSelectDay');
      rendered.setProps({ dayIds: [1, 2] });

      TEST_HELPERS.expectDefined(instance.handleScheduleEvent);
    });
  });

  describe('handleSelectDay()', () => {
    it('should handleSelectDay()', () => {
      instance.handleSelectDay(1);

      expect(rendered.state().selectedId).toBe(1);
    });
  });

  describe('renderCreateEvent()', () => {
    it('should return null', () => {
      rendered.setProps({ canEditEvent: false });

      expect(instance.renderCreateEvent()).toBe(null);
    });

    it('should return null #2', () => {
      rendered.setProps({ readOnly: true });

      expect(instance.renderCreateEvent()).toBe(null);
    });

    it('should renderCreateEvent', () => {
      rendered.setProps({ canEditEvent: true });

      TEST_HELPERS.expectMatchSnapshot(instance.renderCreateEvent);
    });
  });

  describe('changeShowAll()', () => {
    it('should changeShowAll()', () => {
      instance.changeShowAll({ target: { checked: true } });

      expect(rendered.state().showAllDays).toBe(true);
    });
  });

  describe('renderDay()', () => {
    it('should renderDay', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderDay, [11]);
    });
  });

  describe('renderAmountsViewingMenu()', () => {
    it('should renderAmountsViewingMenu', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderAmountsViewingMenu, [{}]);
    });
  });

  describe('renderAmountsViewingPopper()', () => {
    it('should renderAmountsViewingPopper', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderAmountsViewingPopper);
    });
  });

  describe('changeShowType()', () => {
    it('should changeShowType()', () => {
      PORTAL_HELPERS.openViewEvent = jest.fn();

      instance.changeShowType('Food')();

      TEST_HELPERS.expectCalled(PORTAL_HELPERS.openViewEvent);
    });
  });

  describe('renderAmountsViewingButton()', () => {
    it('should renderAmountsViewingButton', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderAmountsViewingButton, [
        {},
      ]);
    });
  });

  describe('renderLeft()', () => {
    it('should return null', () => {
      rendered.setProps({ hideEventList: true });

      expect(instance.renderLeft()).toBe(null);
    });

    it('should return FlightBookings', () => {
      rendered.setProps({ flightBookingId: 223, dayId: null });

      TEST_HELPERS.expectMatchSnapshot(instance.renderLeft);
    });

    it('should return EventsWithoutDay', () => {
      rendered.setProps({ dayId: 0 });

      TEST_HELPERS.expectMatchSnapshot(instance.renderLeft);
    });

    it('should renderLeft !showAllDays', () => {
      rendered.setProps({ dayId: 11 });
      instance.renderSelectDate = jest.fn(() => 'renderSelectDate');
      instance.renderCreateEvent = jest.fn(() => 'renderCreateEvent');
      rendered.setState({
        selectedId: 1,
      });

      TEST_HELPERS.expectMatchSnapshot(instance.renderLeft);
    });

    it('should renderLeft showAllDays', () => {
      rendered.setProps({ dayId: 11, dayIds: [11, 12] });
      instance.renderSelectDate = jest.fn(() => 'renderSelectDate');
      instance.renderCreateEvent = jest.fn(() => 'renderCreateEvent');
      instance.renderDay = jest.fn(() => 'renderDay');
      rendered.setState({
        selectedId: 1,
        showAllDays: true,
      });

      TEST_HELPERS.expectMatchSnapshot(instance.renderLeft);
    });
  });

  describe('renderEventsWithoutDay()', () => {
    it('should return null', () => {
      expect(instance.renderEventsWithoutDay([])).toBe(null);
    });

    it('should renderEventsWithoutDay', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderEventsWithoutDay, [
        [1, 2],
      ]);
    });
  });

  describe('render()', () => {
    it('should render', () => {
      instance.renderLeft = jest.fn(() => 'renderLeft');
      instance.renderEvent = jest.fn(() => 'renderEvent');

      TEST_HELPERS.expectMatchSnapshot(instance.renderLeft);
    });

    it('should render smDown', () => {
      instance.renderLeft = jest.fn(() => 'renderLeft');
      instance.renderEvent = jest.fn(() => 'renderEvent');

      rendered.setProps({ smDown: true });

      TEST_HELPERS.expectMatchSnapshot(instance.renderLeft);
    });
  });
});
