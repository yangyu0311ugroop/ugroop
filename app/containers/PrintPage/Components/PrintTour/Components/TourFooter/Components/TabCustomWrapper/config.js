import { NODE_STORE } from 'appConstants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

export const CONFIG = {
  value: {
    tabChildIds: props => [NODE_STORE, 'nodes', props.tabId, 'children'],
    content: props => [NODE_STORE, 'nodes', props.tabId, 'content'],
    sharedWith: ({ tabId }) => NODE_STORE_SELECTORS.sharedWith({ id: tabId }),
    printMode: ({ tabId }) => NODE_STORE_SELECTORS.printMode({ id: tabId }),
  },
  setValue: {
    tabsData: props => [NODE_STORE, 'nodes', props.tabId, 'children'],
  },
};
