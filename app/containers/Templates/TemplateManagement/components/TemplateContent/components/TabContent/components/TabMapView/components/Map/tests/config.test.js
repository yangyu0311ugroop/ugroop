import { GEOCODE_STORE } from 'appConstants';
import { CONFIG } from '../config';

describe('Map/config', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG).toBe('object');
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof CONFIG.value).toBe('object');
    });
  });

  describe('CONFIG.value.geocodes', () => {
    it('should have keyPath', () => {
      expect(
        CONFIG.value.singleDayGeocode.keyPath({ placeIds: [[{ placeId: 1 }]] }),
      ).toEqual([GEOCODE_STORE, 'geocodes', 1]);
    });
    it('should have getter', () => {
      expect(CONFIG.value.singleDayGeocode.getter({ lat: 1, lng: 2 })).toEqual({
        lat: 1,
        lng: 2,
      });
    });
  });
});
