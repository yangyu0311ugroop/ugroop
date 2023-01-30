import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { CONFIG } from '../config';

describe('TourStatus/config.js', () => {
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

    describe('ongoing', () => {
      it('should return ongoing', () => {
        expect(CONFIG.setValue.ongoing({ templateId: 2233 })).toEqual(
          NODE_STORE_SELECTORS.calculatedOngoing({ id: 2233 }),
        );
      });
    });

    describe('status', () => {
      it('should return status', () => {
        expect(CONFIG.setValue.status({ templateId: 2233 })).toEqual(
          NODE_STORE_SELECTORS.calculatedStatus({ id: 2233 }),
        );
      });
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

    describe('startTime', () => {
      it('should return startTime', () => {
        expect(CONFIG.value.startTime({ templateId: 2233 })).toEqual(
          NODE_STORE_SELECTORS.calculatedStartTimeValue({ id: 2233 }),
        );
      });
    });

    describe('ongoing', () => {
      it('should return ongoing', () => {
        expect(CONFIG.value.ongoing({ templateId: 2233 })).toEqual(
          NODE_STORE_SELECTORS.calculatedOngoing({ id: 2233 }),
        );
      });
    });

    describe('status', () => {
      it('should return status', () => {
        expect(CONFIG.value.status({ templateId: 2233 })).toEqual(
          NODE_STORE_SELECTORS.calculatedStatus({ id: 2233 }),
        );
      });
    });

    describe('layout', () => {
      it('should return layout', () => {
        expect(CONFIG.value.layout({ templateId: 2233 })).toEqual(
          NODE_STORE_SELECTORS.calculatedLayout({ id: 2233 }),
        );
      });
    });

    describe('layoutRecheck', () => {
      it('should return layoutRecheck', () => {
        expect(CONFIG.value.layoutRecheck({ templateId: 2233 })).toEqual(
          NODE_STORE_SELECTORS.calculatedLayoutRecheck({ id: 2233 }),
        );
      });
    });
  });
});
