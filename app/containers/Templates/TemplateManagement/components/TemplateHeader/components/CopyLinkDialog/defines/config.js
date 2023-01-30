import { RESAGA_HELPERS } from 'utils/helpers/resaga';
import {
  TEMPLATE_MANAGEMENT_DATASTORE,
  TEMPLATE_MANAGEMENT_VIEWSTORE,
} from 'appConstants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

export const TEMPLATE_ID = {
  value: {
    templateId: [TEMPLATE_MANAGEMENT_DATASTORE, 'id'],
  },
};

export const CONFIG = {
  setValue: {
    showCopyLinkDialog: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'showCopyLinkDialog'],
  },
  value: {
    title: NODE_STORE_SELECTORS.content,
    hashkey: RESAGA_HELPERS.mapToId(NODE_STORE_SELECTORS.hashkey, 'templateId'),
    hashkeyDescription: RESAGA_HELPERS.mapToId(
      NODE_STORE_SELECTORS.hashkeyDescription,
      'templateId',
    ),
    showCopyLinkDialog: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'showCopyLinkDialog'],
    disableRYI: ({ templateId }) =>
      NODE_STORE_SELECTORS.disableRYI({ id: templateId }),
  },
};
