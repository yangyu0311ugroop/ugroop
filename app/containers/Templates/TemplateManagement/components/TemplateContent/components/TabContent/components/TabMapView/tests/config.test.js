import { NODE_STORE, GEOCODE_STORE } from 'appConstants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { CONFIG, DAY_ID_CONFIG, PLACE_ID_CONFIG } from '../config';

describe('TabMapView/config.js', () => {
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

  describe('dayIds', () => {
    it('should come from correct store', () => {
      expect(DAY_ID_CONFIG.value.dayIds({ tabId: 1 })).toEqual([
        NODE_STORE,
        'nodes',
        1,
        'children',
      ]);
    });
  });

  describe('PLACE_ID_CONFIG locations', () => {
    it('should have a keyPath', () => {
      const dayIds = [1, 3, 3];
      expect(PLACE_ID_CONFIG.value.placeIds.keyPath({ dayIds })).toEqual(
        dayIds.map(dayId => NODE_STORE_SELECTORS.placeId({ id: dayId })),
      );
    });
    it('should have a keyPath', () => {
      expect(PLACE_ID_CONFIG.value.placeIds.keyPath({})).toEqual([]);
    });
    it('should have cacheKey', () => {
      const dayIds = [1, 2, 3];
      expect(PLACE_ID_CONFIG.value.placeIds.cacheKey({ dayIds })).toEqual(
        `templateManagementPage.maps.${dayIds.toString()}.placeIds`,
      );
    });
    it('should have cacheKey with null dayIds', () => {
      expect(PLACE_ID_CONFIG.value.placeIds.cacheKey({ dayIds: null })).toEqual(
        'templateManagementPage.maps.null.placeIds',
      );
    });
    it('should have props', () => {
      expect(PLACE_ID_CONFIG.value.placeIds.props).toEqual(null);
    });
    it('should have a getter', () => {
      const locations = ['Manila', 'Tokyo', 'France'];
      expect(CONFIG.value.locations.getter(...locations)).toEqual([]);
    });
  });

  describe('CONFIG locations', () => {
    it('should have a keyPath', () => {
      const dayIds = [1, 3, 3];
      expect(CONFIG.value.locations.keyPath({ dayIds })).toEqual(
        dayIds.map(dayId => NODE_STORE_SELECTORS.location({ id: dayId })),
      );
    });
    it('should have a keyPath', () => {
      expect(CONFIG.value.locations.keyPath({})).toEqual([]);
    });
    it('should have cacheKey', () => {
      const placeIds = [1, 2, 3];
      expect(CONFIG.value.locations.cacheKey({ placeIds })).toEqual(
        `templateManagementPage.maps.${placeIds.toString()}.locations`,
      );
    });
    it('should have cacheKey with null dayIds', () => {
      expect(CONFIG.value.locations.cacheKey({ dayIds: null })).toEqual(
        'templateManagementPage.maps.null.locations',
      );
    });
    it('should have props', () => {
      const placeIds = [1, 2, 3];
      expect(CONFIG.value.locations.props({ placeIds })).toEqual(placeIds);
    });
    it('should have a getter', () => {
      const locations = [
        { lat: 1, lng: 1 },
        { lat: 2, lng: 2 },
        { lat: 3, lng: 3 },
      ];
      expect(PLACE_ID_CONFIG.value.placeIds.getter(...locations)).toEqual(
        locations,
      );
    });
  });

  describe('CONFIG geocodes', () => {
    it('should have a keyPath', () => {
      const placeIds = [1, 3, 3];
      expect(CONFIG.value.geocodes.keyPath({ placeIds })).toEqual(
        placeIds.map(placeId => [GEOCODE_STORE, 'geocodes', placeId]),
      );
    });
    it('should have a keyPath', () => {
      expect(CONFIG.value.geocodes.keyPath({})).toEqual([]);
    });
    it('should have cacheKey', () => {
      const placeIds = [1, 2, 3];
      expect(CONFIG.value.geocodes.cacheKey({ placeIds })).toEqual(
        `templateManagementPage.maps.${placeIds.toString()}.geocodes`,
      );
    });
    it('should have cacheKey with null dayIds', () => {
      expect(CONFIG.value.geocodes.cacheKey({ dayIds: null })).toEqual(
        'templateManagementPage.maps.null.geocodes',
      );
    });
    it('should have props', () => {
      expect(CONFIG.value.geocodes.props).toEqual(null);
    });
    it('should have a getter', () => {
      const geocodes = [
        { lat: 1, lng: 1 },
        { lat: 2, lng: 2 },
        { lat: 3, lng: 3 },
      ];
      expect(CONFIG.value.geocodes.getter(...geocodes)).toEqual(
        geocodes.filter(geocode => !!geocode),
      );
    });
  });
});
