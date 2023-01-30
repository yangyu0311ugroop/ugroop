import { NODE_STORE } from 'appConstants';
export const CONFIG = {
  value: {
    photoId: props => [NODE_STORE, 'nodes', props.activityId, 'photos', '0'],
  },
};
