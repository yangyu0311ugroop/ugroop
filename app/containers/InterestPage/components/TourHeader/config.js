import { RESAGA_HELPERS } from 'utils/helpers/resaga';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

export const CONFIG = {
  value: {
    id: RESAGA_HELPERS.mapToId(NODE_STORE_SELECTORS.photoId, 'templateId'),
    title: RESAGA_HELPERS.mapToId(NODE_STORE_SELECTORS.content, 'templateId'),
  },
};
