import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { CONFIG_2 } from '../config';

describe('CONFIG_2', () => {
  describe('value', () => {
    it('should have editingParent', () => {
      expect(CONFIG_2.value.editingParent({ parentNodeId: 1 })).toEqual(
        NODE_STORE_SELECTORS.editing({ id: 1 }),
      );
    });
  });
});
