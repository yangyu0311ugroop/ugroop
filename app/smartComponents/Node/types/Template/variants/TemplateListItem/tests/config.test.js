import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { CONFIG } from '../config';

describe('config', () => {
  describe('value', () => {
    it('should have type', () => {
      expect(CONFIG.value.type).toEqual(NODE_STORE_SELECTORS.type);
    });
    it('should have content', () => {
      expect(CONFIG.value.content).toEqual(NODE_STORE_SELECTORS.content);
    });
    it('should have createdBy', () => {
      expect(CONFIG.value.createdBy).toEqual(NODE_STORE_SELECTORS.createdBy);
    });
    it('should have shortDescription', () => {
      expect(CONFIG.value.shortDescription).toEqual(
        NODE_STORE_SELECTORS.shortDescription,
      );
    });
    it('should have type', () => {
      expect(CONFIG.value.duration).toEqual(NODE_STORE_SELECTORS.duration);
    });
    it('should have type', () => {
      expect(CONFIG.value.lastModifiedBy).toEqual(
        NODE_STORE_SELECTORS.lastModifiedBy,
      );
    });
  });
});
