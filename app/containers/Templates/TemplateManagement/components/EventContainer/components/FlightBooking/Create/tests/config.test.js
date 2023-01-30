/**
 * Created by stephenkarpinskyj on 24/10/18.
 */

import { TEMPLATE_MANAGEMENT_STORE_SELECTORS } from 'datastore/templateManagementStore/selectors';
import { CONFIG } from '../config';

describe('EventContainer/FlightBooking/Create/config', () => {
  describe('CONFIG', () => {
    it('exists', () => {
      expect(CONFIG).toBeDefined();
    });
  });

  describe('#value', () => {
    it('contains required properties', () => {
      expect(CONFIG.value.templateId).toEqual(
        TEMPLATE_MANAGEMENT_STORE_SELECTORS.templateId,
      );
    });
  });
});
