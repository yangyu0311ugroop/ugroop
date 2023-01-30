/**
 * Created by Jay on 1/7/17.
 */
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { CONFIG } from '../config';

describe('TAB_TIMELINE_CONTENT Config', () => {
  describe('config', () => {
    it('should exists', () => {
      expect(CONFIG).toBeDefined();
    });
  });
  describe('value', () => {
    it('should exists', () => {
      expect(CONFIG.value).toBeDefined();
      expect(CONFIG.value.dayIds).toBeDefined();
    });
    it('should return tab config correctly', () => {
      const data = CONFIG.value.dayIds;
      expect(data({ id: 1 })).toEqual(NODE_STORE_SELECTORS.children({ id: 1 }));
    });
    it('should return startDate', () => {
      const startDate = CONFIG.value.startDate;
      expect(startDate({ templateId: 3322 })).toEqual(
        NODE_STORE_SELECTORS.startDate({ id: 3322 }),
      );
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
