import { NODE_STORE, NODE_STORE_ITEM } from 'appConstants';
import { CONFIG } from '../config';

describe('config.test.js', () => {
  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG).toBe('object');
    });
  });

  describe('value', () => {
    it('should exist', () => {
      expect(typeof CONFIG.value).toBe('object');
    });

    describe('featuredTours', () => {
      it('should exist', () => {
        expect(CONFIG.value.featuredTours).toEqual([
          NODE_STORE,
          NODE_STORE_ITEM.FEATURED_TOURS,
        ]);
      });

      describe('open', () => {
        it('keyPath should exist', () => {
          expect(CONFIG.value.open.keyPath({ userId: 1 })).toMatchSnapshot();
        });
        it('getter should exist (1)', () => {
          expect(CONFIG.value.open.getter('true')).toBe(true);
        });
        it('getter should exist (2)', () => {
          expect(CONFIG.value.open.getter('false')).toBe(false);
        });
        it('getter should exist (3)', () => {
          expect(CONFIG.value.open.getter()).toBe(true);
        });
      });
    });
  });

  describe('isLoading', () => {
    it('should exist', () => {
      expect(CONFIG.isLoading).toMatchSnapshot();
    });
  });
});
