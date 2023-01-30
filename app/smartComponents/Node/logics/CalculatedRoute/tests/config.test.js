import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { ROUTE_HELPERS } from 'smartComponents/Node/types/Route/helpers';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { CONFIG, CONFIG_HELPERS } from '../config';

describe('CalculatedPlaceIds/config.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof CONFIG).toBe('object');
      expect(typeof CONFIG_HELPERS).toBe('object');
    });
  });

  describe('trim', () => {
    it('should exists', () => {
      expect(
        CONFIG_HELPERS.trim({
          placeIds: ['111', undefined, '333'],
          routeIds: [1, 2, 3],
        }),
      ).toMatchSnapshot();
    });
  });

  describe('routeProps', () => {
    it('should cacheKey', () => {
      expect(
        CONFIG.value.routeProps.cacheKey({
          origin: 112,
          destination: 223,
        }),
      ).toMatchSnapshot();
    });

    it('should keyPath', () => {
      expect(
        CONFIG.value.routeProps.keyPath[0]({
          parentId: 112,
        }),
      ).toEqual(NODE_STORE_SELECTORS.children({ id: 112 }));
    });

    it('should getter prop', () => {
      ROUTE_HELPERS.routeIds = jest.fn(() => [1, 2, 3]);

      expect(
        CONFIG.value.routeProps.getter([1, 2, 3], 2, 3, 4, 5),
      ).toMatchSnapshot();
    });

    it('should getter state', () => {
      ROUTE_HELPERS.routeIds = jest.fn(() => [1, 2, 3]);

      expect(CONFIG.value.routeProps.getter([1, 2, 3], 2, 3)).toMatchSnapshot();
    });
  });

  describe('CONFIG_HELPERS.selectRouteIds', () => {
    it('should cacheKey', () => {
      expect(CONFIG_HELPERS.selectRouteIds.cacheKey({})).toMatchSnapshot();
      expect(
        CONFIG_HELPERS.selectRouteIds.cacheKey({
          routeIds: [1, 2],
        }),
      ).toMatchSnapshot();
    });

    it('should keyPath', () => {
      expect(CONFIG_HELPERS.selectRouteIds.keyPath({})).toMatchSnapshot();
      expect(
        CONFIG_HELPERS.selectRouteIds.keyPath({
          routeIds: [1, 2],
        }),
      ).toMatchSnapshot();
    });

    it('should return {}', () => {
      expect(CONFIG_HELPERS.selectRouteIds.getter()).toEqual({});
      expect(CONFIG_HELPERS.selectRouteIds.getter([])).toEqual({});
    });

    it('should return trim', () => {
      CONFIG_HELPERS.trim = jest.fn(() => 'trim');

      expect(CONFIG_HELPERS.selectRouteIds.getter([1])).toEqual('trim');

      TEST_HELPERS.expectCalled(CONFIG_HELPERS.trim);
    });
  });
});
