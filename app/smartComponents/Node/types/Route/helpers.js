import { DRIVING, WAYPOINTS_LIMIT } from 'appConstants';
// match google map apis format
import { chunk, first, last } from 'lodash';
import get from 'lodash/get';
import { GOOGLE_API_HELPERS } from 'smartComponents/Google/components/GoogleMap/helpers';
import { LOGIC_HELPERS } from 'utils/helpers/logic';

const normaliseChunk = placeIds => {
  const origin = { placeId: first(placeIds) };
  const destination = { placeId: last(placeIds) };

  const waypoints = placeIds
    .slice(1, placeIds.length - 1)
    .reduce((accu, placeId) => accu.concat({ location: { placeId } }), []);

  return { origin, destination, waypoints, travelMode: DRIVING };
};

const findRoutes = (findRoute, params) => {
  const {
    payload: { placeIds = [], routeIds, ...payload },
    ...prop
  } = params;

  const chunks = chunk(placeIds, WAYPOINTS_LIMIT);
  let total = chunks.length;

  for (let i = 0; i < chunks.length; i += 1) {
    let chunkIds = chunks[i];

    if (chunkIds.length > 1) {
      // add the first place of the next chunk
      if (i < chunks.length - 1) {
        chunkIds = chunkIds.concat(first(chunks[i + 1]));
      }

      setTimeout(() => {
        findRoute({
          data: {
            index: i,
            placeIds,
            routeIds,
            ...payload,
          },
          payload: normaliseChunk(chunkIds),
          ...prop,
        });
      }, i * 1000);
    } else {
      total -= 1;
    }
  }

  return total;
};

const normalisePolylines = (direction, { googleMaps }) => {
  let polylines = [];
  let polyline;
  let polyline2;

  const legs = direction.routes[0].legs;

  for (let i = 0; i < legs.length; i += 1) {
    const steps = legs[i].steps;

    polyline = new googleMaps.Polyline({
      path: [],
      strokeColor: '#81adf6',
      strokeOpacity: 1,
      strokeWeight: 4,
      zIndex: i * 2 + 1,
      geodesic: true,
    });
    polyline2 = new googleMaps.Polyline({
      path: [],
      strokeColor: '#2a73d7',
      strokeOpacity: 1,
      strokeWeight: 6,
      zIndex: i * 2,
      geodesic: true,
    });

    for (let j = 0; j < steps.length; j += 1) {
      const nextSegment = steps[j].path;
      for (let k = 0; k < nextSegment.length; k += 1) {
        polyline.getPath().push(nextSegment[k]);
        polyline2.getPath().push(nextSegment[k]);
      }
    }

    polylines = polylines.concat([polyline, polyline2]);
  }

  return polylines;
};

const generatePolylines = (path, { map, maps }) => {
  const polyline = new maps.Polyline({
    path,
    strokeColor: '#81adf6',
    strokeOpacity: 1,
    strokeWeight: 4,
    zIndex: 1,
    geodesic: true,
  });
  const polyline2 = new maps.Polyline({
    path,
    strokeColor: '#2a73d7',
    strokeOpacity: 1,
    strokeWeight: 6,
    geodesic: true,
  });

  polyline.setMap(map);
  polyline2.setMap(map);

  return [polyline, polyline2];
};

const normaliseResult = (
  { raw, routeIds, ...result } = {},
  { googleMaps, ...props } = {},
) =>
  raw && raw.length
    ? raw.reduce(
        (
          {
            polylines,
            bounds,
            distance,
            duration,
            markers,
            summary,
            markerIds,
            nodes,
            ...accu
          },
          direction,
          index,
        ) => {
          const route = GOOGLE_API_HELPERS.normaliseDirection(
            {
              index,
              direction: raw[index],
              isLast: index === raw.length - 1,
            },
            {
              routeIds,
              googleMaps,
              ...props,
            },
          );

          const mIds = route.markers.reduce(
            (acc, { id }) => acc.concat(id),
            [],
          );

          return {
            ...accu,
            bounds: googleMaps && bounds.union(route.bounds),
            distance: distance + route.distance,
            duration: duration + route.duration,
            nodes: { ...nodes, ...route.nodes },
            markers: markers.concat(route.markers),
            markerIds: markerIds.concat(mIds),
            summary: LOGIC_HELPERS.ifElse(
              summary,
              `${summary}, ${route.summary}`,
              route.summary,
            ),
            polylines:
              googleMaps &&
              polylines.concat(
                ROUTE_HELPERS.normalisePolylines(direction, {
                  index,
                  routeIds,
                  googleMaps,
                  ...props,
                }),
              ),
          };
        },
        {
          ...result,
          bounds: googleMaps && new googleMaps.LatLngBounds(),
          distance: 0,
          duration: 0,
          nodes: {},
          markers: [],
          markerIds: [],
          polylines: [],
          summary: '',
          routeIds,
        },
      )
    : {};

const polylinesSetMap = (polylines = [], map) => {
  if (!polylines.length) return null;

  for (let i = 0; i < polylines.length; i += 1) {
    if (polylines[i]) {
      polylines[i].setMap(map);
    }
  }

  return true;
};

const renderDistance = distance =>
  `${Math.round((distance / 1000) * 10) / 10} km`;

const normaliseStops = ({ ids = [], origin, destination }) => {
  let o = 0;
  let d = 0;

  if (ids.indexOf(origin) !== -1) {
    o = origin;

    if (ids.indexOf(destination) !== -1) {
      d = destination;
    }
  } else if (ids.indexOf(destination) !== -1) {
    o = destination;
  }

  return {
    origin: o,
    destination: d,
  };
};

const routeIds = ({ ids = [], origin, destination }) => {
  if (!Array.isArray(ids) || !ids.length) {
    return [];
  }

  const originIndex = ids.indexOf(origin);
  const destinationIndex = ids.indexOf(destination);

  return ids.slice(originIndex, destinationIndex + 1);
};

const haversineDistance = (geo1, geo2) => {
  const R = 6371; // Radius of the Earth in km
  const rlat1 = geo1.lat * (Math.PI / 180); // Convert degrees to radians
  const rlat2 = geo2.lat * (Math.PI / 180); // Convert degrees to radians
  const difflat = rlat2 - rlat1; // Radian difference (latitudes)
  const difflon = (geo2.lng - geo1.lng) * (Math.PI / 180); // Radian difference (longitudes)

  return (
    2 *
    R *
    Math.asin(
      Math.sqrt(
        Math.sin(difflat / 2) * Math.sin(difflat / 2) +
          Math.cos(rlat1) *
            Math.cos(rlat2) *
            Math.sin(difflon / 2) *
            Math.sin(difflon / 2),
      ),
    )
  );
};

const normalisePlaceGeocode = place => {
  if (!place) return null;

  const lat = get(place, 'geometry.location.lat');
  const lng = get(place, 'geometry.location.lng');

  if (typeof lat !== 'function' || typeof lng !== 'function') {
    return null;
  }

  const latitude = lat();
  const longitude = lng();

  return { lat: latitude, lng: longitude };
};

const normalisePlaceViewport = place => {
  if (!place) return null;

  return get(place, 'geometry.viewport');
};

export const ROUTE_HELPERS = {
  routeIds,
  findRoutes,
  normalisePolylines,
  generatePolylines,
  normaliseChunk,
  normaliseResult,
  polylinesSetMap,
  renderDistance,
  normaliseStops,
  haversineDistance,
  normalisePlaceGeocode,
  normalisePlaceViewport,
};
