import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { CONFIG } from '../config';

describe('Overview/config.js', () => {
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
      it('should exists', () => {
        expect(CONFIG.setValue.layout({ templateId: 1 })).toEqual(
          NODE_STORE_SELECTORS.calculatedLayout({ id: 1 }),
        );
      });
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof CONFIG.value).toBe('object');
    });

    describe('layout', () => {
      it('should exists', () => {
        expect(CONFIG.value.layout({ templateId: 1 })).toEqual(
          NODE_STORE_SELECTORS.calculatedLayout({ id: 1 }),
        );
      });
    });

    describe('timelineId', () => {
      it('should exists', () => {
        expect(CONFIG.value.timelineId({ templateId: 1 })).toEqual(
          NODE_STORE_SELECTORS.calculatedTimelineId({ id: 1 }),
        );
      });
    });
  });
});
