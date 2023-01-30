import { CONFIG } from '../config';
import { NODE_STORE_SELECTORS } from '../../../../../../../datastore/nodeStore/selectors';

describe('config', () => {
  describe('value', () => {
    it('should have value', () => {
      expect(CONFIG.value.attachmentIds.keyPath({ formIds: [1] })).toEqual([
        NODE_STORE_SELECTORS.attachmentId({ id: 1 }),
      ]);
    });
    it('should have value', () => {
      expect(CONFIG.value.attachmentIds.keyPath({})).toEqual([]);
    });
    it('should have value.cacheKey', () => {
      expect(CONFIG.value.attachmentIds.cacheKey({ formIds: [1] })).toEqual(
        'Node.forms.Attachment.1.attachmentIds',
      );
    });
    it('should have value.cacheKey null ids', () => {
      expect(CONFIG.value.attachmentIds.cacheKey({})).toEqual(
        'Node.forms.Attachment.null.attachmentIds',
      );
    });
    it('should have userValue', () => {
      expect(CONFIG.value.attachmentIds.props({ formIds: 1 })).toEqual(1);
    });
    it('should have userValue', () => {
      expect(CONFIG.value.attachmentIds.getter(1, [1, 2])).toEqual([1]);
    });
  });
});
