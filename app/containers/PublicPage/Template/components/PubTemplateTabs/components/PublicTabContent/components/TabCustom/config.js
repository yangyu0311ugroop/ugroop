import { TEMPLATE_MANAGEMENT_VIEWSTORE, NODE_STORE } from 'appConstants';

export const CONFIG = {
  value: {
    sectionIds: ({ id }) => [NODE_STORE, 'nodes', id, 'children'],
    currentMode: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'currentMode'], // move, edit, view
  },

  setValue: {
    currentMode: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'currentMode'],
    tabs: [NODE_STORE, 'nodes'],
  },
};
