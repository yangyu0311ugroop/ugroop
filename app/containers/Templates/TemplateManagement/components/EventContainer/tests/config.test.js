/**
 * Created by stephenkarpinskyj on 24/10/18.
 */

import { EVENT_STORE_VIEW_SELECTORS } from 'datastore/eventStore/selectors';
import { CONFIG } from '../config';

describe('EventContainer/config', () => {
  describe('CONFIG', () => {
    it('exists', () => {
      expect(CONFIG).toBeDefined();
    });
  });

  describe('#value', () => {
    it('contains required properties', () => {
      expect(CONFIG.value.eventCreate).toEqual({
        keyPath: EVENT_STORE_VIEW_SELECTORS.eventCreate,
        spreadObject: true,
      });
      expect(CONFIG.value.eventView).toEqual({
        keyPath: EVENT_STORE_VIEW_SELECTORS.eventView,
        spreadObject: true,
      });
      expect(CONFIG.value.eventEdit).toEqual({
        keyPath: EVENT_STORE_VIEW_SELECTORS.eventEdit,
        spreadObject: true,
      });
      expect(CONFIG.value.flightBookingCreate).toEqual({
        keyPath: EVENT_STORE_VIEW_SELECTORS.flightBookingCreate,
        spreadObject: true,
      });
      expect(CONFIG.value.flightBookingView).toEqual({
        keyPath: EVENT_STORE_VIEW_SELECTORS.flightBookingView,
        spreadObject: true,
      });
      expect(CONFIG.value.flightBookingEdit).toEqual({
        keyPath: EVENT_STORE_VIEW_SELECTORS.flightBookingEdit,
        spreadObject: true,
      });
    });
  });

  describe('#setValue', () => {
    it('contains required properties', () => {
      expect(CONFIG.setValue.eventCreate).toEqual(
        EVENT_STORE_VIEW_SELECTORS.eventCreate,
      );
      expect(CONFIG.setValue.eventView).toEqual(
        EVENT_STORE_VIEW_SELECTORS.eventView,
      );
      expect(CONFIG.setValue.eventEdit).toEqual(
        EVENT_STORE_VIEW_SELECTORS.eventEdit,
      );
      expect(CONFIG.setValue.flightBookingCreate).toEqual(
        EVENT_STORE_VIEW_SELECTORS.flightBookingCreate,
      );
      expect(CONFIG.setValue.flightBookingView).toEqual(
        EVENT_STORE_VIEW_SELECTORS.flightBookingView,
      );
      expect(CONFIG.setValue.flightBookingEdit).toEqual(
        EVENT_STORE_VIEW_SELECTORS.flightBookingEdit,
      );
    });
  });
});
