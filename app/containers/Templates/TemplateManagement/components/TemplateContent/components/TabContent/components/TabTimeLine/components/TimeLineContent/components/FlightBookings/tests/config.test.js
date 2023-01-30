import {
  EVENT_STORE_DATA_SELECTORS,
  EVENT_STORE_VIEW_SELECTORS,
} from 'datastore/eventStore/selectors';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { CONFIG_1, CONFIG_2 } from '../config';

describe('TabTimeLine/TimelineContent/FlightBookings/config.js', () => {
  describe('CONFIG_1 Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG_1).toBe('function');
    });
  });

  describe('CONFIG_1 value', () => {
    const { value } = CONFIG_1();

    it('should have eventIds', () => {
      expect(value.eventIds({ templateId: 1 })).toEqual(
        NODE_STORE_SELECTORS.calculatedNodesEvents({ id: 1 }),
      );
    });

    it('should exists', () => {
      expect(typeof value).toBe('object');
    });
    it('contains required properties', () => {
      expect(value.flightBookingIds).toEqual(
        EVENT_STORE_DATA_SELECTORS.flightBookingIds,
      );
    });
  });

  describe('CONFIG_2 Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG_2).toBe('function');
    });
  });

  describe('CONFIG_2 value', () => {
    it('contains required properties', () => {
      EVENT_STORE_DATA_SELECTORS.filterFlightBookingsByTemplateId = jest.fn(
        (...args) => ['filterFlightBookingsByTemplateId', ...args],
      );
      const { value } = CONFIG_2();
      expect(value.flightBookingIds).toEqual(
        EVENT_STORE_DATA_SELECTORS.filterFlightBookingsByTemplateId({
          idsProp: 'flightBookingIds',
        }),
      );
    });
  });

  describe('CONFIG_2 setValue', () => {
    const { setValue } = CONFIG_2();

    it('should exists', () => {
      expect(typeof setValue).toBe('object');
    });
    it('contains required properties', () => {
      expect(setValue.flightBookingCreate).toEqual(
        EVENT_STORE_VIEW_SELECTORS.flightBookingCreate,
      );
      expect(setValue.flightBookingView).toEqual(
        EVENT_STORE_VIEW_SELECTORS.flightBookingView,
      );
    });
  });
});
