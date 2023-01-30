import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { CONFIG } from '../config';

describe('ThreeColumn/config.js', () => {
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

    describe('dayIds', () => {
      it('should return dayIds', () => {
        expect(CONFIG.value.dayIds({ tabId: 2233 })).toEqual(
          NODE_STORE_SELECTORS.children({ id: 2233 }),
        );
      });
    });

    describe('startDate', () => {
      it('should return startDate', () => {
        expect(CONFIG.value.startDate({ templateId: 2233 })).toEqual(
          NODE_STORE_SELECTORS.startDate({ id: 2233 }),
        );
      });
    });

    describe('galleryId', () => {
      it('should return galleryId', () => {
        expect(CONFIG.value.galleryId({ templateId: 2233 })).toEqual(
          NODE_STORE_SELECTORS.calculatedGalleryId({ id: 2233 }),
        );
      });
    });
  });
});
