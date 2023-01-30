/**
 * Created by stephenkarpinskyj on 16/11/18.
 */

import { EVENT_STORE_VIEW_SELECTORS } from 'datastore/eventStore/selectors';
import { CONFIG } from '../config';

describe('smartComponents/Event/FlightBooking/layouts/Flights/Flight/config', () => {
  describe('CONFIG', () => {
    it('exists', () => {
      expect(CONFIG).toBeDefined();
    });
  });

  describe('#setValue', () => {
    it('contains required properties', () => {
      expect(CONFIG.setValue.eventView).toEqual(
        EVENT_STORE_VIEW_SELECTORS.eventView,
      );
    });
  });
});
