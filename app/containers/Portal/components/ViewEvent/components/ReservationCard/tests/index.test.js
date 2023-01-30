import { shallow } from 'enzyme';
import React from 'react';
import { EVENT_VIEW_HELPERS } from 'smartComponents/Node/types/Event/helpers';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { ReservationCard } from '../index';

describe('<ReservationCard />', () => {
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

    rendered = shallow(<ReservationCard {...props} />);
    instance = rendered.instance();
  });

  it('should exists', () => {
    expect(ReservationCard).toBeDefined();
  });

  it('should render without exploding', () => {
    expect(rendered.length).toBe(1);
  });

  describe('renderPersonCount()', () => {
    it('should return null', () => {
      EVENT_VIEW_HELPERS.personCount = jest.fn(() => 0);

      expect(instance.renderPersonCount()).toBe(null);
    });

    it('should renderPersonCount', () => {
      EVENT_VIEW_HELPERS.personCount = jest.fn(() => 2);

      TEST_HELPERS.expectMatchSnapshot(instance.renderPersonCount);
    });
  });

  describe('renderBookingNumber()', () => {
    it('should return null', () => {
      EVENT_VIEW_HELPERS.bookingNumber = jest.fn(() => '');

      TEST_HELPERS.expectMatchSnapshot(instance.renderBookingNumber);
    });

    it('should renderBookingNumber', () => {
      EVENT_VIEW_HELPERS.bookingNumber = jest.fn(() => '123');

      TEST_HELPERS.expectMatchSnapshot(instance.renderBookingNumber);
    });
  });

  describe('renderBookedBy()', () => {
    it('should return null', () => {
      EVENT_VIEW_HELPERS.bookedBy = jest.fn(() => '');

      TEST_HELPERS.expectMatchSnapshot(instance.renderBookedBy);
    });

    it('should renderBookedBy', () => {
      EVENT_VIEW_HELPERS.bookedBy = jest.fn(() => '123');

      TEST_HELPERS.expectMatchSnapshot(instance.renderBookedBy);
    });
  });

  describe('renderSupplierName()', () => {
    it('should return null', () => {
      EVENT_VIEW_HELPERS.supplierName = jest.fn(() => '');

      TEST_HELPERS.expectMatchSnapshot(instance.renderSupplierName);
    });

    it('should renderSupplierName', () => {
      EVENT_VIEW_HELPERS.supplierName = jest.fn(() => '123');

      TEST_HELPERS.expectMatchSnapshot(instance.renderSupplierName);
    });
  });

  describe('renderBookingDate()', () => {
    it('should return null', () => {
      EVENT_VIEW_HELPERS.bookingDate = jest.fn(() => '');

      TEST_HELPERS.expectMatchSnapshot(instance.renderBookingDate);
    });

    it('should renderBookingDate', () => {
      EVENT_VIEW_HELPERS.bookingDate = jest.fn(() => '1990-01-01 01:00:00.000');

      TEST_HELPERS.expectMatchSnapshot(instance.renderSupplierName);
    });
  });

  describe('renderPaidBy()', () => {
    it('should return null', () => {
      EVENT_VIEW_HELPERS.paidBy = jest.fn(() => '');

      TEST_HELPERS.expectMatchSnapshot(instance.renderPaidBy);
    });

    it('should renderPaidBy', () => {
      EVENT_VIEW_HELPERS.paidBy = jest.fn(() => '123');

      TEST_HELPERS.expectMatchSnapshot(instance.renderSupplierName);
    });
  });

  describe('renderEmpty()', () => {
    it('should return null', () => {
      rendered.setProps({ preview: false });

      expect(instance.renderEmpty()).toBe(null);
    });

    it('should renderEmpty', () => {
      rendered.setProps({ preview: true });

      TEST_HELPERS.expectMatchSnapshot(instance.renderEmpty);
    });
  });

  describe('render()', () => {
    it('should return null', () => {
      instance.renderEmpty = jest.fn(() => 'renderEmpty');
      instance.hasReservation = jest.fn(() => false);

      expect(instance.render()).toBe('renderEmpty');
    });

    it('should render', () => {
      instance.hasReservation = jest.fn(() => true);
      instance.renderBookingNumber = jest.fn(() => 'renderBookingNumber');
      instance.renderBookedBy = jest.fn(() => 'renderBookedBy');
      instance.renderSupplierName = jest.fn(() => 'renderSupplierName');
      instance.renderPersonCount = jest.fn(() => 'renderPersonCount');

      TEST_HELPERS.expectMatchSnapshot(instance.render);
    });
  });
});
