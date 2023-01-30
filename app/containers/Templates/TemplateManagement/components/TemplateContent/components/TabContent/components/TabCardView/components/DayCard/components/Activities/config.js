import { NODE_STORE } from 'appConstants';

export const CONFIG = {
  value: {
    sections: props => [NODE_STORE, 'nodes', props.dayId, 'children'],
  },
  setValue: {},
};
