import { TEMPLATE_MANAGEMENT_VIEWSTORE } from 'appConstants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';

export const CONFIG = {
  value: {
    active: {
      cacheKey: ({ id }) => `${id}.active`,
      keyPath: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'clickId'],
      props: [RESAGA_HELPERS.prop('id'), RESAGA_HELPERS.prop('active')],
      getter: (clickId, id, active) =>
        active !== undefined ? active : clickId === id,
    },
    hovered: {
      cacheKey: ({ id }) => `${id}.hovered`,
      keyPath: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'hoverId'],
      props: [RESAGA_HELPERS.prop('id'), RESAGA_HELPERS.prop('hovered')],
      getter: (hoverId, id, hovered) => ({
        hovered: hovered !== undefined ? hovered : hoverId === id,
        hoveredElse: hoverId > 0 && hoverId !== id,
      }),
      spreadObject: true,
    },
    index: RESAGA_HELPERS.subscribeIfNotGiven(
      NODE_STORE_SELECTORS.calculatedIndex,
      'index',
    ),
    origin: RESAGA_HELPERS.subscribeIfNotGiven(
      NODE_STORE_SELECTORS.calculatedOrigin,
      'origin',
    ),
    destination: RESAGA_HELPERS.subscribeIfNotGiven(
      NODE_STORE_SELECTORS.calculatedDestination,
      'destination',
    ),
  },
  setValue: {
    mouseEnterId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'mouseEnterId'],
    mouseEnter: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'mouseEnter'],
    click: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'click'],
    clickId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'clickId'],
    clickZoom: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'clickZoom'],
    hoverId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'hoverId'],
  },
};
