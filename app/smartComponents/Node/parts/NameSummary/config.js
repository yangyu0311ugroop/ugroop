import {
  NODE_STORE_SELECTORS,
  NODE_VIEW_STORE_SELECTORS,
} from 'datastore/nodeStore/selectors';
import { RESAGA_HELPERS } from 'utils/helpers/resaga';
import { ATTACHMENT_STORE_SELECTORS } from 'datastore/attachmentStore/selectors';

export const CONFIG = {
  value: {
    value: NODE_STORE_SELECTORS.content,
    description: NODE_STORE_SELECTORS.description,
    location: NODE_STORE_SELECTORS.location,
    type: NODE_STORE_SELECTORS.type,
    url: NODE_STORE_SELECTORS.url,
    attachmentId: NODE_STORE_SELECTORS.attachmentId,
    editable: RESAGA_HELPERS.subscribeIfNotGiven(
      NODE_VIEW_STORE_SELECTORS.editable,
      'editable',
    ),
  },
};

export const CONFIG_ATTACH = {
  value: {
    attachmentName: ({ attachmentId }) =>
      ATTACHMENT_STORE_SELECTORS.name({ id: attachmentId }),
    attachmentdescription: ({ attachmentId }) =>
      ATTACHMENT_STORE_SELECTORS.description({
        id: attachmentId,
      }),
  },
  setValue: {},
};
