import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';

export const PARENT_ID_CONFIG = {
  value: {
    parentNodeId: ({ routeId }) =>
      NODE_STORE_SELECTORS.parentNodeId({ id: routeId }),
  },
};

export const CONFIG = {
  value: {
    location: NODE_STORE_SELECTORS.location,
    distance: NODE_STORE_SELECTORS.calculatedDistance,
    prevDistance: ({ prevId }) =>
      NODE_STORE_SELECTORS.calculatedDistance({ id: prevId }),
    routeIds: {
      cacheKey: ({ routeId, id }) => `${routeId}.prevNextIds.${id}`,
      keyPath: [
        ({ routeId }) =>
          NODE_STORE_SELECTORS.origin({
            id: routeId,
          }),
        ({ routeId }) => NODE_STORE_SELECTORS.destination({ id: routeId }),
        ({ parentNodeId }) =>
          NODE_STORE_SELECTORS.children({ id: parentNodeId }),
      ],
      props: RESAGA_HELPERS.prop('id'),
      getter: (origin, destination, children = [], id) => {
        const index = children.indexOf(id);
        const originIndex = children.indexOf(origin);
        const destinationIndex = children.indexOf(destination);

        if (index === -1) {
          return {
            index,
          };
        }

        return {
          index,
          prevNodeId: index > originIndex && children[index - 1],
          nextNodeId: index < destinationIndex && children[index + 1],
        };
      },
      spreadObject: true,
    },
  },
  setValue: {},
};
