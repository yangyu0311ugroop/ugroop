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
    });
    it('should return checklists correctly', () => {
      const data = CONFIG.value.checklists;
      expect(data({ templateId: 1 })).toEqual(
        NODE_STORE_SELECTORS.parentChecklists({ parentNodeId: 1 }),
      );
    });
  });
});
