import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';
import {
  NODE_STORE,
  TEMPLATE_MANAGEMENT_VIEWSTORE,
  ATTACHMENT_DATASTORE,
} from 'appConstants';

export const CONFIG = {
  value: {
    name: ({ id }) => [ATTACHMENT_DATASTORE, 'attachments', id, 'name'],
    attachmentURL: ({ id }) => [ATTACHMENT_DATASTORE, 'attachments', id, 'url'],
    fileSize: ({ id }) => [ATTACHMENT_DATASTORE, 'attachments', id, 'fileSize'],
    description: ({ id }) => [
      ATTACHMENT_DATASTORE,
      'attachments',
      id,
      'description',
    ],
    node: ({ sectionId }) => NODE_STORE_SELECTORS.node({ id: sectionId }),
    attachmentDescription: ({ sectionId }) => [
      TEMPLATE_MANAGEMENT_VIEWSTORE,
      'editSections',
      sectionId,
      'attachmentDescription',
    ],
  },
  setValue: {
    editSections: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'editSections'],
    nodes: [NODE_STORE, 'nodes'],
  },
};
