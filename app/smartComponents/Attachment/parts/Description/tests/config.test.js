import { ATTACHMENT_STORE_SELECTORS } from 'datastore/attachmentStore/selectors';
import { CONFIG } from '../config';

describe('CONFIG', () => {
  describe('value', () => {
    it('should have description', () => {
      expect(CONFIG.value.description).toEqual(
        ATTACHMENT_STORE_SELECTORS.description,
      );
    });
  });
});
