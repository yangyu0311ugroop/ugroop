/**
 * Created by stephenkarpinskyj on 24/10/18.
 */

import { EVENT_STORE_DATA_SELECTORS } from 'datastore/eventStore/selectors';
import { CONFIG } from '../config';

describe('EventContainer/FlightBooking/Edit/config', () => {
  describe('CONFIG', () => {
    it('exists', () => {
      expect(CONFIG).toBeDefined();
    });
  });

  describe('#value', () => {
    it('contains required properties', () => {
      expect(CONFIG.value.templateId({ dataId: 1 })).toEqual(
        EVENT_STORE_DATA_SELECTORS.flightBookingTemplateId({ id: 1 }),
      );
    });
  });
});
