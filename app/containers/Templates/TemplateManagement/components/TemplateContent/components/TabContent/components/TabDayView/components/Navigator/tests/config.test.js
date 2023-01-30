import { TEMPLATE_MANAGEMENT_VIEWSTORE } from 'appConstants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { CONFIG } from '../config';

describe('Navigator/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG).toBe('object');
    });
  });

  describe('setValue', () => {
    it('should exists', () => {
      expect(typeof CONFIG.setValue).toBe('object');
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof CONFIG.value).toBe('object');
    });

    describe('selectedId', () => {
      it('should exist', () => {
        expect(CONFIG.value.selectedId({})).toEqual([
          TEMPLATE_MANAGEMENT_VIEWSTORE,
          'selectedId',
        ]);
      });
    });

    describe('markerIds', () => {
      it('should exist', () => {
        expect(CONFIG.value.markerIds({ routeId: 2233 })).toEqual(
          NODE_STORE_SELECTORS.calculatedMarkerIds({ id: 2233 }),
        );
      });
    });
  });
});
