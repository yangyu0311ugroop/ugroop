import { TEMPLATE_MANAGEMENT_VIEWSTORE, NODE_STORE } from 'appConstants';

export const CONFIG = {
  value: {
    ownerId: ({ templateId }) => [NODE_STORE, 'nodes', templateId, 'createdBy'],
    shareDialog: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'shareDialog'],
    transferDialog: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'transferDialog'],
  },
  setValue: {
    shareDialog: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'shareDialog'],
    transferDialog: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'transferDialog'],
  },
};
