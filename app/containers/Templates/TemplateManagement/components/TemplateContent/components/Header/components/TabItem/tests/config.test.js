import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { CONFIG } from '../config';

describe('TabItem/config.js', () => {
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
      it('should layout', () => {
        expect(CONFIG.setValue.layout({ templateId: 1122 })).toEqual(
          NODE_STORE_SELECTORS.calculatedLayout({ id: 1122 }),
        );
      });
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof CONFIG.value).toBe('object');
    });

    describe('timelineId', () => {
      it('should timelineId', () => {
        expect(CONFIG.value.timelineId({ templateId: 1122 })).toEqual(
          NODE_STORE_SELECTORS.calculatedTimelineId({ id: 1122 }),
        );
      });
    });

    describe('visibleChildren', () => {
      it('should visibleChildren', () => {
        expect(CONFIG.value.visibleChildren({ templateId: 1122 })).toEqual(
          NODE_STORE_SELECTORS.calculatedVisibleChildren({ id: 1122 }),
        );
      });
    });

    describe('layout', () => {
      it('should layout', () => {
        expect(CONFIG.value.layout({ templateId: 1122 })).toEqual(
          NODE_STORE_SELECTORS.calculatedLayout({ id: 1122 }),
        );
      });
    });
  });
});
