import { LOCATION_CONFIG } from '../locationConfig';

describe('EditProfileForm/locationConfig.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof LOCATION_CONFIG).toBe('object');
    });
  });

  describe('setValue', () => {
    it('should exists', () => {
      expect(typeof LOCATION_CONFIG.setValue).toBe('object');
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof LOCATION_CONFIG.value).toBe('object');
    });
    it('placeId with value', () => {
      expect(LOCATION_CONFIG.value.placeId({ locationId: 1 })).toEqual([
        'organisationDataStore',
        'locations',
        1,
        'placeId',
      ]);
    });
    it('timezone with value', () => {
      expect(LOCATION_CONFIG.value.timezone({ preferenceId: 1 })).toEqual([
        'organisationDataStore',
        'preferences',
        1,
        'timezone',
      ]);
    });
  });
});
