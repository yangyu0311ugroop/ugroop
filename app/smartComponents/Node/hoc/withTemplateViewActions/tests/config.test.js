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
  });
});
