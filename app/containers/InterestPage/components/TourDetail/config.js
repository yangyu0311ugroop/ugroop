import { RESAGA_HELPERS } from 'utils/helpers/resaga';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

export const CONFIG = {
  value: {
    dayIds: RESAGA_HELPERS.mapToId(NODE_STORE_SELECTORS.children, 'tabId'),
    title: RESAGA_HELPERS.mapToId(NODE_STORE_SELECTORS.content, 'templateId'),
    description: RESAGA_HELPERS.mapToId(
      NODE_STORE_SELECTORS.description,
      'templateId',
    ),
  },
};
