/**
 * Created by stephenkarpinskyj on 25/10/18.
 */

import { EVENT_SCHEMA } from 'datastore/eventStore/schema';

describe('datastore/eventStore/schema', () => {
  describe('#events', () => {
    it('still matches snapshot', () => {
      expect(EVENT_SCHEMA.events).toMatchSnapshot();
    });
  });

  describe('#flightBookings', () => {
    it('still matches snapshot', () => {
      expect(EVENT_SCHEMA.flightBookings).toMatchSnapshot();
    });
  });
});
