import { NODE_STORE } from 'appConstants';

export const CONFIG = {
  value: {
    tabChildren: props => [NODE_STORE, 'nodes', props.tabId, 'children'],
    startDate: props => [
      NODE_STORE,
      'nodes',
      props.templateId,
      'customData',
      'startDate',
    ],
    displayDate: props => [
      NODE_STORE,
      'nodes',
      props.templateId,
      'customData',
      'displayDate',
    ],
  },
  setValue: {},
};
