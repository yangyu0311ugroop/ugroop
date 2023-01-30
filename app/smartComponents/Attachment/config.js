import { ATTACHMENT_STORE_SELECTORS } from 'datastore/attachmentStore/selectors';

export const CONFIG = {
  value: {
    url: ATTACHMENT_STORE_SELECTORS.url,
    name: ATTACHMENT_STORE_SELECTORS.name,
    fileSize: ATTACHMENT_STORE_SELECTORS.fileSize,
    description: ATTACHMENT_STORE_SELECTORS.description,
  },
};
