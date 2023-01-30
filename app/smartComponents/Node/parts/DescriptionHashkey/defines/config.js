import { RESAGA_HELPERS } from 'utils/helpers/resaga';
import { TEMPLATE_MANAGEMENT_DATASTORE } from 'appConstants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

export const TEMPLATE_ID = {
  value: {
    templateId: [TEMPLATE_MANAGEMENT_DATASTORE, 'id'],
  },
};

export const CONFIG = {
  value: {
    hashkey: RESAGA_HELPERS.mapToId(NODE_STORE_SELECTORS.hashkey, 'templateId'),
    hashkeyDescription: RESAGA_HELPERS.mapToId(
      NODE_STORE_SELECTORS.hashkeyDescription,
      'templateId',
    ),
    templateId: [TEMPLATE_MANAGEMENT_DATASTORE, 'id'],
  },
};
