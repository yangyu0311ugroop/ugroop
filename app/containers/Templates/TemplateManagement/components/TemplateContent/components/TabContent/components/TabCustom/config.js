import { TEMPLATE_MANAGEMENT_VIEWSTORE, NODE_STORE } from 'appConstants';
import {
  NODE_STORE_SELECTORS,
  NODE_VIEW_STORE_SELECTORS,
} from 'datastore/nodeStore/selectors';

export const CONFIG = {
  value: {
    tabIds: ({ templateId }) =>
      NODE_STORE_SELECTORS.children({ id: templateId }),
    sectionIds: ({ id }) => [NODE_STORE, 'nodes', id, 'children'],
    pubSectionIds: ({ id }) => [NODE_STORE, 'nodes', id, 'children'],
    currentMode: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'currentMode'], // move, edit, view
    editable: NODE_VIEW_STORE_SELECTORS.editable,
    isPrivate: NODE_STORE_SELECTORS.isPrivate,
    subtype: NODE_STORE_SELECTORS.subtype,
  },

  setValue: {
    selectedId: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'selectedId'],
    currentMode: [TEMPLATE_MANAGEMENT_VIEWSTORE, 'currentMode'],
    tabs: [NODE_STORE, 'nodes'],
  },
};
