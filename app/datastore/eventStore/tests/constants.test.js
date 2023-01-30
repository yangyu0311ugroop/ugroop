/**
 * Created by stephenkarpinskyj on 25/10/18.
 */

import {
  FLIGHT_BOOKING_PATHS,
  EVENT_PATHS,
} from 'datastore/eventStore/constants';

describe('datastore/eventStore/constants', () => {
  describe('#FLIGHT_BOOKING_PATHS', () => {
    it('still matches snapshot', () => {
      expect(FLIGHT_BOOKING_PATHS).toMatchSnapshot();
    });
  });

  describe('#EVENT_PATHS', () => {
    it('still matches snapshot', () => {
      expect(EVENT_PATHS).toMatchSnapshot();
    });
  });
});
