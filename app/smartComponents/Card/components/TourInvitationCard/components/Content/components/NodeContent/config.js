import { NODE_STORE, TEMPLATE_MANAGEMENT_DATASTORE } from 'appConstants';

export const CONFIG = {
  setValue: {},

  value: {
    target: {
      keyPath: [TEMPLATE_MANAGEMENT_DATASTORE, 'id'],
      getter: id => (id ? '_blank' : ''),
    },
    content: ({ nodeId }) => [NODE_STORE, 'nodes', nodeId, 'content'],
  },
};
