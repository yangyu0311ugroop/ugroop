/**
 * Created by stephenkarpinskyj on 20/11/18.
 */

import { EVENT_STORE_DATA_SELECTORS } from 'datastore/eventStore/selectors';
import {
  EVENT_PATHS,
  FLIGHT_BOOKING_PATHS,
} from 'datastore/eventStore/constants';
import { CONFIG_ID, CONFIG_DATA } from '../config';

describe('smartComponents/Event/parts/Flight/BookingConfirmed/config', () => {
  describe('CONFIG_ID', () => {
    it('exists', () => {
      expect(CONFIG_ID).toBeDefined();
    });

    describe('#value', () => {
      it('contains required properties', () => {
        const props = { dataId: 'dataId' };
        expect(CONFIG_ID.value.bookingId(props)).toEqual(
          EVENT_STORE_DATA_SELECTORS.eventProp({
            id: props.dataId,
            path: EVENT_PATHS.flightBooking,
          }),
        );
      });
    });
  });

  describe('CONFIG_DATA', () => {
    it('exists', () => {
      expect(CONFIG_DATA).toBeDefined();
    });

    describe('#value', () => {
      it('contains required properties', () => {
        const props = { bookingId: 'bookingId' };
        expect(CONFIG_DATA.value.value(props)).toEqual(
          EVENT_STORE_DATA_SELECTORS.flightBookingProp({
            id: props.bookingId,
            path: FLIGHT_BOOKING_PATHS.number,
          }),
        );
      });
    });
  });
});
