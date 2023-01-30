/**
 * Created by stephenkarpinskyj on 24/10/18.
 */

import {
  EVENT_STORE_VIEW_SELECTORS,
  EVENT_STORE_DATA_SELECTORS,
} from 'datastore/eventStore/selectors';
import { FLIGHT_BOOKING_PATHS } from 'datastore/eventStore/constants';
import { CONFIG } from '../config';

describe('EventContainer/FlightBooking/View/config', () => {
  describe('CONFIG', () => {
    it('exists', () => {
      expect(CONFIG).toBeDefined();
    });
  });

  describe('#value', () => {
    it('contains required properties', () => {
      const props = { dataId: 'dataId' };
      expect(CONFIG.value.name(props)).toEqual(
        EVENT_STORE_DATA_SELECTORS.flightBookingProp({
          id: props.dataId,
          path: FLIGHT_BOOKING_PATHS.name,
        }),
      );
    });
  });

  describe('#setValue', () => {
    it('contains required properties', () => {
      expect(CONFIG.setValue.flightBookingEdit).toEqual(
        EVENT_STORE_VIEW_SELECTORS.flightBookingEdit,
      );
    });
  });
});
