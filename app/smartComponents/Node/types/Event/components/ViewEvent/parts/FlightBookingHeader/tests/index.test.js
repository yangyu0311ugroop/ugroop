import { TEMPLATE_API_HELPERS } from 'apis/components/Template/helpers';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { shallow } from 'enzyme';
import React from 'react';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { FlightBookingHeader } from '../index';

describe('<FlightBookingHeader />', () => {
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

    rendered = shallow(<FlightBookingHeader {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(FlightBookingHeader).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('openEventView()', () => {
    it('should openEventView()', () => {
      PORTAL_HELPERS.openViewEvent = jest.fn();

      instance.openEventView();

      TEST_HELPERS.expectCalled(PORTAL_HELPERS.openViewEvent);
    });
  });

  describe('renderEmpty()', () => {
    it('should renderEmpty', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderEmpty);
    });
  });

  describe('renderFlight()', () => {
    it('should renderFlight', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderFlight, [123]);
    });
  });

  describe('renderFlights()', () => {
    it('should return null', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderFlights);
    });

    it('should renderFlights', () => {
      instance.renderFlight = jest.fn(() => 'renderFlight');

      TEST_HELPERS.expectMatchSnapshot(instance.renderFlights, [[123, 234]]);
    });
  });

  describe('handleBackButton()', () => {
    it('should handleBackButton()', () => {
      PORTAL_HELPERS.openViewEvent = jest.fn(() => '');

      instance.handleBackButton();

      TEST_HELPERS.expectCalled(PORTAL_HELPERS.openViewEvent);
    });
  });

  describe('renderFlightsDetail()', () => {
    it('should renderFlightsDetail', () => {
      rendered.setProps({ opened: false });

      instance.renderFlights = jest.fn(() => 'renderFlights');

      TEST_HELPERS.expectMatchSnapshot(instance.renderFlightsDetail);
    });

    it('should renderFlightsDetail opened', () => {
      rendered.setProps({ opened: true });

      instance.renderFlights = jest.fn(() => 'renderFlights');

      TEST_HELPERS.expectMatchSnapshot(instance.renderFlightsDetail);
    });
  });

  describe('handleEditFlightBooking()', () => {
    it('should handleEditFlightBooking', () => {
      rendered.setProps({ data: {} });

      instance.handleEditFlightBooking();

      TEST_HELPERS.expectCalled(resaga.setValue);
    });
  });

  describe('openEditFlightBooking()', () => {
    it('should openEditFlightBooking()', () => {
      const onEdit = jest.fn(() => '');
      rendered.setProps({ onEdit });

      instance.openEditFlightBooking();

      TEST_HELPERS.expectCalled(onEdit);
    });
  });

  describe('renderAddFlightsButton()', () => {
    it('should renderAddFlightsButton', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderAddFlightsButton, [{}]);
    });
  });

  describe('renderMoreButton()', () => {
    it('should renderMoreButton', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderMoreButton, [{}]);
    });
  });

  describe('handleDeleteBookingDone()', () => {
    it('should handleDeleteBookingDone()', () => {
      PORTAL_HELPERS.closePortal = jest.fn(() => '');

      instance.handleDeleteBookingDone();

      TEST_HELPERS.expectCalled(PORTAL_HELPERS.closePortal);
    });
  });

  describe('handleDeleteBooking()', () => {
    it('should handleDeleteBooking', () => {
      TEMPLATE_API_HELPERS.deleteFlightBooking = jest.fn(
        () => 'deleteFlightBooking',
      );
      rendered.setProps({ data: {} });

      expect(instance.handleDeleteBooking()).toBe('deleteFlightBooking');
    });
  });

  describe('confirmDeleteBooking()', () => {
    it('should confirmDeleteBooking()', () => {
      PORTAL_HELPERS.confirmDeleteBooking = jest.fn(() => '');

      instance.confirmDeleteBooking()();

      TEST_HELPERS.expectCalled(PORTAL_HELPERS.confirmDeleteBooking);
    });
  });

  describe('renderMoreMenu()', () => {
    it('should renderMoreMenu', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderMoreMenu, [{}]);
    });
  });

  describe('renderMorePopper()', () => {
    it('should renderMorePopper', () => {
      TEST_HELPERS.expectMatchSnapshot(instance.renderMorePopper);
    });
  });

  describe('renderActions()', () => {
    it('should return null', () => {
      rendered.setProps({ action: 'edit' });

      expect(instance.renderActions()).toBe(null);
    });

    it('should renderActions', () => {
      instance.renderMorePopper = jest.fn(() => 'renderMorePopper');
      rendered.setProps({ action: 'view' });

      TEST_HELPERS.expectMatchSnapshot(instance.renderActions);
    });
  });

  describe('renderDetail()', () => {
    it('should renderDetail', () => {
      instance.renderEmpty = jest.fn(() => 'renderEmpty');

      TEST_HELPERS.expectMatchSnapshot(instance.renderDetail);
    });
  });

  describe('render()', () => {
    it('should render', () => {
      instance.renderDetail = jest.fn(() => 'renderDetail');
      instance.renderFlightsDetail = jest.fn(() => 'renderFlightsDetail');

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
