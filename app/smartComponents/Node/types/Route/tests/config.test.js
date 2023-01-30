import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { CONFIG } from '../config';

describe('Route/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG).toBe('object');
    });
  });

  describe('value', () => {
    it('should exists', () => {
      expect(typeof CONFIG.value).toBe('object');
    });

    describe('route', () => {
      it('should return cacheKey', () => {
        expect(
          CONFIG.value.route.cacheKey({ parentId: 2233, id: 3344 }),
        ).toMatchSnapshot();
      });

      it('should return keyPath', () => {
        expect(CONFIG.value.route.keyPath[0]({ parentId: 2233 })).toEqual(
          NODE_STORE_SELECTORS.children({ id: 2233 }),
        );
      });

      it('should return getter null', () => {
        expect(CONFIG.value.route.getter(0, 22, 33)).toEqual({
          origin: 22,
          destination: 33,
        });
      });

      it('should return getter null #2', () => {
        expect(CONFIG.value.route.getter([], 22, 33)).toEqual({
          origin: 22,
          destination: 33,
        });
      });

      it('should return getter', () => {
        expect(
          CONFIG.value.route.getter([1, 2, 3, 4, 5], 2, 4),
        ).toMatchSnapshot();
      });
    });
  });
});
