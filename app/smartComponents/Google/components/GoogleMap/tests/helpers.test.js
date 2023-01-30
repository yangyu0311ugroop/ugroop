import { GOOGLE_API_HELPERS } from '../helpers';

describe('GoogleMap/helpers.js', () => {
  afterEach(() => jest.clearAllMocks());

  describe('Smoke Test', () => {
    it('should exists', () => {
      expect(typeof GOOGLE_API_HELPERS).toBe('object');
    });
  });

  describe('normaliseWaypoint', () => {
    it('should normaliseWaypoint', () => {
      expect(
        GOOGLE_API_HELPERS.normaliseWaypoint([{ location: { placeId: 123 } }])(
          [],
          0,
        ),
      ).toMatchSnapshot();
    });
  });

  describe('normaliseData', () => {
    it('should normaliseData', () => {
      GOOGLE_API_HELPERS.normaliseWaypoint = jest.fn(() => () => [
        'normaliseWaypoint',
      ]);

      expect(
        GOOGLE_API_HELPERS.normaliseData({
          request: {
            origin: { placeId: 'origin' },
            destination: { placeId: 'destination' },
          },
          routes: [
            {
              bounds: 'bounds',
              legs: 'legs',
              summary: 'summary',
              overview_polyline: 'overview_polyline',
              waypoint_order: [1, 2],
            },
          ],
        }),
      ).toMatchSnapshot();
    });
  });

  describe('normaliseLeg', () => {
    it('should normaliseLeg', () => {
      expect(
        GOOGLE_API_HELPERS.normaliseLeg(
          {
            start_location: {
              lat: () => 'lat',
              lng: () => 'lng',
            },
            distance: { value: 2233 },
            duration: { value: 3344 },
          },
          { prop: 'marker' },
        ),
      ).toMatchSnapshot();
    });
  });

  describe('normaliseLegs', () => {
    it('should normaliseLegs', () => {
      expect(
        GOOGLE_API_HELPERS.normaliseLegs([
          {
            start_location: {
              lat: () => 'lat',
              lng: () => 'lng',
            },
            end_location: {
              lat: () => 'lat end',
              lng: () => 'lng end',
            },
            distance: { value: 2233 },
            duration: { value: 3344 },
          },
        ]),
      ).toMatchSnapshot();
    });
  });

  describe('normaliseMarker', () => {
    it('should return if idx > legs.length', () => {
      expect(
        GOOGLE_API_HELPERS.normaliseMarker({
          legs: [1, 2],
        })(
          {
            nodes: ['nodes'],
            markers: ['markers'],
            distance: 'distance',
            duration: 'duration',
          },
          22,
          2,
        ),
      ).toMatchSnapshot();
    });

    it('should return normaliseMarker middle', () => {
      expect(
        GOOGLE_API_HELPERS.normaliseMarker({
          index: 0,
          routeIds: [33, 44],
          route: [33, 44],
          isLast: true,
          legs: [
            {
              start_location: {
                lat: () => 'lat',
                lng: () => 'lng',
              },
              distance: { text: 555 },
              duration: { text: 666 },
            },
            {},
          ],
        })(
          {
            nodes: [],
            markers: [],
            distance: 0,
            duration: 0,
          },
          22,
          0,
        ),
      ).toMatchSnapshot();
    });

    it('should return normaliseMarker last', () => {
      expect(
        GOOGLE_API_HELPERS.normaliseMarker({
          index: 0,
          routeIds: [33, 44],
          route: [33, 44],
          isLast: true,
          legs: [
            {
              start_location: {
                lat: () => 'lat',
                lng: () => 'lng',
              },
              end_location: {
                lat: () => 'latEnd',
                lng: () => 'lngEnd',
              },
              distance: { value: 555 },
              duration: { value: 666 },
            },
          ],
        })(
          {
            nodes: [],
            markers: [],
            distance: 0,
            duration: 0,
          },
          22,
          0,
        ),
      ).toMatchSnapshot();
    });
  });

  describe('normaliseDirection', () => {
    it('should return if idx > legs.length', () => {
      GOOGLE_API_HELPERS.normaliseData = jest.fn(() => ({
        bounds: 'bounds',
        summary: 'summary',
        polyline: 'polyline',
        route: [1],
      }));
      GOOGLE_API_HELPERS.normaliseMarker = jest.fn(() => () => ({
        marker: 'marker',
      }));

      expect(GOOGLE_API_HELPERS.normaliseDirection({}, {})).toMatchSnapshot();
    });
  });
});
