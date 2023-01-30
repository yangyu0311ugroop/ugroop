import { ability } from 'apis/components/Ability/ability';
import { NODE_API_HELPERS } from 'apis/components/Node/helpers';
import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { shallow } from 'enzyme';
import React from 'react';
import { EVENT_DATA_HELPERS } from 'smartComponents/Node/types/Event/dataHelpers';
import { EVENT_VIEW_HELPERS } from 'smartComponents/Node/types/Event/helpers';
import { EVENT_HELPERS } from 'utils/helpers/events';
import MOMENT_HELPERS from 'utils/helpers/moment';
import { NODE_HELPERS } from 'utils/helpers/nodes';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { EVENT } from 'utils/modelConstants';
import { ViewEvent } from '../index';

describe('<ViewEvent />', () => {
  let rendered;
  let instance;

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

    rendered = shallow(<ViewEvent {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(ViewEvent).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('renderTypeSubTypeIcon()', () => {
    it('should renderTypeSubTypeIcon', () => {
      TEST_HELPERS.expectDefined(instance.renderTypeSubTypeIcon);
    });
  });

  describe('startDayId()', () => {
    it('should return selectedStartDay', () => {
      EVENT_VIEW_HELPERS.batchCreate = jest.fn(() => true);
      EVENT_VIEW_HELPERS.tempDayRange = jest.fn(() => [11]);
      rendered.setState({ selectedStartDay: 11 });

      expect(instance.startDayId()).toBe(11);
    });

    it('should return first tempDayRange', () => {
      EVENT_VIEW_HELPERS.batchCreate = jest.fn(() => true);
      EVENT_VIEW_HELPERS.tempDayRange = jest.fn(() => [10, 11, 12]);
      rendered.setState({ selectedStartDay: 333 });

      expect(instance.startDayId()).toBe(10);
    });

    it('should return tempStartDay', () => {
      EVENT_VIEW_HELPERS.batchCreate = jest.fn(() => false);
      instance.tempStartDay = jest.fn(() => '10');

      expect(instance.startDayId()).toBe(10);
    });
  });

  describe('handleSelectDate()', () => {
    it('should return null', () => {
      expect(instance.handleSelectDate(0, true)()).toBe(null);
    });

    it('should handleSelectDate', () => {
      EVENT_VIEW_HELPERS.tempDayRange = jest.fn(() => [11, 12, 13]);

      instance.handleSelectDate(1, false)();

      expect(rendered.state().selectedStartDay).toBe(12);
    });
  });

  describe('renderDayDate()', () => {
    it('should renderDayDate', () => {
      TEST_HELPERS.expectMatchSnapshot(
        instance.renderDayDate([11, 12, 13], 12)('Day 12', 2),
      );
    });
  });

  describe('renderDayDates()', () => {
    it('should renderDayDates', () => {
      instance.renderDayDate = jest.fn(() => () => 'renderDayDate');

      TEST_HELPERS.expectMatchSnapshot(instance.renderDayDates, [[11, 12, 13]]);
    });
  });

  describe('renderBatchCreateSelect()', () => {
    it('should return null', () => {
      EVENT_VIEW_HELPERS.tempDayRange = jest.fn(() => null);

      expect(instance.renderBatchCreateSelect()).toBe(null);
    });

    it('should return null 2', () => {
      EVENT_VIEW_HELPERS.tempDayRange = jest.fn(() => []);

      expect(instance.renderBatchCreateSelect()).toBe(null);
    });

    it('should renderBatchCreateSelect', () => {
      EVENT_VIEW_HELPERS.tempDayRange = jest.fn(() => [11, 12, 13]);
      instance.renderDayDates = jest.fn(() => 'renderDayDates');

      TEST_HELPERS.expectMatchSnapshot(instance.renderBatchCreateSelect);
    });
  });

  describe('tempStartDay()', () => {
    it('should tempStartDay', () => {
      EVENT_VIEW_HELPERS.tempStartDay = jest.fn(() => 'tempStartDay');

      expect(instance.tempStartDay()).toBe('tempStartDay');
    });

    it('should return parentNodeId', () => {
      EVENT_VIEW_HELPERS.tempStartDay = jest.fn(() => '');
      EVENT_VIEW_HELPERS.parentNodeId = jest.fn(() => 'parentNodeId');

      expect(instance.tempStartDay()).toBe('parentNodeId');
    });
  });

  describe('tempEndDay()', () => {
    it('should tempEndDay', () => {
      EVENT_VIEW_HELPERS.tempEndDay = jest.fn(() => 'tempEndDay');

      expect(instance.tempEndDay()).toBe('tempEndDay');
    });

    it('should endTimeValue empty', () => {
      EVENT_VIEW_HELPERS.tempEndDay = jest.fn(() => '');
      EVENT_VIEW_HELPERS.endTimeValue = jest.fn(() => '');

      expect(instance.tempEndDay()).toBe('P0D');
    });

    it('should return parentNodeId', () => {
      EVENT_VIEW_HELPERS.tempEndDay = jest.fn(() => '');
      EVENT_VIEW_HELPERS.endTimeValue = jest.fn(() => '111');
      EVENT_DATA_HELPERS.durationToDays = jest.fn(() => 1);

      expect(instance.tempEndDay()).toBe('P1D');
    });
  });

  describe('tempStartTime()', () => {
    it('should tempStartTime', () => {
      rendered.setProps({ action: 'edit' });
      EVENT_VIEW_HELPERS.startTime = jest.fn(() => 'startTime');

      expect(instance.tempStartTime()).toBe('startTime');
    });
  });

  describe('tempEndTime()', () => {
    it('should tempEndTime', () => {
      EVENT_VIEW_HELPERS.endTime = jest.fn(() => 'endTime');

      expect(instance.tempEndTime()).toBe('endTime');
    });
  });

  describe('renderDirectionsPopperButton()', () => {
    it('should renderDirectionsPopperButton', () => {
      TEST_HELPERS.expectDefined(instance.renderDirectionsPopperButton, [{}]);
    });
  });

  describe('renderDirectionsMenu()', () => {
    it('should renderDirectionsMenu', () => {
      TEST_HELPERS.expectDefined(instance.renderDirectionsMenu, [{}]);
    });
  });

  describe('renderLocationAction()', () => {
    it('should return null', () => {
      EVENT_VIEW_HELPERS.isTransportation = jest.fn(() => false);
      EVENT_VIEW_HELPERS.locationHref = jest.fn(() => '');

      expect(instance.renderLocationAction()).toBe(null);
    });

    it('should renderLocationAction !isTransportation tooltip', () => {
      rendered.setProps({ tooltip: true });

      EVENT_VIEW_HELPERS.isTransportation = jest.fn(() => false);
      EVENT_VIEW_HELPERS.locationHref = jest.fn(() => 'locationHref');
      EVENT_VIEW_HELPERS.locationStart = jest.fn(() => 'locationStart');

      TEST_HELPERS.expectDefined(instance.renderLocationAction);
    });

    it('should renderLocationAction !isTransportation !tooltip', () => {
      rendered.setProps({ tooltip: false });

      EVENT_VIEW_HELPERS.isTransportation = jest.fn(() => false);
      EVENT_VIEW_HELPERS.locationHref = jest.fn(() => 'locationHref');
      EVENT_VIEW_HELPERS.locationStart = jest.fn(() => 'locationStart');

      TEST_HELPERS.expectDefined(instance.renderLocationAction);
    });

    it('should renderLocationAction isTransportation null', () => {
      EVENT_VIEW_HELPERS.isTransportation = jest.fn(() => true);
      EVENT_VIEW_HELPERS.locationStart = jest.fn(() => '');
      EVENT_VIEW_HELPERS.locationEnd = jest.fn(() => '');

      expect(instance.renderLocationAction()).toBe(null);
    });

    it('should renderLocationAction isTransportation tooltip', () => {
      rendered.setProps({ tooltip: true });

      EVENT_VIEW_HELPERS.isTransportation = jest.fn(() => true);
      EVENT_VIEW_HELPERS.isFlight = jest.fn(() => false);
      EVENT_VIEW_HELPERS.locationStart = jest.fn(() => 'locationStart');
      EVENT_VIEW_HELPERS.locationEnd = jest.fn(() => 'locationEnd');

      TEST_HELPERS.expectDefined(instance.renderLocationAction);
    });

    it('should renderLocationAction isTransportation !tooltip', () => {
      rendered.setProps({ tooltip: false });

      EVENT_VIEW_HELPERS.isTransportation = jest.fn(() => true);
      EVENT_VIEW_HELPERS.locationStart = jest.fn(() => 'locationStart');
      EVENT_VIEW_HELPERS.locationEnd = jest.fn(() => 'locationEnd');

      TEST_HELPERS.expectDefined(instance.renderLocationAction);
    });
  });

  describe('handleCall', () => {
    it('should call handler and window.open', () => {
      window.open = jest.fn();

      instance.handleCall()({ stopPropagation: jest.fn() });
      expect(window.open).toBeCalled();
    });
  });

  describe('renderPhoneAction()', () => {
    it('should return null', () => {
      EVENT_VIEW_HELPERS.supplierPhoneNumber = jest.fn(() => '');

      expect(instance.renderPhoneAction()).toBe(null);
    });

    it('should renderPhoneAction tooltip', () => {
      rendered.setProps({ tooltip: true });
      EVENT_VIEW_HELPERS.supplierPhoneNumber = jest.fn(() => 'value');

      TEST_HELPERS.expectMatchSnapshot(instance.renderPhoneAction);
    });

    it('should renderPhoneAction', () => {
      EVENT_VIEW_HELPERS.supplierPhoneNumber = jest.fn(() => 'value');

      TEST_HELPERS.expectMatchSnapshot(instance.renderPhoneAction);
    });
  });

  describe('moveToUnplanned()', () => {
    it('should moveToUnplanned()', () => {
      TEMPLATE_API_HELPERS.moveToUnplanned = jest.fn(
        () => 'TEMPLATE_API_HELPERS.moveToUnplanned',
      );

      expect(instance.moveToUnplanned()).toBe(
        'TEMPLATE_API_HELPERS.moveToUnplanned',
      );
    });
  });

  describe('handlePatchEventSuccess()', () => {
    it('should handlePatchEventSuccess()', () => {
      NODE_API_HELPERS.getTimes = jest.fn(() => 'getTimes');

      expect(instance.handlePatchEventSuccess()()).toBe('getTimes');
    });
  });

  describe('handleEdit()', () => {
    it('should handleEdit() onEdit', () => {
      rendered.setProps({ onEdit: jest.fn() });

      instance.handleEdit();

      TEST_HELPERS.expectNotCalled(resaga.setValue);
    });

    it('should handleEdit()', () => {
      instance.handleEdit();

      TEST_HELPERS.expectCalled(resaga.setValue);
    });
  });

  describe('renderScheduleButton()', () => {
    it('should renderScheduleButton', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderScheduleButton, [{}]);
    });
  });

  describe('renderScheduleMenu()', () => {
    it('should renderScheduleMenu', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderScheduleMenu, [{}]);
    });
  });

  describe('renderSchedulePopper()', () => {
    it('should renderSchedulePopper', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderSchedulePopper);
    });
  });

  describe('renderEditAction()', () => {
    it('should return null', () => {
      rendered.setProps({ canEditEvent: false });

      expect(instance.renderEditAction()).toBe(null);
    });

    it('should return null 2', () => {
      rendered.setProps({ readOnly: true });

      expect(instance.renderEditAction()).toBe(null);
    });

    it('should renderEditAction', () => {
      rendered.setProps({ canEditEvent: true });

      TEST_HELPERS.expectMatchSnapshot(instance.renderEditAction);
    });
  });

  describe('confirmDelete()', () => {
    it('should confirmDelete()', () => {
      PORTAL_HELPERS.confirmDelete = jest.fn(() => '');

      instance.confirmDelete();

      TEST_HELPERS.expectCalled(PORTAL_HELPERS.confirmDelete);
    });
  });

  describe('handleDelete()', () => {
    it('should handleDelete()', () => {
      TEMPLATE_API_HELPERS.deleteEvent = jest.fn(() => '');

      instance.handleDelete();

      TEST_HELPERS.expectCalled(TEMPLATE_API_HELPERS.deleteEvent);
    });
  });

  describe('renderDeleteEvent()', () => {
    it('should return null', () => {
      rendered.setProps({ canEditEvent: false });

      expect(instance.renderDeleteEvent()).toBe(null);
    });

    it('should renderDeleteEvent', () => {
      rendered.setProps({ canEditEvent: true });

      TEST_HELPERS.expectMatchSnapshot(instance.renderDeleteEvent);
    });
  });

  describe('renderCancelEvent()', () => {
    it('should return null', () => {
      rendered.setProps({ canEditEvent: false });

      expect(instance.renderCancelEvent()).toBe(null);
    });

    it('should renderCancelEvent isCancelled', () => {
      rendered.setProps({ canEditEvent: true });
      instance.isCancelled = jest.fn(() => true);

      TEST_HELPERS.expectMatchSnapshot(instance.renderCancelEvent);
    });

    it('should renderCancelEvent !isCancelled', () => {
      rendered.setProps({ canEditEvent: true });
      instance.isCancelled = jest.fn(() => false);

      TEST_HELPERS.expectMatchSnapshot(instance.renderCancelEvent);
    });
  });

  describe('isCancelled()', () => {
    it('should isCancelled()', () => {
      EVENT_VIEW_HELPERS.isCancelled = jest.fn(() => true);

      expect(instance.isCancelled()).toBe(true);
    });
  });

  describe('renderCancelBadge()', () => {
    it('should return null', () => {
      EVENT_VIEW_HELPERS.isCancelled = jest.fn(() => false);

      expect(instance.renderCancelBadge()).toBe(null);
    });

    it('should renderCancelBadge', () => {
      EVENT_VIEW_HELPERS.isCancelled = jest.fn(() => true);

      TEST_HELPERS.expectMatchSnapshot(instance.renderCancelBadge);
    });
  });

  describe('renderMoreButton()', () => {
    it('should renderMoreButton', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderMoreButton, [{}]);
    });
  });

  describe('canCreateEvent', () => {
    it('calls ability.can', () => {
      ability.can = jest.fn(() => true);

      expect(EVENT_HELPERS.canCreateEvent()).toBe(true);

      expect(ability.can).toBeCalledWith('create', EVENT);
    });
  });

  describe('renderMoreAction()', () => {
    it('should return !canCreateEvent', () => {
      rendered.setProps({ canEditEvent: false });
      instance.canCreateEvent = jest.fn(() => false);

      expect(instance.renderMoreAction()).toBe(null);
    });

    it('should return !canCreateEvent readOnly', () => {
      instance.canCreateEvent = jest.fn(() => false);

      rendered.setProps({ readOnly: true });

      expect(instance.renderMoreAction()).toBe(null);
    });

    it('should renderMoreAction', () => {
      rendered.setProps({ canEditEvent: true });
      instance.canCreateEvent = jest.fn(() => true);
      instance.renderMoreMenu = jest.fn(() => 'renderMoreMenu');

      TEST_HELPERS.expectMatchSnapshot(instance.renderMoreAction);
    });
  });

  describe('renderMoreMenu()', () => {
    it('should renderMoreMenu', () => {
      instance.renderDeleteEvent = jest.fn(() => 'renderDeleteEvent');

      TEST_HELPERS.expectMatchSnapshot(instance.renderMoreMenu, [{}]);
    });
  });

  describe('renderActions()', () => {
    it('should return null', () => {
      rendered.setProps({ action: 'view' });
      instance.renderLocationAction = jest.fn(() => 'renderLocationAction');
      instance.renderPhoneAction = jest.fn(() => 'renderPhoneAction');
      instance.renderEditAction = jest.fn(() => 'renderEditAction');
      instance.renderMoreAction = jest.fn(() => 'renderMoreAction');

      TEST_HELPERS.expectMatchSnapshot(instance.renderActions);
    });

    it('should renderActions', () => {
      rendered.setProps({ action: 'edit' });
      instance.renderLocationAction = jest.fn(() => 'renderLocationAction');
      instance.renderPhoneAction = jest.fn(() => 'renderPhoneAction');
      instance.renderEditAction = jest.fn(() => 'renderEditAction');
      instance.renderMoreAction = jest.fn(() => 'renderMoreAction');

      TEST_HELPERS.expectMatchSnapshot(instance.renderActions);
    });
  });

  describe('renderTimeHeader()', () => {
    it('should return !isAnchored !tempStartTime !days', () => {
      NODE_HELPERS.isAnchored = jest.fn(() => false);
      instance.tempStartTime = jest.fn(() => '');
      instance.tempEndDay = jest.fn(() => 'P0D');
      EVENT_DATA_HELPERS.durationToDays = jest.fn(() => 0);

      expect(instance.renderTimeHeader()).toBe(null);
    });

    it('should renderTimeHeader !isAnchored !tempStartTime days', () => {
      NODE_HELPERS.isAnchored = jest.fn(() => false);
      instance.tempStartTime = jest.fn(() => '');
      instance.tempEndDay = jest.fn(() => 'P0D');
      EVENT_DATA_HELPERS.durationToDays = jest.fn(() => 3);

      TEST_HELPERS.expectMatchSnapshot(instance.renderTimeHeader);
    });

    it('should renderTimeHeader !isAnchored tempStartTime', () => {
      NODE_HELPERS.isAnchored = jest.fn(() => false);
      instance.tempStartTime = jest.fn(() => '11:00');
      instance.tempEndTime = jest.fn(() => '13:00');
      instance.tempEndDay = jest.fn(() => 'P0D');
      EVENT_DATA_HELPERS.durationToDays = jest.fn(() => 3);

      TEST_HELPERS.expectMatchSnapshot(instance.renderTimeHeader);
    });

    it('should renderTimeHeader isAnchored', () => {
      NODE_HELPERS.isAnchored = jest.fn(() => true);
      instance.tempStartTime = jest.fn(() => '11:00');
      instance.tempEndTime = jest.fn(() => '13:00');
      instance.tempEndDay = jest.fn(() => 'P0D');
      EVENT_DATA_HELPERS.durationToDays = jest.fn(() => 3);

      TEST_HELPERS.expectMatchSnapshot(instance.renderTimeHeader);
    });
  });

  describe('renderTimeHeader()', () => {
    it('should renderTimeHeader', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderTimeHeader);
    });
  });

  describe('renderTimeHeader()', () => {
    it('should renderTimeHeader', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderTimeHeader);
    });
  });

  describe('renderCloseButton()', () => {
    it('should return null', () => {
      rendered.setProps({ onClose: false });

      expect(instance.renderCloseButton()).toBe(null);
    });

    it('should renderCloseButton', () => {
      rendered.setProps({ onClose: true });

      TEST_HELPERS.expectMatchSnapshot(instance.renderCloseButton);
    });
  });

  describe('renderTypeSubtype()', () => {
    it('should return null', () => {
      EVENT_VIEW_HELPERS.type = jest.fn(() => 'type');
      EVENT_VIEW_HELPERS.subtype = jest.fn(() => '');

      expect(instance.renderTypeSubtype()).toBe(null);
    });

    it('should return isCancelled no data', () => {
      instance.isCancelled = jest.fn(() => true);
      EVENT_VIEW_HELPERS.cancellationCancellationDate = jest.fn(
        () => undefined,
      );
      EVENT_VIEW_HELPERS.cancellationSupplierConfirmed = jest.fn(
        () => undefined,
      );
      EVENT_VIEW_HELPERS.cancellationCancellationReference = jest.fn(
        () => undefined,
      );
      EVENT_VIEW_HELPERS.cancellationRefundSituation = jest.fn(() => undefined);
      EVENT_VIEW_HELPERS.cancellationCancellationNotes = jest.fn(
        () => undefined,
      );

      TEST_HELPERS.expectMatchSnapshot(instance.renderTypeSubtype);
    });

    it('should return isCancelled with data', () => {
      instance.isCancelled = jest.fn(() => true);
      EVENT_VIEW_HELPERS.cancellationCancellationDate = jest.fn(
        () => '2021-06-23 10:13:20.001',
      );
      EVENT_VIEW_HELPERS.cancellationSupplierConfirmed = jest.fn(() => true);
      EVENT_VIEW_HELPERS.cancellationCancellationReference = jest.fn(
        () => 'cancellationCancellationReference',
      );
      EVENT_VIEW_HELPERS.cancellationRefundSituation = jest.fn(
        () => 'cancellationRefundSituation',
      );
      EVENT_VIEW_HELPERS.cancellationCancellationNotes = jest.fn(
        () => 'cancellationCancellationNotes',
      );

      TEST_HELPERS.expectMatchSnapshot(instance.renderTypeSubtype);
    });

    it('should renderTypeSubtype', () => {
      instance.isCancelled = jest.fn(() => false);
      EVENT_VIEW_HELPERS.type = jest.fn(() => 'type');
      EVENT_VIEW_HELPERS.subtype = jest.fn(() => 'subtype');

      instance.renderTypeSubTypeIcon = jest.fn(() => 'renderTypeSubTypeIcon');
      instance.renderActions = jest.fn(() => 'renderActions');

      TEST_HELPERS.expectMatchSnapshot(instance.renderTypeSubtype);
    });
  });

  describe('reactivateEvent()', () => {
    it('should reactivateEvent()', () => {
      TEMPLATE_API_HELPERS.reactivateEvent = jest.fn(() => '');

      instance.reactivateEvent();

      TEST_HELPERS.expectCalled(TEMPLATE_API_HELPERS.reactivateEvent);
    });
  });

  describe('openCancellationForm()', () => {
    it('should openCancellationForm()', () => {
      const onEdit = jest.fn();

      rendered.setProps({ onEdit });

      instance.openCancellationForm();

      TEST_HELPERS.expectCalled(onEdit);
    });
  });

  describe('renderAmounts()', () => {
    it('should return null !currency', () => {
      EVENT_VIEW_HELPERS.currency = jest.fn(() => '');

      expect(instance.renderAmounts()).toBe(null);
    });

    it('should return null !budgetAmount', () => {
      EVENT_VIEW_HELPERS.currency = jest.fn(() => 'AUD');
      EVENT_VIEW_HELPERS.budgetAmount = jest.fn(() => null);
      EVENT_VIEW_HELPERS.actualAmount = jest.fn(() => null);

      expect(instance.renderAmounts()).toBe(null);
    });

    it('should renderAmounts', () => {
      EVENT_VIEW_HELPERS.currency = jest.fn(() => 'AUD');
      EVENT_VIEW_HELPERS.budgetAmount = jest.fn(() => 100);
      EVENT_VIEW_HELPERS.actualAmount = jest.fn(() => 150);

      TEST_HELPERS.expectMatchSnapshot(instance.renderAmounts);
    });

    it('should renderAmounts good', () => {
      EVENT_VIEW_HELPERS.currency = jest.fn(() => 'AUD');
      EVENT_VIEW_HELPERS.budgetAmount = jest.fn(() => 200);
      EVENT_VIEW_HELPERS.actualAmount = jest.fn(() => 150);

      TEST_HELPERS.expectMatchSnapshot(instance.renderAmounts);
    });
  });

  describe('renderFlightBookings()', () => {
    it('should return null', () => {
      EVENT_VIEW_HELPERS.isFlight = jest.fn(() => false);

      expect(instance.renderFlightBookings()).toBe(null);
    });

    it('should return null 2', () => {
      EVENT_VIEW_HELPERS.isFlight = jest.fn(() => true);
      EVENT_VIEW_HELPERS.flightBookingId = jest.fn(() => null);

      expect(instance.renderFlightBookings()).toBe(null);
    });

    it('should renderFlightBookings', () => {
      EVENT_VIEW_HELPERS.isFlight = jest.fn(() => true);
      EVENT_VIEW_HELPERS.flightBookingId = jest.fn(() => 123);

      TEST_HELPERS.expectMatchSnapshot(instance.renderFlightBookings);
    });
  });

  describe('renderEventHeader()', () => {
    it('should renderEventHeader', () => {
      instance.renderBatchCreateSelect = jest.fn(
        () => 'renderBatchCreateSelect',
      );
      instance.renderTimeHeader = jest.fn(() => 'renderTimeHeader');
      instance.renderCloseButton = jest.fn(() => 'renderCloseButton');
      instance.renderTypeSubtype = jest.fn(() => 'renderTypeSubtype');
      instance.renderFlightBookings = jest.fn(() => 'renderFlightBookings');

      TEST_HELPERS.expectMatchSnapshot(instance.renderEventHeader);
    });
  });

  describe('startHomeTime()', () => {
    it('should startHomeTime()', () => {
      EVENT_DATA_HELPERS.renderHomeTime = jest.fn(() => 'renderHomeTime');

      expect(instance.startHomeTime()).toBe('renderHomeTime');
    });
  });

  describe('endHomeTime()', () => {
    it('should endHomeTime()', () => {
      EVENT_DATA_HELPERS.renderHomeTime = jest.fn(() => 'renderHomeTime');

      expect(instance.endHomeTime()).toBe('renderHomeTime');
    });
  });

  describe('startTimeZone()', () => {
    it('should return null', () => {
      EVENT_VIEW_HELPERS.startTimeZoneId = jest.fn(() => '');

      expect(instance.startTimeZone()).toBe(null);
    });

    it('should startTimeZone', () => {
      EVENT_VIEW_HELPERS.startTimeZoneId = jest.fn(() => '123');
      MOMENT_HELPERS.renderZoneFromId = jest.fn(() => 'renderZoneFromId');

      expect(instance.startTimeZone()).toBe('renderZoneFromId');
    });
  });

  describe('endTimeZone()', () => {
    it('should return null', () => {
      EVENT_VIEW_HELPERS.endTimeZoneId = jest.fn(() => '');

      expect(instance.endTimeZone()).toBe(null);
    });

    it('should endTimeZone', () => {
      EVENT_VIEW_HELPERS.endTimeZoneId = jest.fn(() => '123');
      MOMENT_HELPERS.renderZoneFromId = jest.fn(() => 'renderZoneFromId');

      expect(instance.endTimeZone()).toBe('renderZoneFromId');
    });
  });

  describe('renderDurationRow()', () => {
    it('should return null', () => {
      expect(instance.renderDurationRow()).toBe(null);
    });

    it('should renderDurationRow', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderDurationRow, ['1 day']);
    });
  });

  describe('renderUnit()', () => {
    it('should return null', () => {
      expect(instance.renderUnit()).toBe(null);
    });

    it('should renderUnit', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderUnit, [5, 'day']);
    });
  });

  describe('renderDuration()', () => {
    it('should renderDuration() isAccommodation', () => {
      EVENT_VIEW_HELPERS.isAccommodation = jest.fn(() => true);
      instance.renderDurationRow = jest.fn(() => 'renderDurationRow');

      expect(instance.renderDuration()).toBe('renderDurationRow');
    });

    it('should renderDuration() !tempStartTime', () => {
      EVENT_VIEW_HELPERS.isAccommodation = jest.fn(() => false);
      instance.renderDurationRow = jest.fn(() => 'renderDurationRow');
      instance.tempStartTime = jest.fn(() => null);

      expect(instance.renderDuration()).toBe(null);
    });

    it('should renderDuration() null', () => {
      EVENT_VIEW_HELPERS.isAccommodation = jest.fn(() => false);
      instance.tempStartTime = jest.fn(() => '11:34');
      instance.tempEndTime = jest.fn(() => null);
      instance.tempEndDay = jest.fn(() => 'P0D');

      expect(instance.renderDuration()).toBe(null);
    });

    it('should renderDuration() daysCount', () => {
      EVENT_VIEW_HELPERS.isAccommodation = jest.fn(() => false);
      instance.tempStartTime = jest.fn(() => '11:34');
      instance.tempEndTime = jest.fn(() => null);
      instance.tempEndDay = jest.fn(() => 'P3D');
      instance.renderDurationRow = jest.fn(() => 'renderDurationRow');

      expect(instance.renderDuration()).toBe('renderDurationRow');
    });

    it('should renderDuration() daysCount', () => {
      EVENT_VIEW_HELPERS.isAccommodation = jest.fn(() => false);
      instance.tempStartTime = jest.fn(() => '11:34');
      instance.tempEndTime = jest.fn(() => '14:30');
      instance.tempEndDay = jest.fn(() => 'P3D');
      instance.renderDurationRow = jest.fn(() => 'renderDurationRow');

      expect(instance.renderDuration()).toBe('renderDurationRow');
    });
  });

  describe('renderEventSchedule()', () => {
    it('should return null', () => {
      instance.tempStartTime = jest.fn(() => '');
      instance.tempEndTime = jest.fn(() => '');

      TEST_HELPERS.expectMatchSnapshot(instance.renderEventSchedule);
    });

    it('should renderEventSchedule noEndTime', () => {
      instance.tempStartTime = jest.fn(() => '11:00');
      instance.tempEndTime = jest.fn(() => '12:00');
      instance.renderDuration = jest.fn(() => 'duration');

      EVENT_HELPERS.isEventCustomDate = jest.fn(() => true);

      TEST_HELPERS.expectMatchSnapshot(instance.renderEventSchedule);
    });

    it('should renderEventSchedule', () => {
      instance.tempStartTime = jest.fn(() => '11:00');
      instance.tempEndTime = jest.fn(() => '12:00');
      instance.renderDuration = jest.fn(() => 'duration');
      EVENT_VIEW_HELPERS.locationStart = jest.fn(() => 'locationStart');
      EVENT_VIEW_HELPERS.locationEnd = jest.fn(() => 'locationEnd');

      EVENT_HELPERS.isEventCustomDate = jest.fn(() => false);

      TEST_HELPERS.expectMatchSnapshot(instance.renderEventSchedule);
    });
  });

  describe('renderNumber()', () => {
    it('should return null', () => {
      expect(instance.renderNumber()).toBe(null);
    });

    it('should renderNumber', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderNumber, ['123']);
    });
  });

  describe('renderURL()', () => {
    it('should return null', () => {
      expect(instance.renderURL()).toBe(null);
    });

    it('should renderURL', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderURL, ['123']);
    });
  });

  describe('renderSubDetailType()', () => {
    it('should return null', () => {
      expect(instance.renderSubDetailType()).toBe(null);
    });

    it('should renderSubDetailType isBus', () => {
      EVENT_VIEW_HELPERS.isBus = jest.fn(() => true);

      TEST_HELPERS.expectMatchSnapshot(instance.renderSubDetailType, [
        'Charter',
      ]);
    });

    it('should renderSubDetailType isCoach', () => {
      EVENT_VIEW_HELPERS.isBus = jest.fn(() => false);
      EVENT_VIEW_HELPERS.isCoach = jest.fn(() => true);

      TEST_HELPERS.expectMatchSnapshot(instance.renderSubDetailType, [
        'Escorted',
      ]);
    });
  });

  describe('renderNumberAndURL()', () => {
    it('should return null', () => {
      expect(instance.renderNumberAndURL()).toBe(null);
    });

    it('should renderNumberAndURL', () => {
      instance.renderNumber = jest.fn(() => 'renderNumber');
      instance.renderURL = jest.fn(() => 'renderURL');

      TEST_HELPERS.expectMatchSnapshot(instance.renderNumberAndURL, [
        '123',
        'http',
      ]);
    });
  });

  describe('renderDescription()', () => {
    it('should return null', () => {
      expect(instance.renderDescription()).toBe(null);
    });

    it('should renderDescription', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderDescription, ['123']);
    });
  });

  describe('renderValue()', () => {
    it('should return null', () => {
      expect(instance.renderValue(null)).toBe(null);
    });

    it('should renderValue', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderValue, [1]);
    });
  });

  describe('renderDetails()', () => {
    it('should return null', () => {
      EVENT_VIEW_HELPERS.supplierPhoneNumber = jest.fn(() => '');
      EVENT_VIEW_HELPERS.url = jest.fn(() => '');
      EVENT_VIEW_HELPERS.description = jest.fn(() => '');
      EVENT_VIEW_HELPERS.numberOfRooms = jest.fn(() => 123);
      EVENT_VIEW_HELPERS.roomType = jest.fn(() => 'roomType');
      EVENT_VIEW_HELPERS.isAccommodation = jest.fn(() => false);

      expect(instance.renderDetails()).toBe(null);
    });

    it('should return null isAccommodation', () => {
      EVENT_VIEW_HELPERS.supplierPhoneNumber = jest.fn(() => '');
      EVENT_VIEW_HELPERS.url = jest.fn(() => '');
      EVENT_VIEW_HELPERS.description = jest.fn(() => '');
      EVENT_VIEW_HELPERS.numberOfRooms = jest.fn(() => null);
      EVENT_VIEW_HELPERS.roomType = jest.fn(() => '');
      EVENT_VIEW_HELPERS.isAccommodation = jest.fn(() => true);

      expect(instance.renderDetails()).toBe(null);
    });

    it('should renderDetails', () => {
      EVENT_VIEW_HELPERS.supplierPhoneNumber = jest.fn(
        () => 'supplierPhoneNumber',
      );
      instance.renderNumberAndURL = jest.fn(() => 'renderNumberAndURL');
      instance.renderDescription = jest.fn(() => 'renderDescription');

      TEST_HELPERS.expectMatchSnapshot(instance.renderDetails);
    });
  });

  describe('renderMapEmpty()', () => {
    it('should return null', () => {
      rendered.setProps({ action: 'view' });

      TEST_HELPERS.expectMatchSnapshot(instance.renderMapEmpty);
    });

    it('should return tooltip', () => {
      rendered.setProps({ tooltip: true });

      expect(instance.renderMapEmpty()).toBe(null);
    });

    it('should renderMapEmpty', () => {
      rendered.setProps({ action: 'create' });

      TEST_HELPERS.expectMatchSnapshot(instance.renderMapEmpty);
    });
  });

  describe('renderMap()', () => {
    it('should renderMap', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderMap);
    });
  });

  describe('renderEventContent()', () => {
    it('should return preview', () => {
      EVENT_VIEW_HELPERS.type = jest.fn(() => 'type');
      EVENT_VIEW_HELPERS.subtype = jest.fn(() => '');

      TEST_HELPERS.expectMatchSnapshot(instance.renderEventContent);
    });

    it('should renderEventContent', () => {
      EVENT_VIEW_HELPERS.type = jest.fn(() => 'type');
      EVENT_VIEW_HELPERS.subtype = jest.fn(() => 'subtype');

      instance.renderEventSchedule = jest.fn(() => 'renderEventSchedule');
      instance.renderDetails = jest.fn(() => 'renderDetails');
      instance.renderMap = jest.fn(() => 'renderMap');

      rendered.setProps({ id: 123 });

      TEST_HELPERS.expectMatchSnapshot(instance.renderEventContent);
    });
  });

  describe('renderEvent()', () => {
    it('should renderEvent tooltip', () => {
      instance.renderMap = jest.fn(() => 'renderMap');
      instance.renderEventContent = jest.fn(() => 'renderEventContent');

      rendered.setProps({ tooltip: true });

      TEST_HELPERS.expectMatchSnapshot(instance.renderEvent);
    });

    it('should renderEvent', () => {
      instance.renderEventHeader = jest.fn(() => 'renderEventHeader');
      instance.renderEventContent = jest.fn(() => 'renderEventContent');

      rendered.setProps({ action: 'create' });

      TEST_HELPERS.expectMatchSnapshot(instance.renderEvent);
    });
  });

  describe('openAttachForm()', () => {
    it('should openAttachForm()', () => {
      const onEdit = jest.fn();
      rendered.setProps({ onEdit });

      instance.openAttachForm();

      TEST_HELPERS.expectCalled(onEdit);
    });
  });

  describe('openReservationForm()', () => {
    it('should openReservationForm()', () => {
      const onEdit = jest.fn();
      rendered.setProps({ onEdit });

      instance.openReservationForm();

      TEST_HELPERS.expectCalled(onEdit);
    });
  });

  describe('render()', () => {
    it('should return null', () => {
      rendered.setProps({ id: 0, styled: false });

      instance.renderEvent = jest.fn(() => 'renderEvent');

      expect(instance.render()).toBe(null);
    });

    it('should return smDown', () => {
      rendered.setProps({ id: 'AUS', smDown: true });

      instance.renderEvent = jest.fn(() => 'renderEvent');
      instance.renderFlightBookings = jest.fn(() => 'renderFlightBookings');

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });

    it('should return tooltip', () => {
      rendered.setProps({ id: 'AUS', smDown: false, tooltip: true });

      instance.renderEvent = jest.fn(() => 'renderEvent');
      instance.renderFlightBookings = jest.fn(() => 'renderFlightBookings');

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });

    it('should render', () => {
      rendered.setProps({ id: 123, smDown: false });

      instance.renderFlightBookings = jest.fn(() => 'renderFlightBookings');
      instance.renderLeft = jest.fn(() => 'renderLeft');
      instance.renderEvent = jest.fn(() => 'renderEvent');

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
