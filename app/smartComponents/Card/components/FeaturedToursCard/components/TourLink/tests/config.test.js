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
        const result = CONFIG.value.featuredTour({ id: 2 });

        expect(result).toEqual([NODE_STORE, NODE_STORE_ITEM.FEATURED_TOURS, 2]);
      });
    });
  });
});
