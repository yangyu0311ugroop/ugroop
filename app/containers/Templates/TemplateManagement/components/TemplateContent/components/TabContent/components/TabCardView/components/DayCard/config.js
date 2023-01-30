import { NODE_STORE } from 'appConstants';
import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

export const CONFIG = {
  value: {
    id: props => [NODE_STORE, 'nodes', props.dayId, 'id'],
    content: props => NODE_STORE_SELECTORS.content({ id: props.dayId }),
    location: props => NODE_STORE_SELECTORS.location({ id: props.dayId }),
    photoId: props => NODE_STORE_SELECTORS.photoId({ id: props.dayId }),
  },
  setValue: {},
};
