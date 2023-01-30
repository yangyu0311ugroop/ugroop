import { NODE_STORE } from 'appConstants';
import { COMMENT } from 'containers/Templates/TemplateManagement/components/Comment/config';
import { CONFIG } from '../toolBarConfig';

describe('Config Test', () => {
  describe('#setValue', () => {
    it('contains required properties', () => {
      expect(CONFIG.setValue.nodeId).toEqual([COMMENT, 'nodeId']);
      expect(CONFIG.setValue.nodeStore).toEqual([COMMENT, 'nodeStore']);
      expect(CONFIG.setValue.nodeData).toEqual([COMMENT, 'nodeData']);
      expect(CONFIG.setValue.sections).toEqual([NODE_STORE, 'nodes']);
      expect(CONFIG.setValue.days).toEqual([NODE_STORE, 'nodes']);
    });
  });
});
