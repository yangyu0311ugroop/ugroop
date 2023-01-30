import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { CONFIG } from '../dayConfig';

describe('Config Test', () => {
  describe('ActivityIds Test', () => {
    it('KeyPath', () => {
      expect(CONFIG.value.activityIds({ dayId: 1 })).toEqual(
        NODE_STORE_SELECTORS.children({ id: 1 }),
      );
    });
  });
  describe('photoId Test', () => {
    it('KeyPath', () => {
      expect(CONFIG.value.photoId({ dayId: 1 })).toEqual(
        NODE_STORE_SELECTORS.photoId({ id: 1 }),
      );
    });
  });
  describe('Content Test', () => {
    describe('keyPath', () => {
      it('should have content', () => {
        expect(CONFIG.value.content.keyPath[0]({ dayId: 1 })).toEqual(
          NODE_STORE_SELECTORS.content({ id: 1 }),
        );
      });
      it('should have children', () => {
        expect(CONFIG.value.content.keyPath[1]({ dayId: 1 })).toEqual(
          NODE_STORE_SELECTORS.children({ id: 1 }),
        );
      });
      it('should have description', () => {
        expect(CONFIG.value.content.keyPath[2]({ dayId: 1 })).toEqual(
          NODE_STORE_SELECTORS.description({ id: 1 }),
        );
      });
      it('should have url', () => {
        expect(CONFIG.value.content.keyPath[3]({ dayId: 1 })).toEqual(
          NODE_STORE_SELECTORS.url({ id: 1 }),
        );
      });
    });
    it('spreadObject', () => {
      expect(CONFIG.value.content.spreadObject).toBe(true);
    });
    it('getter returns content', () => {
      const content = CONFIG.value.content.getter(
        'test01',
        [1, 2],
        'description',
      );
      expect(content).toEqual({
        hasContent: true,
        content: 'test01',
        description: 'description',
      });
    });
    it('getter not returns content', () => {
      const content = CONFIG.value.content.getter('', [], '');
      expect(content).toEqual({
        hasContent: false,
        content: '',
        description: '',
      });
    });
  });

  describe('value editing Test', () => {
    it('should exist', () => {
      expect(CONFIG.value.editing({ dayId: 1 })).toEqual(
        NODE_STORE_SELECTORS.editing({ id: 1 }),
      );
    });
  });

  describe('setValue editing Test', () => {
    it('should exist', () => {
      expect(CONFIG.setValue.editing({ dayId: 1 })).toEqual(
        NODE_STORE_SELECTORS.editing({ id: 1 }),
      );
    });
  });
});
