import { NODE_STORE } from 'appConstants';
import { CONFIG } from '../config';
describe('TabCustomWrapper/config', () => {
  describe('CONFIG', () => {
    it('exists', () => {
      expect(CONFIG).toBeDefined();
    });
  });
  describe('CONFIG', () => {
    it('tabChildIds id value', () => {
      expect(CONFIG.value.tabChildIds({ tabId: 1 })).toEqual([
        NODE_STORE,
        'nodes',
        1,
        'children',
      ]);
    });
    it('content value', () => {
      expect(CONFIG.value.content({ tabId: 1 })).toEqual([
        NODE_STORE,
        'nodes',
        1,
        'content',
      ]);
    });
    it('tabsData id setValue', () => {
      expect(CONFIG.setValue.tabsData({ tabId: 1 })).toEqual([
        NODE_STORE,
        'nodes',
        1,
        'children',
      ]);
    });
    it('sharedWith value', () => {
      expect(CONFIG.value.sharedWith({ tabId: 1 })).toEqual([
        NODE_STORE,
        'nodes',
        1,
        'sharedWith',
      ]);
    });
    it('printMpde value', () => {
      expect(CONFIG.value.printMode({ tabId: 1 })).toEqual([
        NODE_STORE,
        'nodes',
        1,
        'printMode',
      ]);
    });
  });
});
