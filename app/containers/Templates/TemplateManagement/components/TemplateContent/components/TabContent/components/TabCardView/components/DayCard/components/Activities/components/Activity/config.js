import { NODE_STORE_SELECTORS } from 'datastore/nodeStore/selectors';

export const CONFIG = {
  value: {
    content: props => NODE_STORE_SELECTORS.content({ id: props.id }),
    location: props => NODE_STORE_SELECTORS.location({ id: props.id }),
    photoId: props => NODE_STORE_SELECTORS.photoId({ id: props.id }),
    attachmentId: props => NODE_STORE_SELECTORS.attachmentId({ id: props.id }),
  },
  setValue: {},
};
