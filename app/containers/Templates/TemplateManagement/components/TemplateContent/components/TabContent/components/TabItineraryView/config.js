import { NODE_STORE } from 'appConstants';

export const CONFIG = {
  value: {
    tabChildren: props => [NODE_STORE, 'nodes', props.tabId, 'children'],
  },
  setValue: {},
};
