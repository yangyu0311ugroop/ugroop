import { NODE_STORE, TEMPLATE_MANAGEMENT_DATASTORE } from 'appConstants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';
export const CONFIG = {
  value: {
    templateId: [TEMPLATE_MANAGEMENT_DATASTORE, 'id'],
    parentType: RESAGA_HELPERS.mapToId(NODE_STORE_SELECTORS.type, 'parentId'),
  },
};

export const CONFIG2 = {
  value: {
    visibleTabIds1: ({ templateId }) =>
      NODE_STORE_SELECTORS.calculatedVisibleChildren({ id: templateId }),
    visibleTabIds: RESAGA_HELPERS.mapToId(
      NODE_STORE_SELECTORS.calculatedVisibleChildren,
      'templateId',
    ),
  },
  setValue: {
    nodes: [NODE_STORE, 'nodes'],
  },
};
