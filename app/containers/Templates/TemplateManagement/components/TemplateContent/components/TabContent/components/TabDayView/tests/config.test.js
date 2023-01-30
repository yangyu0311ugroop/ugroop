import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { CONFIG } from '../config';

describe('TabDayView/config.js', () => {
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

    describe('layout', () => {
      it('should return layout', () => {
        expect(CONFIG.setValue.layout({ templateId: 2233 })).toEqual(
          NODE_STORE_SELECTORS.calculatedLayout({ id: 2233 }),
        );
      });
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof CONFIG.value).toBe('object');
    });

    describe('ongoing', () => {
      it('should return ongoing', () => {
        expect(CONFIG.value.ongoing({ templateId: 2233 })).toEqual(
          NODE_STORE_SELECTORS.calculatedOngoing({ id: 2233 }),
        );
      });
    });

    describe('secondChild', () => {
      it('should return secondChild', () => {
        expect(CONFIG.value.secondChild({ templateId: 2233 })).toEqual(
          NODE_STORE_SELECTORS.calculatedGalleryId({ id: 2233 }),
        );
      });
    });
  });
});
