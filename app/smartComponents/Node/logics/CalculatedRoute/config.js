import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { ROUTE_HELPERS } from 'smartComponents/Node/types/Route/helpers';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';

const trim = params => {
  const { placeIds: places, routeIds: routes } = params;

  // remove nodes that doesn't have placeIds
  return {
    ...params,
    ...routes.reduce(
      ({ placeIds, routeIds, trimmedIds }, id, index) => {
        if (!places[index])
          return {
            placeIds,
            routeIds,
            trimmedIds: trimmedIds.concat(id),
          };

        return {
          placeIds: placeIds.concat(places[index]),
          routeIds: routeIds.concat(id),
          trimmedIds,
        };
      },
      { placeIds: [], routeIds: [], trimmedIds: [] },
    ),
  };
};

const selectRouteIds = {
  cacheKey: ({ routeIds = [] }) => `routes.${routeIds.toString()}.placeIds`,
  keyPath: ({ routeIds = [] }) =>
    routeIds.map(id => NODE_STORE_SELECTORS.placeId({ id })),
  props: RESAGA_HELPERS.prop('routeIds'),
  getter: (...placeIds) => {
    const routeIds = placeIds.pop();

    if (!Array.isArray(routeIds) || !routeIds.length) return {};

    return CONFIG_HELPERS.trim({ placeIds, routeIds });
  },
  spreadObject: true,
};

export const CONFIG_HELPERS = {
  trim,
  selectRouteIds,
};

export const CONFIG = {
  value: {
    routeProps: {
      cacheKey: ({ origin, destination }) => `${origin}_${destination}.route`,
      keyPath: [
        ({ parentId }) => NODE_STORE_SELECTORS.children({ id: parentId }),
        NODE_STORE_SELECTORS.origin,
        NODE_STORE_SELECTORS.destination,
      ],
      props: [
        RESAGA_HELPERS.prop('origin'),
        RESAGA_HELPERS.prop('destination'),
      ],
      getter: (
        ids,
        originState,
        destinationState,
        originProp,
        destinationProp,
      ) => {
        let origin;
        let destination;

        if (originProp && destinationProp) {
          origin = originProp;
          destination = destinationProp;
        } else {
          origin = originState;
          destination = destinationState;
        }

        return {
          origin,
          destination,
          routeIds: ROUTE_HELPERS.routeIds({ origin, destination, ids }),
        };
      },
      spreadObject: true,
    },
  },
};

export const PLACE_IDS_CONFIG = {
  value: {
    placeIds: CONFIG_HELPERS.selectRouteIds,
    currentPlaceIds: NODE_STORE_SELECTORS.calculatedPlaceIds,
    // currentRoutes: NODE_STORE_SELECTORS.calculatedRoutes,
  },
  setValue: {
    placeIds: NODE_STORE_SELECTORS.calculatedPlaceIds,
    routeIds: NODE_STORE_SELECTORS.calculatedRouteIds,
    // routes: NODE_STORE_SELECTORS.calculatedRoutes,
    routeError: NODE_STORE_SELECTORS.calculatedRouteError,
  },
};
