import { GEOCODE_STORE, NODE_STORE } from 'appConstants';
import {
  CONFIG,
  PARENT_ID_CONFIG,
  COUNTRY_CONFIG,
  getEventDayId,
} from '../config';

describe('smartComponents/Event/parts/SupplierPhone/config', () => {
  describe('CONFIG', () => {
    it('exists', () => {
      expect(CONFIG).toBeDefined();
    });
  });
  describe('PARENT_ID_CONFIG', () => {
    it('exists', () => {
      expect(PARENT_ID_CONFIG).toBeDefined();
    });
  });
  describe('COUNTRY_CONFIG', () => {
    it('exists', () => {
      expect(COUNTRY_CONFIG).toBeDefined();
    });
  });
  describe('getParentNodeId()', () => {
    it('should return keyPath', () => {
      expect(getEventDayId({ id: 999 })).toEqual([
        NODE_STORE,
        'nodes',
        999,
        'parentNodeId',
      ]);
    });
  });
  describe('placeId()', () => {
    it('should return formPlaceId value', () => {
      expect(CONFIG.value.placeId.getter(1, 1, 3, { eventPlaceId: 2 })).toEqual(
        3,
      );
    });
    it('should return eventPlaceId value', () => {
      expect(
        CONFIG.value.placeId.getter(1, 1, null, {
          eventPlaceId: 2,
          eventLocation: 'manila',
        }),
      ).toEqual(2);
    });
    it('should return dayPlaceId value', () => {
      expect(
        CONFIG.value.placeId.getter(1, 1, null, { eventPlaceId: null }),
      ).toEqual(1);
    });
    it('should return orgPlaceId value', () => {
      expect(
        CONFIG.value.placeId.getter(null, 1, null, { eventPlaceId: null }),
      ).toEqual(1);
    });
  });
  describe('location()', () => {
    it('should return formLocation value', () => {
      expect(
        CONFIG.value.location.getter(1, 1, 3, { eventLocation: 2 }),
      ).toEqual(3);
    });
    it('should return eventLocation value', () => {
      expect(
        CONFIG.value.location.getter(1, 1, null, { eventLocation: 2 }),
      ).toEqual(2);
    });
    it('should return dayLocation value', () => {
      expect(
        CONFIG.value.location.getter(1, 1, null, { eventLocation: null }),
      ).toEqual(1);
    });
    it('should return orgPlaceId value', () => {
      expect(
        CONFIG.value.location.getter(null, 1, null, { eventLocation: null }),
      ).toEqual(1);
    });
  });
  describe('countryCode()', () => {
    it('should return keyPath', () => {
      expect(COUNTRY_CONFIG.value.countryCode({ placeId: 1 })).toEqual([
        GEOCODE_STORE,
        'geocodes',
        1,
        'countryCode',
      ]);
    });
  });
});
