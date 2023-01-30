import { NODE_STORE, TEMPLATE_MANAGEMENT_VIEWSTORE } from 'appConstants';
import { PORTAL_HELPERS } from 'containers/Portal/helpers';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { CONFIG_HELPERS } from 'smartComponents/Node/logics/CalculatedRoute/config';
import { ROUTE_HELPERS } from 'smartComponents/Node/types/Route/helpers';

export const CONFIG = {
  value: {
    content: NODE_STORE_SELECTORS.content,
    route: {
      cacheKey: ({ parentId, id }) => `${parentId}.route.${id}`,
      keyPath: [
        ({ parentId }) => NODE_STORE_SELECTORS.children({ id: parentId }),
        NODE_STORE_SELECTORS.origin,
        NODE_STORE_SELECTORS.destination,
      ],
      props: null,
      getter: (dayIds, origin, destination) => {
        if (!Array.isArray(dayIds) || !dayIds.length) {
          return { origin, destination };
        }

        const originIndex = dayIds.indexOf(origin);
        const destinationIndex = dayIds.indexOf(destination);

        return {
          origin,
          destination,
          originIndex,
          destinationIndex,
          waypoints: dayIds.slice(originIndex + 1, destinationIndex),
          routeIds: ROUTE_HELPERS.routeIds({
            ids: dayIds,
            origin,
            destination,
          }),
          dayIds,
        };
      },
      spreadObject: true,
    },
    travelMode: NODE_STORE_SELECTORS.travelMode,
    markerIds: NODE_STORE_SELECTORS.calculatedMarkerIds,
  },
};

export const PLACE_IDS_CONFIG = {
  value: {
    selectedId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'selectedId'],
    polylineClicked: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'polylineClicked'],

    mouseEnterId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'mouseEnterId'],
    mouseEnter: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'mouseEnter'],
    clickId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'clickId'],
    hoverId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'hoverId'],
    click: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'click'],
    showDetail: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'showDetail'],
    clickZoom: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'clickZoom'],

    placeIds: CONFIG_HELPERS.selectRouteIds,
  },
  setValue: {
    selectedId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'selectedId'],
    hoverId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'hoverId'],
    polylineClicked: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'polylineClicked'],
    mouseEnterId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'mouseEnterId'],
    mouseEnter: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'mouseEnter'],
    clickId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'clickId'],
    click: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'click'],
    clickZoom: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'clickZoom'],
    ...PORTAL_HELPERS.setValue,

    nodes: [NODE_STORE, 'nodes'],
    distance: NODE_STORE_SELECTORS.calculatedDistance,
    markerIds: NODE_STORE_SELECTORS.calculatedMarkerIds,
  },
};
