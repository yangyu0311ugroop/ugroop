/* eslint-disable object-shorthand */
import { GOOGLE_API_HELPERS } from 'smartComponents/Google/components/GoogleMap/helpers';
import { TEST_HELPERS } from 'utils/helpers/testHelpers';
import { ROUTE_HELPERS } from '../helpers';

describe('Route/config.js', () => {
  afterEach(() => jest.clearAllMocks());
  const googleMaps = {
    LatLngBounds: function() {
      return { union: jest.fn() };
    },
    Polyline: function() {
      return { getPath: jest.fn(() => []) };
    },
  };

  describe('normalisePolylines', () => {
    it('should return normalisePolylines', () => {
      expect(
        ROUTE_HELPERS.normalisePolylines(
          {
            routes: [
              {
                legs: [
                  {
                    steps: [
                      {
                        path: [1, 2, 3],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          { googleMaps },
        ),
      ).toMatchSnapshot();
    });
  });

  describe('routeIds', () => {
    it('should return empty', () => {
      expect(
        ROUTE_HELPERS.routeIds({
          origin: 2,
          destination: 5,
        }),
      ).toEqual([]);
      expect(
        ROUTE_HELPERS.routeIds({
          ids: [],
          origin: 2,
          destination: 5,
        }),
      ).toEqual([]);
    });

    it('should return routeIds', () => {
      expect(
        ROUTE_HELPERS.routeIds({
          ids: [1, 2, 3, 4, 5],
          origin: 2,
          destination: 5,
        }),
      ).toMatchSnapshot();
    });
  });

  describe('findRoutes', () => {
    it('should return empty payload', () => {
      global.setTimeout = jest.fn(cb => cb());
      const findRoute = jest.fn();

      ROUTE_HELPERS.findRoutes(findRoute, {
        payload: {},
      });
    });

    it('should call findRoute', () => {
      global.setTimeout = jest.fn(cb => cb());
      const findRoute = jest.fn();

      ROUTE_HELPERS.findRoutes(findRoute, {
        payload: {
          placeIds: ['1', '2'],
          routeIds: [1, 2],
        },
      });

      TEST_HELPERS.expectCalled(findRoute);
    });

    it('should call findRoute chunk', () => {
      global.setTimeout = jest.fn(cb => cb());
      const findRoute = jest.fn();

      ROUTE_HELPERS.findRoutes(findRoute, {
        payload: {
          placeIds: [
            '1',
            '2',
            '3',
            '1',
            '2',
            '3',
            '1',
            '2',
            '3',
            '1',
            '2',
            '3',
            '1',
          ],
          routeIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
        },
      });

      TEST_HELPERS.expectCalled(findRoute);
    });
  });

  describe('normaliseResult', () => {
    it('should return empty', () => {
      expect(ROUTE_HELPERS.normaliseResult()).toMatchSnapshot();
    });

    it('should return normaliseResult', () => {
      GOOGLE_API_HELPERS.normaliseDirection = jest.fn(() => ({
        markers: [{ id: 22 }],
        nodes: { 22: { id: 22, content: '22' } },
      }));
      ROUTE_HELPERS.normalisePolylines = jest.fn(() => [22]);

      expect(
        ROUTE_HELPERS.normaliseResult(
          {
            raw: [{}],
          },
          {
            googleMaps,
          },
        ),
      ).toMatchSnapshot();
    });
  });

  describe('polylinesSetMap', () => {
    it('should return null', () => {
      expect(ROUTE_HELPERS.polylinesSetMap()).toBe(null);
    });

    it('should loop', () => {
      const setMap = jest.fn();

      ROUTE_HELPERS.polylinesSetMap([{ setMap }, 0], 2233);

      TEST_HELPERS.expectCalled(setMap);
    });
  });

  describe('renderDistance', () => {
    it('should renderDistance', () => {
      expect(ROUTE_HELPERS.renderDistance(3344)).toMatchSnapshot();
    });
  });

  describe('normaliseStops', () => {
    it('should normaliseStops empty', () => {
      expect(
        ROUTE_HELPERS.normaliseStops({ origin: 1, destination: 4 }),
      ).toMatchSnapshot();
    });

    it('should normaliseStops found origin', () => {
      expect(
        ROUTE_HELPERS.normaliseStops({ ids: [2], origin: 2, destination: 4 }),
      ).toMatchSnapshot();
    });

    it('should normaliseStops found destination', () => {
      expect(
        ROUTE_HELPERS.normaliseStops({ ids: [4], origin: 2, destination: 4 }),
      ).toMatchSnapshot();
    });

    it('should normaliseStops found both', () => {
      expect(
        ROUTE_HELPERS.normaliseStops({
          ids: [2, 3, 4],
          origin: 2,
          destination: 4,
        }),
      ).toMatchSnapshot();
    });
  });
});
