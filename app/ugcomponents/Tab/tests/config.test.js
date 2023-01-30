import { NODE_STORE, PUBLIC_LINK } from 'appConstants';
import CONFIG from '../config';

describe('TAB CONFIG', () => {
  describe('value', () => {
    describe('label', () => {
      /*  it('should get the value', () => {
        expect(typeof CONFIG.value.label).toBe('function');
        expect(CONFIG.value.label({ tabId: 123 })).toEqual([
          NODE_STORE,
          'nodes',
          123,
          'content',
        ]);
      }); */
      it('should get the keypath', () => {
        expect(CONFIG.value.label.keyPath({ tabId: 123 })).toEqual([
          NODE_STORE,
          'nodes',
          123,
          'content',
        ]);
      });
      it('should getter should return label', () => {
        expect(CONFIG.value.label.getter('test', { tabId: 123 })).toEqual(
          'test',
        );
      });
      it('should getter return PUBLIC_LINK.PUBLIC_TAB_MAP_LABEL value', () => {
        expect(CONFIG.value.label.getter('test', { tabId: -1 })).toEqual(
          PUBLIC_LINK.PUBLIC_TAB_MAP_LABEL,
        );
      });
    });

    describe('privateTab', () => {
      it('should get the value', () => {
        expect(typeof CONFIG.value.privateTab).toBe('function');
        expect(CONFIG.value.privateTab({ tabId: 123 })).toEqual([
          NODE_STORE,
          'nodes',
          123,
          'customData',
          'private',
        ]);
      });
    });

    describe('accessible', () => {
      it('should get the value', () => {
        expect(typeof CONFIG.value.accessible).toBe('object');
        expect(Array.isArray(CONFIG.value.accessible.keyPath)).toBe(true);
        expect(typeof CONFIG.value.accessible.getter).toBe('function');
        expect(typeof CONFIG.value.accessible.keyPath[0]).toBe('function');
        expect(typeof CONFIG.value.accessible.keyPath[1]).toBe('function');

        expect(CONFIG.value.accessible.keyPath[0]({ tabId: 123 })).toEqual([
          NODE_STORE,
          'nodes',
          123,
          'createdBy',
        ]);
        expect(CONFIG.value.accessible.keyPath[1]({ tabId: 123 })).toEqual([
          NODE_STORE,
          'nodes',
          123,
          'customData',
          'private',
        ]);

        const getter = CONFIG.value.accessible.getter;

        expect(getter(1, false)).toBe(true);
      });
    });
  });
});
