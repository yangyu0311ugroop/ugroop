import { WAYPOINTS_LIMIT } from 'appConstants';
import first from 'lodash/first';

const normaliseWaypoint = waypoints => (accu, order) => {
  const {
    location: { placeId },
  } = waypoints[order];
  return accu.concat(placeId);
};

const normaliseData = direction => {
  const { request, routes } = direction;
  const {
    bounds,
    legs,
    waypoint_order: waypointOrders,
    summary,
    overview_polyline: polyline,
  } = routes[0];
  const {
    origin: { placeId: origin },
    destination: { placeId: destination },
    waypoints,
  } = request;

  const normaliseWaypoints = waypointOrders.reduce(
    GOOGLE_API_HELPERS.normaliseWaypoint(waypoints),
    [],
  );

  return {
    bounds,
    legs,
    route: [origin, ...normaliseWaypoints, destination],
    summary,
    polyline,
  };
};

const normaliseLeg = (
  {
    [locationKey || 'start_location']: location,
    distance: { value: legDistance },
    duration: { value: legDuration },
  },
  marker,
  locationKey,
) => ({
  marker: {
    lat: location.lat(),
    lng: location.lng(),
    ...marker,
  },
  distance: legDistance,
  duration: legDuration,
});

const normaliseLegs = legs => {
  const {
    start_location: start,
    end_location: end,
    distance: { text: legDistance },
    duration: { text: legDuration },
  } = first(legs);

  return {
    startMarker: {
      lat: start.lat(),
      lng: start.lng(),
    },
    endMarker: {
      lat: end.lat(),
      lng: end.lng(),
    },
    distance: legDistance,
    duration: legDuration,
  };
};

const normaliseMarker = ({
  index,
  legs,
  routeIds,
  isLast,
  route,
  ids = [],
}) => ({ nodes, markers, distance, duration }, placeId, idx) => {
  const isFirst = index === 0;

  // legs length smaller than route length by 1
  if (idx > legs.length - 1) return { nodes, markers, distance, duration };

  const {
    start_location: startLocation,
    distance: { value: legDistance },
    duration: { value: legDuration },
  } = legs[idx];

  const startId = routeIds[index * WAYPOINTS_LIMIT + idx];
  const start = {
    id: startId,
    index: idx,
    placeId,
    origin: isFirst && idx === 0,
    destination: isLast && idx === route.length - 1,
    lat: startLocation.lat(),
    lng: startLocation.lng(),
    distance: legDistance,
    duration: legDuration,
  };
  const nodeStart = {
    [startId]: {
      calculated: {
        index: ids.indexOf(startId),
        distance: legDistance,
        origin: isFirst && idx === 0,
        destination: isLast && idx === route.length - 1,
      },
    },
  };

  // process last leg
  if (isLast && idx === legs.length - 1) {
    const { end_location: endLocation } = legs[idx];

    const endPlaceId = route[idx + 1];
    const endId = routeIds[index * WAYPOINTS_LIMIT + idx + 1];
    const end = {
      id: endId,
      index: idx + 1,
      placeId: endPlaceId,
      origin: isFirst && idx === 0,
      destination: isLast && idx === route.length - 2,
      lat: endLocation.lat(),
      lng: endLocation.lng(),
    };
    const nodeEnd = {
      [endId]: {
        calculated: {
          index: ids.indexOf(endId),
          origin: isFirst && idx === 0,
          destination: isLast && idx === route.length - 2,
        },
      },
    };

    return {
      markers: markers.concat([start, end]),
      nodes: { ...nodes, ...nodeStart, ...nodeEnd },
      distance: distance + legDistance,
      duration: duration + legDuration,
    };
  }

  // if the route is not the first part, ignore the first one
  // if (index > 0 && idx === 0) return { markers, distance, duration };

  // process other leg
  return {
    markers: markers.concat([start]),
    nodes: { ...nodes, ...nodeStart },
    distance: distance + legDistance,
    duration: duration + legDuration,
  };
};

const normaliseDirection = ({ index, direction, isLast }, props) => {
  const {
    bounds,
    legs,
    route,
    summary,
    polyline,
  } = GOOGLE_API_HELPERS.normaliseData(direction);

  return {
    bounds,
    summary,
    polyline,
    ...route.reduce(
      GOOGLE_API_HELPERS.normaliseMarker({
        index,
        legs,
        isLast,
        route,
        ...props,
      }),
      {
        nodes: {},
        markers: [],
        distance: 0,
        duration: 0,
      },
    ),
  };
};

export const GOOGLE_API_HELPERS = {
  normaliseWaypoint,
  normaliseData,
  normaliseLeg,
  normaliseLegs,
  normaliseMarker,
  normaliseDirection,
};
