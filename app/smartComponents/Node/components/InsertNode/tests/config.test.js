import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { CONFIG } from '../config';

describe('InsertNode/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG).toBe('object');
    });
  });

  describe('setValue', () => {
    it('should exists', () => {
      expect(typeof CONFIG.setValue).toBe('object');
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof CONFIG.value).toBe('object');
    });

    describe('insertBeforeType', () => {
      it('should insertBeforeType', () => {
        expect(CONFIG.value.insertBeforeType({ insertBefore: 123 })).toEqual(
          NODE_STORE_SELECTORS.type({ id: 123 }),
        );
      });
    });

    describe('insertAfterType', () => {
      it('should insertAfterType', () => {
        expect(CONFIG.value.insertAfterType({ insertAfter: 123 })).toEqual(
          NODE_STORE_SELECTORS.type({ id: 123 }),
        );
      });
    });

    describe('firstChild', () => {
      it('should firstChild', () => {
        expect(CONFIG.value.firstChild({ parentId: 123 })).toEqual(
          NODE_STORE_SELECTORS.child(0)({ id: 123 }),
        );
      });
    });
  });
});
