import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import {
  PARENT_ID_CONFIG,
  CONFIG,
} from 'smartComponents/Node/components/Marker/components/LegInfo/config';

describe('LegInfo/config.js', () => {
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

    describe('parentNodeId', () => {
      it('should exists', () => {
        expect(PARENT_ID_CONFIG.value.parentNodeId({ routeId: 2233 })).toEqual(
          NODE_STORE_SELECTORS.parentNodeId({ id: 2233 }),
        );
      });
    });

    describe('prevDistance', () => {
      it('should exists', () => {
        expect(CONFIG.value.prevDistance({ prevId: 2233 })).toEqual(
          NODE_STORE_SELECTORS.calculatedDistance({ id: 2233 }),
        );
      });
    });

    describe('routeIds', () => {
      it('should return cacheKey', () => {
        expect(
          CONFIG.value.routeIds.cacheKey({ id: 2233, routeId: 2233 }),
        ).toMatchSnapshot();
      });

      it('should return keyPath', () => {
        expect(CONFIG.value.routeIds.keyPath[0]({ routeId: 2233 })).toEqual(
          NODE_STORE_SELECTORS.origin({ id: 2233 }),
        );
        expect(CONFIG.value.routeIds.keyPath[1]({ routeId: 2233 })).toEqual(
          NODE_STORE_SELECTORS.destination({ id: 2233 }),
        );
        expect(
          CONFIG.value.routeIds.keyPath[2]({ parentNodeId: 2233 }),
        ).toEqual(NODE_STORE_SELECTORS.children({ id: 2233 }));
      });

      it('should return getter 1', () => {
        expect(CONFIG.value.routeIds.getter(2, 4, undefined, 5)).toEqual({
          index: -1,
        });
      });

      it('should return getter 2', () => {
        expect(CONFIG.value.routeIds.getter(2, 4, [1, 2, 3, 4, 5], 3)).toEqual({
          index: 2,
          prevNodeId: 2,
          nextNodeId: 4,
        });
      });

      it('should return getter 3', () => {
        expect(CONFIG.value.routeIds.getter(2, 4, [1, 2, 3, 4, 5], 2)).toEqual({
          index: 1,
          prevNodeId: false,
          nextNodeId: 3,
        });
      });

      it('should return getter 4', () => {
        expect(CONFIG.value.routeIds.getter(2, 4, [1, 2, 3, 4, 5], 4)).toEqual({
          index: 3,
          prevNodeId: 3,
          nextNodeId: false,
        });
      });
    });
  });
});
