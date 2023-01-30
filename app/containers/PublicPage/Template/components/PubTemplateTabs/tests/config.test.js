import { NODE_STORE } from 'appConstants';
import { CONFIG } from '../config';

describe('Config Test', () => {
  describe('value', () => {
    it('tabs', () => {
      expect(CONFIG.value.tabs({ templateId: 1 })).toEqual([
        NODE_STORE,
        'nodes',
        1,
        'visibleChildren',
      ]);
    });
    it('tabId', () => {
      expect(CONFIG.value.tabId({ templateId: 1, activeTabIndex: 3 })).toEqual([
        NODE_STORE,
        'nodes',
        1,
        'visibleChildren',
        3,
      ]);
    });
  });
});
