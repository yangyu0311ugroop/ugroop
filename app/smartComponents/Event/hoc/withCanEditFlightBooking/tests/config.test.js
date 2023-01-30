/**
 * Created by stephenkarpinskyj on 21/11/18.
 */

import { FLIGHT_BOOKING_PATHS } from 'datastore/eventStore/constants';
import { EVENT_STORE_DATA_SELECTORS } from 'datastore/eventStore/selectors';
import { CONFIG } from '../config';

describe('smartComponents/Event/hoc/withCanEditFlightBooking/config', () => {
  describe('CONFIG', () => {
    it('exists', () => {
      expect(CONFIG).toBeDefined();
    });
  });

  describe('#value', () => {
    it('contains required properties', () => {
      const props = { dataId: 'dataId' };
      expect(CONFIG.value.createdBy(props)).toEqual(
        EVENT_STORE_DATA_SELECTORS.flightBookingProp({
          id: props.dataId,
          path: FLIGHT_BOOKING_PATHS.createdBy,
        }),
      );
    });
  });
});
