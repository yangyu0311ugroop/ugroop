/**
 * Created by Yang on 6/2/18.
 */
import { TEMPLATE_MANAGEMENT_VIEWSTORE } from 'appConstants';
import { CONFIG } from '../config';

describe('Config', () => {
  describe('CONFIG', () => {
    beforeEach(() => jest.clearAllMocks());
    afterEach(() => jest.clearAllMocks());
    describe('value', () => {
      it('should return showCopyLinkDialog config correctly', () => {
        const data = CONFIG.value.showCopyLinkDialog;
        expect(data).toEqual([
          TEMPLATE_MANAGEMENT_VIEWSTORE,
          'showCopyLinkDialog',
        ]);
      });
      it('should return disableRYI config correctly', () => {
        const data = CONFIG.value.disableRYI({ templateId: 1 });
        expect(data).toEqual(['nodeStore', 'nodes', 1, 'disableRYI']);
      });
    });
  });
});
